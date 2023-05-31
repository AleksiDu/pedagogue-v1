import Input from "../RegisterForm/Components/Input";
import styles from "../../../styles/FormStyles/styles.module.css";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";
import Loader from "../../Loader";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (userEmailRef.current) {
      userEmailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (countdown) {
      setTimer(10);
      countdownTimer = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdownTimer);
            setCountdown(false);
            setErrMsg("");
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (countdown) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/Api/authentication/forgot-password", {
        email,
      });
      // Save email
      localStorage.setItem("resetEmail", email);
      // Handle successful response
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      setCountdown(true);
      const error = err as AxiosError<unknown>;

      if (error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        setErrMsg(errorMessage);
      } else {
        setErrMsg(error.message);
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : success ? (
        <section className={styles.registrarSection}>
          <h1>Email was Successfully sent</h1>
          <br />
          <p>
            <Link to={"/login"}>Login</Link>
          </p>
        </section>
      ) : (
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
            <button disabled={loading || countdown}>
              {countdown ? `Resend in ${timer}s` : "Send Reset Code"}
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default ForgetPassword;
