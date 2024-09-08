import { Separator } from "@/components/ui/separator"
import VotingCreateVotingRoom from "@/components/layout/voting-create-voting-room"
import VotingJoinVotingRoom from "@/components/layout/voting-join-voting-room"
import { User } from "@prisma/client"
const VotingRoomsOptions = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-1">
      <VotingCreateVotingRoom user={user as any} />
      <Separator className="my-2 w-[90%] self-center bg-primary/50" />
      <VotingJoinVotingRoom user={user as any} />
    </div>
  )
}

export default VotingRoomsOptions
