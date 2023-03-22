import { useState, useRef, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = `/registration`;

const Student = () => {
  const navigate = useNavigate();

  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isUserFocus, setIsUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [isValidMatch, setIsValidMatch] = useState(false);
  const [isMatchFocus, setIsMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (userEmailRef.current) {
      userEmailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
    setIsValidName(USER_REGEX.test(user));
    setIsValidPwd(PWD_REGEX.test(pwd));
    setIsValidMatch(pwd === matchPwd);
  }, [email, user, pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, user, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission here
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response.data?.accessToken);
      console.log(JSON.stringify(response));
      setIsSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email or Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      if (errRef.current != null) {
        errRef.current.focus();
      }
    }

    navigate("/"); // redirect to dashboard on successful registration
  };

  return (
    <div>
      {isSuccess ? (
        <section className={styles.registrarSection}>
          <h1>Success!</h1>
          <p>
            <a href="/#">Sign In</a>
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
          <h1>Student Register</h1>
          <form onSubmit={handleSubmit} className={styles.registrarForm}>
            <label htmlFor="user-email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={styles[isValidEmail ? "valid" : "hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={styles[isValidEmail || !email ? "hide" : "invalid"]}
              />
            </label>
            <input
              type="email"
              id="user-email"
              ref={userEmailRef}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              aria-invalid={isValidEmail ? "false" : "true"}
              aria-describedby="eid-note"
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
            <p
              id="eid-note"
              className={
                styles[
                  isEmailFocus && email && !isValidEmail
                    ? "instructions"
                    : "offscreen"
                ]
              }
            >
              {" "}
              <FontAwesomeIcon icon={faInfoCircle} />
              Not a Valid email
            </p>

            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={styles[isValidName ? "valid" : "hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={styles[isValidName || !user ? "hide" : "invalid"]}
              />
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={isValidName ? "false" : "true"}
              aria-describedby="uid-note"
              onFocus={() => setIsUserFocus(true)}
              onBlur={() => setIsUserFocus(false)}
            />
            <p
              id="uid-note"
              className={
                styles[
                  isUserFocus && user && !isValidName
                    ? "instructions"
                    : "offscreen"
                ]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              <FontAwesomeIcon icon={faInfoCircle} />
              Must begin with a letter.
              <br />
              <FontAwesomeIcon icon={faInfoCircle} />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={styles[isValidPwd ? "valid" : "hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={styles[isValidPwd || !pwd ? "hide" : "invalid"]}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={isValidPwd ? "false" : "true"}
              aria-describedby="pwd-note"
              onFocus={() => setIsPwdFocus(true)}
              onBlur={() => setIsPwdFocus(false)}
            />
            <p
              id="pwd-note"
              className={
                styles[isPwdFocus && !isValidPwd ? "instructions" : "offscreen"]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              <FontAwesomeIcon icon={faInfoCircle} />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              <FontAwesomeIcon icon={faInfoCircle} />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={styles[isValidMatch && matchPwd ? "valid" : "hide"]}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  styles[isValidMatch || !matchPwd ? "hide" : "invalid"]
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={isValidMatch ? "false" : "true"}
              aria-describedby="confirm-note"
              onFocus={() => setIsMatchFocus(true)}
              onBlur={() => setIsMatchFocus(false)}
            />
            <p
              id="confirm-note"
              className={
                styles[
                  isMatchFocus && !isValidMatch ? "instructions" : "offscreen"
                ]
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !(isValidEmail && isValidName && isValidPwd && isValidMatch)
              }
            >
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span className={styles.line}>
              {/*put link here*/}
              <a href="/#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Student;
