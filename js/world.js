import * as THREE from "three";

import {
  createStall
} from "./stalls.js";

import {
  createBuilding
} from "./buildings.js";

import {
  createNPC
} from "./npcs.js";


export function createWorld(
  scene
) {

  createLighting(scene);

  createGround(scene);

  createBuildings(scene);

  createStalls(scene);

  createLanternStreet(scene);

  createNPCs(scene);

  createGate(scene);

}


/* ======================
   LIGHT
====================== */

function createLighting(scene) {

  const ambient =
    new THREE.HemisphereLight(
      0x304070,
      0x140707,
      1.3
    );

  scene.add(ambient);


  const moon =
    new THREE.DirectionalLight(
      0x8899ff,
      1.4
    );

  moon.position.set(
    -15,
    25,
    10
  );

  moon.castShadow = true;

  scene.add(moon);

}


/* ======================
   GROUND
====================== */

function createGround(scene) {

  const geometry =
    new THREE.PlaneGeometry(
      40,
      120
    );

  const material =
    new THREE.MeshStandardMaterial({
      color: 0x181719,
      roughness: 0.72,
      metalness: 0.12
    });

  const ground =
    new THREE.Mesh(
      geometry,
      material
    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.position.z =
    -25;

  ground.receiveShadow =
    true;

  scene.add(ground);


  /*
    夜市中央の道路
  */

  const roadGeometry =
    new THREE.PlaneGeometry(
      10,
      105
    );

  const roadMaterial =
    new THREE.MeshStandardMaterial({
      color: 0x252124,
      roughness: 0.62
    });

  const road =
    new THREE.Mesh(
      roadGeometry,
      roadMaterial
    );

  road.rotation.x =
    -Math.PI / 2;

  road.position.set(
    0,
    0.01,
    -28
  );

  road.receiveShadow =
    true;

  scene.add(road);

}


/* ======================
   BUILDINGS
====================== */

function createBuildings(scene) {

  for (
    let z = 10;
    z > -70;
    z -= 11
  ) {

    createBuilding(
      scene,
      -10,
      z,
      "left"
    );

    createBuilding(
      scene,
      10,
      z - 4,
      "right"
    );

  }

}


/* ======================
   STALLS
====================== */

function createStalls(scene) {

  const foods = [

    "烧烤",
    "小笼包",
    "奶茶",
    "臭豆腐",
    "煎饼",
    "小龙虾",
    "烤冷面",
    "水果"

  ];


  let index = 0;


  for (
    let z = 11;
    z > -65;
    z -= 9
  ) {

    createStall(
      scene,
      -6.7,
      z,
      foods[
        index %
        foods.length
      ]
    );


    createStall(
      scene,
      6.7,
      z - 3,
      foods[
        (index + 3) %
        foods.length
      ]
    );

    index++;

  }

}


/* ======================
   LANTERNS
====================== */

function createLanternStreet(
  scene
) {

  for (
    let z = 15;
    z > -70;
    z -= 6
  ) {

    const cableMaterial =
      new THREE.LineBasicMaterial({
        color: 0x17100c
      });


    const points = [

      new THREE.Vector3(
        -6,
        5,
        z
      ),

      new THREE.Vector3(
        6,
        5,
        z
      )

    ];


    const geometry =
      new THREE.BufferGeometry()
        .setFromPoints(
          points
        );


    const cable =
      new THREE.Line(
        geometry,
        cableMaterial
      );

    scene.add(cable);


    for (
      let x = -5;
      x <= 5;
      x += 2
    ) {

      createLantern(
        scene,
        x,
        4.3,
        z
      );

    }

  }

}


function createLantern(
  scene,
  x,
  y,
  z
) {

  const geometry =
    new THREE.SphereGeometry(
      0.25,
      12,
      8
    );

  geometry.scale(
    1,
    1.35,
    1
  );


  const material =
    new THREE.MeshStandardMaterial({

      color:
        0xff2211,

      emissive:
        0xff1200,

      emissiveIntensity:
        3

    });


  const lantern =
    new THREE.Mesh(
      geometry,
      material
    );

  lantern.position.set(
    x,
    y,
    z
  );

  scene.add(lantern);


  /*
    一部の提灯だけ
    本物の光源を持たせる。

    全部PointLightにすると
    重くなるため。
  */

  if (
    Math.abs(x) < 0.5
  ) {

    const light =
      new THREE.PointLight(
        0xff3515,
        12,
        7,
        2
      );

    light.position.set(
      x,
      y - 0.5,
      z
    );

    scene.add(light);

  }

}


/* ======================
   NPC
====================== */

function createNPCs(scene) {

  const positions = [

    [-2, 8],
    [2, 3],
    [-1, -5],
    [2.5, -11],
    [-2.4, -18],
    [1, -25],
    [-2, -34],
    [2, -42],
    [-1, -51],
    [2.5, -60]

  ];


  positions.forEach(
    (position, i) => {

      createNPC(
        scene,
        position[0],
        position[1],
        i
      );

    }
  );

}


/* ======================
   GATE
====================== */

function createGate(scene) {

  const group =
    new THREE.Group();


  const red =
    new THREE.MeshStandardMaterial({
      color: 0x8f1111,
      roughness: 0.65
    });


  const pillarGeometry =
    new THREE.CylinderGeometry(
      0.45,
      0.55,
      6,
      12
    );


  const left =
    new THREE.Mesh(
      pillarGeometry,
      red
    );

  left.position.set(
    -5,
    3,
    18
  );


  const right =
    left.clone();

  right.position.x =
    5;


  const beam =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        11,
        0.7,
        1
      ),
      red
    );

  beam.position.set(
    0,
    5.4,
    18
  );


  group.add(
    left,
    right,
    beam
  );


  group.traverse(
    object => {

      if (object.isMesh) {

        object.castShadow =
          true;

      }

    }
  );


  scene.add(group);

}
