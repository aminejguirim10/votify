import VotingCreateVote from "@/components/app/voting-create-vote"
import VotingNoVotes from "@/components/app/voting-no-votes"
import VotingVoteCard from "@/components/app/voting-vote-card"
import CountDown from "@/components/ui/countdown"
import prisma from "@/lib/db"
import { ServerSession } from "@/lib/session"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"

const VotingRoomPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const session = await ServerSession()
  if (!session) {
    redirect("/signin")
  }
  const votingRoom = await prisma.votingRoom.findUnique({
    where: {
      id,
    },
    include: {
      votes: {
        include: {
          _count: true,
        },
      },
    },
  })

  return (
    <div className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      <div className="flex flex-col gap-4">
        {/*TODO: Improve the ui for CountDown  */}
        <CountDown title="Deadline" deadline={votingRoom?.deadline!} />
        {/*TODO: Improve the ui for create vote  */}
        {votingRoom?.votes &&
          votingRoom?.votes?.length > 0 &&
          session?.user.id === votingRoom?.creatorId && (
            <div className="mt-4">
              <VotingCreateVote
                user={session.user as any}
                votingRoom={votingRoom}
              />
            </div>
          )}
        {votingRoom?.votes.length === 0 && (
          <VotingNoVotes user={session.user as User} votingRoom={votingRoom} />
        )}
        {votingRoom?.votes && votingRoom?.votes.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {votingRoom?.votes.map((vote) => (
              <VotingVoteCard
                key={vote.id}
                vote={vote}
                user={session.user as User}
                votingRoom={votingRoom}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VotingRoomPage
