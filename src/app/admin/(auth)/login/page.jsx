"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [mode, setMode] = useState("login"); // "login" | "reset"

  // Login state
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset password state
  const [resetData, setResetData] = useState({
    email: "",
    resetSecret: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    secret: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 text-white/60">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
          Checking session...
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetChange = (e) => {
    setResetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    setResetSuccess("");

    if (resetData.newPassword !== resetData.confirmPassword) {
      setResetError("New passwords do not match");
      setResetLoading(false);
      return;
    }

    if (resetData.newPassword.length < 6) {
      setResetError("New password must be at least 6 characters");
      setResetLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetData.email,
          resetSecret: resetData.resetSecret,
          newPassword: resetData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Reset failed");
      }

      setResetSuccess("Password updated successfully! You can now login.");
      setResetData({
        email: "",
        resetSecret: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setMode("login");
        setResetSuccess("");
      }, 2500);
    } catch (err) {
      setResetError(err.message || "Failed to reset password");
    } finally {
      setResetLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setResetError("");
    setResetSuccess("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.18),transparent_30%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-violet-600/10 blur-3xl"
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-violet-400/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 45, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass w-full max-w-md rounded-[2rem] p-8 md:p-10"
          >
            {/* Glow border effect */}
            <div className="pointer-events-none absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 opacity-60" />

            <div className="relative mb-8">
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-400/20"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-violet-300" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm uppercase tracking-[0.35em] text-violet-400"
              >
                Admin Access
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-3 text-3xl font-black md:text-4xl"
              >
                Welcome <span className="gradient-text">Back</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-white/50"
              >
                Login to manage your portfolio content.
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition-all duration-300 focus:border-violet-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition-all duration-300 focus:border-violet-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-3 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Logging in...
                  </span>
                ) : (
                  "Login to Admin"
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative mt-6 text-center"
            >
              <div className="gradient-divider mb-5" />
              <button
                type="button"
                onClick={() => switchMode("reset")}
                className="text-sm text-white/40 transition-colors duration-300 hover:text-violet-400"
              >
                Forgot password?{" "}
                <span className="font-semibold text-violet-400 underline underline-offset-2 decoration-violet-400/40 hover:decoration-violet-400">
                  Reset it here
                </span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="reset"
            initial={{ opacity: 0, y: 45, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass w-full max-w-md rounded-[2rem] p-8 md:p-10"
          >
            <div className="pointer-events-none absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20 opacity-60" />

            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/20"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-300" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm uppercase tracking-[0.35em] text-cyan-400"
              >
                Security
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-3 text-3xl font-black md:text-4xl"
              >
                Reset <span className="gradient-text">Password</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-white/50"
              >
                Enter your admin email and reset secret to set a new password.
              </motion.p>
            </div>

            <form onSubmit={handleResetSubmit} className="relative space-y-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={resetData.email}
                  onChange={handleResetChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12)]"
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Reset Secret</label>
                <div className="relative">
                  <input
                    type={showPasswords.secret ? "text" : "password"}
                    name="resetSecret"
                    placeholder="Your ADMIN_RESET_SECRET"
                    value={resetData.resetSecret}
                    onChange={handleResetChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords((p) => ({ ...p, secret: !p.secret }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPasswords.secret ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    placeholder="••••••••"
                    value={resetData.newPassword}
                    onChange={handleResetChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPasswords.new ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={resetData.confirmPassword}
                    onChange={handleResetChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 outline-none transition-all duration-300 focus:border-cyan-400/40 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPasswords.confirm ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
              </motion.div>

              <AnimatePresence>
                {resetError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {resetError}
                  </motion.p>
                )}
                {resetSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-2.5 text-sm text-green-400"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {resetSuccess}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-3 w-full"
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Updating...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative mt-6 text-center"
            >
              <div className="gradient-divider mb-5" />
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-sm text-white/40 transition-colors duration-300 hover:text-cyan-400"
              >
                Remember your password?{" "}
                <span className="font-semibold text-cyan-400 underline underline-offset-2 decoration-cyan-400/40 hover:decoration-cyan-400">
                  Back to Login
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}