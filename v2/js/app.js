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

  // =========================================================================
  // SCREEN 2: WORKOUT FLOW
  // =========================================================================

  const elProgressPill = document.getElementById('workout-progress-pill');
  const elTargetPill = document.getElementById('workout-target-pill');
  const elModeBanner = document.getElementById('mode-banner');
  const elSwitchSidesBanner = document.getElementById('switch-sides-banner');
  const elDemoImg = document.getElementById('workout-demo-img');
  const elNextLabel = document.getElementById('demo-next-label');
  const elExName = document.getElementById('current-ex-name');
  const elExCue = document.getElementById('current-ex-cue');
  const elCountdown = document.getElementById('timer-countdown');
  const elProgressFill = document.getElementById('progress-bar-fill');
  const btnPauseResume = document.getElementById('btn-pause-resume');
  const btnSkip = document.getElementById('btn-skip');
  const btnEndWorkout = document.getElementById('btn-end-workout');

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

    timer.loadWorkout(currentWorkout);
    showScreen('workout');
    timer.start();
  }

  // Timer Callbacks
  timer.onIntervalStart = function(interval, index, total) {
    const isWork = interval.type === 'work';

    // Mode Banner
    elModeBanner.className = 'mode-banner ' + (isWork ? 'work' : 'rest');
    elModeBanner.textContent = isWork ? '🔥 WORK' : '☕ REST & RECOVER';

    // Progress Bar class
    elProgressFill.className = 'progress-bar-fill ' + (isWork ? 'work' : 'rest');

    // Header info
    elProgressPill.textContent = `Interval ${interval.round} of ${interval.totalRounds}`;

    // Hide halfway banner
    elSwitchSidesBanner.classList.remove('active');

    if (isWork) {
      const ex = interval.exercise;
      elTargetPill.textContent = ex.target || ex.group;
      elExName.textContent = ex.name;
      elExCue.textContent = ex.cue || '';
      elNextLabel.style.display = 'none';

      // Load exercise demo GIF
      elDemoImg.src = ex.gif;
    } else {
      const next = interval.nextExercise;
      elTargetPill.textContent = 'Get Ready';
      elExName.textContent = 'Rest Period';
      elExCue.textContent = next ? `Next up: ${next.name} (${next.cue || ''})` : 'Final rest!';
      elNextLabel.style.display = 'block';
      elNextLabel.textContent = next ? `UP NEXT: ${next.name}` : 'UP NEXT: Finish!';

      // Preview next exercise GIF
      if (next) elDemoImg.src = next.gif;
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
    // Unilateral move switch sides alert
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

    showScreen('done');
  }

  document.getElementById('btn-done-restart').addEventListener('click', () => {
    showScreen('home');
  });

  // Init
  initHomeUI();
  showScreen('home');

})();
