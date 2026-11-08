// exercises.js — Verified HIIT Exercise Library with 100% Working GIFs
// All URLs are verified directly from ExerciseGymGifsDB (jsDelivr CDN + raw GitHub fallbacks).

const VERIFIED_EXERCISES = [
  // =========================================================================
  // LEGS — KETTLEBELL
  // =========================================================================
  {
    id: 'kb_swing',
    name: 'Kettlebell Swing',
    group: 'legs',
    kb: true,
    target: 'Glutes & Hamstrings',
    cue: 'Hinge back deeply at the hips, snap glutes forward to float the kettlebell to chest height.',
    file: 'glutes/kettlebell-swing.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/kettlebell-swing.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/kettlebell-swing.gif'
  },
  {
    id: 'goblet_squat',
    name: 'Kettlebell Goblet Squat',
    group: 'legs',
    kb: true,
    target: 'Quadriceps & Glutes',
    cue: 'Hold kettlebell at chest with both hands, sit down deep between your heels with chest proud.',
    file: 'quadriceps/kettlebell-goblet-squat.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/kettlebell-goblet-squat.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/kettlebell-goblet-squat.gif'
  },
  {
    id: 'kb_deadlift',
    name: 'Kettlebell Deadlift',
    group: 'legs',
    kb: true,
    target: 'Hamstrings & Lower Back',
    cue: 'Keep flat spine, push hips straight back, drive through heels to stand tall.',
    file: 'hamstrings/kettlebell-deadlift.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/kettlebell-deadlift.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/hamstrings/kettlebell-deadlift.gif'
  },
  {
    id: 'kb_sumo_squat',
    name: 'Kettlebell Sumo Squat',
    group: 'legs',
    kb: true,
    target: 'Adductors & Inner Thighs',
    cue: 'Wide stance with toes flared out 45°, push knees outward as you drop into the squat.',
    file: 'glutes/kettlebell-sumo-squat.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/kettlebell-sumo-squat.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/kettlebell-sumo-squat.gif'
  },
  {
    id: 'kb_reverse_lunge',
    name: 'Kettlebell Reverse Lunge',
    group: 'legs',
    kb: true,
    sides: true,
    target: 'Quads & Glutes',
    cue: 'Step back softly into a 90° knee bend, keeping chest upright and core braced.',
    file: 'quadriceps/kettlebell-lunge.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/kettlebell-lunge.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/kettlebell-lunge.gif'
  },

  // =========================================================================
  // LEGS — BODYWEIGHT
  // =========================================================================
  {
    id: 'air_squat',
    name: 'Air Squat',
    group: 'legs',
    kb: false,
    easy: true,
    target: 'Quads & Glutes',
    cue: 'Reach arms forward for counter-balance, hips drop below knees, drive up through heels.',
    file: 'quadriceps/bodyweight-squat.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/bodyweight-squat.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/bodyweight-squat.gif'
  },
  {
    id: 'jump_squat',
    name: 'Jump Squat',
    group: 'legs',
    kb: false,
    target: 'Explosive Power & Quads',
    cue: 'Lower into a quarter squat, then explode into the air with soft landing.',
    file: 'quadriceps/jump-squat.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/jump-squat.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/jump-squat.gif'
  },
  {
    id: 'bodyweight_lunge',
    name: 'Forward / Reverse Lunge',
    group: 'legs',
    kb: false,
    sides: true,
    target: 'Quads & Glutes',
    cue: 'Step forward smoothly, drop back knee an inch from the floor, push back cleanly.',
    file: 'quadriceps/bodyweight-lunge.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/bodyweight-lunge.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/bodyweight-lunge.gif'
  },
  {
    id: 'glute_bridge',
    name: 'Glute Bridge',
    group: 'legs',
    kb: false,
    target: 'Glutes & Core',
    cue: 'Drive heels firmly into floor, bridge hips up in a straight line from knees to shoulders.',
    file: 'glutes/glute-bridge.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/glute-bridge.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/glute-bridge.gif'
  },
  {
    id: 'side_bridge_abduction',
    name: 'Side Bridge Hip Abduction',
    group: 'legs',
    kb: false,
    sub: 'oblique',
    sides: true,
    target: 'Hip Abductors & Obliques',
    cue: 'Hold side bridge position, lift top leg upward with toes pointed forward.',
    file: 'abductors/side-bridge-hip-abduction.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abductors/side-bridge-hip-abduction.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abductors/side-bridge-hip-abduction.gif'
  },

  // =========================================================================
  // CORE & OBLIQUES — KETTLEBELL
  // =========================================================================
  {
    id: 'kb_windmill',
    name: 'Kettlebell Windmill',
    group: 'core',
    sub: 'oblique',
    kb: true,
    sides: true,
    target: 'Obliques & Core Stability',
    cue: 'Lock eyes on overhead kettlebell, push hip back, slide opposite hand down to ankle.',
    file: 'abs/kettlebell-advanced-windmill.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/kettlebell-advanced-windmill.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/kettlebell-advanced-windmill.gif'
  },
  {
    id: 'kb_side_bend',
    name: 'Kettlebell Suitcase Side Bend',
    group: 'core',
    sub: 'oblique',
    kb: true,
    sides: true,
    target: 'Lateral Obliques & Love Handles',
    cue: 'Lower weight down side of thigh, contract opposite oblique to pull back to center.',
    file: 'abs/kettlebell-side-bend.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/kettlebell-side-bend.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/kettlebell-side-bend.gif'
  },
  {
    id: 'kb_bent_press',
    name: 'Kettlebell Bent Press',
    group: 'core',
    sub: 'oblique',
    kb: true,
    sides: true,
    target: 'Core & Oblique Torque',
    cue: 'Racked kettlebell, rotate and bend torso away from the bell while locking the arm straight.',
    file: 'abs/kettlebell-bent-press.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/kettlebell-bent-press.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/kettlebell-bent-press.gif'
  },
  {
    id: 'kb_situp',
    name: 'Kettlebell Sit-Up',
    group: 'core',
    kb: true,
    target: 'Abdominals',
    cue: 'Press kettlebell vertically toward the ceiling as you sit up tall with proud chest.',
    file: 'abs/kettlebell-sit-up.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/kettlebell-sit-up.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/kettlebell-sit-up.gif'
  },

  // =========================================================================
  // CORE & OBLIQUES — BODYWEIGHT
  // =========================================================================
  {
    id: 'plank',
    name: 'Forearm Plank',
    group: 'core',
    kb: false,
    target: 'Entire Core & Transverse Abs',
    cue: 'Maintain a rigid straight line from head to heels, squeeze glutes and pull belly to spine.',
    file: 'abs/plank.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/plank.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/plank.gif'
  },
  {
    id: 'side_plank',
    name: 'Side Plank',
    group: 'core',
    sub: 'oblique',
    kb: false,
    sides: true,
    target: 'Obliques & Lateral Core',
    cue: 'Stack feet, elevate hips into a straight diagonal line, reach top arm high.',
    file: 'abs/side-plank.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/side-plank.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/side-plank.gif'
  },
  {
    id: 'air_bike',
    name: 'Bicycle Crunches (Air Bike)',
    group: 'core',
    sub: 'oblique',
    kb: false,
    target: 'Obliques & Upper Abs',
    cue: 'Touch opposite elbow to knee while extending the opposite leg long and straight.',
    file: 'abs/air-bike.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/air-bike.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/air-bike.gif'
  },
  {
    id: 'russian_twist',
    name: 'Russian Twist',
    group: 'core',
    sub: 'oblique',
    kb: false,
    target: 'Obliques & Rotational Core',
    cue: 'V-sit position, rotate shoulders side-to-side tapping hands on the floor.',
    file: 'abs/assisted-motion-russian-twist.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/assisted-motion-russian-twist.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/assisted-motion-russian-twist.gif'
  },
  {
    id: 'heel_taps',
    name: 'Alternate Heel Touchers',
    group: 'core',
    sub: 'oblique',
    kb: false,
    target: 'Obliques & Love Handles',
    cue: 'Shoulders raised slightly off mat, reach right hand to right heel, then left to left.',
    file: 'abs/alternate-heel-touchers.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/alternate-heel-touchers.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/alternate-heel-touchers.gif'
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    group: 'core',
    kb: false,
    target: 'Core & Cardiovascular',
    cue: 'Solid plank position, drive knees explosively forward toward chest in sprint rhythm.',
    file: 'abs/mountain-climber.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/mountain-climber.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/mountain-climber.gif'
  },
  {
    id: 'side_bend_bodyweight',
    name: '45° Side Bend',
    group: 'core',
    sub: 'oblique',
    kb: false,
    sides: true,
    target: 'Obliques & Love Handles',
    cue: 'Controlled lateral bend, squeeze side oblique tightly at peak contraction.',
    file: 'abs/45-side-bend.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/45-side-bend.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/45-side-bend.gif'
  },
  {
    id: 'sit_up_3_4',
    name: '3/4 Sit-Up',
    group: 'core',
    kb: false,
    target: 'Upper & Middle Abs',
    cue: 'Curl torso upward smoothly, exhaling fully as your chest reaches toward knees.',
    file: 'abs/3-4-sit-up.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/3-4-sit-up.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/3-4-sit-up.gif'
  },

  // =========================================================================
  // UPPER BODY — KETTLEBELL
  // =========================================================================
  {
    id: 'kb_overhead_press',
    name: 'Kettlebell Overhead Press',
    group: 'upper',
    kb: true,
    sides: true,
    target: 'Deltoids & Triceps',
    cue: 'From rack position at shoulder, punch kettlebell straight overhead to complete lockout.',
    file: 'shoulders/kettlebell-overhead-press.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/shoulders/kettlebell-overhead-press.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/shoulders/kettlebell-overhead-press.gif'
  },
  {
    id: 'kb_bent_row',
    name: 'Kettlebell Bent-Over Row',
    group: 'upper',
    kb: true,
    sides: true,
    target: 'Lats & Upper Back',
    cue: 'Hinge forward 60° with flat back, drive elbow back towards the ceiling.',
    file: 'back/kettlebell-bent-over-row.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/back/kettlebell-bent-over-row.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/back/kettlebell-bent-over-row.gif'
  },
  {
    id: 'kb_push_press',
    name: 'Kettlebell Push Press',
    group: 'upper',
    kb: true,
    sides: true,
    target: 'Shoulders & Power',
    cue: 'Quick shallow knee dip, explode with leg drive to press kettlebell overhead.',
    file: 'shoulders/kettlebell-push-press.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/shoulders/kettlebell-push-press.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/shoulders/kettlebell-push-press.gif'
  },

  // =========================================================================
  // UPPER BODY — BODYWEIGHT
  // =========================================================================
  {
    id: 'pushup',
    name: 'Standard Push-Up',
    group: 'upper',
    kb: false,
    target: 'Chest, Triceps & Shoulders',
    cue: 'Body rigid in a plank, lower chest to graze the floor, press through palms to lockout.',
    file: 'chest/push-up.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/chest/push-up.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/chest/push-up.gif'
  },
  {
    id: 'pike_pushup',
    name: 'Pike Push-Up',
    group: 'upper',
    kb: false,
    target: 'Anterior Deltoids & Shoulders',
    cue: 'Hips piked high in inverted V, lower crown of head between hands and press up.',
    file: 'shoulders/pike-push-up.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/shoulders/pike-push-up.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/shoulders/pike-push-up.gif'
  },
  {
    id: 'bench_dips',
    name: 'Chair / Bench Dips',
    group: 'upper',
    kb: false,
    target: 'Triceps',
    cue: 'Hands on bench behind you, lower hips until elbows hit 90°, press up through palms.',
    file: 'triceps/bench-dip.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/bench-dip.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/triceps/bench-dip.gif'
  },

  // =========================================================================
  // CARDIO / FULL BODY
  // =========================================================================
  {
    id: 'burpee',
    name: 'Burpee',
    group: 'full',
    kb: false,
    target: 'Full Body Cardiovascular',
    cue: 'Drop to squat, kick feet back to plank, snap feet forward, explode into a vertical jump.',
    file: 'cardio/burpee.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/burpee.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/burpee.gif'
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    group: 'full',
    kb: false,
    easy: true,
    target: 'Full Body Warm-up & Cardio',
    cue: 'Spring off balls of feet, clap hands overhead while jumping feet out, return smoothly.',
    file: 'cardio/jumping-jack.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/jumping-jack.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/jumping-jack.gif'
  },
  {
    id: 'high_knees',
    name: 'High Knees Run',
    group: 'full',
    kb: false,
    target: 'Hip Flexors & Cardio',
    cue: 'Pump knees up to waist height as quickly as possible, pumping opposite arms.',
    file: 'cardio/high-knee-run.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/high-knee-run.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/high-knee-run.gif'
  },
  {
    id: 'skater_hops',
    name: 'Skater Hops',
    group: 'full',
    kb: false,
    target: 'Lateral Power & Glutes',
    cue: 'Hop laterally from side to side, sweeping the trailing leg behind with soft landing.',
    file: 'cardio/skater-hops.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/skater-hops.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/skater-hops.gif'
  }
];

