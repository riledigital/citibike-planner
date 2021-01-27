import React from 'react';

import StationPopularity from '../StationPopularity/StationPopularity';
const dataStation = {
  short_name: '6926.01',
  station_id: '72',
  name: 'W 52 St & 11 Ave',
  boro_name: 'Manhattan',
  nta_name: 'Clinton',
  rank_perc: 0.14,
  stations_in_nta: 14,
  rank: 2,
};

export default {
  title: 'StationPopularity',
  component: StationPopularity,
};

const Template = (args) => <StationPopularity {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  ...dataStation,
};

export const Loading = Template.bind({});
Loading.args = {};
