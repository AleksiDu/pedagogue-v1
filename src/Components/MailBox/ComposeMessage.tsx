import { FC, useState } from "react";

interface NewMessage {
  subject: string;
  sender: string;
  content: string;
}
type ComposeMessageProps = { onSend: (newMessage: NewMessage) => void };

const ComposeMessage: FC<ComposeMessageProps> = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState({
    subject: "",
    sender: "user@example.com",
    content: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSend(newMessage);
    setNewMessage({
      subject: "",
      sender: "user@example.com",
      content: "",
    });
  };

  return (
    <div className="compose-message">
      <h2>Compose New Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newMessage.subject}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Message"
          value={newMessage.content}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ComposeMessage;
