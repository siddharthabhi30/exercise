// workout.js — Workout Builder & Sequence Generator
// Generates balanced HIIT interval workouts from the exercise library.

function buildWorkout(options = {}) {
  const {
    focus = 'all',        // 'all' | 'legs' | 'core' | 'upper'
    kb = true,            // true | false
    minutes = 30,         // 20 | 30 | 40
    workSeconds = 40,
    restSeconds = 20
  } = options;

  const totalCycleSeconds = workSeconds + restSeconds;
  const numRounds = Math.max(4, Math.floor((minutes * 60) / totalCycleSeconds));

  // Filter pool by kettlebell setting
  let pool = EXERCISES.filter(ex => {
    if (!kb && ex.kb) return false;
    return true;
  });

  if (pool.length === 0) {
    pool = EXERCISES.filter(ex => !ex.kb);
  }

  // Categorize
  const legsPool = pool.filter(e => e.group === 'legs');
  const corePool = pool.filter(e => e.group === 'core');
  const upperPool = pool.filter(e => e.group === 'upper');
  const cardioPool = pool.filter(e => e.group === 'full');

  // Helper: Pick next without back-to-back repeats
  function pickNext(candidates, lastId) {
    const valid = candidates.filter(c => c.id !== lastId);
    const list = valid.length > 0 ? valid : candidates;
    return list[Math.floor(Math.random() * list.length)];
  }

  const selectedExercises = [];
  let lastId = null;

  // Warm-up Block: First 2 exercises are gentle warmups
  const warmups = pool.filter(e => e.easy);
  if (warmups.length > 0) {
    const w1 = warmups[Math.floor(Math.random() * warmups.length)];
    selectedExercises.push(w1);
    lastId = w1.id;
  }

  for (let i = selectedExercises.length; i < numRounds; i++) {
    let candidatePool = pool;

    if (focus === 'legs') {
      // 70% legs, 30% core/cardio
      candidatePool = (i % 3 === 0) ? (corePool.length ? corePool : pool) : (legsPool.length ? legsPool : pool);
    } else if (focus === 'core') {
      // 70% core & obliques, 30% cardio/legs
      candidatePool = (i % 3 === 0) ? (cardioPool.length ? cardioPool : pool) : (corePool.length ? corePool : pool);
    } else if (focus === 'upper') {
      // 70% upper, 30% core
      candidatePool = (i % 3 === 0) ? (corePool.length ? corePool : pool) : (upperPool.length ? upperPool : pool);
    } else {
      // Balanced rotation in blocks of 3: Legs -> Core -> Upper -> Cardio
      const step = i % 4;
      if (step === 0 && legsPool.length) candidatePool = legsPool;
      else if (step === 1 && corePool.length) candidatePool = corePool;
      else if (step === 2 && upperPool.length) candidatePool = upperPool;
      else if (step === 3 && cardioPool.length) candidatePool = cardioPool;
    }

    // Oblique guarantee: every core block contains at least 1 oblique exercise
    if (candidatePool === corePool && i % 2 === 1) {
      const obliques = corePool.filter(e => e.sub === 'oblique');
      if (obliques.length > 0) candidatePool = obliques;
    }

    // Kettlebell distribution target: ~60% KB moves when kb === true
    if (kb && Math.random() < 0.6) {
      const kbCandidates = candidatePool.filter(e => e.kb);
      if (kbCandidates.length > 0) candidatePool = kbCandidates;
    }

    const ex = pickNext(candidatePool, lastId);
    selectedExercises.push(ex);
    lastId = ex.id;
  }

  // Construct alternating Work -> Rest intervals
  const intervals = [];
  selectedExercises.forEach((ex, idx) => {
    // Work Interval
    intervals.push({
      type: 'work',
      round: idx + 1,
      totalRounds: numRounds,
      duration: workSeconds,
      exercise: ex,
      sides: !!ex.sides
    });

    // Rest Interval (except after final exercise)
    if (idx < numRounds - 1) {
      intervals.push({
        type: 'rest',
        round: idx + 1,
        totalRounds: numRounds,
        duration: restSeconds,
        nextExercise: selectedExercises[idx + 1]
      });
    }
  });

  return {
    config: { focus, kb, minutes, workSeconds, restSeconds },
    totalRounds: numRounds,
    intervals
  };
}
