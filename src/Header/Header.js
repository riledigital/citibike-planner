import React from "react";
import styles from "./Header.module.css";

const Header = ({ toggleModal, toggleSound, soundOn }) => {
  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <span>Citibike Activity Viewer</span>
      </div>
      <nav className={styles.nav}>
        <button onClick={toggleSound}>
          Toggle Sound {soundOn ? "Off" : "On"}
        </button>
        <button className={styles.help} onClick={toggleModal}>
          Help
        </button>
      </nav>
    </header>
  );
};

export default Header;
