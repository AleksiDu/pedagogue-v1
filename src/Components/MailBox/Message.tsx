import { FC } from "react";

interface MessageType {
  id?: number;
  email: string;
  messageText: string;
  phone: string;
}

interface MessageProps {
  message: MessageType;
  onRespond: (newMessage: MessageType) => void;
}
const Message: FC<MessageProps> = ({ message, onRespond }) => {
  // Helper function to create a response message
  const createResponseMessage = (originalMessage: MessageType) => {
    return {
      phone: `Re: ${originalMessage.phone}`,
      email: originalMessage.email,
      messageText: `Re: ${originalMessage.messageText}`,
    };
  };

  return (
    <div className="message">
      <h2>{message.phone}</h2>
      <p>From: {message.email}</p>
      <p>{message.messageText}</p>
      <button onClick={() => onRespond(createResponseMessage(message))}>
        Respond
      </button>
    </div>
  );
};

export default Message;
