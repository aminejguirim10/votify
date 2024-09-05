"use server"
import prisma from "@/lib/db"
import { createNewUserTeamplate } from "@/lib/email"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"

export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return { message: "User already exists", status: 400 }
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })
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
    return { message: "User created", status: 201 }
  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}
