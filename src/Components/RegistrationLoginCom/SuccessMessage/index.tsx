import { FC } from "react";
import { Link, To } from "react-router-dom";

type SuccessMessageProps = {
  className?: string;
  comment?: string;
  to: To;
  link?: string;
};
const SuccessMessage: FC<SuccessMessageProps> = ({
  className,
  comment,
  to,
  link,
}) => {
  return (
    <section className={className}>
      <h1>{comment}</h1>
      <br />
      <p>
        <Link to={to}>{link}</Link>
      </p>
    </section>
  );
};

export default SuccessMessage;
