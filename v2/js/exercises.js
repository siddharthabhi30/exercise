// exercises.js — Verified HIIT Exercise Library with Rich Muscular & Movement Tags
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
    unilateral: false,
    movement: 'hinge',
    primaryMuscles: ['glutes', 'hamstrings'],
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
    unilateral: false,
    movement: 'squat',
    primaryMuscles: ['quads', 'glutes'],
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
    unilateral: false,
    movement: 'hinge',
    primaryMuscles: ['hamstrings', 'glutes', 'lower_back'],
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
    unilateral: false,
    movement: 'squat',
    primaryMuscles: ['adductors', 'glutes'],
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
    unilateral: true,
    movement: 'lunge',
    primaryMuscles: ['quads', 'glutes'],
    target: 'Quads & Glutes',
    cue: 'Step back softly into a 90° knee bend, keeping chest upright and core braced.',
    cueRight: 'Right leg forward — step left foot back into a deep 90° lunge, drive up through right heel.',
    cueLeft: 'Left leg forward — step right foot back into a deep 90° lunge, drive up through left heel.',
    file: 'quadriceps/kettlebell-lunge.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/kettlebell-lunge.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/kettlebell-lunge.gif'
  },
  {
    id: 'kb_single_leg_deadlift',
    name: 'Kettlebell Single-Leg Deadlift',
    group: 'legs',
    kb: true,
    unilateral: true,
    movement: 'hinge',
    primaryMuscles: ['hamstrings', 'glutes'],
    target: 'Hamstrings & Balance',
    cue: 'Balance on standing leg, hinge torso forward while reaching rear leg straight back.',
    cueRight: 'Balance on right leg — hinge forward with flat spine, kick left leg straight back.',
    cueLeft: 'Balance on left leg — hinge forward with flat spine, kick right leg straight back.',
    file: 'glutes/kettlebell-one-legged-deadlift.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/kettlebell-one-legged-deadlift.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/glutes/kettlebell-one-legged-deadlift.gif'
  },

  // =========================================================================
  // LEGS — BODYWEIGHT
  // =========================================================================
  {
    id: 'air_squat',
    name: 'Air Squat',
    group: 'legs',
    kb: false,
    unilateral: false,
    easy: true,
    movement: 'squat',
    primaryMuscles: ['quads', 'glutes'],
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
    unilateral: false,
    movement: 'squat',
    primaryMuscles: ['quads', 'calves'],
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
    unilateral: true,
    movement: 'lunge',
    primaryMuscles: ['quads', 'glutes'],
    target: 'Quads & Glutes',
    cue: 'Step forward smoothly, drop back knee an inch from the floor, push back cleanly.',
    cueRight: 'Right leg forward — lower back knee to 90°, press powerfully off right front foot.',
    cueLeft: 'Left leg forward — lower back knee to 90°, press powerfully off left front foot.',
    file: 'quadriceps/bodyweight-lunge.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quadriceps/bodyweight-lunge.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/quadriceps/bodyweight-lunge.gif'
  },
  {
    id: 'glute_bridge',
    name: 'Glute Bridge',
    group: 'legs',
    kb: false,
    unilateral: false,
    movement: 'hinge',
    primaryMuscles: ['glutes', 'hamstrings'],
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
    unilateral: true,
    sub: 'oblique',
    movement: 'lateral',
    primaryMuscles: ['abductors', 'obliques'],
    target: 'Hip Abductors & Obliques',
    cue: 'Hold side bridge position, lift top leg upward with toes pointed forward.',
    cueRight: 'Supporting on right forearm — raise top left leg toward the ceiling with controlled tempo.',
    cueLeft: 'Supporting on left forearm — raise top right leg toward the ceiling with controlled tempo.',
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
    unilateral: true,
    movement: 'rotation',
    primaryMuscles: ['obliques', 'hamstrings', 'deltoids'],
    target: 'Obliques & Core Stability',
    cue: 'Lock eyes on overhead kettlebell, push hip back, slide opposite hand down to ankle.',
    cueRight: 'Right arm locked overhead — push right hip out, slide left fingertips down to inside of left ankle.',
    cueLeft: 'Left arm locked overhead — push left hip out, slide right fingertips down to inside of right ankle.',
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
    unilateral: true,
    movement: 'lateral',
    primaryMuscles: ['obliques'],
    target: 'Lateral Obliques & Love Handles',
    cue: 'Lower weight down side of thigh, contract opposite oblique to pull back to center.',
    cueRight: 'Kettlebell held in right hand — lower along right knee, contract left oblique to pull upright.',
    cueLeft: 'Kettlebell held in left hand — lower along left knee, contract right oblique to pull upright.',
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
    unilateral: true,
    movement: 'rotation',
    primaryMuscles: ['obliques', 'deltoids', 'deep_core'],
    target: 'Core & Oblique Torque',
    cue: 'Racked kettlebell, rotate and bend torso away from the bell while locking the arm straight.',
    cueRight: 'Right hand racked — bend and corkscrew torso forward-left to lock right arm vertically.',
    cueLeft: 'Left hand racked — bend and corkscrew torso forward-right to lock left arm vertically.',
    file: 'abs/kettlebell-bent-press.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/kettlebell-bent-press.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/kettlebell-bent-press.gif'
  },
  {
    id: 'kb_situp',
    name: 'Kettlebell Sit-Up',
    group: 'core',
    kb: true,
    unilateral: false,
    movement: 'anti_extension',
    primaryMuscles: ['abs'],
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
    unilateral: false,
    movement: 'anti_extension',
    primaryMuscles: ['abs', 'deep_core'],
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
    unilateral: true,
    movement: 'lateral',
    primaryMuscles: ['obliques'],
    target: 'Obliques & Lateral Core',
    cue: 'Stack feet, elevate hips into a straight diagonal line, reach top arm high.',
    cueRight: 'Right forearm down — lift right hip high off mat, stack left foot, reach left hand upward.',
    cueLeft: 'Left forearm down — lift left hip high off mat, stack right foot, reach right hand upward.',
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
    unilateral: false,
    movement: 'rotation',
    primaryMuscles: ['obliques', 'abs'],
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
    unilateral: false,
    movement: 'rotation',
    primaryMuscles: ['obliques', 'abs'],
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
    unilateral: false,
    movement: 'lateral',
    primaryMuscles: ['obliques'],
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
    unilateral: false,
    movement: 'cardio',
    primaryMuscles: ['abs', 'hip_flexors', 'cardio'],
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
    unilateral: true,
    movement: 'lateral',
    primaryMuscles: ['obliques'],
    target: 'Obliques & Love Handles',
    cue: 'Controlled lateral bend, squeeze side oblique tightly at peak contraction.',
    cueRight: 'Bending to the right side — reach right hand low, contract right oblique at bottom.',
    cueLeft: 'Bending to the left side — reach left hand low, contract left oblique at bottom.',
    file: 'abs/45-side-bend.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/45-side-bend.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/abs/45-side-bend.gif'
  },
  {
    id: 'sit_up_3_4',
    name: '3/4 Sit-Up',
    group: 'core',
    kb: false,
    unilateral: false,
    movement: 'anti_extension',
    primaryMuscles: ['abs'],
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
    unilateral: true,
    movement: 'push',
    primaryMuscles: ['deltoids', 'triceps'],
    target: 'Deltoids & Triceps',
    cue: 'From rack position at shoulder, punch kettlebell straight overhead to complete lockout.',
    cueRight: 'Right arm pressing — keep ribcage down, punch right kettlebell cleanly to overhead lockout.',
    cueLeft: 'Left arm pressing — keep ribcage down, punch left kettlebell cleanly to overhead lockout.',
    file: 'shoulders/kettlebell-overhead-press.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/shoulders/kettlebell-overhead-press.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/shoulders/kettlebell-overhead-press.gif'
  },
  {
    id: 'kb_bent_row',
    name: 'Kettlebell Bent-Over Row',
    group: 'upper',
    kb: true,
    unilateral: true,
    movement: 'pull',
    primaryMuscles: ['lats', 'upper_back', 'biceps'],
    target: 'Lats & Upper Back',
    cue: 'Hinge forward 60° with flat back, drive elbow back towards the ceiling.',
    cueRight: 'Right arm rowing — square shoulders, pull right elbow back tight past your ribs.',
    cueLeft: 'Left arm rowing — square shoulders, pull left elbow back tight past your ribs.',
    file: 'back/kettlebell-bent-over-row.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/back/kettlebell-bent-over-row.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/back/kettlebell-bent-over-row.gif'
  },
  {
    id: 'kb_push_press',
    name: 'Kettlebell Push Press',
    group: 'upper',
    kb: true,
    unilateral: true,
    movement: 'push',
    primaryMuscles: ['deltoids', 'triceps', 'quads'],
    target: 'Shoulders & Power',
    cue: 'Quick shallow knee dip, explode with leg drive to press kettlebell overhead.',
    cueRight: 'Right arm push press — quick shallow dip, drive through legs and punch right arm overhead.',
    cueLeft: 'Left arm push press — quick shallow dip, drive through legs and punch left arm overhead.',
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
    unilateral: false,
    movement: 'push',
    primaryMuscles: ['chest', 'triceps', 'deltoids'],
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
    unilateral: false,
    movement: 'push',
    primaryMuscles: ['deltoids', 'triceps'],
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
    unilateral: false,
    movement: 'push',
    primaryMuscles: ['triceps', 'chest'],
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
    unilateral: false,
    movement: 'cardio',
    primaryMuscles: ['full_body', 'cardio'],
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
    unilateral: false,
    easy: true,
    movement: 'cardio',
    primaryMuscles: ['calves', 'cardio'],
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
    unilateral: false,
    movement: 'cardio',
    primaryMuscles: ['hip_flexors', 'cardio'],
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
    unilateral: false,
    movement: 'lateral',
    primaryMuscles: ['glutes', 'abductors', 'cardio'],
    target: 'Lateral Power & Glutes',
    cue: 'Hop laterally from side to side, sweeping the trailing leg behind with soft landing.',
    file: 'cardio/skater-hops.gif',
    gif: 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/skater-hops.gif',
    fallbackGif: 'https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/cardio/skater-hops.gif'
  }
];

