import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) return null;

        return { id: user._id.toString(), email: user.email, name: user.name , role: user.role};
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };