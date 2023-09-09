import { FC, useState } from "react";
import "./composeStyle.css";
interface NewMessage {
  email: string;
  message: string;
  phone: string;
}
type ComposeMessageProps = { onSend: (newMessage: NewMessage) => void };

const ComposeMessage: FC<ComposeMessageProps> = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState({
    phone: "+995598123321",
    email: localStorage.getItem("email") || "",
    message: "",
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
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <section>
        <h1>Compose New Message</h1>
        <form className="compose-message" onSubmit={handleSubmit}>
          <label htmlFor="messageText">Content</label>
          <textarea
            name="messageText"
            placeholder="Message"
            value={newMessage.message}
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
