import React from "react";

import Modal from "./../Modal/Modal";

export default {
  title: "Modal",
  component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Show = Template.bind({});
Show.args = {
  user: {},
};
