import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

const opts = {
  adapter: PrismaAdapter(prisma),
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID ?? "",
      clientSecret: process.env.SLACK_CLIENT_SECRET ?? ""
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER as string,
      from: process.env.EMAIL_FROM as string,
      maxAge: 60 * 10 // make email links valid for 10 minutes
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // user.name = { id: user.id, display: user.name }
      return true;
    }
  },
  // secret: process.env.NEXTAUTH_SECRET,
  debug: true
}

const handler = NextAuth(opts)

export { handler as GET, handler as POST }
