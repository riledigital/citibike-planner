import React from "react";
import styles from "./Header.module.css";

const Header = ({ toggleModal }) => {
  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <span>Citibike Activity Viewer</span>
      </div>
      <nav className={styles.nav}>
        <button className={styles.help} onClick={toggleModal}>
          Help
        </button>
      </nav>
    </header>
  );
};

export default Header;
