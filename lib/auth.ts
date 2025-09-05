// lib/auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,   // sandbox.smtp.mailtrap.io
        port: Number(process.env.EMAIL_SERVER_PORT), // 2525
        auth: {
          user: process.env.EMAIL_SERVER_USER,       // c213df...
          pass: process.env.EMAIL_SERVER_PASSWORD,   // (completo)
        },
      },
      from: process.env.EMAIL_FROM, // "Validate Hub <no-reply@validatehub.local>"
      // TEMP: log detallado para depurar
      ...(process.env.NODE_ENV !== "production" && {
        maxAge: 24 * 60 * 60,
        generateVerificationToken: async () => undefined as any, // fuerza log del default flow
      }),
    }),
  ],
  // TEMP: logs
  debug: process.env.NODE_ENV !== "production",
}