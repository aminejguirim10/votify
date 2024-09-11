"use server"

import prisma from "@/lib/db"
import { ServerSession } from "@/lib/session"
import { User, VotingRoom } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getVotingRooms(userId: string) {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }

    const votingRooms = await prisma.votingRoom.findMany({
      where: {
        OR: [
          {
            creatorId: userId,
          },
          {
            votersIds: {
              has: userId,
            },
          },
        ],
      },
    })
    return votingRooms
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export async function createVotingRoom(
  creator: User,
  votingRoomCode: string,
  description: string,
  name: string,
  deadline: Date
) {
  try {
    const session = await ServerSession()
    if (!session)
      return {
        status: 403,
        message: "Unauthorized",
      }
    await prisma.votingRoom.create({
      data: {
        creatorId: creator.id,
        votingRoomCode,
        deadline,
        description,
        name,
      },
    })
    revalidatePath("/votingRooms")
    return {
      status: 201,
      message: "Voting room created successfully",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export const joinVotingRoom = async (votingRoomCode: string, user: User) => {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    const votingRoom = await prisma.votingRoom.findUnique({
      where: {
        votingRoomCode,
      },
      include: {
        voters: true,
      },
    })

    if (!votingRoom) {
      return {
        status: 404,
        message: "Voting room not found",
      }
    }

    if (votingRoom.deadline < new Date()) {
      return {
        status: 403,
        message: "Voting room is closed",
      }
    }

    if (votingRoom.creatorId === user.id) {
      return {
        status: 403,
        message: "You are the creator of the voting room",
      }
    }

    if (votingRoom.voters.some((voter) => voter.id === user.id)) {
      return {
        status: 400,
        message: "You have already joined the voting room",
      }
    }
    await prisma.votingRoom.update({
      where: {
        votingRoomCode,
      },
      data: {
        voters: {
          connect: {
            id: user.id,
          },
        },
        votersIds: {
          push: user.id,
        },
      },
    })
    revalidatePath("/votingRooms")
    return {
      status: 200,
      message: "Successfully joined the voting room",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export const deleteVotingRoom = async (user: User, votingRoom: VotingRoom) => {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    if (votingRoom.creatorId !== user.id) {
      return {
        status: 403,
        message: "Unauthorized",
      }
    }
    const users = await prisma.user.findMany({
      where: {
        votingRooms: {
          some: {
            id: votingRoom.id,
          },
        },
      },
    })

    for (const user of users) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          votingRooms: {
            disconnect: {
              id: votingRoom.id,
            },
          },
        },
      })
    }

    await prisma.votingRoom.delete({
      where: {
        id: votingRoom.id,
      },
    })
    revalidatePath("/votingRooms")
    return {
      status: 200,
      message: "Voting room deleted successfully",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}

export const updateVotingRoom = async (
  user: User,
  votingRoom: VotingRoom,
  name: string,
  description: string,
  deadline: Date
) => {
  try {
    const session = await ServerSession()
    if (!session) return { status: 403, message: "Unauthorized" }
    if (votingRoom.creatorId !== user.id) {
      return {
        status: 403,
        message: "Unauthorized",
      }
    }
    await prisma.votingRoom.update({
      where: {
        id: votingRoom.id,
      },
      data: {
        name,
        description,
        deadline,
      },
    })
    revalidatePath("/votingRooms")
    return {
      status: 200,
      message: "Voting room updated successfully",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    }
  }
}
