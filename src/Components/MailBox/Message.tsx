import { FC, useState } from "react";

interface MessageType {
  id?: string;
  email: string;
  messageText: string;
  phone: string;
}

interface MessageProps {
  message: MessageType;
  onRespond: (newMessage: MessageType, isResponding: boolean) => void;
}
const Message: FC<MessageProps> = ({ message, onRespond }) => {
  const [isResponding, setIsResponding] = useState(false);
  // Helper function to create a response message
  const createResponseMessage = (originalMessage: MessageType) => {
    return {
      phone: `Re: ${originalMessage.phone}`,
      email: originalMessage.email,
      messageText: `Re: ${originalMessage.messageText}`,
    };
  };

  const handleRespondClick = () => {
    setIsResponding(true);
    onRespond(createResponseMessage(message), true);
  };

  return (
    <div className="message">
      <h2>{message.phone}</h2>
      <p>From: {message.email}</p>
      <p>{message.messageText}</p>
      {isResponding ? (
        <p>Compose your response below:</p>
      ) : (
        <button onClick={handleRespondClick}>Respond</button>
      )}
    </div>
  );
};

export default Message;
