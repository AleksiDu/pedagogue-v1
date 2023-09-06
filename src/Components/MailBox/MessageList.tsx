import { FC } from "react";

interface MessageType {
  id: number;
  subject: string;
  sender: string;
  content: string;
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
  return (
    <div className="message-list">
      <h2>Inbox</h2>
      <ul>
        {messages.map((message) => (
          <li key={message?.id}>
            <button onClick={() => onSelectMessage(message)}>
              {message.subject} - {message.sender}
            </button>
            <button onClick={() => onDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
