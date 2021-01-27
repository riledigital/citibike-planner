import React from 'react';

import LiveStatus from './../LiveStatus/LiveStatus';

export default {
    title: 'LiveStatus',
    component: LiveStatus,
};

const Template = (args) => <LiveStatus {...args} />;

const statusData = {
    num_bikes_available: 6,
    num_docks_available: 45,
    legacy_id: '72',
    eightd_has_available_keys: false,
    is_renting: 1,
    num_ebikes_available: 0,
    last_reported: 1603052769,
    num_docks_disabled: 0,
    station_id: '72',
    is_returning: 1,
    station_status: 'active',
    is_installed: 1,
    num_bikes_disabled: 4,
};

export const Loaded = Template.bind({});
Loaded.args = {
    ...statusData,
};

export const Empty = Template.bind({});
Empty.args = {};
