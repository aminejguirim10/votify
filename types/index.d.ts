import { VotingRoom, Vote } from "@prisma/client"
declare type VotingRoomFetched = VotingRoom & {
  votes: Vote[]
}
