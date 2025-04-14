import VotingCreateVote from "@/components/app/voting-create-vote"
import VotingMakeVote from "@/components/app/voting-make-vote"
import VotingNoVotes from "@/components/app/voting-no-votes"
import VotingVoteCard from "@/components/app/voting-vote-card"
import CountDown from "@/components/ui/countdown"
import prisma from "@/lib/db"
import { ServerSession } from "@/lib/session"
import { getVotesWithMostUsers } from "@/lib/utils"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import type { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const votingRoom = await prisma.votingRoom.findUnique({
    where: {
      id: params.id,
    },
  })
  return {
    title: votingRoom?.name,
    description: votingRoom?.description,
  }
}
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
          users: true,
        },
      },
    },
  })

  const mostPopularVote = getVotesWithMostUsers(votingRoom)

  return (
    <div className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      <div className="flex flex-col gap-4">
        {/*TODO: Improve the ui for CountDown  */}
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <CountDown title="Deadline" deadline={votingRoom?.deadline!} />
          {votingRoom?.deadline &&
            new Date(votingRoom.deadline) >= new Date() &&
            votingRoom?.votes &&
            votingRoom?.votes.length > 0 && (
              <div className="flex items-center">
                <VotingMakeVote
                  user={session.user as User}
                  votes={votingRoom.votes}
                />
              </div>
            )}
        </div>
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
        {votingRoom?.deadline &&
          new Date(votingRoom.deadline) <= new Date() &&
          mostPopularVote.length > 0 &&
          mostPopularVote.map((vote) => (
            <div
              key={vote.voteName}
              className="rounded-lg border bg-muted p-4 text-center"
            >
              <h2 className="text-lg font-semibold">
                Most popular vote:
                <span className="text-primary">{vote.voteName}</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                {vote.userCount} votes
              </p>
            </div>
          ))}
        {votingRoom?.votes && votingRoom?.votes.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {votingRoom?.votes.map((vote) => {
              return (
                <VotingVoteCard
                  key={vote.id}
                  vote={vote}
                  user={session.user as User}
                  votingRoom={votingRoom}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default VotingRoomPage
