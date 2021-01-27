import React from 'react';
import MapLegend from '../MapLegend/MapLegend';

// This default export determines where your story goes in the story list
export default {
  title: 'Map Legend',
  component: MapLegend,
};

const Template = (args) => <MapLegend data={[0, 1, 2, 3, 4]} {...args} />;

export const Loaded = Template.bind({});

Loaded.args = {
  // data: null,
  // data: [...Array(5).keys()],
};
