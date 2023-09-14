import { FC, useState } from "react";

import ComposeMessage from "./ComposeMessage";

interface MessageType {
  id?: string;
  message: string;
  recepientEmail: string;
  senderEmail: string;
  seen?: boolean;
}

interface MessageProps {
  message: MessageType;

  onSend: (newMessage: MessageType) => void;
}
const Message: FC<MessageProps> = ({ message, onSend }) => {
  const [isResponding, setIsResponding] = useState(false);

  const handleRespondClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResponding(true);
  };

  return (
    <div className="message">
      <h2>{message.recepientEmail}</h2>
      <p>From: {message.senderEmail}</p>
      <p>{message.message}</p>
      {isResponding ? (
        <ComposeMessage onSend={onSend} message={message} />
      ) : (
        <button type="button" onClick={handleRespondClick}>
          Respond
        </button>
      )}
    </div>
  );
};

export default Message;
