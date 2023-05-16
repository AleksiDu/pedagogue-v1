import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";
import { useState } from "react";

import styles from "../../styles/styles.module.css";
import ToggleSwitch from "./Components/ToggleSwitch";
import RadioButton from "./Components/RadioButton";

const SettingsForm = () => {
  const [userName, setUserName] = useState("Aleksi");
  const [errMsg, setErrMsg] = useState("");

  return (
    <div>
      {
        <section className={styles.registrarSection}>
          <p
            // ref={"errRef"}
            className={styles[errMsg ? "err-msg" : "offscreen"]}
            aria-live="assertive"
          >
            {"errMsg"}
          </p>
          <h1>Account Settings for {userName}</h1>
          <form className={styles.registrarForm}>
            <Input
              name={"Username:"}
              id="userName"
              type="text"
              autoComplete="off"
              onChange={() => {
                console.log("settings");
              }}
              value={userName}
              required
            />
            <button>Save</button>
            <span className={styles.toggleSwitch}>
              {"Night Mode: "}
              <ToggleSwitch />
            </span>
            <span className={styles.toggleSwitch}>
              {"Notifications: "}
              <ToggleSwitch />
            </span>

            <span className={styles.toggleSwitch}>
              {"My profile: "}
              <RadioButton />
            </span>
            <span className={styles.toggleSwitch}>
              {"My name: "}
              <RadioButton />
            </span>
            <span className={styles.toggleSwitch}>
              {"My location: "}
              <RadioButton />
            </span>
            <button>Save</button>
          </form>
        </section>
      }
    </div>
  );
};

export default SettingsForm;
