import React from "react";
import styles from "./styles.module.css";
import Card from "../Card";

const Footer: React.FC = () => {
  const contact = [
    { id: "1", text: "Facebook" },
    { id: "2", text: "LinkedIn" },
    { id: "3", text: "Email" },
  ];

  const donate = [
    { id: "1", text: "BOG" },
    { id: "2", text: "TBC" },
    { id: "3", text: "PayPal" },
  ];

  const socialHandler = (id: string) => {
    const clickedItem = contact.find((item) => item.id === id);
    if (clickedItem) {
      // TODO add links for social
      console.log(clickedItem.text);
    }
  };

  const donateHandler = (id: string) => {
    const clickedItem = donate.find((item) => item.id === id);
    if (clickedItem) {
      // TODO add links for donate
      console.log(clickedItem.text);
    }
  };

  return (
    <footer className={styles.footer}>
      <section className={styles.container}>
        <Card
          className={styles.column}
          header="About"
          paragraph="Pedagogue is a nonprofit organization that consists of an
            interactive learning platform."
        />
        <Card
          className={styles.column}
          header="Contact"
          items={contact}
          cardClass={styles.social}
          onClick={socialHandler}
        />
        <Card
          className={styles.column}
          header="Support"
          items={donate}
          cardClass={styles.social}
          onClick={donateHandler}
        />
      </section>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Pedagogue. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
