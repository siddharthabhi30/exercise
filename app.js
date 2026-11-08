// ============================================================
//  WORKOUT TIMER APP
//  Exercise DB · SVG Stick Figure Renderer · Timer · UI
// ============================================================

// ==================== STICK FIGURE POSES ====================
// Each pose is a set of joint coordinates in a 200×300 viewBox.
// The renderer draws: head(circle), spine, arms (shoulder→elbow→hand),
// legs (hip→knee→foot), plus optional props (kettlebell, floor).

const POSES = {
  // ---- Standing variants ----
  stand: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[58,100], rElbow:[142,100],
    lHand:[52,135], rHand:[148,135],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  stand_arms_up: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[62,40], rElbow:[138,40],
    lHand:[70,10], rHand:[130,10],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  stand_arms_front: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[55,72], rElbow:[145,72],
    lHand:[38,72], rHand:[162,72],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  stand_arms_chest: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[60,88], rElbow:[140,88],
    lHand:[78,72], rHand:[122,72],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  curl_up: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[68,95], rElbow:[132,95],
    lHand:[72,68], rHand:[128,68],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  curl_down: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[64,100], rElbow:[136,100],
    lHand:[60,135], rHand:[140,135],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  press_up: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[58,42], rElbow:[142,42],
    lHand:[60,12], rHand:[140,12],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  press_rack: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[60,88], rElbow:[140,88],
    lHand:[64,62], rHand:[136,62],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },

  // ---- Squat ----
  squat_up: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[60,88], rElbow:[140,88],
    lHand:[78,72], rHand:[122,72],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  squat_down: {
    head:[100,68], neck:[100,88], midSpine:[100,125], hip:[100,168],
    lShoulder:[72,100], rShoulder:[128,100],
    lElbow:[58,115], rElbow:[142,115],
    lHand:[76,100], rHand:[124,100],
    lHip:[85,175], rHip:[115,175],
    lKnee:[62,210], rKnee:[138,210],
    lFoot:[55,268], rFoot:[145,268],
  },
  sumo_squat_down: {
    head:[100,68], neck:[100,88], midSpine:[100,125], hip:[100,168],
    lShoulder:[72,100], rShoulder:[128,100],
    lElbow:[58,115], rElbow:[142,115],
    lHand:[76,100], rHand:[124,100],
    lHip:[80,175], rHip:[120,175],
    lKnee:[48,210], rKnee:[152,210],
    lFoot:[40,268], rFoot:[160,268],
  },

  // ---- Lunge ----
  lunge_up: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[58,100], rElbow:[142,100],
    lHand:[52,135], rHand:[148,135],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  lunge_down: {
    head:[100,50], neck:[100,70], midSpine:[100,115], hip:[100,160],
    lShoulder:[72,82], rShoulder:[128,82],
    lElbow:[58,115], rElbow:[142,115],
    lHand:[52,148], rHand:[148,148],
    lHip:[85,165], rHip:[115,165],
    lKnee:[55,210], rKnee:[140,215],
    lFoot:[50,268], rFoot:[165,268],
  },
  side_lunge: {
    head:[100,50], neck:[100,70], midSpine:[100,115], hip:[100,160],
    lShoulder:[72,82], rShoulder:[128,82],
    lElbow:[58,110], rElbow:[142,110],
    lHand:[70,88], rHand:[130,88],
    lHip:[82,165], rHip:[118,165],
    lKnee:[42,210], rKnee:[130,210],
    lFoot:[35,268], rFoot:[130,268],
  },

  // ---- Hinge / Deadlift / Swing ----
  hinge_top: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[62,100], rElbow:[138,100],
    lHand:[56,135], rHand:[144,135],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  hinge_bottom: {
    head:[72,80], neck:[80,95], midSpine:[95,125], hip:[108,158],
    lShoulder:[68,105], rShoulder:[92,105],
    lElbow:[56,130], rElbow:[80,130],
    lHand:[50,160], rHand:[74,160],
    lHip:[100,163], rHip:[118,163],
    lKnee:[96,215], rKnee:[124,215],
    lFoot:[88,268], rFoot:[130,268],
  },
  swing_top: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[60,55], rElbow:[140,55],
    lHand:[76,45], rHand:[124,45],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },

  // ---- Floor exercises ----
  plank: {
    head:[40,125], neck:[55,130], midSpine:[100,140], hip:[145,150],
    lShoulder:[55,135], rShoulder:[55,125],
    lElbow:[42,160], rElbow:[42,150],
    lHand:[40,190], rHand:[40,180],
    lHip:[148,155], rHip:[148,145],
    lKnee:[165,190], rKnee:[165,180],
    lFoot:[180,210], rFoot:[180,200],
    floor: 210,
  },
  pushup_up: {
    head:[38,110], neck:[52,118], midSpine:[100,130], hip:[150,145],
    lShoulder:[50,122], rShoulder:[56,115],
    lElbow:[38,150], rElbow:[38,140],
    lHand:[35,190], rHand:[35,180],
    lHip:[152,150], rHip:[152,140],
    lKnee:[168,180], rKnee:[168,170],
    lFoot:[180,205], rFoot:[180,195],
    floor: 210,
  },
  pushup_down: {
    head:[42,140], neck:[56,145], midSpine:[100,155], hip:[148,165],
    lShoulder:[54,148], rShoulder:[58,142],
    lElbow:[36,165], rElbow:[36,158],
    lHand:[35,190], rHand:[35,183],
    lHip:[150,170], rHip:[150,162],
    lKnee:[166,195], rKnee:[166,188],
    lFoot:[178,210], rFoot:[178,205],
    floor: 210,
  },
  mountain_climber_l: {
    head:[38,115], neck:[52,122], midSpine:[100,135], hip:[150,148],
    lShoulder:[50,126], rShoulder:[56,120],
    lElbow:[38,152], rElbow:[38,145],
    lHand:[35,190], rHand:[35,183],
    lHip:[148,153], rHip:[148,143],
    lKnee:[120,168], rKnee:[168,178],
    lFoot:[100,190], rFoot:[180,205],
    floor: 210,
  },
  mountain_climber_r: {
    head:[38,115], neck:[52,122], midSpine:[100,135], hip:[150,148],
    lShoulder:[50,126], rShoulder:[56,120],
    lElbow:[38,152], rElbow:[38,145],
    lHand:[35,190], rHand:[35,183],
    lHip:[148,153], rHip:[148,143],
    lKnee:[168,178], rKnee:[120,168],
    lFoot:[180,205], rFoot:[100,190],
    floor: 210,
  },

  // ---- Lying / Bridge / Crunch ----
  lying: {
    head:[30,180], neck:[48,180], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,175], rShoulder:[48,185],
    lElbow:[35,168], rElbow:[35,192],
    lHand:[22,162], rHand:[22,198],
    lHip:[155,175], rHip:[155,185],
    lKnee:[185,175], rKnee:[185,185],
    lFoot:[210,175], rFoot:[210,185],
    floor: 200,
  },
  bridge: {
    head:[30,192], neck:[45,188], midSpine:[90,170], hip:[135,155],
    lShoulder:[44,185], rShoulder:[48,192],
    lElbow:[32,178], rElbow:[36,198],
    lHand:[22,175], rHand:[24,202],
    lHip:[140,158], rHip:[140,165],
    lKnee:[165,185], rKnee:[165,192],
    lFoot:[185,200], rFoot:[185,207],
    floor: 210,
  },
  crunch_down: {
    head:[30,175], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,184],
    lElbow:[35,165], rElbow:[35,190],
    lHand:[22,158], rHand:[22,196],
    lHip:[155,175], rHip:[155,185],
    lKnee:[172,155], rKnee:[172,165],
    lFoot:[190,175], rFoot:[190,185],
    floor: 200,
  },
  crunch_up: {
    head:[55,150], neck:[68,158], midSpine:[100,172], hip:[145,180],
    lShoulder:[66,152], rShoulder:[70,164],
    lElbow:[56,144], rElbow:[60,168],
    lHand:[50,138], rHand:[52,174],
    lHip:[150,175], rHip:[150,185],
    lKnee:[172,155], rKnee:[172,165],
    lFoot:[190,175], rFoot:[190,185],
    floor: 200,
  },
  leg_raise_down: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[35,168], rElbow:[35,192],
    lHand:[22,165], rHand:[22,198],
    lHip:[155,175], rHip:[155,185],
    lKnee:[185,175], rKnee:[185,185],
    lFoot:[210,175], rFoot:[210,185],
    floor: 200,
  },
  leg_raise_up: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[35,168], rElbow:[35,192],
    lHand:[22,165], rHand:[22,198],
    lHip:[155,175], rHip:[155,185],
    lKnee:[155,140], rKnee:[155,150],
    lFoot:[155,105], rFoot:[155,115],
    floor: 200,
  },

  // ---- Seated / Russian twist ----
  seated_twist_l: {
    head:[80,95], neck:[88,108], midSpine:[100,140], hip:[108,172],
    lShoulder:[78,115], rShoulder:[100,115],
    lElbow:[58,125], rElbow:[78,125],
    lHand:[48,115], rHand:[68,115],
    lHip:[102,178], rHip:[115,178],
    lKnee:[130,155], rKnee:[140,162],
    lFoot:[155,170], rFoot:[165,178],
    floor: 200,
  },
  seated_twist_r: {
    head:[120,95], neck:[112,108], midSpine:[100,140], hip:[108,172],
    lShoulder:[100,115], rShoulder:[122,115],
    lElbow:[122,125], rElbow:[142,125],
    lHand:[132,115], rHand:[152,115],
    lHip:[102,178], rHip:[115,178],
    lKnee:[130,155], rKnee:[140,162],
    lFoot:[155,170], rFoot:[165,178],
    floor: 200,
  },

  // ---- Side plank ----
  side_plank: {
    head:[42,105], neck:[55,118], midSpine:[100,145], hip:[148,172],
    lShoulder:[50,122], rShoulder:[60,112],
    lElbow:[40,148], rElbow:[48,88],
    lHand:[38,180], rHand:[42,62],
    lHip:[150,178], rHip:[146,168],
    lKnee:[168,200], rKnee:[166,192],
    lFoot:[182,212], rFoot:[180,206],
    floor: 220,
  },

  // ---- Side bend ----
  side_bend_l: {
    head:[78,35], neck:[82,55], midSpine:[92,100], hip:[100,148],
    lShoulder:[62,68], rShoulder:[108,68],
    lElbow:[44,95], rElbow:[118,42],
    lHand:[36,125], rHand:[125,18],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  side_bend_r: {
    head:[122,35], neck:[118,55], midSpine:[108,100], hip:[100,148],
    lShoulder:[92,68], rShoulder:[138,68],
    lElbow:[82,42], rElbow:[156,95],
    lHand:[75,18], rHand:[164,125],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },

  // ---- Calf raise ----
  calf_raise: {
    head:[100,22], neck:[100,42], midSpine:[100,90], hip:[100,138],
    lShoulder:[72,55], rShoulder:[128,55],
    lElbow:[58,90], rElbow:[142,90],
    lHand:[52,125], rHand:[148,125],
    lHip:[88,143], rHip:[112,143],
    lKnee:[84,200], rKnee:[116,200],
    lFoot:[76,258], rFoot:[124,258],
  },

  // ---- High knees ----
  high_knee_l: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[55,85], rElbow:[140,100],
    lHand:[60,65], rHand:[148,135],
    lHip:[88,153], rHip:[112,153],
    lKnee:[75,140], rKnee:[116,210],
    lFoot:[80,170], rFoot:[124,268],
  },
  high_knee_r: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[58,100], rElbow:[145,85],
    lHand:[52,135], rHand:[140,65],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[125,140],
    lFoot:[76,268], rFoot:[120,170],
  },

  // ---- Tricep dip ----
  dip_up: {
    head:[100,60], neck:[100,78], midSpine:[100,115], hip:[100,155],
    lShoulder:[72,88], rShoulder:[128,88],
    lElbow:[55,88], rElbow:[145,88],
    lHand:[42,88], rHand:[158,88],
    lHip:[88,160], rHip:[112,160],
    lKnee:[80,200], rKnee:[120,200],
    lFoot:[65,230], rFoot:[135,230],
    floor: 245,
  },
  dip_down: {
    head:[100,85], neck:[100,102], midSpine:[100,138], hip:[100,175],
    lShoulder:[72,112], rShoulder:[128,112],
    lElbow:[55,105], rElbow:[145,105],
    lHand:[42,88], rHand:[158,88],
    lHip:[88,180], rHip:[112,180],
    lKnee:[80,210], rKnee:[120,210],
    lFoot:[65,240], rFoot:[135,240],
    floor: 245,
  },

  // ---- Halo (KB around head) ----
  halo_l: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[55,42], rElbow:[130,48],
    lHand:[70,22], rHand:[115,28],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },
  halo_r: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[70,48], rElbow:[145,42],
    lHand:[85,28], rHand:[130,22],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },

  // ---- Row (bent over) ----
  row_down: {
    head:[72,80], neck:[80,95], midSpine:[95,125], hip:[108,158],
    lShoulder:[68,105], rShoulder:[92,105],
    lElbow:[56,130], rElbow:[80,130],
    lHand:[50,160], rHand:[74,160],
    lHip:[100,163], rHip:[118,163],
    lKnee:[96,215], rKnee:[124,215],
    lFoot:[88,268], rFoot:[130,268],
  },
  row_up: {
    head:[72,80], neck:[80,95], midSpine:[95,125], hip:[108,158],
    lShoulder:[68,105], rShoulder:[92,105],
    lElbow:[62,98], rElbow:[86,98],
    lHand:[68,108], rHand:[92,108],
    lHip:[100,163], rHip:[118,163],
    lKnee:[96,215], rKnee:[124,215],
    lFoot:[88,268], rFoot:[130,268],
  },

  // ---- Superman ----
  superman_down: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[30,168], rElbow:[30,190],
    lHand:[15,165], rHand:[15,195],
    lHip:[155,175], rHip:[155,185],
    lKnee:[185,175], rKnee:[185,185],
    lFoot:[210,175], rFoot:[210,185],
    floor: 200,
  },
  superman_up: {
    head:[22,162], neck:[38,168], midSpine:[100,178], hip:[150,180],
    lShoulder:[36,165], rShoulder:[40,175],
    lElbow:[20,155], rElbow:[22,168],
    lHand:[8,148], rHand:[10,162],
    lHip:[155,175], rHip:[155,185],
    lKnee:[180,165], rKnee:[180,178],
    lFoot:[200,155], rFoot:[200,168],
    floor: 200,
  },

  // ---- Dead bug ----
  dead_bug_l: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[48,148], rElbow:[35,192],
    lHand:[48,125], rHand:[22,198],
    lHip:[155,175], rHip:[155,185],
    lKnee:[155,155], rKnee:[175,165],
    lFoot:[155,130], rFoot:[195,175],
    floor: 200,
  },
  dead_bug_r: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[35,168], rElbow:[48,162],
    lHand:[22,165], rHand:[48,138],
    lHip:[155,175], rHip:[155,185],
    lKnee:[175,175], rKnee:[155,168],
    lFoot:[195,185], rFoot:[155,142],
    floor: 200,
  },

  // ---- Woodchop ----
  woodchop_low: {
    head:[100,42], neck:[100,60], midSpine:[100,105], hip:[100,150],
    lShoulder:[72,72], rShoulder:[128,72],
    lElbow:[48,110], rElbow:[75,110],
    lHand:[38,145], rHand:[65,145],
    lHip:[88,155], rHip:[112,155],
    lKnee:[78,210], rKnee:[122,210],
    lFoot:[70,268], rFoot:[130,268],
  },
  woodchop_high: {
    head:[100,32], neck:[100,52], midSpine:[100,100], hip:[100,148],
    lShoulder:[72,65], rShoulder:[128,65],
    lElbow:[140,42], rElbow:[155,42],
    lHand:[150,18], rHand:[165,18],
    lHip:[88,153], rHip:[112,153],
    lKnee:[84,210], rKnee:[116,210],
    lFoot:[76,268], rFoot:[124,268],
  },

  // ---- Floor press ----
  floor_press_down: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[35,155], rElbow:[35,200],
    lHand:[48,148], rHand:[48,208],
    lHip:[155,175], rHip:[155,185],
    lKnee:[172,155], rKnee:[172,165],
    lFoot:[190,175], rFoot:[190,185],
    floor: 210,
  },
  floor_press_up: {
    head:[30,178], neck:[48,178], midSpine:[100,180], hip:[150,180],
    lShoulder:[48,172], rShoulder:[48,185],
    lElbow:[48,145], rElbow:[48,210],
    lHand:[48,120], rHand:[48,230],
    lHip:[155,175], rHip:[155,185],
    lKnee:[172,155], rKnee:[172,165],
    lFoot:[190,175], rFoot:[190,185],
    floor: 240,
  },
};