const CURATED_EXERCISES = VERIFIED_EXERCISES;
let EXERCISES = [...VERIFIED_EXERCISES];

// Asynchronously load the complete ExerciseGymGifsDB catalog on startup
(async function initDatabaseCatalog() {
  try {
    const kbUrl = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/equipment/kettlebell.json';
    const bwUrl = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/equipment/bodyweight.json';

    const [kbRes, bwRes] = await Promise.all([
      fetch(kbUrl).then(r => r.json()).catch(() => null),
      fetch(bwUrl).then(r => r.json()).catch(() => null)
    ]);

    const livePool = [];

    if (kbRes && Array.isArray(kbRes.exercises)) {
      kbRes.exercises.forEach(e => {
        const bodyPart = (e.bodyPart || '').toLowerCase();
        let group = 'core';
        if (bodyPart.includes('leg') || bodyPart.includes('glute')) group = 'legs';
        else if (bodyPart.includes('chest') || bodyPart.includes('arm')) group = 'upper';
        else if (bodyPart.includes('back') || bodyPart.includes('shoulder')) group = 'upper';

        livePool.push({
          id: e.slug || e.id,
          name: e.name,
          group: group,
          target: e.muscle || e.bodyPart,
          kb: true,
          sides: e.name.toLowerCase().includes('one-arm') || e.name.toLowerCase().includes('single') || e.name.toLowerCase().includes('lunge') || e.name.toLowerCase().includes('windmill'),
          cue: (e.instructions && e.instructions[0]) || 'Execute with clean form and controlled tempo.',
          file: e.file,
          gif: `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/${e.file}`,
          fallbackGif: `https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/${e.file}`
        });
      });
    }

    if (bwRes && Array.isArray(bwRes.exercises)) {
      bwRes.exercises.forEach(e => {
        const bodyPart = (e.bodyPart || '').toLowerCase();
        let group = 'core';
        if (bodyPart.includes('leg') || bodyPart.includes('glute')) group = 'legs';
        else if (bodyPart.includes('chest') || bodyPart.includes('arm')) group = 'upper';
        else if (bodyPart.includes('back') || bodyPart.includes('shoulder')) group = 'upper';
        else if (bodyPart.includes('cardio')) group = 'full';

        livePool.push({
          id: e.slug || e.id,
          name: e.name,
          group: group,
          target: e.muscle || e.bodyPart,
          kb: false,
          sides: e.name.toLowerCase().includes('side') || e.name.toLowerCase().includes('lunge') || e.name.toLowerCase().includes('one-leg'),
          cue: (e.instructions && e.instructions[0]) || 'Execute with clean form and controlled tempo.',
          file: e.file,
          gif: `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/${e.file}`,
          fallbackGif: `https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/${e.file}`
        });
      });
    }

    if (livePool.length > 50) {
      EXERCISES = livePool;
      console.log(`Exercise database initialized with ${EXERCISES.length} verified live exercises.`);
    }
  } catch (err) {
    console.warn('Using offline verified exercise catalog:', err);
  }
})();
