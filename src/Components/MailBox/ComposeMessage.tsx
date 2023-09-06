import { FC, useState } from "react";
import "./composeStyle.css";
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
      subject: "",
      sender: "user@example.com",
      content: "",
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
            value={newMessage.subject}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            placeholder="Message"
            value={newMessage.content}
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
