import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("accessToken");
    const pwd = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role") || "";

    // Check if accessToken exists and set isLoggedIn to true
    if (accessToken) {
      setIsLoggedIn(true);
    }

    return {
      email: email || "",
      pwd: pwd || "",
      role,
      accessToken: accessToken || "",
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
