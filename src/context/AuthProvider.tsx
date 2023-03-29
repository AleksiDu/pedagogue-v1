import { createContext, useState, ReactNode, useMemo } from "react";

type AuthContextType = {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
};

type AuthState = {
  email: string;
  pwd: string;
  roles: string[];
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

  const authContextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
