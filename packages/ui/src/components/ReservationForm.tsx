"use client";

import { useState, useEffect } from "react";
import styles from "./ReservationForm.module.css";
import { CalendarCheck, Loader2 } from "lucide-react";

type Step = "form" | "success";

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "7:00 PM"
  partySize: number;
  notes?: string;
}

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM",
];

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];

interface ReservationFormProps {
  onSubmit?: (data: ReservationData) => Promise<void>;
}

export function ReservationForm({ onSubmit }: ReservationFormProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState<number>(2);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!time) {
      setError("Please select a time slot.");
      return;
    }

    const data: ReservationData = {
      name, email, phone, date, time,
      partySize: party,
      notes: notes || undefined,
    };

    if (onSubmit) {
      setLoading(true);
      try {
        await onSubmit(data);
        setStep("success");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      // No handler provided — just show success (useful for UI preview/dev)
      setStep("success");
    }
  };

  const handleReset = () => {
    setStep("form");
    setName(""); setEmail(""); setPhone("");
    setDate(""); setTime(""); setParty(2); setNotes("");
    setError(null);
  };

  if (step === "success") {
    return (
      <div className={styles.successCard}>
        <span className={styles.successIcon}>🎉</span>
        <h2>You&apos;re all set, {name}!</h2>
        <p>
          We&apos;ve reserved a table for <strong>{party}</strong> on{" "}
          <strong>{date}</strong> at <strong>{time}</strong>.
          A confirmation will be sent to <strong>{email}</strong>.
        </p>
        <button className={styles.resetBtn} onClick={handleReset}>
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="res-name">Full Name</label>
          <input id="res-name" type="text" placeholder="Jane Smith"
            value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="res-email">Email</label>
          <input id="res-email" type="email" placeholder="jane@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="res-phone">Phone</label>
          <input id="res-phone" type="tel" placeholder="(123) 456-7890"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Party Size</label>
          <div className={styles.partySelector}>
            {PARTY_SIZES.map((n) => (
              <button key={n} type="button"
                className={`${styles.partyBtn} ${party === n ? styles.partyBtnActive : ""}`}
                onClick={() => setParty(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="res-date">Date</label>
          <input id="res-date" type="date" min={today}
            value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label>Time</label>
          <div className={styles.timeGrid}>
            {TIME_SLOTS.map((slot) => (
              <button key={slot} type="button"
                className={`${styles.timeBtn} ${time === slot ? styles.timeBtnActive : ""}`}
                onClick={() => setTime(slot)}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="res-notes">
          Special Requests <span className={styles.optional}>(optional)</span>
        </label>
        <textarea id="res-notes" placeholder="Allergies, high chair, anniversary…"
          value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </div>

      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={!name || !email || !date || !time || loading}
      >
        {loading ? <><Loader2 size={15} style={{marginRight: "0.4rem", animation: "spin 1s linear infinite"}} />Submitting…</> : <><CalendarCheck size={15} style={{marginRight: "0.4rem"}} />Confirm Reservation</>}
      </button>
    </form>
  );
}
