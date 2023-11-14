import clsx from "clsx";
import Link from "next/link";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaQuestion } from "react-icons/fa";

import styles from "./ThumbNav.module.css";

const NavLink = ({ children, href, label }) => {
  return (
    <li className={clsx(styles.li)}>
      <Link {...{ href }} passHref className={clsx(styles.a)} legacyBehavior>
        {children}
      </Link>
      <span className="sa-only">{label}</span>
    </li>
  );
};

const ThumbNav = () => {
  return (
    <nav className={clsx(styles["nav-container"])}>
      <ul className={clsx(styles.list)}>
        <NavLink href="/" label="Map">
          <FaMapMarkedAlt className={styles.icon} alt="map" />
        </NavLink>
        <NavLink href="/favorites" label="Favorites">
          <FaMapMarkerAlt className={styles.icon} alt="Stations" />
        </NavLink>
        <NavLink href="/about" label="About">
          <FaQuestion className={styles.icon} alt="About" />
        </NavLink>
      </ul>
    </nav>
  );
};

export default ThumbNav;
