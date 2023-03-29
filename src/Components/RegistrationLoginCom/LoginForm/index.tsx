import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { AxiosError } from "axios";
import Input from "../RegisterForm/Components/Input";

interface LoginResponseData {
  accessToken: string;
  roles: string[];
}

const LOGIN_URL = "/auth";

const Login = (): JSX.Element => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // Type guard function
  const isAxiosError = (error: any): error is AxiosError => {
    return error.isAxiosError !== undefined && error.config !== undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponseData>(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (isAxiosError(err)) {
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
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
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="Email"
              id="username"
              type="email"
              PropRef={userRef}
              autoComplete="on"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <Input
              name="Password"
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
              {/*put router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
