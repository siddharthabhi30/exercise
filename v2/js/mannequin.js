// mannequin.js — 3D Jointed Mannequin Engine (Three.js)
// Implements strict readability rules:
// 1. Fixed camera per exercise (3/4 view: yaw 35°, pitch 15°; floor pitch 40°; narrow FOV 30°)
// 2. Contact shadow blob on floor tracking hips/feet (zero shadow map overhead)
// 3. Matte lighting: 1 key directional + hemisphere fill
// 4. Color differentiation: Neutral torso, Right limbs warm tint, Left limbs cool tint, Active limbs accent (#f43f5e)
// 5. Dynamic kettlebell: hangs below hand or rests on wrist when forearm points up
// 6. Ghost mannequin: 15% opacity copy of keyframe 0 behind live figure
// 7. Keyframe holds: 180ms hold at ends with cosine ease-in-out
// 8. Plain floor with subtle orientation circle

(function(global) {
  'use strict';

  // Math helpers
  const rad = deg => deg * Math.PI / 180;
  const easeInOut = t => (1 - Math.cos(Math.PI * t)) / 2;

  // Cached Contact Shadow Texture (Soft radial gradient)
  let _shadowTexture = null;
  function getShadowTexture() {
    if (_shadowTexture) return _shadowTexture;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.75)');
    grad.addColorStop(0.35, 'rgba(15, 23, 42, 0.45)');
    grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.12)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    _shadowTexture = new THREE.CanvasTexture(canvas);
    return _shadowTexture;
  }

  // Material Palette (Matte, high contrast, color-coded sides)
  function createPalette(isGhost = false) {
    if (isGhost) {
      const ghostMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.9,
        metalness: 0.0,
        transparent: true,
        opacity: 0.14,
        depthWrite: false
      });
      return {
        body: ghostMat,
        leftLimb: ghostMat,
        rightLimb: ghostMat,
        active: ghostMat,
        joint: ghostMat,
        kb: ghostMat,
        kbHandle: ghostMat
      };
    }

    return {
      // Neutral Body (Pelvis, Torso, Head) — Light Slate
      body: new THREE.MeshStandardMaterial({
        color: 0xdbeafe,
        roughness: 0.85,
        metalness: 0.05
      }),
      // Left Limbs (Cool slate tint)
      leftLimb: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.85,
        metalness: 0.05
      }),
      // Right Limbs (Warm amber/apricot tint for instant side clarity)
      rightLimb: new THREE.MeshStandardMaterial({
        color: 0xfb923c,
        roughness: 0.85,
        metalness: 0.05
      }),
      // Active / Working Limb Accent (Vibrant energetic rose)
      active: new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        roughness: 0.8,
        metalness: 0.1
      }),
      // Joint spheres (Slightly darker pivot tone)
      joint: new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.9,
        metalness: 0.05
      }),
      // Cast Iron Kettlebell
      kb: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.6,
        metalness: 0.4
      }),
      kbHandle: new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.5,
        metalness: 0.5
      })
    };
  }

  // Helper: Create tapered limb segment (capsule mesh with top origin)
  function createLimbMesh(rTop, rBot, len, mat) {
    const group = new THREE.Group();
    const geo = new THREE.CylinderGeometry(rTop, rBot, len, 16);
    geo.translate(0, -len / 2, 0); // Origin at top joint
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);
    group.mesh = mesh;
    return group;
  }

  function createJointSphere(r, mat) {
    const geo = new THREE.SphereGeometry(r, 14, 14);
    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }

  // Build a complete anatomical 3D Mannequin Rig
  function buildMannequinFigure(options = {}) {
    const isGhost = !!options.isGhost;
    const palette = createPalette(isGhost);

    const rig = {
      isGhost,
      palette,
      root: new THREE.Group(),
      pelvisGroup: new THREE.Group(),
      torso: new THREE.Group(),
      chest: new THREE.Group(),
      headGroup: new THREE.Group(),
      // Left Arm
      shoulderL: new THREE.Group(),
      armUpperL: null,
      elbowL: new THREE.Group(),
      armForeL: null,
      handL: new THREE.Group(),
      // Right Arm
      shoulderR: new THREE.Group(),
      armUpperR: null,
      elbowR: new THREE.Group(),
      armForeR: null,
      handR: new THREE.Group(),
      // Left Leg
      hipL: new THREE.Group(),
      legThighL: null,
      kneeL: new THREE.Group(),
      legShinL: null,
      footL: null,
      // Right Leg
      hipR: new THREE.Group(),
      legThighR: null,
      kneeR: new THREE.Group(),
      legShinR: null,
      footR: null,
      // Kettlebell
      kettlebell: null,
      // Contact shadow plane
      shadowPlane: null
    };

    // 1. Root & Pelvis
    rig.root.add(rig.pelvisGroup);

    const pelvisMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.05, 1.2, 16), palette.body);
    rig.pelvisGroup.add(pelvisMesh);

    // 2. Spine & Torso
    rig.torso.position.y = 0.6;
    rig.pelvisGroup.add(rig.torso);

    const spineJoint = createJointSphere(0.95, palette.joint);
    rig.torso.add(spineJoint);

    // 3. Chest (Athletic V-Tapered Thorax)
    rig.chest.position.y = 2.0;
    rig.torso.add(rig.chest);

    const chestGeo = new THREE.CylinderGeometry(2.1, 1.4, 2.9, 16);
    const chestMesh = new THREE.Mesh(chestGeo, palette.body);
    chestMesh.position.y = 1.45;
    rig.chest.add(chestMesh);

    // 4. Head & Neck
    rig.headGroup.position.y = 3.2;
    rig.chest.add(rig.headGroup);

    const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.9, 12), palette.joint);
    neckMesh.position.y = 0.45;
    rig.headGroup.add(neckMesh);

    const headGeo = new THREE.SphereGeometry(1.4, 18, 18);
    const headMesh = new THREE.Mesh(headGeo, palette.body);
    headMesh.position.y = 1.9;
    headMesh.scale.set(0.95, 1.15, 1.05);
    rig.headGroup.add(headMesh);

    // 5. Left Arm (Cool tint)
    rig.shoulderL.position.set(2.2, 2.6, 0);
    rig.chest.add(rig.shoulderL);
    rig.shoulderL.add(createJointSphere(0.8, palette.joint));

    rig.armUpperL = createLimbMesh(0.75, 0.65, 3.0, palette.leftLimb);
    rig.shoulderL.add(rig.armUpperL);

    rig.elbowL.position.y = -3.0;
    rig.armUpperL.add(rig.elbowL);
    rig.elbowL.add(createJointSphere(0.65, palette.joint));

    rig.armForeL = createLimbMesh(0.62, 0.52, 2.7, palette.leftLimb);
    rig.elbowL.add(rig.armForeL);

    rig.handL.position.y = -2.7;
    rig.armForeL.add(rig.handL);
    rig.handL.add(createJointSphere(0.55, palette.joint));

    // 6. Right Arm (Warm tint)
    rig.shoulderR.position.set(-2.2, 2.6, 0);
    rig.chest.add(rig.shoulderR);
    rig.shoulderR.add(createJointSphere(0.8, palette.joint));

    rig.armUpperR = createLimbMesh(0.75, 0.65, 3.0, palette.rightLimb);
    rig.shoulderR.add(rig.armUpperR);

    rig.elbowR.position.y = -3.0;
    rig.armUpperR.add(rig.elbowR);
    rig.elbowR.add(createJointSphere(0.65, palette.joint));

    rig.armForeR = createLimbMesh(0.62, 0.52, 2.7, palette.rightLimb);
    rig.elbowR.add(rig.armForeR);

    rig.handR.position.y = -2.7;
    rig.armForeR.add(rig.handR);
    rig.handR.add(createJointSphere(0.55, palette.joint));

    // 7. Left Leg (Cool tint)
    rig.hipL.position.set(1.05, -0.6, 0);
    rig.pelvisGroup.add(rig.hipL);
    rig.hipL.add(createJointSphere(0.95, palette.joint));

    rig.legThighL = createLimbMesh(0.95, 0.8, 3.7, palette.leftLimb);
    rig.hipL.add(rig.legThighL);

    rig.kneeL.position.y = -3.7;
    rig.legThighL.add(rig.kneeL);
    rig.kneeL.add(createJointSphere(0.8, palette.joint));

    rig.legShinL = createLimbMesh(0.78, 0.62, 3.5, palette.leftLimb);
    rig.kneeL.add(rig.legShinL);

    rig.footL = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 1.8), palette.joint);
    rig.footL.position.set(0, -3.5, 0.35);
    rig.legShinL.add(rig.footL);

    // 8. Right Leg (Warm tint)
    rig.hipR.position.set(-1.05, -0.6, 0);
    rig.pelvisGroup.add(rig.hipR);
    rig.hipR.add(createJointSphere(0.95, palette.joint));

    rig.legThighR = createLimbMesh(0.95, 0.8, 3.7, palette.rightLimb);
    rig.hipR.add(rig.legThighR);

    rig.kneeR.position.y = -3.7;
    rig.legThighR.add(rig.kneeR);
    rig.kneeR.add(createJointSphere(0.8, palette.joint));

    rig.legShinR = createLimbMesh(0.78, 0.62, 3.5, palette.rightLimb);
    rig.kneeR.add(rig.legShinR);

    rig.footR = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 1.8), palette.joint);
    rig.footR.position.set(0, -3.5, 0.35);
    rig.legShinR.add(rig.footR);

    // 9. Kettlebell
    rig.kettlebell = new THREE.Group();
    const bellBall = new THREE.Mesh(new THREE.SphereGeometry(1.05, 20, 20), palette.kb);
    rig.kettlebell.add(bellBall);

    const handleMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.15, 10, 20, Math.PI),
      palette.kbHandle
    );
    handleMesh.position.y = 0.9;
    handleMesh.rotation.z = -Math.PI;
    rig.kettlebell.add(handleMesh);
    rig.root.add(rig.kettlebell);
    rig.kettlebell.visible = false;

    // 10. Contact Shadow Blob (under live figure only)
    if (!isGhost) {
      const shadowPlaneGeo = new THREE.PlaneGeometry(7.5, 7.5);
      const shadowPlaneMat = new THREE.MeshBasicMaterial({
        map: getShadowTexture(),
        transparent: true,
        opacity: 0.65,
        depthWrite: false
      });
      rig.shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
      rig.shadowPlane.rotation.x = -Math.PI / 2;
      rig.shadowPlane.position.y = 0.02;
    }

    return rig;
  }

  // =========================================================================
  // CAMERA CONFIGURATION SYSTEM (Rule 1)
  // =========================================================================
  function getCameraConfig(ex) {
    // Default 3/4 view: yaw 35°, pitch 15°
    let yaw = 35;
    let pitch = 15;
    let distance = 30;
    let targetY = 4.2;

    const isLyingOrPlank = ex.frames.some(f => {
      const t = f.pose.torso || 0;
      return t <= -60 || t >= 70;
    });

    if (isLyingOrPlank || ex.floor) {
      // Floor exercises (lying, plank, bridge): pitch 40° for clear floor view
      pitch = 40;
      distance = 28;
      targetY = 2.0;
    }

    // Per-exercise camera override if supplied
    if (ex.camera) {
      if (typeof ex.camera.yaw === 'number') yaw = ex.camera.yaw;
      if (typeof ex.camera.pitch === 'number') pitch = ex.camera.pitch;
      if (typeof ex.camera.distance === 'number') distance = ex.camera.distance;
      if (typeof ex.camera.targetY === 'number') targetY = ex.camera.targetY;
    }

    return { yaw, pitch, distance, targetY };
  }

  function setCameraToConfig(camera, cfg) {
    const yawRad = rad(cfg.yaw);
    const pitchRad = rad(cfg.pitch);

    const x = cfg.distance * Math.cos(pitchRad) * Math.sin(yawRad);
    const y = cfg.targetY + cfg.distance * Math.sin(pitchRad);
    const z = cfg.distance * Math.cos(pitchRad) * Math.cos(yawRad);

    camera.position.set(x, y, z);
    camera.lookAt(0, cfg.targetY, 0);
  }

  // =========================================================================
  // POSE INTERPOLATION & MOTION SYSTEM (Rules 4, 5, 7)
  // =========================================================================

  // Interpolate pose with 180ms hold at keyframe ends
  function evaluateCycle(frames, timeElapsed, holdMs = 180) {
    const totalDuration = frames.reduce((sum, f) => sum + (f.ms || 700), 0);
    let t = timeElapsed % totalDuration;
    let idx = 0;

    while (t > (frames[idx].ms || 700)) {
      t -= (frames[idx].ms || 700);
      idx++;
    }

    const frameA = frames[idx];
    const frameB = frames[(idx + 1) % frames.length];
    const frameMs = frameA.ms || 700;

    // Hold at keyframe ends
    let k = 0;
    if (t > holdMs) {
      const activeMs = Math.max(1, frameMs - holdMs);
      const ratio = Math.min(1, (t - holdMs) / activeMs);
      k = easeInOut(ratio);
    }

    const pA = frameA.pose;
    const pB = frameB.pose;

    const lerpVal = (a, b) => (a || 0) + ((b || 0) - (a || 0)) * k;
    const lerpArr = (a, b) => {
      const vA = a || [0, 0];
      const vB = b || [0, 0];
      return [vA[0] + (vB[0] - vA[0]) * k, vA[1] + (vB[1] - vA[1]) * k];
    };

    return {
      torso: lerpVal(pA.torso, pB.torso),
      lift: lerpVal(pA.lift, pB.lift),
      armF: lerpArr(pA.armF, pB.armF),
      armB: lerpArr(pA.armB || pA.armF, pB.armB || pB.armF),
      legF: lerpArr(pA.legF, pB.legF),
      legB: lerpArr(pA.legB || pA.legF, pB.legB || pB.legF),
      kb: k < 0.5 ? pA.kb : pB.kb,
      active: k < 0.5 ? pA.active : pB.active
    };
  }

  // Apply resolved pose to 3D rig
  function applyPoseToFigure(rig, pose, ex, options = {}) {
    const isMirrored = !!options.mirrored;
    const isSide = ex.view === 'side';

    const torsoAngle = pose.torso || 0;
    const lift = pose.lift || 0;

    const armF = pose.armF || [0, 0];
    const armB = pose.armB || armF;
    const legF = pose.legF || [0, 0];
    const legB = pose.legB || legF;

    // Assign limbs based on side / mirror:
    // In side view, F is near (Right), B is far (Left)
    // In front view, F is right, B is left
    const armR = isMirrored ? armB : armF;
    const armL = isMirrored ? armF : armB;
    const legR = isMirrored ? legB : legF;
    const legL = isMirrored ? legF : legB;

    // Reset base rotations
    rig.pelvisGroup.rotation.set(0, 0, 0);
    rig.torso.rotation.set(0, 0, 0);
    rig.chest.rotation.set(0, 0, 0);

    if (isSide) {
      // Sagittal plane movements (Pitch around X-axis)
      // Torso lean
      rig.torso.rotation.x = rad(torsoAngle);

      // Legs (Pitch)
      rig.hipR.rotation.x = -rad(legR[0]);
      rig.hipR.rotation.z = 0;
      rig.kneeR.rotation.x = -rad(legR[1] - legR[0]);

      rig.hipL.rotation.x = -rad(legL[0]);
      rig.hipL.rotation.z = 0;
      rig.kneeL.rotation.x = -rad(legL[1] - legL[0]);

      // Arms (Pitch) — compensate torso parent rotation so arm angle is absolute
      rig.shoulderR.rotation.x = rad(armR[0]) - rad(torsoAngle);
      rig.shoulderR.rotation.z = -rad(4);
      rig.elbowR.rotation.x = rad(armR[1] - armR[0]);

      rig.shoulderL.rotation.x = rad(armL[0]) - rad(torsoAngle);
      rig.shoulderL.rotation.z = rad(4);
      rig.elbowL.rotation.x = rad(armL[1] - armL[0]);

    } else {
      // Frontal / Lateral / Rotational movements
      // Side bends: lateral roll around Z
      if (ex.id === 'side_bend' || ex.id === 'kb_windmill' || ex.id === 'side_plank_dips') {
        rig.torso.rotation.z = -rad(torsoAngle * 0.7);
      } else if (ex.id === 'russian_twist' || ex.id === 'kb_russian_twist') {
        // Russian Twist: rotation around spine Yaw (Y-axis)
        const twistYaw = (armF[0] > 0 ? 32 : -32);
        rig.torso.rotation.y = rad(twistYaw);
      }

      // Arms (Flared out to side via Z-axis abduction)
      rig.shoulderR.rotation.z = rad(armR[0]);
      rig.shoulderR.rotation.x = 0;
      rig.elbowR.rotation.z = rad(armR[1] - armR[0]);

      rig.shoulderL.rotation.z = -rad(armL[0]);
      rig.shoulderL.rotation.x = 0;
      rig.elbowL.rotation.z = -rad(armL[1] - armL[0]);

      // Legs (Stance width)
      rig.hipR.rotation.z = rad(legR[0]);
      rig.kneeR.rotation.z = rad(legR[1] - legR[0]);

      rig.hipL.rotation.z = -rad(legL[0]);
      rig.kneeL.rotation.z = -rad(legL[1] - legL[0]);
    }

    // Ground Alignment & Pelvis Height Calculation
    if (torsoAngle <= -60) {
      // Lying on back (Crunches, Glute Bridges, Dead Bug)
      rig.pelvisGroup.position.set(0, 1.1 + (lift * 0.15), 0);
      rig.pelvisGroup.rotation.x = rad(torsoAngle + 90);
    } else if (torsoAngle >= 75 && isSide) {
      // Horizontal Plank / Push-up position
      rig.pelvisGroup.position.set(0, 2.6 + (lift * 0.15), 0);
      rig.pelvisGroup.rotation.x = rad(75);
    } else {
      // Standing / Squatting / Lunging
      const squatKnee = Math.max(0, legR[0], legL[0]);
      const squatDepth = Math.sin(rad(squatKnee)) * 2.6;
      rig.pelvisGroup.position.set(0, 7.6 - squatDepth + (lift * 0.18), 0);
      rig.pelvisGroup.rotation.x = 0;
    }

    // Shadow blob tracking (Hips & ground proximity)
    if (rig.shadowPlane) {
      rig.shadowPlane.position.x = rig.pelvisGroup.position.x;
      rig.shadowPlane.position.z = rig.pelvisGroup.position.z;

      // When jumping or higher off floor, shadow scales down and softens
      const height = rig.pelvisGroup.position.y;
      const heightFactor = Math.max(0.3, 1 - (height - 7.6) * 0.08);
      rig.shadowPlane.scale.set(heightFactor, heightFactor, heightFactor);
      rig.shadowPlane.material.opacity = Math.max(0.2, 0.65 * heightFactor);
    }

    // Active Limb Color Coding (Rule 4)
    if (!rig.isGhost) {
      const activeLimbs = pose.active || (ex.sides ? ['r_arm'] : []);
      const isRArmActive = activeLimbs.includes('r_arm') || pose.kb === 'F' || pose.kb === 'both';
      const isLArmActive = activeLimbs.includes('l_arm') || pose.kb === 'B' || pose.kb === 'both';

      rig.armUpperR.mesh.material = isRArmActive ? rig.palette.active : rig.palette.rightLimb;
      rig.armForeR.mesh.material  = isRArmActive ? rig.palette.active : rig.palette.rightLimb;

      rig.armUpperL.mesh.material = isLArmActive ? rig.palette.active : rig.palette.leftLimb;
      rig.armForeL.mesh.material  = isLArmActive ? rig.palette.active : rig.palette.leftLimb;
    }

    // Kettlebell Positioning (Rule 5)
    if (ex.kb && pose.kb) {
      rig.kettlebell.visible = true;

      // Determine active holding hand
      let handGroup = rig.handR;
      let foreGroup = rig.armForeR;
      if (pose.kb === 'B') {
        handGroup = rig.handL;
        foreGroup = rig.armForeL;
      }

      // World position of holding hand
      const handPos = new THREE.Vector3();
      handGroup.getWorldPosition(handPos);

      // Check if forearm is pointing upward (Press, Front Rack)
      const forePos = new THREE.Vector3();
      foreGroup.getWorldPosition(forePos);
      const isForearmUp = (handPos.y - forePos.y) > 0.8;

      if (isForearmUp) {
        // Rests on posterior of wrist / forearm
        rig.kettlebell.position.set(handPos.x - 0.2, handPos.y - 0.2, handPos.z - 0.7);
      } else {
        // Hangs directly below hand
        rig.kettlebell.position.set(handPos.x, handPos.y - 1.2, handPos.z);
      }
    } else {
      rig.kettlebell.visible = false;
    }
  }

  // =========================================================================
  // SCENE CREATION (Floor, Lighting, Matte materials)
  // =========================================================================
  function createStudioScene(ex) {
    const scene = new THREE.Scene();

    // Subtle dark gym aesthetic background
    scene.background = new THREE.Color(0x0f1117);

    // 1. Hemisphere Light (Soft ambient sky/ground fill — Rule 3)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.75);
    scene.add(hemiLight);

    // 2. Directional Key Light (Above-front — Rule 3)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.15);
    keyLight.position.set(12, 22, 16);
    scene.add(keyLight);

    // Subtle rim backlight
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    rimLight.position.set(-12, 14, -16);
    scene.add(rimLight);

    // 3. Plain Floor with Subtle Orientation Circle (Rule 8)
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x14161f,
      roughness: 0.9,
      metalness: 0.05
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    scene.add(floorMesh);

    // Subtle orientation ring
    const ringGeo = new THREE.RingGeometry(5.8, 5.95, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x242838, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    scene.add(ringMesh);

    // 4. Ghost Mannequin (15% opacity start pose — Rule 6)
    const ghost = buildMannequinFigure({ isGhost: true });
    scene.add(ghost.root);

    // 5. Live Mannequin Figure
    const live = buildMannequinFigure({ isGhost: false });
    scene.add(live.root);

    // Add contact shadow plane to scene
    if (live.shadowPlane) {
      scene.add(live.shadowPlane);
    }

    // Set Ghost to Keyframe 0 Pose
    if (ex.frames && ex.frames.length > 0) {
      applyPoseToFigure(ghost, ex.frames[0].pose, ex);
    }

    return { scene, live, ghost };
  }

  // Export to global scope
  global.MannequinStudio = {
    getCameraConfig,
    setCameraToConfig,
    evaluateCycle,
    applyPoseToFigure,
    createStudioScene,
    buildMannequinFigure
  };

})(window);
