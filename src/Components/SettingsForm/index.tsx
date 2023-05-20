import Input from "../RegistrationLoginCom/RegisterForm/Components/Input";
import { useRef, useState } from "react";

import styles from "../../styles/SettingsFormStyles/styles.module.css";
import ToggleSwitch from "./Components/ToggleSwitch";
import RadioButton from "./Components/RadioButton";
import axios from "axios";

interface SettingsFormProps {
  userName: string;
  accessToken: string;
  isDarkMode: boolean;
  onToggleMode: (nightMode: boolean) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  userName,
  accessToken,
  isDarkMode,
  onToggleMode,
}) => {
  const [username, setUsername] = useState(userName);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef<HTMLParagraphElement>(null);

  const handleNightModeToggle = () => {
    onToggleMode(!isDarkMode);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const checkUsernameExists = async (user: string) => {
    try {
      const response = await axios.get("/api/checkUsername", {
        params: { user },
      });

      return response.data.exists;
    } catch (err) {
      console.log("Error checking username:", err);
      return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      setErrMsg("Username already exists. Please choose a different one.");
      return;
    }

    try {
      const response = await axios.put(
        "/api/Authentication/register",
        { user: username },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Username successfully updated
        setErrMsg("");
        // Perform any additional logic or state updates as needed
      }
    } catch (err) {
      console.log("Error updating username:", err);
      setErrMsg("Failed to update username. Please try again.");
    }
  };

  return (
    <div>
      <section className={styles.registrarSection}>
        <p
          ref={errRef}
          className={styles[errMsg ? "err-msg" : "offscreen"]}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Account Settings for {username}</h1>
        <form className={styles.registrarForm} onSubmit={handleFormSubmit}>
          <Input
            name="Username:"
            id="username"
            type="text"
            autoComplete="off"
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <button>Save</button>
          <span className={styles.toggleSwitch}>
            Night Mode:{" "}
            <ToggleSwitch
              isChecked={isDarkMode}
              onChange={handleNightModeToggle}
            />
          </span>
          <span className={styles.toggleSwitch}>
            Notifications: <ToggleSwitch />
          </span>
          <span className={styles.toggleSwitch}>
            My profile: <RadioButton />
          </span>
          <span className={styles.toggleSwitch}>
            My name: <RadioButton />
          </span>
          <span className={styles.toggleSwitch}>
            My location: <RadioButton />
          </span>
          <button>Save</button>
        </form>
      </section>
    </div>
  );
};

export default SettingsForm;
