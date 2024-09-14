"use client"

import { useDropzone } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useUploadThing } from "@/lib/uploadthing"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { votingUpdateVoteSchema } from "@/lib/schema"
import { toast } from "sonner"
import { User, Vote, VotingRoom } from "@prisma/client"
import { updateVote } from "@/actions/vote.actions"
import Image from "next/image"

const VotingUpdateVoteForm = ({
  user,
  votingRoom,
  setIsOpen,
  open,
  vote,
}: {
  user: User
  votingRoom: VotingRoom
  vote: Vote
  setIsOpen: (open: boolean) => void
  open: boolean
}) => {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [urls, setUrls] = useState<string[]>([])
  const [preview, setPreview] = useState<string>("")
  const [urlsUpdated, setUrlsUpdated] = useState(false)
  const router = useRouter()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    const file = acceptedFiles[0]
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
  }, [])
  const form = useForm<z.infer<typeof votingUpdateVoteSchema>>({
    resolver: zodResolver(votingUpdateVoteSchema),
    defaultValues: {
      vote: vote.vote,
      url: vote.url,
    },
  })
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      setUrls(res.map((file) => file.url))
      setUrlsUpdated(true)
    },
    onUploadError: () => {
      setLoading(false)
      toast("Upload Error", {
        style: {
          background: "#af0808",
          color: "black",
          fontWeight: "bold",
        },
        description: (
          <span className="text-sm text-black/80">
            There was an error updating the vote image. The photo must be less
            than 4MB.
          </span>
        ),
      })
    },
    onUploadBegin: () => {},
  })

  useEffect(() => {
    if (urlsUpdated) {
      const UpdateVote = async () => {
        const response = await updateVote(
          vote.id,
          votingRoom.id,
          user.id,
          form.getValues().vote,
          urls[0]
        )
        if (response.status === 200) {
          setFiles([])
          setUrls([])
          setPreview("")
          setLoading(false)
          setIsOpen(false)
          toast("Vote Updated", {
            style: {
              background: "#ebebe9",
              color: "#307491",
              fontWeight: "bold",
            },
            description: (
              <span className="text-sm text-muted-foreground">
                You have successfully updated the vote
              </span>
            ),
          })
          router.refresh()
        } else {
          setLoading(false)
          toast("Vote Error", {
            style: {
              background: "#af0808",
              color: "black",
              fontWeight: "bold",
            },
            description: (
              <span className="text-sm text-muted-foreground">
                You have successfully updated the vote
              </span>
            ),
          })
        }
        setUrlsUpdated(false)
      }
      UpdateVote()
    }
  }, [urlsUpdated, urls])
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })
  const removeFile = (fileToRemove: File) => {
    if (!loading) {
      setFiles(files.filter((file) => file !== fileToRemove))
    }
  }

  async function onSubmit(values: z.infer<typeof votingUpdateVoteSchema>) {
    setLoading(true)
    if (preview) {
      startUpload(files)
    } else {
      const response = await updateVote(
        vote.id,
        votingRoom.id,
        user.id,
        values.vote,
        urls[0]
      )
      if (response.status === 200) {
        setFiles([])
        setUrls([])
        setPreview("")
        setLoading(false)
        setIsOpen(false)
        toast("Vote Updated", {
          style: {
            background: "#ebebe9",
            color: "#307491",
            fontWeight: "bold",
          },
          description: (
            <span className="text-sm text-muted-foreground">
              You have successfully updated the vote
            </span>
          ),
        })
        router.refresh()
      } else {
        setLoading(false)
        toast("Vote Error", {
          style: {
            background: "#af0808",
            color: "black",
            fontWeight: "bold",
          },
          description: (
            <span className="text-sm text-black/80">
              There was an error while updating the vote
            </span>
          ),
        })
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="vote"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Vote Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter vote name"
                  {...field}
                  className="placeholder:text-gray-500"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Vote Image</FormLabel>
            </FormItem>
          )}
        />
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg py-2 outline-dashed outline-2 outline-gray-400 md:py-4 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <input {...getInputProps()} disabled={loading} multiple={false} />
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col gap-1 text-center text-muted-foreground max-md:text-sm">
              <Image
                src={
                  preview ||
                  vote.url ||
                  "https://placehold.co/664x410?text=Votify"
                }
                alt="Vote Image"
                width={800}
                height={800}
                className="h-[300px] w-[300px] rounded-lg"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          Update
        </Button>
      </form>
    </Form>
  )
}

export default VotingUpdateVoteForm
