import { User, VotingRoom } from "@prisma/client"
import { Icons } from "@/components/shared/icons"
import VotingCreateVote from "./voting-create-vote"

const VotingNoVotes = ({
  user,
  votingRoom,
}: {
  user: User
  votingRoom: VotingRoom
}) => {
  return (
    <div className="mt-6 flex min-h-[60vh] flex-col items-center justify-center rounded-lg outline-dashed outline-2 outline-teal-600 md:min-h-[68vh] lg:mt-12 lg:min-h-[60vh]">
      <div className="flex flex-col items-center justify-center gap-4 text-teal-700">
        <Icons.votingRoom className="size-10 md:size-14" />
        <div className="max-w-[550px] text-center text-lg font-semibold text-sky-500 max-md:max-w-60 sm:text-xl md:text-2xl lg:text-3xl">
          {votingRoom.creatorId === user.id
            ? "You are the creator please create some votes"
            : "Wait for the creator to create some votes"}
        </div>

        <VotingCreateVote
          user={user}
          votingRoom={votingRoom}
          className="w-[300px] max-md:w-[210px]"
        />
      </div>
    </div>
  )
}

export default VotingNoVotes
