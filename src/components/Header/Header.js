import React from "react";
import {
  StyledBranding,
  StyledToggleMenu,
  StyledHeader,
  StyledNav,
} from "./styles.js";

const Header = ({ toggleModal, toggleMenu, toggleSound, soundOn }) => {
  return (
    <StyledHeader>
      <StyledBranding>Citi Bike Planner</StyledBranding>
      <StyledToggleMenu onClick={() => toggleMenu()}>Menu</StyledToggleMenu>
    </StyledHeader>
  );
};

export default Header;
