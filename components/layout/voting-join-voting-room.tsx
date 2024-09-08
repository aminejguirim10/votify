import VotingJoinVotingRoomForm from "@/components/form/voting-join-voting-room-form"
import { User } from "@prisma/client"
const VotingJoinVotingRoom = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="pl-3 text-sm font-medium text-muted-foreground">
        Join Voting Room
      </span>
      <VotingJoinVotingRoomForm user={user} />
    </div>
  )
}

export default VotingJoinVotingRoom
