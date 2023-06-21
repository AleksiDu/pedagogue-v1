import { Link } from "react-router-dom";

interface MessageWithActionProps {
  className?: string;
  paragraph?: string;
  comment?: string;
  to: string;
  text?: string;
  nextLine?: boolean;
}

const MessageWithAction: React.FC<MessageWithActionProps> = ({
  className,
  comment,
  paragraph,
  to,
  text,
  nextLine,
}) => {
  return (
    <section className={className}>
      <h1>{comment}</h1>
      {paragraph}
      {nextLine ? <br /> : ""}
      <p>
        <Link to={to}>{text}</Link>
      </p>
    </section>
  );
};

export default MessageWithAction;
