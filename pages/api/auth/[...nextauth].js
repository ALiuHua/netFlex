import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        console.log("user-----", user);
        if (!user) {
          client.close();
          throw new Error("No user found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error({ message: "Cluld not log you in" });
        }
        client.close();
        return { email: user.email, profiles: user.profiles };
      },
    }),
  ],
  //add extra info to the session
  callbacks: {
    session: async ({ session }) => {
      if (!session) return;
      const client = await connectToDatabase();
      const usersCollection = client.db().collection("users");
      const userData = await usersCollection.findOne({
        email: session.user.email,
      });
      console.log("userdata55", userData);
      return {
        user: { email: userData.email, profiles: userData.profiles },
      };
    },
  },
  secret: process.env.AUTH_SECRET,
});
