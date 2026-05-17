// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectDB } from "./db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   session: {
//     strategy: "jwt"
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: {},
//         password: {}
//       },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });
//         if (!user) throw new Error("Invalid email");
//         const isMatch = await bcrypt.compare(credentials.password, user.password);
//         if (!isMatch) throw new Error("Invalid password");
//         return { id: user._id.toString(), email: user.email, name: user.name };
//       }
//     })
//   ],
//   pages: {
//     signIn: "/admin/login"
//   },
//   secret: process.env.NEXTAUTH_SECRET
// };


import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};