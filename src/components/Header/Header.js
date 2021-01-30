import React from "react";
import styles from "./Header.module.css";
import { StyledBranding, StyledButton, StyledHeader } from "./styles.js";

const Header = ({ toggleModal, toggleSound, soundOn }) => {
  return (
    <StyledHeader>
      <StyledBranding>
        <span>Citi Bike Planner</span>
      </StyledBranding>
      <nav className={styles.nav}>
        <StyledButton onClick={toggleSound}>
          Turn Sound {soundOn ? "Off" : "On"}
        </StyledButton>
        <StyledButton onClick={toggleModal}>Help</StyledButton>
      </nav>
    </StyledHeader>
  );
};

export default Header;