// ==================== SVG RENDERER ====================

function renderStickFigure(poseName, showKB = false) {
  const p = POSES[poseName];
  if (!p) return `<svg viewBox="0 0 200 300"><text x="100" y="150" text-anchor="middle" fill="#888" font-size="14">?</text></svg>`;

  const color = '#16c79a';
  const kbColor = '#f5a623';
  const strokeW = 4;
  const jointR = 4;

  let svg = `<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">`;

  // Floor line
  if (p.floor) {
    svg += `<line x1="5" y1="${p.floor}" x2="215" y2="${p.floor}" stroke="#333" stroke-width="2" stroke-dasharray="6,4"/>`;
  }

  // Helper
  const line = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round"/>`;
  const joint = (a) => `<circle cx="${a[0]}" cy="${a[1]}" r="${jointR}" fill="${color}"/>`;

  // Spine
  svg += line(p.neck, p.midSpine);
  svg += line(p.midSpine, p.hip);

  // Head
  svg += `<circle cx="${p.head[0]}" cy="${p.head[1]}" r="16" fill="none" stroke="${color}" stroke-width="${strokeW}"/>`;

  // Shoulders line
  svg += line(p.lShoulder, p.rShoulder);

  // Left arm
  svg += line(p.lShoulder, p.lElbow);
  svg += line(p.lElbow, p.lHand);
  svg += joint(p.lElbow);

  // Right arm
  svg += line(p.rShoulder, p.rElbow);
  svg += line(p.rElbow, p.rHand);
  svg += joint(p.rElbow);

  // Hips
  svg += line(p.lHip, p.rHip);

  // Left leg
  svg += line(p.lHip, p.lKnee);
  svg += line(p.lKnee, p.lFoot);
  svg += joint(p.lKnee);

  // Right leg
  svg += line(p.rHip, p.rKnee);
  svg += line(p.rKnee, p.rFoot);
  svg += joint(p.rKnee);

  // Hands
  svg += joint(p.lHand);
  svg += joint(p.rHand);
  // Feet
  svg += joint(p.lFoot);
  svg += joint(p.rFoot);

  // Kettlebell
  if (showKB) {
    const kx = (p.lHand[0] + p.rHand[0]) / 2;
    const ky = (p.lHand[1] + p.rHand[1]) / 2;
    svg += `<circle cx="${kx}" cy="${ky + 10}" r="10" fill="${kbColor}" opacity="0.85"/>`;
    svg += `<path d="M${kx - 5},${ky + 2} Q${kx},${ky - 6} ${kx + 5},${ky + 2}" fill="none" stroke="${kbColor}" stroke-width="3" stroke-linecap="round"/>`;
  }

  svg += `</svg>`;
  return svg;
}


