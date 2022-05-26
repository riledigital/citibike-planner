import "ol/ol.css";
import styles from "./OpenLayers.module.css";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
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
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentStation,
  setSelectedStationId,
} from "common/store/AppSlice";
import clsx from "clsx";

//openlayers.org/en/latest/examples/vector-layer.html

const zoomToFeature = function zoomToFeature(id, view, vectorSource, popupRef) {
  if (!id) {
    return null;
  }
  const feature = vectorSource.getFeatureById(id);
  const point = feature?.getGeometry();
  const coords = point?.getCoordinates();

  view?.setCenter(coords);
  view?.setZoom(17);

  popupRef?.current?.setPosition(coords);
};

const OpenLayers = (props) => {
  const element = useRef();
  const mapRef = useRef();
  const dispatch = useDispatch();
  const selectedStationId = useSelector(selectCurrentStation);

  const [stationData, setStationData] = useState(null);

  const viewRef = useRef();
  const stationLayer = useRef();
  const vectorSource = useRef();

  const handleFeatureSelect = (e) => {
    // console.log("Selected feature!");
    const data = e?.selected?.at(0)?.values_ ?? {};
    const id = data?.station_id ?? null;
    setStationData(data);
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
    // TODO: Lookup data value
    // const { station_id } = feature.values_;
    return new Style({
      fill,
      stroke,
      image: new Circle({
        fill: fill,
        stroke: stroke,
        radius: 10,
      }),
      text: new Text({
        font: "12px inherit",
        scale: 1.5,
        text: resolution < 2.4 ? feature.get("name") : null,
      }),
    });
  }

  const overlayRef = useRef();
  const popupRef = useRef();

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
      // console.log(viewRef.current.getResolution());
    });

    // Overlay
    popupRef.current = new Overlay({
      element: overlayRef.current,
      positioning: "bottom-center",
      stopEvent: false,
    });

    map.addOverlay(popupRef?.current);

    map.addInteraction(select);

    map.on("singleclick", function (e) {
      // console.log(" :", e);
      // console.log(select);
      // popup.setPosition(e.coordinate);
    });

    mapRef.current = map;
    return () => {
      // Remove the map on unmount
      overlayRef.current = null;
      mapRef.current = null;
    };
  }, [props]);

  useEffect(() => {
    if (selectedStationId) {
      try {
        zoomToFeature(
          selectedStationId,
          viewRef.current,
          vectorSource.current,
          popupRef
        );
      } catch (e) {
        vectorSource.current.once("featuresloadend", () => {
          zoomToFeature(
            selectedStationId,
            viewRef.current,
            vectorSource.current,
            popupRef
          );
        });
      }
    }
  }, [selectedStationId]);

  return (
    <div>
      <div
        ref={overlayRef}
        className={clsx(styles.overlay, selectedStationId ? styles.show : null)}
      ></div>

      <StyledMapElement ref={element} />
    </div>
  );
};

export default OpenLayers;
