import React from "react";
import styles from "./styles.module.css";
import Card from "../Card";

const Footer: React.FC = () => {
  const contact = [
    { id: "1", text: "Facebook" },
    { id: "2", text: "LinkedIn" },
    { id: "3", text: "Email" },
  ];

  return (
    <footer className={styles.footer}>
      <section className={styles.container}>
        <Card
          className={styles.column}
          header="About"
          paragraph="Pedagogue is a nonprofit organization that consists of an
            interactive learning platform."
        />
        <Card className={styles.column} header="Contact" items={contact} />
        <Card className={styles.column} header="Support" paragraph="Help us." />
      </section>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Pedagogue. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
