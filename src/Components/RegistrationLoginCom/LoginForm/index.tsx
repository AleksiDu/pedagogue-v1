import { useRef, useState, useEffect } from "react";
import { AxiosError } from "axios";

import Input from "../RegisterForm/Components/Input";
import Loader from "../../Loader";
import MessageWithAction from "../MessageWithAction";

import axios from "../../../api/axios";

import { useAuth } from "../../../context/AuthContext";

import styles from "../../../styles/FormStyles/styles.module.css";

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

const LoginForm: React.FC = () => {
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const userEmailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await axios.post<LoginResponseData>(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response.data.token;
      const role = response.data.role;

      // Set the user authentication data in the application state
      // setAuth({ email, pwd, role, accessToken });
      setIsLoggedIn(true);
      setAuthUser({
        email,
        role,
        pwd,
        accessToken,
      });

      // Set the user authentication data in the localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", pwd);
      localStorage.setItem("role", role);
      localStorage.setItem("accessToken", accessToken);

      setEmail("");
      setPwd("");
      setIsSuccess(true);

      // Set the userRole state based on the role value
      let updatedUserRole = "";
      switch (Number(role)) {
        case 1:
          updatedUserRole = "Tutor";
          break;
        case 2:
          updatedUserRole = "Student";
          break;
        case 3:
          updatedUserRole = "Parent";
          break;
        default:
          updatedUserRole = "default";
          break;
      }

      // Call the getProfileData function
      getProfileData(accessToken, updatedUserRole);
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
    } finally {
      setLoading(false);
    }
  };

  const getProfileData = async (accessToken: string, role: string) => {
    try {
      const response = await axios.get<{
        age: string;
        city: string;
        email: string;
        experience: string;
        firstName: string;
        lastName: string;
        sex: string;
        subject: string | string[];
        feedbacks: string | string[];
        pupils: string | string[];
        calendar: string;
        averageRating: string;
        images: {
          profilePhoto: boolean;
          url: string;
        };
      }>(`/api/${role}/profile`, {
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
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <MessageWithAction
          to={"/#"}
          className={styles.registrarSection}
          comment="You are logged in!"
          nextLine={true}
          text="Go to Home"
        />
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
              id="email"
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
            <MessageWithAction
              className={styles.line}
              to="/forgetpassword"
              nextLine={false}
              text="Forget a Password?"
            />
            <button>Sign In</button>
          </form>
          <MessageWithAction
            className={styles.line}
            paragraph="Need an Account?"
            to="/registration"
            nextLine={true}
            text="Sign Up"
          />
        </section>
      )}
    </>
  );
};

export default LoginForm;
