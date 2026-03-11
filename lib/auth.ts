import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

const getRequiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: getRequiredEnv("GITHUB_ID"),
      clientSecret: getRequiredEnv("GITHUB_SECRET"),
      authorization: {
        params: {
          scope: "read:user user:email",
          allow_signup: "false",
        },
      },
      checks: ["state"],
      allowDangerousEmailAccountLinking: false,
    }),
    Google({
      clientId: getRequiredEnv("GOOGLE_ID"),
      clientSecret: getRequiredEnv("GOOGLE_SECRET"),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      checks: ["pkce", "state"],
      // Allow linking only for Google accounts; signIn callback additionally enforces verified email.
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    signIn({ account, profile }) {
      if (!account) return false;

      if (account.provider === "google") {
        const googleProfile = profile as
          | { email?: string | null; email_verified?: boolean }
          | undefined;
        if (!googleProfile?.email) return false;
        if (googleProfile?.email_verified === false) return false;
      }

      if (account.provider === "github") {
        const githubProfile = profile as { email?: string | null } | undefined;
        if (githubProfile && !githubProfile.email) return false;
      }

      return true;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
