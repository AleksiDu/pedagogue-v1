import { FC } from "react";

interface MessageType {
  id: number;
  email: string;
  messageText: string;
  phone: string;
}

interface MessageListProps {
  messages: MessageType[];
  onSelectMessage: (message: MessageType) => void;
  onDeleteMessage: (messageId: number) => void;
}

const MessageList: FC<MessageListProps> = ({
  messages,
  onSelectMessage,
  onDeleteMessage,
}) => {
  console.log("messages list", messages);
  return (
    <div className="message-list">
      <h2>Inbox</h2>
      <ul>
        {messages.map((message) => (
          <li key={message?.id}>
            <button onClick={() => onSelectMessage(message)}>
              {message.messageText} - {message.email}
            </button>
            <button onClick={() => onDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
