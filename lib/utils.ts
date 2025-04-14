import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function emailToName(email: string): string {
  // Extract the part before the '@'
  const namePart = email.split("@")[0]

  // Replace dots and dashes with spaces
  const nameWithSpaces = namePart.replace(/[.-]/g, " ")

  // Capitalize each word
  const capitalizedName = nameWithSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return capitalizedName
}

export function getFallback(username: string | null | undefined) {
  if (!username) return "NA"
  const words = username.split(" ")

  // Get the first two words
  const firstWord = words[0]
  const secondWord = words.length > 1 ? words[1] : ""

  // Extract the first letters of the first two words
  const firstLetterFirstWord = firstWord.charAt(0)
  const firstLetterSecondWord = secondWord.charAt(0)

  // Concatenate the first letters to form the fallback
  const fallback =
    firstLetterFirstWord.toUpperCase() + firstLetterSecondWord.toUpperCase()

  return fallback
}

export function generateUniqueCode(length = 6) {
  return crypto
    .randomBytes(length)
    .toString("base64") // Convert bytes to base64 string
    .replace(/[^a-zA-Z0-9]/g, "") // Remove non-alphanumeric characters
    .slice(0, length) // Get the desired length
}

export function getVotesWithMostUsers(
  votingRoom: any
): { voteName: string; userCount: number }[] {
  if (!votingRoom?.votes || votingRoom.votes.length === 0) {
    return []
  }

  const maxUserCount = Math.max(
    ...votingRoom.votes.map((vote: any) => vote.users.length)
  )

  return votingRoom.votes
    .filter((vote: any) => vote.users.length === maxUserCount)
    .map((vote: any) => ({
      voteName: vote.vote,
      userCount: vote.users.length,
    }))
}
