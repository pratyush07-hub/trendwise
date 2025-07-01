import User from "@/lib/models/user.model";
import { connectMongoDb } from "@/lib/mongodb/mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Fetch the user from the database to get isAdmin
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.isAdmin = dbUser?.isAdmin || false;
      return session;
    },
    async signIn({ user, account }) {
      // console.log("user: ", user);
      // console.log("account: ", account);
      const { name, email , isAdmin } = user;
      if (account.provider === "google") {
        try {
          await connectMongoDb();
          const userExits = await User.findOne({ email });
          if(!userExits) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                isAdmin,
              }),
            });
            if (res.ok) {
              return user;
            }
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
