import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const ServerSession = async () => {
  return await getServerSession(authOptions)
}
