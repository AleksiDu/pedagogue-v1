import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface NavBtnProps {
  name: string;
  activeBtn: string;
  onClick: (btnName: string) => void;
}

const NavBtn = (props: NavBtnProps) => {
  const REGISTER_URL = `/registration`;
  const navigate = useNavigate();

  const handleClick = () => {
    const newActiveBtn = props.activeBtn === props.name ? "" : props.name;
    props.onClick(newActiveBtn);
    navigate(newActiveBtn ? REGISTER_URL + `/${newActiveBtn}` : REGISTER_URL);
  };

  const buttonClassName = `${styles.btn} ${styles[props.name]} ${
    props.activeBtn === props.name ? styles.active : ""
  }`;

  return (
    <div className={styles.div}>
      <button className={buttonClassName} onClick={handleClick}>
        {props.name}
      </button>
    </div>
  );
};

export default NavBtn;
