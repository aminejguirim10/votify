import { getVotingRooms } from "@/actions/voting-room.actions"
import VotingNoVotingRooms from "@/components/app/voting-no-voting-rooms"
import VotingVotingRoomCard from "@/components/app/voting-voting-room-card"
import { ServerSession } from "@/lib/session"
import { User, VotingRoom } from "@prisma/client"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Voting Rooms",
  description:
    "Voting rooms for you to join and vote for your favorite options.",
}

const VotingRoomsPage = async () => {
  const session = await ServerSession()
  const votingRooms = (await getVotingRooms(session?.user.id!)) as VotingRoom[]

  return (
    <section className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      {votingRooms.length === 0 && (
        <VotingNoVotingRooms user={session?.user as User} />
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {votingRooms.map((votingRoom: VotingRoom) => (
          <VotingVotingRoomCard
            key={votingRoom.id}
            votingRoom={votingRoom}
            user={session?.user as User}
          />
        ))}
      </div>
    </section>
  )
}

export default VotingRoomsPage
