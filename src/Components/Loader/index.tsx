import styles from "./styles.module.css";

const Loader = () => {
  const numberOfPages = 18;

  const pages = Array.from({ length: numberOfPages }, (_, index) => (
    <li key={index}></li>
  ));

  return (
    <div className={styles.book}>
      <ul>{pages}</ul>
    </div>
  );
};

export default Loader;
