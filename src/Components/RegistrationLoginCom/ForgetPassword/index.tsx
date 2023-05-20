import Input from "../RegisterForm/Components/Input";
import RegistrationAction from "../RegistrationAction";
import styles from "../../../styles/RegistrationProfileStyles/styles.module.css";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";

const ForgetPassword = () => {
  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userEmailRef.current) {
      userEmailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  // Type guard function
  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined && error.config !== undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("try");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("finally");
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
        <h1>Forgot Password</h1>
        <form className={styles.registrarForm} onSubmit={handleSubmit}>
          <Input
            name="Email:"
            id="email"
            type="email"
            PropRef={userEmailRef}
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            note=" Not a Valid email"
          />

          <RegistrationAction
            className={"styles.line"}
            to="/forget_password"
            nextLine={false}
            text="Resent a Code"
          />
          <button>Send Reset Code</button>
        </form>
      </section>
    </div>
  );
};

export default ForgetPassword;
