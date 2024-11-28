"use strict";

import { getDistanceBetweenCoords } from "../../src/utils/distanceBetweenCoords.js";



const distanceFunc = getDistanceBetweenCoords(
  {
    lat: 60.169396801380366,
    long: 24.94076203380381
  },
  {
    lat: 60.19047524533416,
    long: 24.908944696622758
  }
);

const distanceManual = 2900;

console.log(`Function: ${distanceFunc} m`);
console.log(`Manual: ${distanceManual} m`);