// ==================== EXERCISE DATABASE ====================

const EXERCISES = [
  // ======== LEGS — NO KETTLEBELL ========
  { name: 'Bodyweight Squat',  part: 'legs', kb: false, desc: 'Feet shoulder-width, sit back and down', poses: ['squat_up', 'squat_down'] },
  { name: 'Forward Lunge',     part: 'legs', kb: false, desc: 'Step forward, lower back knee', poses: ['lunge_up', 'lunge_down'] },
  { name: 'Jump Squat',        part: 'legs', kb: false, desc: 'Squat then explode upward', poses: ['squat_down', 'stand_arms_up'] },
  { name: 'Calf Raises',       part: 'legs', kb: false, desc: 'Rise onto toes, squeeze at top', poses: ['stand', 'calf_raise'] },
  { name: 'Glute Bridge',      part: 'legs', kb: false, desc: 'Lying, drive hips up', poses: ['crunch_down', 'bridge'] },
  { name: 'Side Lunge',        part: 'legs', kb: false, desc: 'Step wide to side, push back', poses: ['stand', 'side_lunge'] },
  { name: 'High Knees',        part: 'legs', kb: false, desc: 'Run in place, knees to chest', poses: ['high_knee_l', 'high_knee_r'] },
  { name: 'Wall Sit',          part: 'legs', kb: false, desc: 'Back against wall, hold squat', poses: ['squat_down', 'squat_down'] },

  // ======== LEGS — KETTLEBELL ========
  { name: 'Goblet Squat',      part: 'legs', kb: true, desc: 'Hold KB at chest, squat deep', poses: ['squat_up', 'squat_down'] },
  { name: 'KB Lunge',          part: 'legs', kb: true, desc: 'Hold KB, alternate lunges', poses: ['lunge_up', 'lunge_down'] },
  { name: 'KB Swing',          part: 'legs', kb: true, desc: 'Hinge and swing KB to shoulder height', poses: ['hinge_bottom', 'swing_top'] },
  { name: 'KB Deadlift',       part: 'legs', kb: true, desc: 'Hinge at hips, KB between feet', poses: ['hinge_top', 'hinge_bottom'] },
  { name: 'KB Sumo Squat',     part: 'legs', kb: true, desc: 'Wide stance, KB hangs center', poses: ['squat_up', 'sumo_squat_down'] },
  { name: 'KB Calf Raise',     part: 'legs', kb: true, desc: 'Hold KB, rise onto toes', poses: ['stand', 'calf_raise'] },

  // ======== CORE — NO KETTLEBELL ========
  { name: 'Crunch',            part: 'core', kb: false, desc: 'Curl shoulders off floor', poses: ['crunch_down', 'crunch_up'] },
  { name: 'Bicycle Crunch',    part: 'core', kb: false, desc: 'Elbow to opposite knee, alternate', poses: ['crunch_down', 'crunch_up'] },
  { name: 'Plank',             part: 'core', kb: false, desc: 'Hold rigid, straight line', poses: ['plank', 'plank'] },
  { name: 'Mountain Climber',  part: 'core', kb: false, desc: 'Plank, drive knees to chest', poses: ['mountain_climber_l', 'mountain_climber_r'] },
  { name: 'Russian Twist',     part: 'core', kb: false, desc: 'Seated, rotate side to side', poses: ['seated_twist_l', 'seated_twist_r'] },
  { name: 'Leg Raise',         part: 'core', kb: false, desc: 'Lying, raise straight legs', poses: ['leg_raise_down', 'leg_raise_up'] },
  { name: 'Side Plank',        part: 'core', kb: false, desc: 'Hold on one arm — love handles!', poses: ['side_plank', 'side_plank'] },
  { name: 'Dead Bug',          part: 'core', kb: false, desc: 'Lying, extend opposite arm & leg', poses: ['dead_bug_l', 'dead_bug_r'] },

  // ======== CORE — KETTLEBELL ========
  { name: 'KB Russian Twist',  part: 'core', kb: true, desc: 'Seated, twist KB side to side', poses: ['seated_twist_l', 'seated_twist_r'] },
  { name: 'KB Windmill',       part: 'core', kb: true, desc: 'KB overhead, hinge to side', poses: ['side_bend_r', 'side_bend_l'] },
  { name: 'KB Wood Chop',      part: 'core', kb: true, desc: 'Diagonal swing low to high — obliques!', poses: ['woodchop_low', 'woodchop_high'] },
  { name: 'KB Side Bend',      part: 'core', kb: true, desc: 'KB in one hand, lean away — love handles!', poses: ['side_bend_l', 'side_bend_r'] },
  { name: 'KB Sit-up',         part: 'core', kb: true, desc: 'Hold KB at chest, full sit-up', poses: ['crunch_down', 'crunch_up'] },
  { name: 'KB Toe Touch',      part: 'core', kb: true, desc: 'Lying, reach KB to toes', poses: ['leg_raise_down', 'leg_raise_up'] },

  // ======== UPPER BODY — NO KETTLEBELL ========
  { name: 'Push-up',           part: 'upper', kb: false, desc: 'Chest to floor, push back up', poses: ['pushup_up', 'pushup_down'] },
  { name: 'Diamond Push-up',   part: 'upper', kb: false, desc: 'Hands together, tricep focus', poses: ['pushup_up', 'pushup_down'] },
  { name: 'Tricep Dip',        part: 'upper', kb: false, desc: 'Hands on chair, lower and push', poses: ['dip_up', 'dip_down'] },
  { name: 'Pike Push-up',      part: 'upper', kb: false, desc: 'Hips high, press down — shoulders', poses: ['pushup_up', 'pushup_down'] },
  { name: 'Shoulder Tap',      part: 'upper', kb: false, desc: 'Plank, tap opposite shoulder', poses: ['plank', 'plank'] },
  { name: 'Arm Circles',       part: 'upper', kb: false, desc: 'Arms out, circle forward then back', poses: ['stand_arms_front', 'stand_arms_up'] },
  { name: 'Burpee',            part: 'upper', kb: false, desc: 'Squat, jump back, push-up, jump up', poses: ['squat_down', 'pushup_down'] },
  { name: 'Superman',          part: 'upper', kb: false, desc: 'Lying face down, lift arms & legs', poses: ['superman_down', 'superman_up'] },

  // ======== UPPER BODY — KETTLEBELL ========
  { name: 'KB Overhead Press',  part: 'upper', kb: true, desc: 'Press KB from rack to overhead', poses: ['press_rack', 'press_up'] },
  { name: 'KB Bent-Over Row',   part: 'upper', kb: true, desc: 'Hinge, pull KB to chest', poses: ['row_down', 'row_up'] },
  { name: 'KB Bicep Curl',      part: 'upper', kb: true, desc: 'Curl KB to shoulders', poses: ['curl_down', 'curl_up'] },
  { name: 'KB Floor Press',     part: 'upper', kb: true, desc: 'Lying, press KB up', poses: ['floor_press_down', 'floor_press_up'] },
  { name: 'KB Halo',            part: 'upper', kb: true, desc: 'Circle KB around head', poses: ['halo_l', 'halo_r'] },
  { name: 'KB Clean & Press',   part: 'upper', kb: true, desc: 'Swing KB to rack, press overhead', poses: ['hinge_bottom', 'press_up'] },
  { name: 'KB Upright Row',     part: 'upper', kb: true, desc: 'Pull KB up to chin', poses: ['curl_down', 'stand_arms_chest'] },
];


