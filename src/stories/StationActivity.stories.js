import React from 'react';
import StationActivity from './../StationActivity/StationActivity';

import data from '../data/aggs_by_hour.json';
// This default export determines where your story goes in the story list
export default {
    title: 'StationActivity',
    component: StationActivity,
};

const Template = (args) => <StationActivity {...args} />;

export const Loaded = Template.bind({});

Loaded.args = {
    /* the args you need here will depend on your component */
    data: data['72'],
    width: 400,
    height: 200,
    fill: 'blue',
    textFill: 'black',
};

export const Empty = Template.bind({});

Empty.args = {
    /* the args you need here will depend on your component */
    data: null,
    width: 400,
    height: 200,
    fill: 'white',
};
