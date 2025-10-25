import NextAuth from "next-auth";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("CALLED REGARDLESS OF LOGIN METHOD");
        if (!(credentials?.email || credentials?.password)) {
          throw new Error("Email and Password required");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("User does not exists");
        }

        const isCorrect = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrect) {
          throw new Error("IncorrectPassword");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
