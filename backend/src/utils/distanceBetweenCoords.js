"use strict";

import { objectMap } from "./objectMap.js";


export const getDistanceBetweenCoords = (a_coords, b_coords) => {
    /*
    * Calculates distnace between two points on earth using the Haversine forumula.
    * 
    * r_at_eq: Radius of earth at the equator in metres.
    * r_at_pole: Radius of earth at the poles in metres.
    * a_coords_rad: Coordinates of point A converted to radians.
    * b_coords_rad: Coordinates of point B converted to radians.
    */

    //const r_at_eq = 6378000;
    const r_at_pole = 6357000;
    const a_coords_rad = objectMap(a_coords, coord => coord * Math.PI / 180);
    const b_coords_rad = objectMap(b_coords, coord => coord * Math.PI / 180);


    const square_root = Math.sqrt(Math.sin((b_coords_rad.lat - a_coords_rad.lat) / 2) ** 2 + Math.cos(a_coords_rad.lat) * Math.cos(b_coords_rad.lat) * Math.sin((b_coords_rad.long - a_coords_rad.long) / 2) ** 2);

    const d_pole = 2 * r_at_pole * Math.asin(square_root);
    //const d_eq = 2 * r_at_eq * Math.asin(square_root);

    return d_pole;
};
