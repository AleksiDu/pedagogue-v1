import React from "react";
import styles from "./styles.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <h1>Welcome to Pedagogue</h1>
        <p>Learn from professionals</p>
        <a href="/curriculum" className={styles.button}>
          Get Started
        </a>
      </header>
      <section className={styles.features}>
        <div className={styles.feature}>
          <h2>Pedagogue Curriculum</h2>
          <p>Access our curriculum for free.</p>
        </div>
        <div className={styles.feature}>
          <h2>Interactive Learning</h2>
          <p>Learn through interactive exercises and projects.</p>
        </div>
        <div className={styles.feature}>
          <h2>Earn Certifications</h2>
          <p>Earn certifications to showcase your skills.</p>
        </div>
      </section>
      <section className={styles.testimonials}>
        <div className={styles.testimonial}>
          <p>"Pedagogue helped me land my dream University."</p>
          <span>- Aleksi Duluzauri</span>
        </div>
        <div className={styles.testimonial}>
          <p>"The curriculum is well-structured and easy to follow."</p>
          <span>- Archil Zivzivadze</span>
        </div>
      </section>
      <section className={styles.newsletter}>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest news, tips, and resources delivered to your inbox.</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
