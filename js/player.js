import * as THREE from "three";

export function createPlayer(
  camera,
  domElement
) {

  camera.position.set(
    0,
    1.7,
    18
  );

  let yaw = 0;

  let pitch = 0;

  const keys = {};

  document.addEventListener(
    "keydown",
    event => {

      keys[
        event.key.toLowerCase()
      ] = true;

    }
  );

  document.addEventListener(
    "keyup",
    event => {

      keys[
        event.key.toLowerCase()
      ] = false;

    }
  );

  document.addEventListener(
    "mousemove",
    event => {

      if (
        document.pointerLockElement !==
        domElement
      ) return;

      yaw -=
        event.movementX *
        0.002;

      pitch -=
        event.movementY *
        0.002;

      pitch =
        Math.max(
          -1.4,
          Math.min(
            1.4,
            pitch
          )
        );

    }
  );


  function update(delta) {

    camera.rotation.order =
      "YXZ";

    camera.rotation.y =
      yaw;

    camera.rotation.x =
      pitch;


    const speed =
      keys["shift"]
        ? 7
        : 4;


    const forward =
      new THREE.Vector3();

    camera.getWorldDirection(
      forward
    );

    forward.y = 0;

    forward.normalize();


    const right =
      new THREE.Vector3(
        forward.z,
        0,
        -forward.x
      );


    if (keys["w"]) {

      camera.position
        .addScaledVector(
          forward,
          speed * delta
        );

    }

    if (keys["s"]) {

      camera.position
        .addScaledVector(
          forward,
          -speed * delta
        );

    }

    if (keys["a"]) {

      camera.position
        .addScaledVector(
          right,
          -speed * delta
        );

    }

    if (keys["d"]) {

      camera.position
        .addScaledVector(
          right,
          speed * delta
        );

    }


    /*
      夜市の通りから
      出過ぎないようにする
    */

    camera.position.x =
      THREE.MathUtils.clamp(
        camera.position.x,
        -5,
        5
      );

    camera.position.z =
      THREE.MathUtils.clamp(
        camera.position.z,
        -75,
        20
      );

  }


  return {
    update
  };

}
