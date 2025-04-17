import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack"

const opts = {
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID ?? "",
      clientSecret: process.env.SLACK_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      user.name = { id: user.id, display: user.name }
      return true;
    }
  }
}

const handler = NextAuth(opts)

export { handler as GET, handler as POST }
