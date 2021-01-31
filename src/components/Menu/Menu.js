import React from "react";

import { StyledMenu } from "./styles.js";

const Menu = ({ handleToggleMenu }) => {
  return (
    <StyledMenu>
      <a>Toggle sound</a>
    </StyledMenu>
  );
};

export default Menu;
