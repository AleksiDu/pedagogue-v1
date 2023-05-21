import { useState, useRef, useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import styles from "../../../styles/RegistrationProfileStyles/styles.module.css";
import Input from "../RegisterForm/Components/Input";
import Loader from "../../Loader";

interface ErrorResponse {
  status?: number;
  detail: string;
  title?: string;
  // other properties of the error response object
}

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
const PASSWORD_UPDATE_URL = `api/authentication/register`;

const PasswordReset: FC = () => {
  const navigate = useNavigate();

  const errRef = useRef<HTMLDivElement>(null);

  const [pwd, setPwd] = useState("");
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [isValidMatch, setIsValidMatch] = useState(false);
  const [isMatchFocus, setIsMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValidPwd(PWD_REGEX.test(pwd));
    setIsValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission here
    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        PASSWORD_UPDATE_URL,
        JSON.stringify({ password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setIsSuccess(true);
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
      } else {
        setErrMsg("Password Update Failed");
        console.error(errLog);
      }
      if (errRef.current != null) {
        errRef.current.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <section className={styles.registrarSection}>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
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
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit} className={styles.registrarForm}>
            <Input
              inputType={pwd}
              isValidInputType={isValidPwd}
              isInputTypeFocus={isPwdFocus}
              name="New Password:"
              id="newPassword"
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

            <button disabled={!(isValidPwd && isValidMatch)}>
              Change Password
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default PasswordReset;
