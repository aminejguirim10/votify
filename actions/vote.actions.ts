"use server"

import prisma from "@/lib/db"
import { ServerSession } from "@/lib/session"

export async function createVote(
  votingRoomId: string,
  userId: string,
  vote: string,
  url: string
) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }

    const votingRoom = await prisma.votingRoom.findUnique({
      where: {
        id: votingRoomId,
      },
    })

    if (!votingRoom) return { status: 404, message: "Voting room not found" }

    if (userId !== votingRoom.creatorId)
      return { status: 403, message: "Unauthorized" }

    await prisma.vote.create({
      data: {
        url,
        vote,
        votingRoomId,
      },
    })
    return { status: 201, message: "Vote created successfully" }
  } catch (error: any) {
    return { status: 500, message: error.message }
  }
}

export async function updateVote(
  voteId: string,
  votingRoomId: string,
  userId: string,
  vote: string,
  url: string
) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    const votingRoom = await prisma.votingRoom.findUnique({
      where: {
        id: votingRoomId,
      },
    })

    if (!votingRoom) return { status: 404, message: "Voting room not found" }

    if (userId !== votingRoom.creatorId)
      return { status: 403, message: "Unauthorized" }

    await prisma.vote.update({
      where: {
        id: voteId,
      },
      data: {
        url,
        vote,
      },
    })

    return { status: 200, message: "Vote updated successfully" }
  } catch (error: any) {
    return { status: 500, message: error.message }
  }
}

export async function deleteVote(
  voteId: string,
  votingRoomId: string,
  userId: string
) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    const votingRoom = await prisma.votingRoom.findUnique({
      where: {
        id: votingRoomId,
      },
    })

    if (!votingRoom) return { status: 404, message: "Voting room not found" }

    if (userId !== votingRoom.creatorId)
      return { status: 403, message: "Unauthorized" }

    await prisma.vote.delete({
      where: {
        id: voteId,
      },
    })

    return { status: 200, message: "Vote deleted successfully" }
  } catch (error: any) {
    return { status: 500, message: error.message }
  }
}

export async function getVotes(votingRoomId: string) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    const votes = await prisma.vote.findMany({
      where: {
        votingRoomId,
      },
    })
    return votes
  } catch (error: any) {
    return { status: 500, message: error.message }
  }
}

export async function makeVote(voteId: string, userId: string) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }

    const vote = await prisma.vote.findUnique({
      where: {
        id: voteId,
      },
    })

    if (!vote) return { status: 404, message: "Vote not found" }

    await prisma.vote.update({
      where: {
        id: voteId,
      },

      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return { status: 200, message: "Vote made successfully" }
  } catch (error: any) {
    return { status: 500, message: error.message }
  }
}
