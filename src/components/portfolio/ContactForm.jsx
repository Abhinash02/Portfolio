"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import FadeUp from "./FadeUp";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error(data.message || "Failed to send message");
    }

    setLoading(false);
  };

  return (
    <FadeUp>
      <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <textarea
            name="message"
            placeholder="Write your message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
        </div>

        <button disabled={loading} className="btn-primary mt-6">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </FadeUp>
  );
}