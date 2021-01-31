import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {} from "./styles.js";

// Does this even work? IDK
// import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css";

import { styleDefault, activityMarker } from "./MapStyles";

const Mapbox = ({
  sfxManager,
  handleStationClick,
  stationGeos,
  setLoading,
}) => {
  const [map, setMap] = useState(null);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

  let mapContainer = React.createRef();
  const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;

  useEffect(() => {
    setLoading(true);
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-73.98, 40.75],
      zoom: 14,
      maxBounds: [
        [-74.35890197753906, 40.483515047963024],
        [-73.6907958984375, 40.92285206859968],
      ],
    });
    map.on("load", function () {
      map.loadImage(markerUrl, function (error, img) {
        if (error) throw error;
        map.addImage("custom-marker", img);
        map.addSource("stationSource", {
          type: "geojson",
          data: stationGeos,
        });
        map.addLayer(activityMarker);
      });

      setMap(map);
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );

      map.addControl(
        new mapboxgl.ScaleControl({
          maxWidth: 80,
          unit: "imperial",
        })
      );

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      map.addControl(geolocate);
      // Then add interactions
      // "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",

      map.on("click", function (e) {
        console.info(e);
        handleStationClick(null);
      });

      map.on("click", "stationLayer", function (e) {
        // e.stopPropagation();
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          speed: 1,
          zoom: 16,
        });

        sfxManager?.play("click");
        let feature = e.features[0].properties;
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = `<div id="popup"></div>${e.features[0].properties.name}`;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        const popup = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
        handleStationClick(feature);
      });

      const playThrottled = throttle(() => sfxManager?.play("scrolling"), 100);

      map.on("drag", function (e) {
        playThrottled();
      });

      map.on("zoom", function (e) {
        playThrottled();
      });
    });
    setLoading(false);
    return () => map.remove();
  }, [stationGeos]);

  return (
    <div id="main-map">
      <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
    </div>
  );
};

export default Mapbox;
