import clsx from "clsx";
import Link from "next/link";
import styles from "./ThumbNav.module.css";

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
        <NavLink href="/">Map</NavLink>
        <NavLink href="/favorites">Stations</NavLink>
        <NavLink href="/about">About</NavLink>
      </ul>
    </nav>
  );
};

export default ThumbNav;
