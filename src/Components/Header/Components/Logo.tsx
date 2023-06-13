import { FC } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  logo: string;
  appName: string;
  to: string;
  linkClassName: string;
  logoClassName: string;
  nameClassName: string;
  alt: string;
}
const Logo: FC<LogoProps> = ({
  logo,
  appName,
  to,
  linkClassName,
  logoClassName,
  nameClassName,
  alt,
}) => {
  return (
    <Link to={to} className={linkClassName}>
      <img src={logo} className={logoClassName} alt={alt} />
      <span className={nameClassName}>{appName}</span>
    </Link>
  );
};

export default Logo;
