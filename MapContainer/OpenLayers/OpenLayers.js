import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { bbox } from "ol/loadingstrategy";

// Interactions
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import { singleClick, shiftKeyOnly } from "ol/events/condition";

import { useEffect, useRef, useState } from "react";
import { map } from "lodash";

import { StyledMapElement } from "./styles";
import { Fill, Stroke, Style, Text, Circle } from "ol/style";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStation,
  setSelectedStationId,
} from "@/common/store/AppSlice";

//openlayers.org/en/latest/examples/vector-layer.html

const zoomToFeature = function zoomToFeature(id, view, vectorSource) {
  if (!id) {
    return null;
  }
  const feature = vectorSource.getFeatureById(id);
  const point = feature?.getGeometry();
  const coords = point?.getCoordinates();
  debugger;

  view?.setCenter(coords);
  view?.setZoom(17);
};

const OpenLayers = (props) => {
  const element = useRef();
  const mapRef = useRef();
  const dispatch = useDispatch();
  const selectedStationId = useSelector(selectCurrentStation);

  const viewRef = useRef();
  const stationLayer = useRef();
  const vectorSource = useRef();

  const handleFeatureSelect = (e) => {
    console.log("Selected feature!");
    const id = e?.selected?.at(0)?.values_?.station_id ?? null;

    dispatch(setSelectedStationId(id));
  };

  const fill = new Fill({
    color: "rgba(255, 255, 255, 0.6)",
  });

  const stroke = new Stroke({
    color: "#319FD3",
    width: 1,
  });

  function styleFunction(feature, resolution) {
    return new Style({
      fill,
      stroke,
      image: new Circle({
        fill: fill,
        stroke: stroke,
        radius: 10,
      }),
      text: new Text({
        font: "12rem inherit",
        scale: 1.5,
        text: resolution < 2.4 ? feature.get("name") : null,
      }),
    });
  }

  useEffect(() => {
    viewRef.current = new View({
      projection: "EPSG:3857",
      center: [-73.96923065185547, 40.751678516237334],
      zoom: 12,
      extent: [
        -8254095.437413851,
        4953354.557334871,
        -8219694.931266008,
        4994089.888624159,
      ],
    });

    vectorSource.current = new VectorSource({
      url: "/data/stations-with-nta.geojson",
      format: new GeoJSON(),
      // strategy: bbox,
    });

    // set id/key for all features
    vectorSource.current.on("featuresloadend", () => {
      console.debug("OL featuresloadend");
      vectorSource.current.forEachFeature((feature) => {
        feature.setId(feature.get("station_id"));
      });
    });

    stationLayer.current = new VectorLayer({
      source: vectorSource.current,
      style: styleFunction,
    });

    const map = new Map({
      renderer: "webgl",
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: "CartoDB Voyager",
            url:
              "https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
            tilePixelRatio: 1, // THIS IS IMPORTANT
          }),
        }),
        stationLayer.current,
      ],
      target: element.current,
      view: viewRef.current,
    });
    const select = new Select({
      condition: click,
      style: null,
      toggleCondition: (e) => {
        const cond = shiftKeyOnly(e) && singleClick(e);
        return cond;
      },
    });
    select.on("select", handleFeatureSelect);
    viewRef.current.on("change:resolution", (e) => {
      console.log(viewRef.current.getResolution());
    });
    map.addInteraction(select);

    map.on("singleclick", function (e) {
      console.log(" :", e);
      console.log(select);
    });

    mapRef.current = map;
    return () => {
      // Remove the map on unmount
      mapRef.current = null;
    };
  }, [props]);

  useEffect(() => {
    if (selectedStationId) {
      try {
        zoomToFeature(selectedStationId, viewRef.current, vectorSource.current);
      } catch (e) {
        vectorSource.current.once("featuresloadend", () => {
          zoomToFeature(
            selectedStationId,
            viewRef.current,
            vectorSource.current
          );
        });
      }
    }
  }, [selectedStationId]);

  return <StyledMapElement ref={element} />;
};

export default OpenLayers;
