import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const membership = await prisma.membership.findFirst({
        where: { userId: user.id },
        include: {
          organization: {
            include: {
              workspaces: { take: 1 },
            },
          },
        },
      });

      if (membership && session.user) {
        (session as any).membership = {
          id: membership.id,
          role: membership.role,
          organizationId: membership.organizationId,
          workspaceId: membership.organization.workspaces[0]?.id,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/sign-in?verifyRequest=true',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
