import styles from "./styles.module.css";
import Hero from "../../Components/Hero";
import Card from "../../Components/Card";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import Input from "../../Components/RegistrationLoginCom/RegisterForm/Components/Input";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";

const Home: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setLink("/curriculum");
    } else {
      setLink("/registration");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/subscribe", { email });
      console.log(response.data);
      // Reset email field after successful submission
      setEmail("");
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle error
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Hero
        header="Welcome to Pedagogue"
        paragraph="Learn from professionals"
        article="Get Started"
        link={link}
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
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <Input
            placeholder="Enter you email"
            type="email"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <button disabled={!email.includes("@")} type="submit">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
