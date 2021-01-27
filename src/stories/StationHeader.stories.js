import React from 'react';

import StationHeader from '../StationHeader/StationHeader';
const dataStation = {
  short_name: '6560.01',
  rental_url: 'http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=465',
  station_id: '465',
  name: 'Broadway & W 41 St',
  boro_name: 'Manhattan',
  nta_name: 'Midtown-Midtown South',
  rank_perc: 0.69,
};

export default {
  title: 'StationHeader',
  component: StationHeader,
};

const Template = (args) => <StationHeader {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  ...dataStation,
};

export const Loading = Template.bind({});
Loading.args = {};
