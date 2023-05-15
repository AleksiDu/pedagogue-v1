import { createContext, useState, ReactNode, useMemo, useEffect } from "react";

type AuthContextType = {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
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
  auth: {
    email: "",
    pwd: "",
    role: "",
    accessToken: "",
  },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log(children);
  const [auth, setAuth] = useState<AuthState>({
    email: "",
    pwd: "",
    role: "",
    accessToken: "",
  });

  const accessToken = useMemo(() => localStorage.getItem("accessToken"), []);

  useEffect(() => {
    const pwd = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role") || "";

    if (accessToken && pwd && email && role) {
      console.log("accessToken:", accessToken);
    } else {
      // At least one variable is missing from localStorage
      console.log("Some variables are missing from localStorage");
    }
  }, [auth, accessToken]);

  const authContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
