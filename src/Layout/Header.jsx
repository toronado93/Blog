import { Link } from "react-router-dom";
import styles from "./Layout.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="post">
              Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
