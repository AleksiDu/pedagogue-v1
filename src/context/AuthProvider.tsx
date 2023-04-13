import { createContext, useState, ReactNode, useMemo, useEffect } from "react";

type AuthContextType = {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
};

type AuthState = {
  email: string;
  pwd: string;
  roles?: string[];
  accessToken: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  auth: {
    email: "",
    pwd: "",
    roles: [],
    accessToken: "",
  },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({
    email: "",
    pwd: "",
    roles: [],
    accessToken: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const pwd = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const roles = localStorage.getItem("roles") || "[]";

    if (accessToken && pwd && email && roles) {
      console.log("accessToken:", accessToken);
    } else {
      // At least one variable is missing from localStorage
      console.log("Some variables are missing from localStorage");
    }
  });

  const authContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
