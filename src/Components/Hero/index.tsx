import styles from "./styles.module.css";

interface HeroProps {
  header: string;
  paragraph: string;
  article: string;
  link: string;
}
const Hero: React.FC<HeroProps> = ({ header, paragraph, article, link }) => {
  return (
    <header className={styles.hero}>
      <h1>{header}</h1>
      <p>{paragraph}</p>
      <a href={link} className={styles.button}>
        {article}
      </a>
    </header>
  );
};

export default Hero;
