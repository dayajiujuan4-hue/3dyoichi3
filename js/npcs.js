import * as THREE from "three";


export function createNPC(
  scene,
  x,
  z,
  index
) {

  const person =
    new THREE.Group();


  /*
    服
  */

  const colors = [

    0x8f2727,
    0x284d78,
    0x39734d,
    0x8b642a,
    0x704068

  ];


  const clothes =
    new THREE.MeshStandardMaterial({

      color:
        colors[
          index %
          colors.length
        ],

      roughness:
        0.85

    });


  /*
    肌
  */

  const skin =
    new THREE.MeshStandardMaterial({

      color:
        0xd59a72,

      roughness:
        0.8

    });


  /*
    胴体
  */

  const body =
    new THREE.Mesh(

      new THREE.CapsuleGeometry(
        0.3,
        0.65,
        5,
        10
      ),

      clothes

    );

  body.position.y =
    1.15;

  person.add(body);


  /*
    頭
  */

  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.27,
        16,
        12
      ),

      skin

    );

  head.position.y =
    1.95;

  person.add(head);


  /*
    髪
  */

  const hair =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.285,
        16,
        8,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),

      new THREE.MeshStandardMaterial({
        color: 0x18100d
      })

    );


  hair.position.y =
    2.04;

  person.add(hair);


  /*
    腕
  */

  for (
    const side of [-1, 1]
  ) {

    const arm =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          0.08,
          0.55,
          4,
          8
        ),

        skin

      );


    arm.position.set(
      side * 0.38,
      1.2,
      0
    );


    arm.rotation.z =
      side * 0.12;


    person.add(arm);

  }


  /*
    脚
  */

  const pants =
    new THREE.MeshStandardMaterial({
      color: 0x18191c
    });


  for (
    const side of [-1, 1]
  ) {

    const leg =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          0.1,
          0.65,
          4,
          8
        ),

        pants

      );


    leg.position.set(
      side * 0.15,
      0.42,
      0
    );


    person.add(leg);

  }


  person.position.set(
    x,
    0,
    z
  );


  /*
    人によって向きを変える
  */

  person.rotation.y =
    Math.random() *
    Math.PI *
    2;


  person.traverse(
    object => {

      if (object.isMesh) {

        object.castShadow =
          true;

      }

    }
  );


  scene.add(person);

}
