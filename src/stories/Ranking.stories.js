import React from "react";
import Ranking from "../Ranking";

const dataStation = {
  short_name: "6560.01",
  rental_url: "http://app.citibikenyc.com/S6Lr/IBV092JufD?station_id=465",
  station_id: "465",
  name: "Broadway & W 41 St",
  boro_name: "Manhattan",
  nta_name: "Midtown-Midtown South",
  rank_perc: 0.6944444444444444,
  rank: 1,
  rank_total: 223,
};

export default {
  title: "Station/Ranking",
  component: Ranking,
};

const Template = (args) => <Ranking {...args} />;

export const Good = Template.bind({});
Good.args = {
  station: dataStation,
};
