import React from "react";

import StationInfo from "../StationInfo";
const dataStation = {
  short_name: "6560.01",
  rental_url: "http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=465",
  station_id: "465",
  name: "Broadway & W 41 St",
  boro_name: "Manhattan",
  nta_name: "Midtown-Midtown South",
  rank_perc: 0.6944444444444444,
};
const dataStatus = {
  is_renting: 1,
  station_id: "72",
  legacy_id: "72",
  is_returning: 1,
  is_installed: 1,
  last_reported: 1602959936,
  num_docks_available: 52,
  num_ebikes_available: 0,
  eightd_has_available_keys: false,
  num_bikes_disabled: 2,
  station_status: "active",
  num_docks_disabled: 0,
  num_bikes_available: 1,
};

const dataNow = new Date();

export default {
  title: "Station/StationInfo",
  component: StationInfo,
};
const Template = (args) => <StationInfo {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  station: dataStation,
  status: dataStatus,
  lastUpdated: dataNow,
};
