import { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${name}! We will get back to you soon.`);
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
