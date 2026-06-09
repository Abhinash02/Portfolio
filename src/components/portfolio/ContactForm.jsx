"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="glass-violet relative overflow-hidden rounded-[2rem] p-6 md:p-8"
      >
        {/* Inner glow */}
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <h3 className="relative mb-6 text-xl font-bold text-white md:text-2xl">
          Send a Message
        </h3>

        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="input-glow"
              />
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="input-glow"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="input-glow resize-none"
            />
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending…
              </span>
            ) : (
              "Send Message →"
            )}
          </motion.button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300"
              >
                ✅ Message sent! I'll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
              >
                ❌ Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
}