import { Icons } from "@/components/shared/icons"

import VotingCreateVotingRoom from "../layout/voting-create-voting-room"
import { User } from "@prisma/client"
import VotingJoinVotingRoom from "../layout/voting-join-voting-room"
import VotingJoinVotingRoomForm from "../form/voting-join-voting-room-form"
const VotingNoVotingRooms = ({ user }: { user: User }) => {
  return (
    <div className="flex min-h-[86vh] flex-col items-center justify-center rounded-lg outline-dashed outline-2 outline-teal-600">
      <div className="flex flex-col items-center justify-center gap-4 text-teal-700">
        <Icons.votingRoom className="size-10 md:size-14" />
        <div className="text-center text-lg font-semibold text-sky-500 sm:text-xl md:text-2xl lg:text-3xl">
          <p>You don't create or joined a voting room</p>
          <p>Go create or join one now</p>
        </div>
        <div className="border-b border-sky-500 pb-2">
          <VotingCreateVotingRoom user={user} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-center text-sm font-semibold text-card-foreground/90">
            Join Voting Room
          </div>
          <VotingJoinVotingRoomForm user={user} />
        </div>
      </div>
    </div>
  )
}

export default VotingNoVotingRooms
