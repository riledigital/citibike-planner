export const styleDefault = {
  id: 'stationLayer',
  type: 'symbol',
  source: 'stationSource',
  layout: {
    'icon-image': 'custom-marker',
    'icon-allow-overlap': true,
  },
};

export const cmapBlue = [0, 'blue', 1.0, 'white'];

export const activityMarker = {
  id: 'stationLayer',
  type: 'circle',
  source: 'stationSource',
  paint: {
    'circle-stroke-width': 1,
    'circle-radius': {
      base: 1.4,
      stops: [
        [12, 2],
        [22, 180],
      ],
    },
    'circle-color': [
      'interpolate-lab',
      ['linear'],
      ['get', 'rank_perc'],
      ...cmapBlue,
    ],
  },
};
