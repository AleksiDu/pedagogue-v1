import { useState, useRef, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import styles from "./registration.module.css";

/**
 * TODO
 * Destructure commonly used variables
 * Simplify the error message display logic
 * Consolidate similar logic into a single useEffect
 * *To add email input(done)
 */

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const REGISTER_URL = `/registration`;

const Registration = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission here
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
            className={errMsg ? "err-msg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className={styles.registrarForm}>
            <label htmlFor="user-email">Email:</label>
            <input
              type="email"
              id="user-email"
              ref={userEmailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={isValidEmail ? "false" : "true"}
              aria-describedby="uid-note"
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
            <p
              id="uid-note"
              className={
                styles[
                  isEmailFocus && email && !isValidEmail
                    ? "instructions"
                    : "offscreen"
                ]
              }
            >
              Not a Valid email
            </p>

            <label htmlFor="username">Username:</label>
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
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">Password:</label>
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
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">Confirm Password:</label>
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

export default Registration;
