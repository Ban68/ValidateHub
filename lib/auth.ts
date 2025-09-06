import NextAuth, { type NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: false, // For STARTTLS
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }

      // Only hit DB on sign-in or explicit session update
      if (user || trigger === 'update') {
        const membership = await prisma.membership.findFirst({
          where: { userId: token.id as string },
          include: {
            organization: {
              include: {
                workspaces: { take: 1 },
              },
            },
          },
        });

        if (membership) {
          token.membership = {
            id: membership.id,
            role: membership.role,
            organizationId: membership.organizationId,
            workspaceId: membership.organization.workspaces[0]?.id,
          };
        } else {
          // remove membership from token if it exists
          token.membership = undefined;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      session.membership = token.membership;
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/sign-in?verifyRequest=true',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
}
