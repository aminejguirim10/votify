import { AuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import prisma from "@/lib/db"
import bcryptjs from "bcryptjs"
import { createNewUserTeamplate } from "@/lib//email"
import nodemailer from "nodemailer"

type ExtendedUser = DefaultSession["user"] & {
  id: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user || !user.password) {
          return null
        }

        const isValid = await bcryptjs.compare(
          credentials.password,
          user?.password!
        )

        if (!isValid) {
          return null
        }
        return user
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: {
            id: true,
            accounts: true,
          },
        })
        if (existingUser) {
          for (const acc of existingUser.accounts) {
            if (acc.provider === account.provider) {
              return true // Return true to allow sign in to continue
            }
          }
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          })
        } else {
          // Create a new user
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                },
              },
            },
          })
          // Send welcome email
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.NODE_MAILER_AUTHOR_MAIL!,
              pass: process.env.NODE_MAILER_SECRET!,
            },
          })
          const mailOptions = {
            from: process.env.NODE_MAILER_AUTHOR_MAIL!,
            to: user.email!,
            subject: "Welcome to Votify",
            html: createNewUserTeamplate(user.name!),
          }
          await transporter.sendMail(mailOptions)
        }
      }
      return true // Return true to allow sign in to continue
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
        }
      }
      return token
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: { ...session.user, id: token.id },
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/signin",
  },
}
