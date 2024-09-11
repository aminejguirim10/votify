import VotingCreateVote from "@/components/app/voting-create-vote"
import CountDown from "@/components/ui/countdown"
import prisma from "@/lib/db"
import { ServerSession } from "@/lib/session"
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
      votes: true,
    },
  })

  return (
    <div className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      <div className="flex flex-col gap-4">
        {/*TODO: Improve the ui for CountDown  */}
        <CountDown title="Deadline" deadline={votingRoom?.deadline!} />
        {/*TODO: Improve the ui for create vote  */}
        {session?.user.id === votingRoom?.creatorId && (
          <VotingCreateVote
            user={session.user as any}
            votingRoom={votingRoom}
          />
        )}
      </div>
    </div>
  )
}

export default VotingRoomPage
