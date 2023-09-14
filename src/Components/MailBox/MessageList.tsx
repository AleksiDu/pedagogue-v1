import { FC, useState } from "react";

interface MessageType {
  id: string;
  message: string;
  recepientEmail: string;
  senderEmail: string;
  seen?: boolean;
}

interface MessageListProps {
  messages: MessageType[];
  onSelectMessage: (message: MessageType) => void;
  onDeleteMessage: (messageId: string) => void;
  onInboxMode: (isInboxMode: boolean) => void;
}

const MessageList: FC<MessageListProps> = ({
  messages,
  onSelectMessage,
  onDeleteMessage,
  onInboxMode,
}) => {
  const [isInboxMode, setIsInboxMode] = useState(true);
  console.log("messages list", messages);

  const handleInboxClick = () => {
    setIsInboxMode(true);
    onInboxMode(true);
  };

  const handleSendClick = () => {
    setIsInboxMode(false);
    onInboxMode(false);
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
              {message.message} - {message.senderEmail}
            </button>
            <button onClick={() => onDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
