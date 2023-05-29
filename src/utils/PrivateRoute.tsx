import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
