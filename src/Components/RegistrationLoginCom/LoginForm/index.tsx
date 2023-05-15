import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { AxiosError } from "axios";
import styles from "../RegisterForm/styles.module.css";
import Input from "../RegisterForm/Components/Input";
import { Link } from "react-router-dom";

interface LoginResponseData {
  token: string;
  role: string;
}

interface ErrorResponse {
  status?: number;
  detail: string;
  title?: string;
  // other properties of the error response object
}

const LOGIN_URL = "api/authentication/login";

const LoginForm = (): JSX.Element => {
  const { setAuth } = useContext(AuthContext);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [userRole, setUserRole] = useState("");

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
          // withCredentials: true, // <-- request should include cookies
        }
      );
      const accessToken = response.data.token;
      const role = response.data.role;
      setAuth({ email, pwd, role, accessToken });

      // Set a local storage
      localStorage.setItem("email", email);
      localStorage.setItem("password", pwd);
      localStorage.setItem("role", role);
      localStorage.setItem("accessToken", accessToken);

      setEmail("");
      setPwd("");
      setSuccess(true);

      // Set the userRole state based on the role value
      switch (role) {
        case "1":
          setUserRole("Tutor");
          break;
        case "2":
          setUserRole("Student");
          break;
        case "3":
          setUserRole("Parent");
          break;
        default:
          setUserRole("");
          break;
      }

      // Call the getProfileData function
      getProfileData(accessToken);
    } catch (err) {
      if (isAxiosError(err)) {
        const error: ErrorResponse | undefined = err?.response?.data as
          | ErrorResponse
          | undefined;
        const errLog =
          "[ CODE: " + error?.status + " : " + error?.detail + " ]";

        if (!err.response) {
          setErrMsg("No Server Response");
          console.error("[No Server Response]");
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
        // Display a message to the user
        const errMsg = "An unexpected error occurred. Please try again later.";
        setErrMsg(errMsg);
      }
    }
  };

  const getProfileData = async (accessToken: string) => {
    try {
      const response = await axios.get<{
        firstName: string;
        lastName: string;
        birthDate: string;
        gender: string;
        city: string;
        subject: string;
        experience: string;
      }>(`/api/${userRole}/${accessToken}/profile`, {
        //TODO /api/role/accessToken??
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const profileData = response.data;

        // TODO add states for data
        console.log(profileData);
      } else {
        console.log("Error getting profile data");
      }
    } catch (err) {
      // Handle error while retrieving profile data
      console.log("Error getting profile data", err);
    }
  };

  return (
    <>
      {success ? (
        <section className={styles.registrarSection}>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to={"/#"}>Go to Home</Link>
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
              note=" Not a Valid email"
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
            <span className={styles.line}>
              <Link to={"/registration"}>Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default LoginForm;
