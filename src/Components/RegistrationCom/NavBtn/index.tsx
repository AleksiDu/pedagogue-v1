import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const NavBtn = (props: { name: string }) => {
  const REGISTER_URL = `/registration`;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(REGISTER_URL + `/${props.name}`);
  };

  return (
    <div className={styles.div}>
      <button className={styles.btn} onClick={handleClick}>
        {props.name}
      </button>
    </div>
  );
};

export default NavBtn;
