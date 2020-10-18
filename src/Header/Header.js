import React from "react ";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.branding}>
        <span>Citibike Activity Viewer</span>
      </div>
      <nav className={styles.nav}>
        <span className={styles.help}>Help</span>
      </nav>
    </header>
  );
};

export default Header;
