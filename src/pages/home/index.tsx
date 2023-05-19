import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Hero from "../../Components/Hero";
import Card from "../../Components/Card";

const Home: React.FC = () => {
  let isDarkMode = false;
  if (localStorage.getItem("isDarkMode") === "true") {
    isDarkMode = true;
  } else {
    isDarkMode = false;
  }

  return (
    <div className={styles.homeContainer}>
      <Hero
        header="Welcome to Pedagogue"
        paragraph="Learn from professionals"
        article="Get Started"
        link="/curriculum"
      />
      <section className={styles.features}>
        <Card
          className={styles.feature}
          header={"Pedagogue Curriculum"}
          paragraph={"Access our curriculum for free."}
        />
        <Card
          className={styles.feature}
          header={"Interactive Learning"}
          paragraph={"Learn through interactive exercises and projects."}
        />
        <Card
          className={styles.feature}
          header={"Earn Certifications"}
          paragraph={"Earn certifications to showcase your skills."}
        />
      </section>
      <section className={styles.testimonials}>
        <Card
          className={
            styles.testimonial + ` ${isDarkMode ? styles.darkMode : ""}`
          }
          paragraph="Pedagogue helped me land my dream University."
          author="- Aleksi Duluzauri"
        />
        <Card
          className={
            styles.testimonial + ` ${isDarkMode ? styles.darkMode : ""}`
          }
          paragraph="The curriculum is well-structured and easy to follow."
          author="- Archil Zivzivadze"
        />
      </section>
      <section className={styles.newsletter}>
        <Card
          className={styles.feature}
          header={"Subscribe to Our Newslette"}
          paragraph={
            "Get the latest news, tips, and resources delivered to your inbox."
          }
        />
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
