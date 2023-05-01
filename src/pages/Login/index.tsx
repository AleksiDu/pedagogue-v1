import LoginForm from "../../Components/RegistrationLoginCom/LoginForm";
import { AuthProvider } from "../../context/AuthProvider";

const Login = () => {
  return (
    <>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </>
  );
};

export default Login;
