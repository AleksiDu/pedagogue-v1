import { useEffect, useState } from "react";
import Message from "./Message";
import ComposeMessage from "./ComposeMessage";
import MessageList from "./MessageList";

import "./mailBox.css";
import axios from "../../api/axios";

interface NewMessage {
  email: string;
  message: string;
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
        setMessages(response.data.received);
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
      await axios.delete(`/api/Messaging?messageId=${messageId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
    console.log(newMessage);
    axios
      .post(
        "/api/Messaging/send-meesage",
        { newMessage, recepientRole: localStorage.getItem("role") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const newMessageId = response.data.id;
        console.log(newMessageId);

        const newMessageWithId: MessageType = {
          id: newMessageId,
          ...newMessage,
        };

        const updatedMessages = [...messages, newMessageWithId];
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRespond = (newMessage: NewMessage) => {
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
