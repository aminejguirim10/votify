"use server"
import prisma from "@/lib/db"
import {
  contactUserTemplate,
  createNewUserTeamplate,
  resetPasswordCompletedTemplate,
  resetPasswordTemplate,
} from "@/lib/email"
import { ServerSession } from "@/lib/session"
import bcryptjs from "bcryptjs"
import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

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

export const updateUser = async (name: string, image: string) => {
  const session = await ServerSession()
  if (!session) {
    return { message: "Unauthorized", status: 401 }
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        image,
      },
    })
    revalidatePath("/votingRooms")
    return { message: "User updated", status: 200 }
  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}

export const getUser = async () => {
  const session = await ServerSession()
  if (!session) {
    return { message: "Unauthorized", status: 401 }
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  return user
}

export const contactUser = async (
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
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
      to: process.env.NODE_MAILER_AUTHOR_MAIL!,
      subject: `${subject}`,
      html: contactUserTemplate(firstName, lastName, email, message),
    }
    await transporter.sendMail(mailOptions)
    return { message: "Email sent", status: 200 }
  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}

export const forgotPassword = async (email: string) => {
  if (!email) {
    return { message: "Email is required", status: 400 }
  }
  try {
    const oldUser = await prisma.user.findUnique({ where: { email } })
    if (!oldUser) {
      return { message: "Email not found", status: 404 }
    }
    const secret = process.env.JWT_SECRET! + oldUser.password
    const token = jwt.sign(
      { id: oldUser.id, email: oldUser.email, name: oldUser.name },
      secret,
      {
        expiresIn: "15m",
      }
    )
    const link = `${process.env.NEXTAUTH_URL}/reset-password/${oldUser.id}/${token}`
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
      to: oldUser.email!,
      subject: "Password reset",
      html: resetPasswordTemplate(link),
    }
    await transporter.sendMail(mailOptions)
    return { message: "Email sent successfully", status: 200 }
  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}

export const resetPassword = async (
  id: string,
  token: string,
  password: string
) => {
  const oldUser = await prisma.user.findUnique({ where: { id } })
  if (!oldUser) {
    return { message: "User not found", status: 404 }
  }
  if (!password) {
    return { message: "Password is required", status: 400 }
  }
  const secret = process.env.JWT_SECRET! + oldUser.password
  try {
    let decoded: any
    decoded = jwt.verify(token, secret)
    const hashedPassword = await bcryptjs.hash(password, 10)
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
    const link = `${process.env.NEXTAUTH_URL}/contact`
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
      to: oldUser.email!,
      subject: "Password reset Successful",
      html: resetPasswordCompletedTemplate(link, oldUser.name!),
    }
    await transporter.sendMail(mailOptions)
    return { message: "Password updated", status: 200 }
  } catch (error: any) {
    return { message: error.message, status: 500 }
  }
}
