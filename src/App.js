import React, { useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import './App.css';
import styles from './styles/buttons.module.css';

import { styleDefault, activityMarker } from './MapStyles';

import {Header, Footer, Modal, CircleLegend, StationHeader,LiveStatus, StationActivity, StationPopularity,MapLegend} from './components';
import Audio from './modules/Audio';
import { throttle } from 'lodash';

// import Ranking from "./Ranking/Ranking";
const App = () => {
    const [map, setMap] = useState(null);
    const [currentStation, setCurrentStation] = useState({});
    const [aggData, setAggData] = useState(null);
    const [stationStatus, setStationStatus] = useState(null);
    const [stationGeo, setStationGeo] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const [ranking, setRanking] = useState({});
    const [soundOn, setSound] = useState(false);
    const [sfx, setSfxManager] = useState(null);

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

    function toggleModal(e) {
        setShowModal(!showModal);
    }

    function getStationRanking(station_id) {
        try {
            let output = stationGeo.features.find(
                (d) => d.properties.station_id === station_id
            );
            return { ...output.properties };
        } catch (e) {
            console.warn('stationGeo not showing');
            console.warn(e);
        }
    }

    function getStationStatus(id) {
        try {
            return stationStatus[id];
        } catch (e) {
            console.error('Oops, stationStatus not loaded');
            console.error(e);
        }
    }

    const handleStationClick = (station) => {
        const queryElement = document.querySelector('#stationHeader');
        if (queryElement) {
            queryElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
        setCurrentStation(station);
    };

    let mapContainer = React.createRef();

    const markerUrl = `${process.env.PUBLIC_URL}/custom_marker.png`;




    useEffect(() => {
        const sfx = new Audio();
        setSfxManager(sfx);
        sfx.play('sfxBike1');
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-73.98, 40.75],
            zoom: 14,
            maxBounds: [
                [-74.35890197753906, 40.483515047963024],
                [-73.6907958984375, 40.92285206859968],
            ],
        });

        setLoading(true);
        // Async load everything
        Promise.allSettled([
            fetch(`${process.env.PUBLIC_URL}/data/aggs_by_hour.json`).then((resp) =>
                resp.json()
            ),
            fetch(
                `${process.env.PUBLIC_URL}/data/station_info.geojson`
            ).then((resp) => resp.json()),
            fetch(
                'https://gbfs.citibikenyc.com/gbfs/en/station_status.json'
            ).then((resp) => resp.json()),
        ]).then((data) => {
            setAggData(data[0].value);
            setStationGeo(data[1].value);

            let allStationsStatus = {};
            const fetchedData = data[2].value;

            fetchedData['data']['stations'].forEach((record) => {
                allStationsStatus[record.station_id] = { ...record };
                return record;
            });

            setLoading(false);
            setStationStatus(allStationsStatus);

            setLastUpdated(new Date(fetchedData['last_updated'] * 1000));


            map.on('load', function () {
                map.loadImage(markerUrl, function (error, img) {
                    if (error) throw error;
                    map.addImage('custom-marker', img);
                    map.addSource('stationSource', {
                        type: 'geojson',
                        data: data[1].value,
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

                const scale = new mapboxgl.ScaleControl({
                    maxWidth: 80,
                    unit: 'imperial',
                });

                map.addControl(scale);

                const playThrottled = throttle(() => sfx.play('scrolling'), 100);
                const geolocate = new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true,
                });
                map.addControl(geolocate);
                map.on('drag', function (e) {
                    playThrottled();
                });

                map.on('zoom', function (e) {
                    playThrottled();
                });
            });
        });

        // "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        map.on('click', 'stationLayer', function (e) {
            sfx.play('click');
            let feature = e.features[0].properties;
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.name;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);

            handleStationClick(feature);
        });

        return () => map.remove();
    }, []);

    useEffect(() => {
        if (sfx) {
            sfx?.mute(!soundOn);
        }
    },
    [sfx, soundOn]);

    return (
        <div className="App" id="stationHeader">
            <Header
                toggleSound={() => setSound(!soundOn)}
                soundOn={soundOn}
                toggleModal={toggleModal}
            />
            <div className="grid-container">
                <div className="App-sidebar">
                    {loading ? (
                        <p>
                            <progress></progress>
                        </p>
                    ) : (
                        <div className="data-viewer">
                            {stationGeo ? <StationHeader {...currentStation} /> : null}
                            {!loading && ranking && stationGeo ? (
                                <StationPopularity
                                    {...getStationRanking(currentStation.station_id)}
                                />
                            ) : null}

                            {aggData ? (
                                <StationActivity
                                    data={aggData ? aggData[currentStation.station_id] : null}
                                    height={150}
                                    fill="white"
                                />
                            ) : null}
                            {stationStatus ? (
                                <LiveStatus {...getStationStatus(currentStation.station_id)} />
                            ) : null}
                        </div>
                    )}

                    <div className="App-sidebar-footer">
                        <Footer />
                    </div>
                </div>

                <div id="main-map">
                    <div ref={(el) => (mapContainer = el)} className="mapContainer" />;
                    <div id="map-legend">
                        <MapLegend />
                    </div>
                </div>
            </div>
            {showModal ? (
                <Modal
                    toggle={toggleModal}
                    soundOn={soundOn}
                    toggleSound={() => setSound(!soundOn)}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default App;
