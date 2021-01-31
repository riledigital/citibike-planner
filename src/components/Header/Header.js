import React from "react";
import {
  StyledBranding,
  StyledButton,
  StyledHeader,
  StyledNav,
} from "./styles.js";

const Header = ({ toggleModal, toggleSound, soundOn }) => {
  return (
    <StyledHeader>
      <StyledBranding>Citi Bike Planner</StyledBranding>
      <StyledNav>
        <StyledButton onClick={toggleSound}>
          Turn Sound {soundOn ? "Off" : "On"}
        </StyledButton>
        <StyledButton onClick={toggleModal}>Help</StyledButton>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
