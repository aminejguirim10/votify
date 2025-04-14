"use client"
import React, { useState } from "react"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import VotingProfileForm from "@/components/form/voting-profile-form"

const VotingProfileOptionsButtons = ({
  name,
  image,
}: {
  name: string
  image: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-fit items-center justify-center gap-2 font-bold"
          >
            <Icons.user className="size-4 font-bold text-teal-600" />
            Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              Update your profile information.
            </DialogDescription>
          </DialogHeader>
          <VotingProfileForm
            name={name}
            image={image}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </DialogContent>
      </Dialog>
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
