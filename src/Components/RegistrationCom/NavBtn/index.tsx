import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface NavBtnProps {
  name: string;
}

const NavBtn = (props: NavBtnProps) => {
  const REGISTER_URL = "/registration";
  const navigate = useNavigate();
  const location = useLocation();
  const activeBtn = localStorage.getItem("activeBtn") ?? "";

  const handleClick = () => {
    const newActiveBtn = activeBtn === props.name ? "" : props.name;
    localStorage.setItem("activeBtn", newActiveBtn);
    navigate(newActiveBtn ? `${REGISTER_URL}/${newActiveBtn}` : REGISTER_URL);
  };

  const buttonClassName = `${styles.btn} ${styles[props.name]} ${
    activeBtn === props.name ? styles.active : ""
  }`;

  useEffect(() => {
    if (location.pathname === REGISTER_URL) {
      localStorage.removeItem("activeBtn");
    }

    return () => {
      localStorage.removeItem("activeBtn");
    };
  }, [location]);

  return (
    <div className={styles.div}>
      <button className={buttonClassName} onClick={handleClick}>
        {props.name}
      </button>
    </div>
  );
};

export default NavBtn;
