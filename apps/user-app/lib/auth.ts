import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      //@ts-ignore
      async authorize(credentials: {
        email: string;
        password: string;
        csrf: string;
      }) {
        const findUser = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!findUser) return null;

        const correctPassword = await bcrypt.compare(
          credentials.password,
          findUser.password
        );
        if (!correctPassword) return null;

        return findUser;
      },
    }),
  ],
  callbacks: {
    jwt: ({ user, token }: any) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      session.user.id = token.id;
      delete session.user.image;
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
