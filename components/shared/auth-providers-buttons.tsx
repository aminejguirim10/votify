"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Icons } from "@/components/shared/icons"
const AuthProvidersButtons = ({
  text,
  loading,
}: {
  text: string
  loading: boolean
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-sm:flex-col">
      <Button
        className="flex w-full gap-4"
        variant={"outline"}
        onClick={() => {
          signIn("google")
        }}
        disabled={loading}
      >
        <Icons.googleAuth className="h-6 w-6" />
        <span className="font-bold">{text} with Google</span>
      </Button>
      <Button
        className="flex w-full gap-4"
        variant={"outline"}
        onClick={() => {
          signIn("github")
        }}
        disabled={loading}
      >
        <Icons.githubAuth className="h-6 w-6" />
        <span className="font-bold">{text} with Github</span>
      </Button>
    </div>
  )
}

export default AuthProvidersButtons
