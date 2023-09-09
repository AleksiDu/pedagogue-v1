import { FC, useState } from "react";
import NavBtn from "../RegistrationLoginCom/NavBtn";

interface MessageType {
  id: string;
  email: string;
  message: string;
  phone: string;
}

interface MessageListProps {
  messages: MessageType[];
  onSelectMessage: (message: MessageType) => void;
  onDeleteMessage: (messageId: string) => void;
}

const MessageList: FC<MessageListProps> = ({
  messages,
  onSelectMessage,
  onDeleteMessage,
}) => {
  const [isInboxMode, setIsInboxMode] = useState(true);
  console.log("messages list", messages);

  const handleInboxClick = () => {
    setIsInboxMode(true);
  };

  const handleSendClick = () => {
    setIsInboxMode(false);
  };

  return (
    <div className="message-list">
      <div className="button-container">
        <button
          type="button"
          className={`btn ${isInboxMode ? "active" : ""}`}
          onClick={handleInboxClick}
        >
          Inbox
        </button>
        <button
          type="button"
          className={`btn ${!isInboxMode ? "active" : ""}`}
          onClick={handleSendClick}
        >
          Send
        </button>
      </div>

      <ul className="messages">
        {messages.map((message) => (
          <li key={message?.id}>
            <button onClick={() => onSelectMessage(message)}>
              {message.message} - {message.email}
            </button>
            <button onClick={() => onDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