const CURATED_EXERCISES = VERIFIED_EXERCISES;
let EXERCISES = [...VERIFIED_EXERCISES];

// Helpers to intelligently tag dynamic exercises from ExerciseGymGifsDB
function inferMovementPattern(name = '', bodyPart = '', muscle = '') {
  const n = name.toLowerCase();
  const m = muscle.toLowerCase();
  const b = bodyPart.toLowerCase();

  if (n.includes('swing') || n.includes('deadlift') || n.includes('bridge') || m.includes('glute') || m.includes('hamstring')) return 'hinge';
  if (n.includes('squat')) return 'squat';
  if (n.includes('lunge') || n.includes('split squat') || n.includes('step up')) return 'lunge';
  if (n.includes('push') || n.includes('press') || n.includes('dip') || b.includes('chest') || m.includes('tricep')) return 'push';
  if (n.includes('row') || n.includes('pull') || m.includes('lat') || b.includes('back')) return 'pull';
  if (n.includes('twist') || n.includes('windmill') || n.includes('air bike') || n.includes('bicycle')) return 'rotation';
  if (n.includes('side') || n.includes('abduction') || n.includes('skater')) return 'lateral';
  if (n.includes('plank') || n.includes('sit-up') || n.includes('crunch') || b.includes('waist') || b.includes('abs')) return 'anti_extension';
  if (n.includes('jump') || n.includes('hop') || n.includes('burpee') || n.includes('run') || b.includes('cardio')) return 'cardio';
  return 'hinge';
}

