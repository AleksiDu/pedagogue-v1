import { useEffect, useState } from "react";

import Message from "./Message";
import MessageList from "./MessageList";

import axios from "../../api/axios";

import "./mailBox.css";

interface NewMessage {
  message: string;
  recepientEmail: string;
  senderEmail: string;
}

interface MessageType extends NewMessage {
  id: string;
  seen?: boolean;
}

const Mailbox = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [isInboxMode, setIsInboxMode] = useState(true);

  useEffect(() => {
    axios
      .get("/api/Messaging/fetch-messages", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (isInboxMode) {
          setMessages(response.data.received);
        } else {
          setMessages(response.data.sent);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, isInboxMode]);

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
        {
          email: newMessage.recepientEmail,
          message: newMessage.message,
          phone: newMessage.senderEmail,
          recepientRole: Number(localStorage.getItem("role")),
        },
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

  const handleInboxMode = (isInboxMode: boolean) => {
    setIsInboxMode(isInboxMode);
  };

  return (
    <div>
      <h1>Mailbox</h1>
      <div className="mailbox-container">
        <MessageList
          messages={messages}
          onSelectMessage={handleSelectMessage}
          onDeleteMessage={handleDeleteMessage}
          onInboxMode={handleInboxMode}
        />
        <div className="message-content">
          {selectedMessage ? (
            <Message message={selectedMessage} onSend={handleSendMessage} />
          ) : (
            <p>Select a message to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox;
