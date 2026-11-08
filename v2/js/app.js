// app.js — Main Application Controller
// Handles screen transitions, settings persistence, timer hooks, and UI updates.

(function() {
  'use strict';

  // Application State
  const STORAGE_KEY = 'hiit_timer_settings_v2';
  let settings = {
    focus: 'all',
    kb: true,
    minutes: 30,
    workSeconds: 40,
    restSeconds: 20
  };

  // Load persisted settings
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      settings = { ...settings, ...JSON.parse(saved) };
    }
  } catch (e) {}

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  // Timer instance
  const timer = new WorkoutTimer();
  let currentWorkout = null;

  // DOM Elements
  const screens = {
    home: document.getElementById('screen-home'),
    workout: document.getElementById('screen-workout'),
    done: document.getElementById('screen-done')
  };

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screens[name]) screens[name].classList.add('active');
    window.scrollTo(0, 0);
  }

  // =========================================================================
  // SCREEN 1: HOME & SETTINGS SETUP
  // =========================================================================

  function initHomeUI() {
    // Focus Segmented Control
    const focusBtns = document.querySelectorAll('#seg-focus .seg-btn');
    focusBtns.forEach(btn => {
      if (btn.dataset.val === settings.focus) btn.classList.add('active');
      btn.addEventListener('click', () => {
        focusBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.focus = btn.dataset.val;
        saveSettings();
      });
    });

    // Kettlebell Segmented Control
    const kbBtns = document.querySelectorAll('#seg-kb .seg-btn');
    kbBtns.forEach(btn => {
      const isKb = btn.dataset.val === 'true';
      if (isKb === settings.kb) btn.classList.add('active');
      btn.addEventListener('click', () => {
        kbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.kb = btn.dataset.val === 'true';
        saveSettings();
      });
    });

    // Duration Segmented Control
    const durBtns = document.querySelectorAll('#seg-duration .seg-btn');
    durBtns.forEach(btn => {
      if (parseInt(btn.dataset.val, 10) === settings.minutes) btn.classList.add('active');
      btn.addEventListener('click', () => {
        durBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.minutes = parseInt(btn.dataset.val, 10);
        saveSettings();
      });
    });

    // Tempo Segmented Control (Work/Rest)
    const tempoBtns = document.querySelectorAll('#seg-tempo .seg-btn');
    tempoBtns.forEach(btn => {
      const parts = btn.dataset.val.split('/');
      const w = parseInt(parts[0], 10);
      const r = parseInt(parts[1], 10);
      if (w === settings.workSeconds && r === settings.restSeconds) btn.classList.add('active');
      btn.addEventListener('click', () => {
        tempoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        settings.workSeconds = w;
        settings.restSeconds = r;
        saveSettings();
      });
    });

    // Big Start Button
    document.getElementById('btn-start-workout').addEventListener('click', () => {
      startWorkoutSession();
    });
  }

  // Preload all workout GIFs in memory so they appear instantly during work intervals
  function preloadWorkoutGifs(workout) {
    if (!workout || !workout.intervals) return;
    workout.intervals.forEach(interval => {
      const ex = interval.exercise || interval.nextExercise;
      if (ex && ex.gif) {
        const img = new Image();
        img.src = ex.gif;
      }
    });
  }

  // =========================================================================
  // SCREEN 2: WORKOUT FLOW
  // =========================================================================

  const elProgressPill = document.getElementById('workout-progress-pill');
  const elTargetPill = document.getElementById('workout-target-pill');
  const elModeBanner = document.getElementById('mode-banner');
  const elSideIndicator = document.getElementById('side-indicator-pill');
  const elSwitchSidesBanner = document.getElementById('switch-sides-banner');
  const elDemoFrame = document.querySelector('.demo-frame');
  const elDemoImg = document.getElementById('workout-demo-img');
  const elNextLabel = document.getElementById('demo-next-label');
  const elExName = document.getElementById('current-ex-name');
  const elExCue = document.getElementById('current-ex-cue');
  const elTags = document.getElementById('exercise-tags');
  const elCountdown = document.getElementById('timer-countdown');
  const elProgressFill = document.getElementById('progress-bar-fill');
  const btnPauseResume = document.getElementById('btn-pause-resume');
  const btnSkip = document.getElementById('btn-skip');
  const btnEndWorkout = document.getElementById('btn-end-workout');

  // Robust Image Error Recovery: Fall back to raw GitHub mirror if CDN stalls
  elDemoImg.onerror = function() {
    const current = timer.intervals[timer.currentIndex];
    const targetEx = current?.type === 'work' ? current.exercise : current?.nextExercise;
    if (targetEx && targetEx.fallbackGif && elDemoImg.src !== targetEx.fallbackGif) {
      console.warn('Switching to fallback GIF for:', targetEx.name);
      elDemoImg.src = targetEx.fallbackGif;
    }
  };

  // Confirmation Modal
  const modalBackdrop = document.getElementById('modal-cancel-workout');
  const btnModalStay = document.getElementById('btn-modal-stay');
  const btnModalQuit = document.getElementById('btn-modal-quit');

  function startWorkoutSession() {
    currentWorkout = buildWorkout({
      focus: settings.focus,
      kb: settings.kb,
      minutes: settings.minutes,
      workSeconds: settings.workSeconds,
      restSeconds: settings.restSeconds
    });

    // Preload all assets
    preloadWorkoutGifs(currentWorkout);

    timer.loadWorkout(currentWorkout);
    showScreen('workout');
    timer.start();
  }

  // Timer Callbacks
  timer.onIntervalStart = function(interval, index, total) {
    const isWork = interval.type === 'work';

    // Mode Banner
    elModeBanner.className = 'mode-banner ' + (isWork ? 'work' : 'rest');
    elModeBanner.textContent = isWork ? '🔥 WORK INTERVAL' : '☕ REST & RECOVER';

    // Progress Bar class
    elProgressFill.className = 'progress-bar-fill ' + (isWork ? 'work' : 'rest');

    // Header info
    elProgressPill.textContent = `Interval ${interval.round} of ${interval.totalRounds}`;

    // Hide halfway switch banner by default
    elSwitchSidesBanner.classList.remove('active');

    if (isWork) {
      const ex = interval.exercise;
      elTargetPill.textContent = interval.target || ex.target || ex.group;
      elExName.textContent = interval.name || ex.name;
      elExCue.textContent = interval.cue || ex.cue || '';

      // Unilateral Side Indicator
      if (interval.side) {
        elSideIndicator.style.display = 'flex';
        elSideIndicator.className = 'side-indicator-pill ' + interval.side;
        elSideIndicator.textContent = interval.sideLabel || (interval.side === 'right' ? '👉 RIGHT SIDE' : '👈 LEFT SIDE');
      } else {
        elSideIndicator.style.display = 'none';
        elSideIndicator.className = 'side-indicator-pill';
        elSideIndicator.textContent = '';
      }

      // Exercise Tags
      elTags.innerHTML = '';
      if (interval.movement) {
        const mSpan = document.createElement('span');
        mSpan.className = 'tag-pill movement';
        mSpan.textContent = interval.movement;
        elTags.appendChild(mSpan);
      }
      if (interval.primaryMuscles && interval.primaryMuscles.length) {
        interval.primaryMuscles.slice(0, 2).forEach(m => {
          const musSpan = document.createElement('span');
          musSpan.className = 'tag-pill muscle';
          musSpan.textContent = m.replace('_', ' ');
          elTags.appendChild(musSpan);
        });
      }
      if (ex.kb) {
        const kbSpan = document.createElement('span');
        kbSpan.className = 'tag-pill equipment';
        kbSpan.textContent = 'Kettlebell';
        elTags.appendChild(kbSpan);
      }

      // Demo frame styling during WORK: full opacity, no rest overlay
      elDemoFrame.classList.remove('resting');
      elNextLabel.style.display = 'none';

      // Load active exercise demo GIF
      elDemoImg.src = ex.gif;
    } else {
      // REST INTERVAL
      const nextWork = interval.nextInterval;
      const nextEx = interval.nextExercise;

      elTargetPill.textContent = 'RESTING';
      elExName.textContent = 'Rest & Breathe';

      // Hide side indicator & tags during rest
      elSideIndicator.style.display = 'none';
      elTags.innerHTML = '';

      if (nextWork) {
        const sideNotice = nextWork.sideLabel ? ` (${nextWork.sideLabel})` : '';
        elExCue.textContent = `Up Next: ${nextWork.name}${sideNotice} — ${nextWork.cue || ''}`;
        elNextLabel.style.display = 'block';
        elNextLabel.textContent = `☕ REST NOW — UP NEXT: ${nextWork.name}`;
      } else if (nextEx) {
        elExCue.textContent = `Up Next: ${nextEx.name} — ${nextEx.cue || ''}`;
        elNextLabel.style.display = 'block';
        elNextLabel.textContent = `☕ REST NOW — UP NEXT: ${nextEx.name}`;
      } else {
        elExCue.textContent = 'Final rest of the workout!';
        elNextLabel.style.display = 'block';
        elNextLabel.textContent = 'REST NOW';
      }

      // Demo frame styling during REST: dimmed preview showing what's UP NEXT
      elDemoFrame.classList.add('resting');

      // Show preview of next exercise
      if (nextEx && nextEx.gif) {
        elDemoImg.src = nextEx.gif;
      }
    }
  };

  timer.onTick = function(data) {
    // Massive Countdown
    elCountdown.textContent = data.remaining;

    // Smooth Progress Bar
    const pct = Math.round(data.progress * 100);
    elProgressFill.style.width = pct + '%';
  };

  timer.onHalfway = function(interval) {
    // Only used if an interval explicitly requests halfway split
    elSwitchSidesBanner.classList.add('active');
    setTimeout(() => {
      elSwitchSidesBanner.classList.remove('active');
    }, 4500);
  };

  timer.onStateChange = function(state) {
    if (state === 'paused') {
      btnPauseResume.textContent = '▶ Resume';
      btnPauseResume.classList.add('primary');
      elCountdown.style.opacity = '0.4';
    } else if (state === 'running') {
      btnPauseResume.textContent = '⏸ Pause';
      btnPauseResume.classList.remove('primary');
      elCountdown.style.opacity = '1';
    }
  };

  timer.onComplete = function(stats) {
    showDoneScreen(stats);
  };

  // Workout Controls Listeners
  btnPauseResume.addEventListener('click', () => {
    if (timer.state === 'running') {
      timer.pause();
    } else if (timer.state === 'paused') {
      timer.resume();
    }
  });

  btnSkip.addEventListener('click', () => {
    timer.skip();
  });

  // End Workout with in-page modal
  btnEndWorkout.addEventListener('click', () => {
    timer.pause();
    modalBackdrop.classList.add('active');
  });

  btnModalStay.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    timer.resume();
  });

  btnModalQuit.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    timer.stop();
    showScreen('home');
  });

  // =========================================================================
  // SCREEN 3: DONE SUMMARY
  // =========================================================================

  function showDoneScreen(stats) {
    const totalMinutes = settings.minutes;
    const estimatedCalories = Math.round(totalMinutes * 10.5); // ~10.5 kcal/min for HIIT

    document.getElementById('done-stat-time').textContent = `${totalMinutes} min`;
    document.getElementById('done-stat-calories').textContent = `${estimatedCalories} kcal`;
    document.getElementById('done-stat-intervals').textContent = `${stats.workIntervals} rounds`;
    document.getElementById('done-stat-focus').textContent = settings.focus.toUpperCase();

    // Movement Pattern Breakdown Summary
    const patternCounts = {};
    if (currentWorkout && currentWorkout.intervals) {
      currentWorkout.intervals.forEach(i => {
        if (i.type === 'work' && i.movement) {
          patternCounts[i.movement] = (patternCounts[i.movement] || 0) + 1;
        }
      });
    }

    const summaryContainer = document.getElementById('done-patterns-summary');
    if (summaryContainer) {
      summaryContainer.innerHTML = '';
      Object.entries(patternCounts).forEach(([pattern, count]) => {
        const chip = document.createElement('div');
        chip.className = 'done-pattern-chip';
        chip.innerHTML = `<span class="count">${count}x</span> ${pattern.toUpperCase()}`;
        summaryContainer.appendChild(chip);
      });
    }

    showScreen('done');
  }

  document.getElementById('btn-done-restart').addEventListener('click', () => {
    showScreen('home');
  });

  // Init
  initHomeUI();
  showScreen('home');

})();
