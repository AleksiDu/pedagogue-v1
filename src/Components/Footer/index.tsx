import React from "react";
import styles from "./styles.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>About</h4>
          <p>
            Pedagogue is a nonprofit organization that consists of an
            interactive learning platform.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Connect</h4>
          <ul>
            <li>Facebook</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Contribute</h4>
          <p>Help us.</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Pedagogue. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
