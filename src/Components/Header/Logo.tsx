import { FC } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  logo: string;
  appName: string;
  to: string;
  linkClass: string;
  logoClass: string;
  nameClass: string;
  alt: string;
}
const Logo: FC<LogoProps> = ({
  logo,
  appName,
  to,
  linkClass,
  logoClass,
  nameClass,
  alt,
}) => {
  return (
    <Link to={to} className={linkClass}>
      <img src={logo} className={logoClass} alt={alt} />
      <span className={nameClass}>{appName}</span>
    </Link>
  );
};

export default Logo;
