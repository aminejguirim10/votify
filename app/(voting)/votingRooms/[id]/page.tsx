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
  return <div>VotingRoomPage</div>
}

export default VotingRoomPage
