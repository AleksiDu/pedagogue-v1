import { useEffect, useState } from "react";
import Message from "./Message";
import ComposeMessage from "./ComposeMessage";
import MessageList from "./MessageList";

import "./mailBox.css";
import axios from "../../api/axios";

interface NewMessage {
  email: string;
  messageText: string;
  phone: string;
}

interface MessageType extends NewMessage {
  id: string;
}

// Sample data for messages

const Mailbox = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );

  useEffect(() => {
    axios
      .get("/api/Messaging/fetch-messages", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
        console.log("useEffect", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSelectMessage = (message: MessageType) => {
    setSelectedMessage(message);
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete("/api/Messaging", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: JSON.stringify({
          messageId: messageId,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    const updatedMessages = messages.filter(
      (message) => message.id !== messageId
    );
    setMessages(updatedMessages);
    setSelectedMessage(null);
  };

  const handleSendMessage = (newMessage: NewMessage) => {
    const nextId = "1" + messages.length + 1;
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
    handleSendMessage(newMessage);
  };

  console.log("messages => ", messages);

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
