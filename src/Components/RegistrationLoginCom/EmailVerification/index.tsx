import Input from "../RegisterForm/Components/Input";
import styles from "../../../styles/RegistrationProfileStyles/styles.module.css";
import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";
import Loader from "../../Loader";
import axios from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();

  const userCodeRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (userCodeRef.current) {
      userCodeRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [code]);

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
      const response = await axios.post(`api/authentication/verify`, { code });

      // Handle successful response
      console.log(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 6000);
    } catch (err) {
      setCountdown(true);
      const error = err as AxiosError<unknown>;

      if (error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        setErrMsg(errorMessage);
      } else {
        setErrMsg("An error occurred. Please try again.");
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
          <h1>Email was Successfully Verified</h1>
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
          <h1>Email Verification</h1>
          <form className={styles.registrarForm} onSubmit={handleSubmit}>
            <Input
              name="Verification Code:"
              id="code"
              type="text"
              PropRef={userCodeRef}
              autoComplete="off"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              required
            />
            <button disabled={loading || countdown}>
              {countdown ? `Reverify in ${timer}s` : "Verify"}
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default EmailVerification;
