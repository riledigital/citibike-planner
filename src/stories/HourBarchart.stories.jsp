import React from "react";
import HourBarChart from "./../HourBarChart";
import data from "../data/aggs_by_hour.json";
// This default export determines where your story goes in the story list
export default {
  title: "Charts/BarChart",
  component: HourBarChart,
};

const Template = (args) => <HourBarChart {...args} />;

export const BarChartHours = Template.bind({});

BarChartHours.args = {
  /* the args you need here will depend on your component */
  data: data["72"],
  width: 400,
  height: 200,
  fill: "white",
};
