import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Can Not Connect To Data Base");
        }

        if (!email || !password) throw new Error("Invalid Data");

        const user = await User.findOne({ email });

        if (!user) throw new Error("User Dosn't Exist");

        const isValid = await verifyPassword(password, user.password);
        
        if (!isValid) throw new Error("Email or Password is incorrect");

        return { email };
      },
    }),
  ],
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
