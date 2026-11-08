// timer.js — Timestamp-Driven Precision Interval Timer
// Built for mobile: Drift-proof, Web Audio Synthesizer, Screen Wake Lock & Vibration.

class WorkoutTimer {
  constructor() {
    this.intervals = [];
    this.currentIndex = 0;
    this.state = 'idle'; // 'idle' | 'running' | 'paused' | 'completed'

    // Timing tracking
    this.intervalDuration = 0;
    this.startTime = 0;
    this.pausedElapsed = 0;
    this.rafId = null;

    // Callbacks
    this.onTick = null;
    this.onIntervalStart = null;
    this.onHalfway = null;
    this.onComplete = null;
    this.onStateChange = null;

    // Halfway flag
    this.halfwayFired = false;
    this.lastCountBeep = -1;

    // Audio & WakeLock
    this.audioCtx = null;
    this.wakeLock = null;

    this.initAudio();
    this.initVisibilityListener();
  }

  initAudio() {
    // Lazy AudioContext initialization on first user tap (required for iOS Safari)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  ensureAudio() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Pure Web Audio Synthesizer tones (zero audio file dependencies)
  playTone(freq, type, duration, gainLevel = 0.25) {
    if (!this.audioCtx) return;
    this.ensureAudio();

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // Audio Cue: 3-2-1 Countdown Beep
  playCountdownBeep(num) {
    const freq = num === 1 ? 880 : 587; // Higher pitch on "1"
    this.playTone(freq, 'sine', 0.15, 0.3);
    this.vibrate(80);
  }

  // Audio Cue: Work Start Horn
  playStartChime() {
    this.playTone(523.25, 'triangle', 0.12, 0.35); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.12, 0.35), 100); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.28, 0.4), 200); // G5
    this.vibrate([150, 80, 200]);
  }

  // Audio Cue: Rest Interval Chime
  playRestChime() {
    this.playTone(659.25, 'sine', 0.2, 0.3);
    setTimeout(() => this.playTone(523.25, 'sine', 0.4, 0.25), 150);
    this.vibrate([120, 60, 120]);
  }

  // Audio Cue: Halfway "Switch Sides" Double Beep
  playHalfwayChime() {
    this.playTone(880, 'sine', 0.12, 0.4);
    setTimeout(() => this.playTone(880, 'sine', 0.2, 0.4), 160);
    this.vibrate([180, 70, 180, 70, 250]);
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  // Screen Wake Lock API (keeps mobile screen awake throughout workout)
  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          this.wakeLock = null;
        });
      } catch (e) {
        console.warn('Wake Lock request failed:', e);
      }
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      try { this.wakeLock.release(); } catch (e) {}
      this.wakeLock = null;
    }
  }

  initVisibilityListener() {
    // Re-acquire wake lock and resync clock when user brings browser back into view
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.state === 'running') {
        this.requestWakeLock();
      }
    });
  }

  // =========================================================================
  // TIMER CORE LOOP
  // =========================================================================

  loadWorkout(workout) {
    this.intervals = workout.intervals;
    this.currentIndex = 0;
    this.state = 'idle';
    this.pausedElapsed = 0;
    this.halfwayFired = false;
    this.lastCountBeep = -1;
  }

  start() {
    if (this.intervals.length === 0) return;
    this.ensureAudio();
    this.requestWakeLock();
    this.currentIndex = 0;
    this.startCurrentInterval();
  }

  startCurrentInterval() {
    if (this.currentIndex >= this.intervals.length) {
      this.complete();
      return;
    }

    const current = this.intervals[this.currentIndex];
    this.intervalDuration = current.duration;
    this.startTime = performance.now();
    this.pausedElapsed = 0;
    this.halfwayFired = false;
    this.lastCountBeep = -1;
    this.state = 'running';

    if (current.type === 'work') {
      this.playStartChime();
    } else {
      this.playRestChime();
    }

    if (this.onIntervalStart) {
      this.onIntervalStart(current, this.currentIndex, this.intervals.length);
    }
    if (this.onStateChange) this.onStateChange(this.state);

    this.tick();
  }

  tick = () => {
    if (this.state !== 'running') return;

    const now = performance.now();
    const elapsedSeconds = (now - this.startTime + this.pausedElapsed) / 1000;
    const remainingSeconds = Math.max(0, this.intervalDuration - elapsedSeconds);
    const progress = Math.min(1, elapsedSeconds / this.intervalDuration);

    const current = this.intervals[this.currentIndex];

    // Check Halfway Cue for unilateral exercises (sides: true)
    if (current.type === 'work' && current.sides && !this.halfwayFired) {
      if (remainingSeconds <= this.intervalDuration / 2) {
        this.halfwayFired = true;
        this.playHalfwayChime();
        if (this.onHalfway) this.onHalfway(current);
      }
    }

    // Check 3-2-1 Countdown Beeps
    const roundedRem = Math.ceil(remainingSeconds);
    if (roundedRem <= 3 && roundedRem >= 1 && roundedRem !== this.lastCountBeep && remainingSeconds > 0.05) {
      this.lastCountBeep = roundedRem;
      this.playCountdownBeep(roundedRem);
    }

    // Broadcast Tick
    if (this.onTick) {
      this.onTick({
        remaining: Math.ceil(remainingSeconds),
        remainingExact: remainingSeconds,
        elapsed: elapsedSeconds,
        totalDuration: this.intervalDuration,
        progress: progress,
        currentInterval: current
      });
    }

    // Interval Transition
    if (remainingSeconds <= 0) {
      this.currentIndex++;
      this.startCurrentInterval();
      return;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  pause() {
    if (this.state !== 'running') return;
    cancelAnimationFrame(this.rafId);
    this.pausedElapsed += performance.now() - this.startTime;
    this.state = 'paused';
    this.releaseWakeLock();
    if (this.onStateChange) this.onStateChange(this.state);
  }

  resume() {
    if (this.state !== 'paused') return;
    this.ensureAudio();
    this.requestWakeLock();
    this.startTime = performance.now();
    this.state = 'running';
    if (this.onStateChange) this.onStateChange(this.state);
    this.tick();
  }

  skip() {
    cancelAnimationFrame(this.rafId);
    this.currentIndex++;
    if (this.currentIndex >= this.intervals.length) {
      this.complete();
    } else {
      this.startCurrentInterval();
    }
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.state = 'idle';
    this.releaseWakeLock();
    if (this.onStateChange) this.onStateChange(this.state);
  }

  complete() {
    cancelAnimationFrame(this.rafId);
    this.state = 'completed';
    this.releaseWakeLock();
    this.playStartChime(); // Victory chime

    if (this.onComplete) {
      this.onComplete({
        totalIntervals: this.intervals.length,
        workIntervals: this.intervals.filter(i => i.type === 'work').length
      });
    }
    if (this.onStateChange) this.onStateChange(this.state);
  }
}
