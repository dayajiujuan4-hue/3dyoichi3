import * as THREE from "three";


export function createStall(
  scene,
  x,
  z,
  name
) {

  const stall =
    new THREE.Group();


  stall.position.set(
    x,
    0,
    z
  );


  /*
    木材
  */

  const wood =
    new THREE.MeshStandardMaterial({
      color: 0x5b2d13,
      roughness: 0.9
    });


  /*
    カウンター
  */

  const counter =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        3.7,
        0.9,
        1.5
      ),
      wood
    );

  counter.position.y =
    0.45;

  counter.castShadow =
    true;

  stall.add(counter);


  /*
    柱
  */

  for (
    const px of [-1.65, 1.65]
  ) {

    const pole =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07,
          0.07,
          2.5,
          8
        ),
        wood
      );

    pole.position.set(
      px,
      1.8,
      0
    );

    stall.add(pole);

  }


  /*
    屋根
  */

  const roofMaterial =
    new THREE.MeshStandardMaterial({

      color:
        Math.random() > 0.5
          ? 0x9d1515
          : 0xc45116,

      roughness: 0.8

    });


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        4.3,
        0.18,
        2.4
      ),
      roofMaterial
    );

  roof.position.y =
    3;

  roof.rotation.z =
    0.03;

  roof.castShadow =
    true;

  stall.add(roof);


  /*
    中国語看板
  */

  const sign =
    createSign(name);

  sign.position.set(
    0,
    2.45,
    -1.21
  );

  stall.add(sign);


  /*
    鍋
  */

  const pan =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.45,
        0.4,
        0.16,
        24
      ),

      new THREE.MeshStandardMaterial({
        color: 0x151515,
        metalness: 0.65,
        roughness: 0.3
      })

    );

  pan.position.set(
    -0.8,
    1,
    -0.45
  );

  stall.add(pan);


  /*
    串焼き
  */

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    createSkewer(
      stall,
      0.2 + i * 0.25,
      1.05,
      -0.55
    );

  }


  /*
    暖色照明
  */

  const lamp =
    new THREE.PointLight(
      0xff9a45,
      16,
      5,
      2
    );

  lamp.position.set(
    0,
    2.4,
    -0.5
  );

  stall.add(lamp);


  scene.add(stall);

}


function createSkewer(
  group,
  x,
  y,
  z
) {

  const stick =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.015,
        0.015,
        0.7,
        6
      ),

      new THREE.MeshStandardMaterial({
        color: 0x8b542a
      })

    );

  stick.rotation.z =
    Math.PI / 2;

  stick.position.set(
    x,
    y,
    z
  );

  group.add(stick);


  for (
    let i = -1;
    i <= 1;
    i++
  ) {

    const meat =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.09,
          8,
          6
        ),

        new THREE.MeshStandardMaterial({
          color: 0xa83b18
        })

      );

    meat.position.set(
      x + i * 0.18,
      y,
      z
    );

    group.add(meat);

  }

}


/*
  Canvasをテクスチャとして使って
  中国語看板を生成する。
*/

function createSign(text) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    512;

  canvas.height =
    128;


  const ctx =
    canvas.getContext("2d");


  ctx.fillStyle =
    "#8f1111";

  ctx.fillRect(
    0,
    0,
    512,
    128
  );


  ctx.strokeStyle =
    "#e6ad47";

  ctx.lineWidth =
    10;

  ctx.strokeRect(
    5,
    5,
    502,
    118
  );


  ctx.fillStyle =
    "#ffd777";

  ctx.font =
    "bold 68px Microsoft YaHei";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    text,
    256,
    68
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;


  const material =
    new THREE.MeshStandardMaterial({

      map:
        texture,

      emissive:
        0x551000,

      emissiveIntensity:
        0.8

    });


  return new THREE.Mesh(

    new THREE.PlaneGeometry(
      3,
      0.75
    ),

    material

  );

}
