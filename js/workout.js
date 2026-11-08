// workout.js — Intelligent Circuit Generator with Strict Zero-Equipment Floor Filtering
// Guarantees no gym balls, pull-up bars, or benches in Bodyweight Only mode.
// Features dedicated Love Handle & Oblique focus circuits and sequential Right/Left interval pairing.

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

  // Strict Equipment Filtering
  let pool = EXERCISES.filter(ex => {
    if (!kb) {
      // In Bodyweight Only mode: 100% Floor / Mat ONLY (Zero Equipment)
      // Excludes kettlebells, stability/swiss/medicine balls, pull-up/chin-up bars, benches, chairs, bands
      if (ex.kb) return false;
      if (ex.needsEquipment) return false;
      if (typeof isZeroEquipmentFloor === 'function' && !isZeroEquipmentFloor(ex)) return false;
      if (ex.equipment && ex.equipment !== 'none' && ex.equipment !== 'bodyweight') return false;
      return true;
    }
    return true;
  });

  if (pool.length === 0) {
    pool = EXERCISES.filter(ex => !ex.kb && (!ex.needsEquipment || ex.equipment === 'none'));
  }

  // Pre-categorize functional pools
  const lowerHinge = pool.filter(e => e.movement === 'hinge');
  const lowerSquatLunge = pool.filter(e => e.movement === 'squat' || e.movement === 'lunge');
  const upperPush = pool.filter(e => e.movement === 'push');
  const upperPull = pool.filter(e => e.movement === 'pull');
  const coreAntExt = pool.filter(e => e.group === 'core' && e.movement === 'anti_extension');
  const coreObliques = pool.filter(e => e.group === 'core' && (e.movement === 'rotation' || e.movement === 'lateral' || e.sub === 'oblique' || e.isLoveHandle));
  const loveHandlePool = pool.filter(e => e.isLoveHandle || e.sub === 'oblique' || (e.primaryMuscles && e.primaryMuscles.includes('obliques')));
  const cardioPool = pool.filter(e => e.movement === 'cardio' || e.group === 'full');

  // Muscle Fatigue Check: Detect overlapping primary muscles
  function hasMuscleOverlap(ex1, ex2) {
    if (!ex1 || !ex2 || !ex1.primaryMuscles || !ex2.primaryMuscles) return false;
    return ex1.primaryMuscles.some(m => ex2.primaryMuscles.includes(m));
  }

  // Smart Candidate Picker: picks non-repeating and fatigue-free candidate
  function pickSmartExercise(candidatePool, recentList = [], allowUnilateral = true) {
    let eligible = candidatePool.filter(e => {
      // If we only have 1 slot left, we cannot pick a unilateral exercise because it requires 2 slots (R + L)
      if (!allowUnilateral && e.unilateral) return false;
      return true;
    });

    if (eligible.length === 0) {
      eligible = pool.filter(e => !allowUnilateral ? !e.unilateral : true);
      if (eligible.length === 0) eligible = pool;
    }

    const lastEx = recentList.length > 0 ? recentList[recentList.length - 1] : null;
    const recentIds = recentList.slice(-4).map(e => e.id);

    // 1. Filter out recently seen exercises
    let fresh = eligible.filter(e => !recentIds.includes(e.id));
    if (fresh.length === 0) fresh = eligible.filter(e => lastEx ? e.id !== lastEx.id : true);
    if (fresh.length === 0) fresh = eligible;

    // 2. Filter out immediate muscle fatigue overlap
    if (lastEx) {
      const nonOverlapping = fresh.filter(e => !hasMuscleOverlap(e, lastEx));
      if (nonOverlapping.length > 0) {
        fresh = nonOverlapping;
      }
    }

    // 3. Kettlebell distribution preference (~60% when kb enabled)
    if (kb && Math.random() < 0.6) {
      const kbCandidates = fresh.filter(e => e.kb);
      if (kbCandidates.length > 0) fresh = kbCandidates;
    }

    return fresh[Math.floor(Math.random() * fresh.length)];
  }

  // Selected work sequence of intervals
  const workIntervals = [];
  const chosenHistory = [];

  // Warm-up Block: Start with an accessible bilateral warm-up
  const warmups = pool.filter(e => e.easy && !e.unilateral);
  if (warmups.length > 0 && numRounds >= 6) {
    const w1 = warmups[Math.floor(Math.random() * warmups.length)];
    workIntervals.push({
      round: 1,
      exercise: w1,
      name: w1.name,
      side: null,
      sideLabel: null,
      cue: w1.cue,
      movement: w1.movement,
      primaryMuscles: w1.primaryMuscles,
      target: w1.target
    });
    chosenHistory.push(w1);
  }

  // Construct functional circuit
  while (workIntervals.length < numRounds) {
    const slotsRemaining = numRounds - workIntervals.length;
    const allowUnilateral = slotsRemaining >= 2;
    const step = workIntervals.length % 4;

    let targetPool = pool;

    if (focus === 'legs') {
      // Lower Focus: Knee-dominant -> Hip-dominant -> Lateral/Abductor -> Cardio/Glute
      if (step === 0) targetPool = lowerSquatLunge.length ? lowerSquatLunge : pool;
      else if (step === 1) targetPool = lowerHinge.length ? lowerHinge : pool;
      else if (step === 2) targetPool = pool.filter(e => e.movement === 'lateral' || (e.primaryMuscles && e.primaryMuscles.includes('abductors')) || e.group === 'core');
      else targetPool = cardioPool.length ? cardioPool : lowerSquatLunge;
    } else if (focus === 'core') {
      // Core & Dedicated Love Handle Focus:
      // Step 0: Anterior Core / Upper Abs (Plank, 3/4 Sit-Up)
      // Step 1: Direct Lateral Love Handle Flexion (Alternate Heel Touchers, Side Plank, Floor Oblique Crunch, 45 Side Bend)
      // Step 2: Rotational Love Handle Torque (Russian Twist, Cross-Body Crunch, Air Bike, Kettlebell Windmill)
      // Step 3: Dynamic Oblique / Hip Abduction / Core Cardio (Side Bridge Abduction, Plank Twists, Push-Up Side Plank)
      const lateralLoveHandles = loveHandlePool.filter(e => e.movement === 'lateral');
      const rotationalLoveHandles = loveHandlePool.filter(e => e.movement === 'rotation');
      const dynamicLoveHandles = pool.filter(e => e.isLoveHandle || e.movement === 'cardio');

      if (step === 0) targetPool = coreAntExt.length ? coreAntExt : pool.filter(e => e.group === 'core');
      else if (step === 1) targetPool = lateralLoveHandles.length ? lateralLoveHandles : (coreObliques.length ? coreObliques : pool);
      else if (step === 2) targetPool = rotationalLoveHandles.length ? rotationalLoveHandles : (coreObliques.length ? coreObliques : pool);
      else targetPool = dynamicLoveHandles.length ? dynamicLoveHandles : (coreObliques.length ? coreObliques : pool);
    } else if (focus === 'upper') {
      // Upper Focus: Horizontal Push -> Vertical Push / Triceps -> Pull / Upper Back -> Core / Oblique
      if (step === 0) targetPool = upperPush.filter(e => e.target.toLowerCase().includes('chest') || e.id === 'pushup');
      else if (step === 1) targetPool = upperPush.filter(e => e.movement === 'push' || (e.primaryMuscles && e.primaryMuscles.includes('triceps')));
      else if (step === 2) targetPool = upperPull.length ? upperPull : upperPush;
      else targetPool = loveHandlePool.length ? loveHandlePool : (coreAntExt.length ? coreAntExt : cardioPool);
    } else {
      // Full Body Balanced Circuit: Lower (Hinge/Squat) -> Upper (Push/Pull) -> Core (Love Handles & Obliques) -> Cardio
      if (step === 0) targetPool = [...lowerHinge, ...lowerSquatLunge];
      else if (step === 1) targetPool = [...upperPush, ...upperPull];
      else if (step === 2) targetPool = loveHandlePool.length ? loveHandlePool : [...coreObliques, ...coreAntExt];
      else targetPool = cardioPool.length ? cardioPool : pool;
    }

    if (!targetPool || targetPool.length === 0) targetPool = pool;

    const chosenEx = pickSmartExercise(targetPool, chosenHistory, allowUnilateral);
    chosenHistory.push(chosenEx);

    // Unilateral Handling: Schedule Right Side immediately followed by Left Side
    if (chosenEx.unilateral && allowUnilateral) {
      const round1 = workIntervals.length + 1;
      const round2 = round1 + 1;

      // Interval 1: RIGHT SIDE
      workIntervals.push({
        round: round1,
        exercise: chosenEx,
        name: `${chosenEx.name} (Right Side)`,
        side: 'right',
        sideLabel: '👉 RIGHT SIDE',
        cue: chosenEx.cueRight || `Right side — ${chosenEx.cue}`,
        movement: chosenEx.movement,
        primaryMuscles: chosenEx.primaryMuscles,
        target: chosenEx.target
      });

      // Interval 2: LEFT SIDE
      workIntervals.push({
        round: round2,
        exercise: chosenEx,
        name: `${chosenEx.name} (Left Side)`,
        side: 'left',
        sideLabel: '👈 LEFT SIDE',
        cue: chosenEx.cueLeft || `Left side — ${chosenEx.cue}`,
        movement: chosenEx.movement,
        primaryMuscles: chosenEx.primaryMuscles,
        target: chosenEx.target
      });
    } else {
      // Bilateral Exercise
      const round = workIntervals.length + 1;
      workIntervals.push({
        round: round,
        exercise: chosenEx,
        name: chosenEx.name,
        side: null,
        sideLabel: null,
        cue: chosenEx.cue,
        movement: chosenEx.movement,
        primaryMuscles: chosenEx.primaryMuscles,
        target: chosenEx.target
      });
    }
  }

  // Interleave alternating Work -> Rest intervals
  const finalIntervals = [];

  workIntervals.forEach((wInt, idx) => {
    // Work Interval
    finalIntervals.push({
      type: 'work',
      round: idx + 1,
      totalRounds: workIntervals.length,
      duration: workSeconds,
      exercise: wInt.exercise,
      name: wInt.name,
      side: wInt.side,
      sideLabel: wInt.sideLabel,
      cue: wInt.cue,
      movement: wInt.movement,
      primaryMuscles: wInt.primaryMuscles,
      target: wInt.target
    });

    // Rest Interval (between work sets)
    if (idx < workIntervals.length - 1) {
      const nextWork = workIntervals[idx + 1];
      finalIntervals.push({
        type: 'rest',
        round: idx + 1,
        totalRounds: workIntervals.length,
        duration: restSeconds,
        nextInterval: nextWork,
        nextExercise: nextWork.exercise,
        nextName: nextWork.name,
        nextSide: nextWork.side,
        nextSideLabel: nextWork.sideLabel
      });
    }
  });

  return {
    config: { focus, kb, minutes, workSeconds, restSeconds },
    totalRounds: workIntervals.length,
    intervals: finalIntervals
  };
}
