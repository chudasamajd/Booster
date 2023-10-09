import React, { useEffect, useContext, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useBoosterContext } from "../context/boosterContext";

const style = {
  wrapper: "w-full h-full text-white bg-white overflow-hidden rounded-lg",
};

mapboxgl.accessToken = String(
  "pk.eyJ1IjoiamRkYzEyIiwiYSI6ImNsZnQ5eTZ6azBkemEza3FybnJxd3N4dzYifQ.JJBeSwVQUysrfyXgjXpbSg"
);

const Map = () => {
  const {
    pickupCoordinates,
    dropoffCoordinates,
    setDistance,
    setDuration,
    setBasePrice,
  } = useBoosterContext();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [78.9629, 20.5937],
      zoom: 4.5,
    });

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates);
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates);
    }

    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: { top: 230, bottom: 290, left: 100, right: 100 },
        animate: 5000,
      });
      getRoute();
    }

    async function getRoute() {
      const response = await fetch("/api/db/getRouteData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupCoordinates: pickupCoordinates,
          dropoffCoordinates: dropoffCoordinates,
        }),
      });
      const data = await response.json();

      if (data.message === "success") {
        const route = data.data.geometry.coordinates;
        setDistance(data.data.distance / 1000);
        setDuration(data.data.duration / 3600);
        setBasePrice(Math.round(data.data.duration));

        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        } else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#000000",
              "line-width": 3,
              "line-opacity": 0.75,
            },
          });
        }
      }
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(map);
  };

  return <div className={style.wrapper} id="map" />;
};

export default Map;
