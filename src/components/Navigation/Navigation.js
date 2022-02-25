import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.active} ${styles.navigation__a}`
            : styles.navigation__a
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.active} ${styles.navigation__a}`
            : styles.navigation__a
        }
        to="/create-contact"
      >
        Create contact
      </NavLink>
    </nav>
  );
};
export default Navigation;