// ==================== APP STATE ====================

let state = {
  parts: ['legs', 'core', 'upper'],
  useKB: true,
  durationMin: 30,
  workSec: 45,
  restSec: 15,

  // Runtime
  workout: [],         // generated exercise list
  currentIdx: 0,
  phase: 'work',       // 'work' | 'rest'
  phaseTime: 0,        // seconds remaining in current phase
  totalTimeLeft: 0,    // total seconds remaining
  totalDuration: 0,    // total seconds originally
  isPaused: false,
  timerInterval: null,
  poseInterval: null,
  currentPoseIdx: 0,   // 0 or 1 for animation
  completedExercises: [],
};


// ==================== AUDIO ====================

let audioCtx = null;
function beep(freq = 880, dur = 0.15, vol = 0.3) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.connect(g); g.connect(audioCtx.destination);
  o.frequency.value = freq;
  g.gain.value = vol;
  o.start(); o.stop(audioCtx.currentTime + dur);
}
function beepWork()  { beep(880, 0.1); setTimeout(() => beep(880, 0.1), 150); setTimeout(() => beep(1100, 0.2), 300); }
function beepRest()  { beep(440, 0.2); }
function beepTick()  { beep(660, 0.05, 0.15); }
function beepDone()  { beep(1100, 0.1); setTimeout(() => beep(1320, 0.1), 150); setTimeout(() => beep(1540, 0.2), 300); }


