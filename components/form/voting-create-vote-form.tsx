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
import { useCallback, useEffect, useState } from "react"
import { User, VotingRoom } from "@prisma/client"
import { votingCreateVoteSchema } from "@/lib/schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { toast as useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/shared/icons"
import { createVote } from "@/actions/vote.actions"
const VotingCreateVoteForm = ({
  user,
  setOpen,
  open,
  votingRoom,
}: {
  setOpen: (open: boolean) => void
  open: boolean
  user: User
  votingRoom: VotingRoom
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
  const form = useForm<z.infer<typeof votingCreateVoteSchema>>({
    resolver: zodResolver(votingCreateVoteSchema),
    defaultValues: {
      vote: "",
      url: "",
    },
  })
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      setUrls(res.map((file) => file.url))
      setUrlsUpdated(true)
    },
    onUploadError: () => {
      setLoading(false)
      useToast({
        title: "Upload Error",
        description:
          "There was an error updating the vote image. The photo must be less than 4MB.",
        variant: "destructive",
      })
    },
    onUploadBegin: () => {},
  })
  useEffect(() => {
    if (urlsUpdated) {
      const CreateVote = async () => {
        const response = await createVote(
          votingRoom.id,
          user.id,
          form.getValues().vote,
          urls[0] || ""
        )
        if (response.status === 201) {
          setFiles([])
          setUrls([])
          setPreview("")
          setLoading(false)
          setOpen(false)
          toast("Vote Created", {
            description: "You have successfully created a vote",
          })
          router.refresh()
        } else {
          setLoading(false)
          useToast({
            title: "Vote Error",
            description: "There was an error creating the vote",
            variant: "destructive",
          })
        }
        setUrlsUpdated(false)
      }
      CreateVote()
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

  async function onSubmit(values: z.infer<typeof votingCreateVoteSchema>) {
    setLoading(true)
    if (preview) {
      startUpload(files)
    } else {
      const response = await createVote(
        votingRoom.id,
        user.id,
        values.vote,
        urls[0] || ""
      )
      if (response.status === 201) {
        setFiles([])
        setUrls([])
        setPreview("")
        setLoading(false)
        setOpen(false)
        toast("Vote Created", {
          description: "You have successfully created a vote",
        })
        router.refresh()
      } else {
        setLoading(false)
        useToast({
          title: "Vote Error",
          description: "There was an error creating the vote",
          variant: "destructive",
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
              <div
                {...getRootProps()}
                className={`cursor-pointer rounded-lg py-2 outline-dashed outline-2 outline-gray-400 md:py-4 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <input
                  {...getInputProps()}
                  disabled={loading}
                  multiple={false}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col gap-1 text-center text-muted-foreground max-md:text-sm">
                    <span>
                      Drag and drop your image here, or click to select a file.
                    </span>
                    <span className="text-sm text-blue-400 max-md:text-xs">
                      The photo must be less than 4 MB.
                    </span>
                  </div>
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file, index) => (
            <div
              key={index}
              className={`flex items-center justify-between rounded-lg border-2 border-gray-200 p-2 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <span className="max-w-xs truncate">{file.name}</span>
              <div>
                <Icons.delete
                  onClick={() => removeFile(file)}
                  className={`size-6 cursor-pointer rounded-full p-1 text-red-500 ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default VotingCreateVoteForm
