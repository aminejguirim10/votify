"use client"
import React from "react"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const VotingProfileOptionsButtons = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="ghost"
        className="flex w-fit items-center justify-center gap-2 font-bold"
      >
        <Icons.user className="size-4 font-bold text-teal-600" />
        Profile
      </Button>
      <Button
        variant="ghost"
        className="flex w-fit items-center justify-center gap-2 font-bold"
        onClick={() => signOut()}
      >
        <Icons.logout className="size-4 font-bold text-teal-600" />
        Logout
      </Button>
    </div>
  )
}

export default VotingProfileOptionsButtons
