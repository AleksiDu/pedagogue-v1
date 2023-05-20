import { Link } from "react-router-dom";

interface RegistrationActionProps {
  className?: string;
  paragraph?: string;
  to: string;
  text?: string;
  nextLine?: boolean;
}

const RegistrationAction: React.FC<RegistrationActionProps> = ({
  className,
  paragraph,
  to,
  text,
  nextLine,
}) => {
  return (
    <>
      <p>
        {paragraph}
        {nextLine ? <br /> : ""}
        <span className={className}>
          <Link to={to}>{text}</Link>
        </span>
      </p>
    </>
  );
};

export default RegistrationAction;