function inferPrimaryMuscles(bodyPart = '', muscle = '') {
  const m = muscle.toLowerCase();
  const b = bodyPart.toLowerCase();
  const list = [];
  if (m.includes('glute') || b.includes('glute')) list.push('glutes');
  if (m.includes('hamstring')) list.push('hamstrings');
  if (m.includes('quad')) list.push('quads');
  if (m.includes('adductor') || m.includes('abductor')) list.push('abductors');
  if (m.includes('calv')) list.push('calves');
  if (m.includes('oblique') || b.includes('waist')) list.push('obliques');
  if (b.includes('abs')) list.push('abs');
  if (m.includes('chest') || b.includes('chest')) list.push('chest');
  if (m.includes('tricep')) list.push('triceps');
  if (m.includes('bicep')) list.push('biceps');
  if (m.includes('lat') || b.includes('back')) list.push('lats');
  if (m.includes('delt') || b.includes('shoulder')) list.push('deltoids');
  if (list.length === 0) list.push('core');
  return list;
}

function inferUnilateral(name = '') {
  const n = name.toLowerCase();
  return n.includes('one-arm') || n.includes('single') || n.includes('one-leg') || 
         n.includes('lunge') || n.includes('windmill') || n.includes('side bend') || 
         n.includes('side plank') || n.includes('suitcase');
}

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

        const isUnilateral = inferUnilateral(e.name);
        const movement = inferMovementPattern(e.name, e.bodyPart, e.muscle);
        const muscles = inferPrimaryMuscles(e.bodyPart, e.muscle);

        livePool.push({
          id: e.slug || e.id,
          name: e.name,
          group: group,
          target: e.muscle || e.bodyPart,
          primaryMuscles: muscles,
          movement: movement,
          kb: true,
          unilateral: isUnilateral,
          cue: (e.instructions && e.instructions[0]) || 'Execute with clean form and controlled tempo.',
          cueRight: `Right side — ${(e.instructions && e.instructions[0]) || 'Execute with clean form.'}`,
          cueLeft: `Left side — ${(e.instructions && e.instructions[0]) || 'Execute with clean form.'}`,
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

        const isUnilateral = inferUnilateral(e.name);
        const movement = inferMovementPattern(e.name, e.bodyPart, e.muscle);
        const muscles = inferPrimaryMuscles(e.bodyPart, e.muscle);

        livePool.push({
          id: e.slug || e.id,
          name: e.name,
          group: group,
          target: e.muscle || e.bodyPart,
          primaryMuscles: muscles,
          movement: movement,
          kb: false,
          unilateral: isUnilateral,
          cue: (e.instructions && e.instructions[0]) || 'Execute with clean form and controlled tempo.',
          cueRight: `Right side — ${(e.instructions && e.instructions[0]) || 'Execute with clean form.'}`,
          cueLeft: `Left side — ${(e.instructions && e.instructions[0]) || 'Execute with clean form.'}`,
          file: e.file,
          gif: `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/${e.file}`,
          fallbackGif: `https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main/${e.file}`
        });
      });
    }

    if (livePool.length > 50) {
      EXERCISES = livePool;
      console.log(`Exercise database initialized with ${EXERCISES.length} tagged live exercises.`);
    }
  } catch (err) {
    console.warn('Using offline verified exercise catalog:', err);
  }
})();
