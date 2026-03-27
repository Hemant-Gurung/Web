"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName(""); setEmail(""); setMessage("");
  };

  if (sent) {
    return (
      <div className={styles.sentMsg}>
        <span>✅</span>
        <p>Thanks! We'll get back to you soon.</p>
        <button onClick={() => setSent(false)} className={styles.sendAgain}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" placeholder="Your name" value={name}
          onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" placeholder="your@email.com" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Message
        <textarea placeholder="How can we help?" value={message}
          onChange={(e) => setMessage(e.target.value)} required />
      </label>
      <button type="submit">Send Message</button>
    </form>
  );
}
