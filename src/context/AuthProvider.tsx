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
  const [auth, setAuth] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("accessToken");
    const pwd = localStorage.getItem("password");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role") || "";

    return {
      email: email || "",
      pwd: pwd || "",
      role,
      accessToken: accessToken || "",
    };
  });

  useEffect(() => {
    localStorage.setItem("accessToken", auth.accessToken);
  }, [auth.accessToken]);

  const authContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
