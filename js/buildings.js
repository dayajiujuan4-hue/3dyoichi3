import * as THREE from "three";


export function createBuilding(
  scene,
  x,
  z,
  side
) {

  const group =
    new THREE.Group();


  const height =
    5 +
    Math.random() * 4;


  const material =
    new THREE.MeshStandardMaterial({

      color:
        new THREE.Color()
          .setHSL(
            0.03,
            0.15,
            0.16 +
            Math.random() *
            0.07
          ),

      roughness:
        0.95

    });


  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        6,
        height,
        9
      ),

      material

    );


  building.position.y =
    height / 2;

  building.castShadow =
    true;

  building.receiveShadow =
    true;

  group.add(building);


  /*
    窓
  */

  const windowMaterial =
    new THREE.MeshStandardMaterial({

      color:
        0x7a451e,

      emissive:
        0xff7a20,

      emissiveIntensity:
        Math.random() *
        1.5

    });


  for (
    let y = 1.6;
    y < height - 1;
    y += 1.6
  ) {

    for (
      let zz = -3;
      zz <= 3;
      zz += 2
    ) {

      const window =
        new THREE.Mesh(

          new THREE.PlaneGeometry(
            0.8,
            0.9
          ),

          windowMaterial

        );


      if (
        side === "left"
      ) {

        window.position.set(
          3.01,
          y,
          zz
        );

        window.rotation.y =
          Math.PI / 2;

      } else {

        window.position.set(
          -3.01,
          y,
          zz
        );

        window.rotation.y =
          -Math.PI / 2;

      }


      group.add(window);

    }

  }


  /*
    室外機
  */

  const ac =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.7,
        0.5,
        0.9
      ),

      new THREE.MeshStandardMaterial({
        color: 0x777777
      })

    );


  ac.position.set(

    side === "left"
      ? 3.35
      : -3.35,

    2,

    1

  );


  group.add(ac);


  /*
    排水管
  */

  const pipe =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.06,
        0.06,
        height * 0.8,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x333333
      })

    );


  pipe.position.set(

    side === "left"
      ? 3.25
      : -3.25,

    height * 0.4,

    -3

  );


  group.add(pipe);


  group.position.set(
    x,
    0,
    z
  );


  scene.add(group);

}
