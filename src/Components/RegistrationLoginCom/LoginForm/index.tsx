import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { AxiosError } from "axios";
import styles from "../RegisterForm/styles.module.css";
import Input from "../RegisterForm/Components/Input";

interface LoginResponseData {
  accessToken: string;
  roles: string[];
}

interface ErrorResponse {
  status?: number;
  detail: string;
  title?: string;
  // other properties of the error response object
}

const LOGIN_URL = "api/authentication/login";

const Login = (): JSX.Element => {
  const { setAuth } = useContext(AuthContext);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userEmailRef.current) {
      userEmailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  // Type guard function
  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined && error.config !== undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponseData>(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (isAxiosError(err)) {
        const error: ErrorResponse | undefined = err?.response?.data as
          | ErrorResponse
          | undefined;
        const errLog =
          "[ CODE: " + error?.status + " : " + error?.detail + " ]";

        if (!err.response) {
          setErrMsg("No Server Response");
          console.error(errLog);
        } else if (err.response.status === 400) {
          setErrMsg("Missing Email or Password");
          console.error(errLog);
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
          console.error(errLog);
        } else {
          setErrMsg("Login Failed");
          console.error(errLog);
        }
        if (errRef.current) {
          errRef.current.focus();
        }
      } else {
        // Handle other types of errors here
        console.log("Other error");
      }
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className={styles.registrarSection}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form className={styles.registrarForm} onSubmit={handleSubmit}>
            <Input
              name="Email:"
              id="username"
              type="email"
              PropRef={userEmailRef}
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Input
              name="Password:"
              id="password"
              type="password"
              autoComplete="on"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="/registration">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
