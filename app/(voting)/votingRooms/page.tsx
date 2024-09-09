import { getVotingRooms } from "@/actions/voting-room.actions"
import VotingVotingRoomCard from "@/components/app/voting-voting-room-card"
import { ServerSession } from "@/lib/session"
import { VotingRoomFetched } from "@/types"
import { User, VotingRoom } from "@prisma/client"

const VotingRoomsPage = async () => {
  const session = await ServerSession()
  const votingRooms = (await getVotingRooms(
    session?.user.id!
  )) as VotingRoomFetched[]

  return (
    <section className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {votingRooms.map((votingRoom: VotingRoom) => (
          <VotingVotingRoomCard
            key={votingRoom.id}
            votingRoom={votingRoom as VotingRoomFetched}
            user={session?.user as User}
          />
        ))}
      </div>
    </section>
  )
}

export default VotingRoomsPage
