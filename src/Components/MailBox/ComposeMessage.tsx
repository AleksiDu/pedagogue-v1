import { FC, useState } from "react";
import "./composeStyle.css";
interface NewMessage {
  email: string;
  messageText: string;
  phone: string;
}
type ComposeMessageProps = { onSend: (newMessage: NewMessage) => void };

const ComposeMessage: FC<ComposeMessageProps> = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState({
    phone: "",
    email: "user@example.com",
    messageText: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(newMessage);
    setNewMessage({
      phone: "",
      email: "user@example.com",
      messageText: "",
    });
  };

  return (
    <div>
      <section>
        <h1>Compose New Message</h1>
        <form className="compose-message" onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newMessage.phone}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            placeholder="Message"
            value={newMessage.messageText}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default ComposeMessage;
