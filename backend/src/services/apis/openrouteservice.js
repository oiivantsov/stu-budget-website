"use strict";

import axios from "axios";


const geocode = axios.create({
  baseURL: "https://api.openrouteservice.org/geocode"
});

export async function getCoordinates(street, city) {
  return geocode.get("/search/structured", {
    params: {
      api_key: process.env.ORS_API_KEY,
      address: street,
      locality: city
    }
  }).then(res => {
    const coordinates = res.data.features[0].geometry.coordinates;
    return { lat: coordinates[1], long: coordinates[0] };
  });
}
