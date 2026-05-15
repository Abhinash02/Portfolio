// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function AdminLoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const res = await signIn("credentials", {
//       email: formData.email,
//       password: formData.password,
//       redirect: false,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//       setLoading(false);
//       return;
//     }

//     router.push("/admin/dashboard");
//   };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
//       <div className="glass w-full max-w-md rounded-[2rem] p-8">
//         <h1 className="text-3xl font-black">Admin Login</h1>
//         <p className="mt-2 text-white/60">Login to manage your portfolio.</p>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Admin email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Admin password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//           />

//           {error ? <p className="text-sm text-red-400">{error}</p> : null}

//           <button className="btn-primary w-full" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass w-full max-w-md rounded-[2rem] p-8 md:p-10"
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin Access</p>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">Portfolio Control Panel</h1>
          <p className="mt-3 text-white/60">
            Login to manage projects, skills, experience, education, and portfolio settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400/40"
          />
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400/40"
          />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button className="btn-primary mt-2 w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login to Admin"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}