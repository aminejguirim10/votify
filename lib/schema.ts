import { z } from "zod"

export const authSignUpSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
  email: z.string().email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
})

export const authSignInSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
})

export const votingJoinVotingRoomSchema = z.object({
  votingRoomCode: z.string().length(6, {
    message: "Voting room code must be 6 characters",
  }),
})

export const votingCreateVotingRoomSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  deadline: z.date({ required_error: "Deadline is required" }),
})

export const votingUpdateVotingRoomSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  deadline: z.date({ required_error: "Deadline is required" }),
})

export const votingCreateVoteSchema = z.object({
  vote: z.string().min(1, { message: "Vote must be at least 3 characters" }),
  url: z.string().optional(),
})
