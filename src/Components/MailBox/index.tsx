import React, { useState } from "react";
import Message from "./Message";
import ComposeMessage from "./ComposeMessage";
import MessageList from "./MessageList";

interface NewMessage {
  subject: string;
  sender: string;
  content: string;
}

interface MessageType extends NewMessage {
  id: number;
}

// Sample data for messages
const initialMessages = [
  {
    id: 1,
    subject: "Hello",
    sender: "user1@example.com",
    content: "This is the first message.",
  },
  {
    id: 2,
    subject: "Meeting Tomorrow",
    sender: "user2@example.com",
    content: "Don't forget about the meeting tomorrow at 10 AM.",
  },
  // Add more sample messages here
];

const Mailbox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );

  const handleSelectMessage = (message: MessageType) => {
    setSelectedMessage(message);
  };

  const handleDeleteMessage = (messageId: number) => {
    const updatedMessages = messages.filter(
      (message) => message.id !== messageId
    );
    setMessages(updatedMessages);
    setSelectedMessage(null);
  };

  const handleSendMessage = (newMessage: NewMessage) => {
    const nextId = messages.length + 1;
    const updatedMessages = [
      ...messages,
      {
        id: nextId,
        ...newMessage,
      },
    ];
    setMessages(updatedMessages);
  };

  const handleRespond = (newMessage: NewMessage) => {
    // You can implement logic to associate the response with the selected message.
    // For simplicity, this example adds the response as a new message.
    handleSendMessage(newMessage);
  };

  return (
    <div>
      <h1>Mailbox</h1>
      <div className="mailbox-container">
        <MessageList
          messages={messages}
          onSelectMessage={handleSelectMessage}
          onDeleteMessage={handleDeleteMessage}
        />
        <div className="message-content">
          {selectedMessage ? (
            <Message message={selectedMessage} onRespond={handleRespond} />
          ) : (
            <p>Select a message to view its content.</p>
          )}
        </div>
      </div>
      <ComposeMessage onSend={handleSendMessage} />
    </div>
  );
};

export default Mailbox;
