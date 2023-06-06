import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import axios from "../api/axios";

type AuthContextType = {
  authUser: AuthState | null;
  setAuthUser: (user: AuthState) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

type AuthState = {
  email: string;
  pwd: string;
  role?: string;
  accessToken: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const accessToken = localStorage.getItem("accessToken");
  const pwd = localStorage.getItem("password");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role") ?? "";

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
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
        // Make an authenticated request to check if the user is logged in
        const response = await axios.get(`api/${updatedUserRole}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("resetEmail");
      }
    };

    checkLoggedInStatus();
  }, []);

  const [authUser, setAuthUser] = useState<AuthState>(() => {
    // Check if accessToken exists and set isLoggedIn to true
    if (accessToken) {
      setIsLoggedIn(true);
    }

    return {
      email: email ?? "",
      pwd: pwd ?? "",
      role,
      accessToken: accessToken ?? "",
    };
  });

  useEffect(() => {
    localStorage.setItem("accessToken", authUser.accessToken);
  }, [authUser.accessToken]);

  const authContextValue: AuthContextType = useMemo(
    () => ({ authUser, setAuthUser, isLoggedIn, setIsLoggedIn }),
    [authUser, setAuthUser, isLoggedIn, setIsLoggedIn]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
