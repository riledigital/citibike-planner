export const styleDefault = {
  id: "stationLayer",
  type: "symbol",
  source: "stationSource",
  layout: {
    "icon-image": "custom-marker",
    "icon-allow-overlap": true,
  },
};

export const activityMarker = {
  id: "stationLayer",
  type: "circle",
  source: "stationSource",
  paint: {
    "circle-radius": {
      base: 1.4,
      stops: [
        [12, 2],
        [22, 180],
      ],
    },
    "circle-color": [
      "interpolate-lab",
      ["linear"],
      ["get", "rank_perc"],
      0,
      "white",
      1.0,
      "blue",
    ],
  },
};
