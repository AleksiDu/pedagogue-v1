import { useState, useRef, useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import styles from "./styles.module.css";
import Input from "./Components/Input";

interface ErrorResponse {
  status?: number;
  detail: string;
  title?: string;
  // other properties of the error response object
}
const USER_REGEX = /^[A-Za-z0-9_-]{4,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = `api/authentication/register`;

const RegisterForm: FC<{ name: string }> = (props: { name: string }) => {
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
        JSON.stringify({ email, user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, //authorization headers or TLS client certificates in the request
        }
      );
      console.log(response?.data);
      console.log(response.data?.token);
      console.log(JSON.stringify(response));
      setIsSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err: any) {
      const error: ErrorResponse | undefined = err?.response?.data as
        | ErrorResponse
        | undefined;
      const errLog = "[ CODE: " + error?.status + " : " + error?.detail + " ]";
      if (!err?.response) {
        setErrMsg("No Server Response");
        console.error("[No Server Response]");
      } else if (err.response?.status === 409) {
        setErrMsg("Email or Username Taken");
        console.error(errLog);
      } else {
        setErrMsg("Registration Failed");
        console.error(errLog);
      }
      if (errRef.current != null) {
        errRef.current.focus();
      }
    }

    //navigate("/"); // redirect to dashboard on successful registration
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
          <h1>{props.name} Register</h1>
          <form onSubmit={handleSubmit} className={styles.registrarForm}>
            <Input
              inputType={email}
              isValidInputType={isValidEmail}
              isInputTypeFocus={isEmailFocus}
              name="Email:"
              id="user-email"
              type="email"
              PropRef={userEmailRef}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              ariaInvalid={isValidEmail ? "false" : "true"}
              ariaDescribedby="eid-note"
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
              note=" Not a Valid email"
            />
            <Input
              inputType={user}
              isValidInputType={isValidName}
              isInputTypeFocus={isUserFocus}
              name="Username:"
              id="username"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              required
              ariaInvalid={isValidName ? "false" : "true"}
              ariaDescribedby="uid-note"
              onFocus={() => setIsUserFocus(true)}
              onBlur={() => setIsUserFocus(false)}
              note=" 4 to 24 characters."
              note2=" Must begin with a letter."
              note3=" Letters, numbers, underscores, hyphens allowed."
            />
            <Input
              inputType={pwd}
              isValidInputType={isValidPwd}
              isInputTypeFocus={isPwdFocus}
              name="Password:"
              id="password"
              type="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              required
              ariaInvalid={isValidPwd ? "false" : "true"}
              ariaDescribedby="pwd-note"
              onFocus={() => setIsPwdFocus(true)}
              onBlur={() => setIsPwdFocus(false)}
              note=" 8 to 24 characters."
              note2=" Must include uppercase and lowercase letters, a number and a
              special character."
              note3=" Allowed special characters: ! @ # $ %"
            />

            <Input
              inputType={matchPwd}
              isValidInputType={isValidMatch}
              isInputTypeFocus={isMatchFocus}
              name="Confirm Password:"
              id="confirm_pwd"
              type="password"
              onChange={(e) => {
                setMatchPwd(e.target.value);
              }}
              value={matchPwd}
              required
              ariaInvalid={isValidMatch ? "false" : "true"}
              ariaDescribedby="pwd-note"
              onFocus={() => setIsMatchFocus(true)}
              onBlur={() => setIsMatchFocus(false)}
              note=" Must match the first password input field."
            />

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
              <a href="/login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default RegisterForm;
