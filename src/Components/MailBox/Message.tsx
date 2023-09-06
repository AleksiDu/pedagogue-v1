import { FC } from "react";

interface MessageType {
  id?: number;
  subject: string;
  sender: string;
  content: string;
}

interface MessageProps {
  message: MessageType;
  onRespond: (newMessage: MessageType) => void;
}
const Message: FC<MessageProps> = ({ message, onRespond }) => {
  // Helper function to create a response message
  const createResponseMessage = (originalMessage: MessageType) => {
    return {
      subject: `Re: ${originalMessage.subject}`,
      sender: originalMessage.sender,
      content: `Re: ${originalMessage.content}`,
    };
  };

  return (
    <div className="message">
      <h2>{message.subject}</h2>
      <p>From: {message.sender}</p>
      <p>{message.content}</p>
      <button onClick={() => onRespond(createResponseMessage(message))}>
        Respond
      </button>
    </div>
  );
};

export default Message;
