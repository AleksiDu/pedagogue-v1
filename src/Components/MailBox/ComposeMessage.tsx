import { FC, useState } from "react";
import "./composeStyle.css";
interface NewMessage {
  id?: string;
  message: string;
  recepientEmail: string;
  senderEmail: string;
  seen?: boolean;
}
type ComposeMessageProps = {
  onSend: (newMessage: NewMessage) => void;
  message: NewMessage;
};

const ComposeMessage: FC<ComposeMessageProps> = ({ onSend, message }) => {
  const [newMessage, setNewMessage] = useState({
    message: "",
    recepientEmail: message.senderEmail,
    senderEmail: message.recepientEmail,
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
      recepientEmail: newMessage.recepientEmail,
      senderEmail: newMessage.senderEmail,
      message: newMessage.message,
    });
  };

  console.log(newMessage);

  return (
    <div>
      <section>
        <form className="compose-message" onSubmit={handleSubmit}>
          <label htmlFor="message">Compose your response below:</label>
          <textarea
            name="message"
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
