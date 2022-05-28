import clsx from "clsx";
import Link from "next/link";
import styles from "./ThumbNav.module.css";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaQuestion } from "react-icons/fa";

const NavLink = ({ children, href, onClick }) => {
  return (
    <li className={clsx(styles.li)}>
      <Link {...{ href }} passHref>
        <a className={clsx(styles.a)}>{children}</a>
      </Link>
    </li>
  );
};

const ThumbNav = () => {
  return (
    <nav className={clsx(styles["nav-container"])}>
      <ul className={clsx(styles.list)}>
        <NavLink href="/">
          <FaMapMarkedAlt className={styles.icon} alt="map" />
          <span className="sa-only">Map</span>
        </NavLink>
        <NavLink href="/favorites">
          <FaMapMarkerAlt className={styles.icon} alt="Stations" />
          <span className="sa-only">Favorites</span>
        </NavLink>
        <NavLink href="/about">
          <FaQuestion className={styles.icon} alt="About" />
          <span className="sa-only">About</span>
        </NavLink>
      </ul>
    </nav>
  );
};

export default ThumbNav;