// ==================== SETUP UI ====================

function togglePart(btn) {
  btn.classList.toggle('active');
  state.parts = [...document.querySelectorAll('[data-part].active')].map(b => b.dataset.part);
}

function toggleKB(btn) {
  document.querySelectorAll('[data-kb]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.useKB = btn.dataset.kb === 'yes';
}

function toggleDuration(btn) {
  document.querySelectorAll('[data-dur]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.durationMin = parseInt(btn.dataset.dur);
}

function toggleTiming(btn) {
  document.querySelectorAll('[data-work]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.workSec = parseInt(btn.dataset.work);
  state.restSec = parseInt(btn.dataset.rest);
}

function startWithDefaults() {
  state.parts = ['legs', 'core', 'upper'];
  state.useKB = true;
  state.durationMin = 30;
  state.workSec = 45;
  state.restSec = 15;
  startWorkout();
}


// ==================== WORKOUT GENERATION ====================

function generateWorkout() {
  // Filter exercises by selected parts and KB preference
  const pool = EXERCISES.filter(e => state.parts.includes(e.part) && e.kb === state.useKB);

  if (pool.length === 0) return [];

  const cycleSec = state.workSec + state.restSec;
  const totalExercises = Math.floor((state.durationMin * 60) / cycleSec);

  // Group by part
  const groups = {};
  state.parts.forEach(p => { groups[p] = pool.filter(e => e.part === p); });

  // Build sequence: rotate in groups of 3 per part
  const workout = [];
  const partOrder = [...state.parts];
  let partIdx = 0;
  let usedPerPart = {};
  state.parts.forEach(p => { usedPerPart[p] = 0; });

  for (let i = 0; i < totalExercises; i++) {
    const part = partOrder[partIdx % partOrder.length];
    const partPool = groups[part];

    if (partPool.length > 0) {
      const exIdx = usedPerPart[part] % partPool.length;
      workout.push({ ...partPool[exIdx] });
      usedPerPart[part]++;
    }

    // Rotate parts every 3 exercises
    if ((i + 1) % 3 === 0) partIdx++;
  }

  // Shuffle within each group of 3 for variety (optional: skip for deterministic order)
  return workout;
}


// ==================== SCREEN MANAGEMENT ====================

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


// ==================== START WORKOUT ====================

function startWorkout() {
  if (state.parts.length === 0) {
    alert('Select at least one body part!');
    return;
  }

  state.workout = generateWorkout();
  if (state.workout.length === 0) {
    alert('No exercises found for your selection.');
    return;
  }

  state.currentIdx = 0;
  state.completedExercises = [];
  state.totalDuration = state.durationMin * 60;
  state.totalTimeLeft = state.totalDuration;
  state.isPaused = false;

  // Show countdown
  showScreen('countdown-screen');
  document.getElementById('first-exercise-name').textContent = state.workout[0].name;

  let count = 5;
  const cdEl = document.getElementById('countdown-number');
  cdEl.textContent = count;

  const cdInterval = setInterval(() => {
    count--;
    if (count > 0) {
      cdEl.textContent = count;
      beepTick();
    } else {
      clearInterval(cdInterval);
      beepWork();
      beginWorkoutTimer();
    }
  }, 1000);
}


// ==================== WORKOUT TIMER ====================

function beginWorkoutTimer() {
  showScreen('workout-screen');
  state.phase = 'work';
  state.phaseTime = state.workSec;
  state.currentPoseIdx = 0;

  updateWorkoutUI();
  startPoseAnimation();

  state.timerInterval = setInterval(() => {
    if (state.isPaused) return;

    state.phaseTime--;
    state.totalTimeLeft--;

    // Beep in last 3 seconds of work phase
    if (state.phase === 'work' && state.phaseTime <= 3 && state.phaseTime > 0) {
      beepTick();
    }

    if (state.phaseTime <= 0) {
      if (state.phase === 'work') {
        // Transition to rest
        state.completedExercises.push(state.workout[state.currentIdx].name);
        state.phase = 'rest';
        state.phaseTime = state.restSec;
        beepRest();
      } else {
        // Transition to next exercise
        state.currentIdx++;
        if (state.currentIdx >= state.workout.length || state.totalTimeLeft <= 0) {
          finishWorkout();
          return;
        }
        state.phase = 'work';
        state.phaseTime = state.workSec;
        state.currentPoseIdx = 0;
        beepWork();
      }
    }

    if (state.totalTimeLeft <= 0) {
      finishWorkout();
      return;
    }

    updateWorkoutUI();
  }, 1000);
}

function startPoseAnimation() {
  if (state.poseInterval) clearInterval(state.poseInterval);
  state.poseInterval = setInterval(() => {
    if (state.isPaused) return;
    if (state.phase === 'work') {
      state.currentPoseIdx = state.currentPoseIdx === 0 ? 1 : 0;
      updateSVG();
    }
  }, 800);
}

function updateWorkoutUI() {
  const ex = state.workout[state.currentIdx];
  const isRest = state.phase === 'rest';

  // Exercise info
  if (isRest) {
    const nextEx = state.workout[state.currentIdx + 1];
    document.getElementById('exercise-name').textContent = 'Rest';
    document.getElementById('exercise-desc').textContent = nextEx ? `Next: ${nextEx.name}` : 'Almost done!';
  } else {
    document.getElementById('exercise-name').textContent = ex.name;
    document.getElementById('exercise-desc').textContent = ex.desc;
  }

  // Counter
  document.getElementById('exercise-counter').textContent =
    `${state.currentIdx + 1} / ${state.workout.length}`;

  // Total timer
  const tMin = Math.floor(state.totalTimeLeft / 60);
  const tSec = state.totalTimeLeft % 60;
  document.getElementById('total-timer').textContent =
    `${tMin}:${String(tSec).padStart(2, '0')}`;

  // Phase badge
  const badge = document.getElementById('phase-badge');
  badge.textContent = isRest ? 'REST' : 'WORK';
  badge.className = 'phase-badge' + (isRest ? ' rest' : '');

  // Phase timer
  document.getElementById('timer-display').textContent = state.phaseTime;

  // Timer ring
  const maxTime = isRest ? state.restSec : state.workSec;
  const frac = state.phaseTime / maxTime;
  const circumference = 2 * Math.PI * 88; // ~553
  const offset = circumference * (1 - frac);
  const ring = document.getElementById('timer-ring-progress');
  ring.style.strokeDashoffset = offset;
  ring.className = 'timer-ring-progress' + (isRest ? ' rest' : '');

  // Progress bar
  const progress = ((state.totalDuration - state.totalTimeLeft) / state.totalDuration) * 100;
  document.getElementById('progress-bar').style.width = `${progress}%`;

  // SVG
  updateSVG();
}

function updateSVG() {
  const container = document.getElementById('svg-container');
  const ex = state.workout[state.currentIdx];

  if (state.phase === 'rest') {
    // Show next exercise preview or rest icon
    const nextEx = state.workout[state.currentIdx + 1];
    if (nextEx) {
      container.innerHTML = renderStickFigure(nextEx.poses[0], nextEx.kb);
    } else {
      container.innerHTML = `<svg viewBox="0 0 200 300"><text x="100" y="150" text-anchor="middle" fill="#e94560" font-size="40">☕</text></svg>`;
    }
    return;
  }

  const poseName = ex.poses[state.currentPoseIdx % ex.poses.length];
  container.innerHTML = renderStickFigure(poseName, ex.kb);
}

function togglePause() {
  state.isPaused = !state.isPaused;
  const btn = document.getElementById('btn-pause');
  btn.textContent = state.isPaused ? '▶ Resume' : '⏸ Pause';
}

function skipExercise() {
  state.completedExercises.push(state.workout[state.currentIdx].name + ' (skipped)');
  state.currentIdx++;
  if (state.currentIdx >= state.workout.length) {
    finishWorkout();
    return;
  }
  state.phase = 'work';
  state.phaseTime = state.workSec;
  state.currentPoseIdx = 0;
  beepWork();
  updateWorkoutUI();
}

function endWorkout() {
  if (confirm('End workout early?')) {
    finishWorkout();
  }
}


// ==================== FINISH ====================

function finishWorkout() {
  clearInterval(state.timerInterval);
  clearInterval(state.poseInterval);
  state.timerInterval = null;
  state.poseInterval = null;

  beepDone();
  showScreen('complete-screen');

  const elapsed = state.totalDuration - state.totalTimeLeft;
  const eMin = Math.floor(elapsed / 60);
  const eSec = elapsed % 60;
  document.getElementById('stat-duration').textContent = `${eMin}:${String(eSec).padStart(2, '0')}`;
  document.getElementById('stat-exercises').textContent = state.completedExercises.length;

  // Rough calorie estimate: ~8-12 cal/min for HIIT
  const cals = Math.round((elapsed / 60) * 10);
  document.getElementById('stat-calories').textContent = `~${cals}`;

  // Exercise log
  const logEl = document.getElementById('exercise-log');
  logEl.innerHTML = state.completedExercises.map((name, i) =>
    `<div class="log-item"><span class="log-num">${i + 1}.</span><span class="log-name">${name}</span></div>`
  ).join('');
}

function resetApp() {
  showScreen('setup-screen');
  state.currentIdx = 0;
  state.workout = [];
  state.completedExercises = [];
  state.isPaused = false;
  document.getElementById('btn-pause').textContent = '⏸ Pause';
}


// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  showScreen('setup-screen');
});
