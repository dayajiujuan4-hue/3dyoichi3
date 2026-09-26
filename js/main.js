import * as THREE from "three";

import { createWorld } from "./world.js";
import { createPlayer } from "./player.js";

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x030611);

scene.fog =
  new THREE.FogExp2(
    0x050611,
    0.018
  );

const camera =
  new THREE.PerspectiveCamera(
    65,
    window.innerWidth /
      window.innerHeight,
    0.1,
    200
  );

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.25;

document.body.appendChild(
  renderer.domElement
);


/* =========================
   WORLD
========================= */

createWorld(scene);


/* =========================
   PLAYER
========================= */

const player =
  createPlayer(
    camera,
    renderer.domElement
  );


/* =========================
   START SCREEN
========================= */

const startScreen =
  document.getElementById(
    "startScreen"
  );

const startButton =
  document.getElementById(
    "startButton"
  );

startButton.addEventListener(
  "click",
  () => {

    renderer.domElement
      .requestPointerLock();

  }
);

renderer.domElement.addEventListener(
  "click",
  () => {

    if (
      document.pointerLockElement !==
      renderer.domElement
    ) {

      renderer.domElement
        .requestPointerLock();

    }

  }
);

document.addEventListener(
  "pointerlockchange",
  () => {

    if (
      document.pointerLockElement ===
      renderer.domElement
    ) {

      startScreen.style.display =
        "none";

    } else {

      startScreen.style.display =
        "flex";

    }

  }
);


/* =========================
   LOCATION
========================= */

const locationLabel =
  document.getElementById(
    "location"
  );

function updateLocation() {

  const z =
    camera.position.z;

  if (z > 10) {

    locationLabel.textContent =
      "夜市入口";

  } else if (z > -20) {

    locationLabel.textContent =
      "小吃街";

  } else if (z > -50) {

    locationLabel.textContent =
      "提灯横丁";

  } else {

    locationLabel.textContent =
      "夜市深部";

  }

}


/* =========================
   RESIZE
========================= */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);


/* =========================
   GAME LOOP
========================= */

const clock =
  new THREE.Clock();

function animate() {

  requestAnimationFrame(
    animate
  );

  const delta =
    Math.min(
      clock.getDelta(),
      0.05
    );

  player.update(delta);

  updateLocation();

  renderer.render(
    scene,
    camera
  );

}

animate();
