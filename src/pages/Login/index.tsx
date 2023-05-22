import LoginForm from "../../Components/RegistrationLoginCom/LoginForm";
import { AuthProvider } from "../../context/AuthProvider";

interface LoginProps {
  onLoginSuccess: () => void;
}
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <>
      <AuthProvider>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </AuthProvider>
    </>
  );
};

export default Login;
