import React from "react";
import {
  StyledBranding,
  StyledToggleMenu,
  StyledHeader,
  StyledNav,
} from "./styles.js";

const Header = ({ toggleModal, toggleSound, soundOn }) => {
  return (
    <StyledHeader>
      <StyledBranding>Citi Bike Planner</StyledBranding>
      <StyledToggleMenu>Menu</StyledToggleMenu>
    </StyledHeader>
  );
};

export default Header;
