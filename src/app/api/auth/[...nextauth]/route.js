import User from "@/lib/models/user.model";
import { connectMongoDb } from "@/lib/mongodb/mongoose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async session({ session, token }) {
      try {
        await connectMongoDb();
        // Fetch the user from the database to get isAdmin
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.isAdmin = dbUser?.isAdmin || false;
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        session.user.isAdmin = false;
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connectMongoDb();
          const userExists = await User.findOne({ email: user.email });
          
          if (!userExists) {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                isAdmin: false, // Default to false for new users
              }),
            });
            
            if (!res.ok) {
              console.error("Failed to create user");
              return false;
            }
          }
          return true;
        } catch (error) {
          console.error("SignIn callback error:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
