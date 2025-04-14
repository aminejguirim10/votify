"use client"
import { useDropzone } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { useUploadThing } from "@/lib/uploadthing"
import { useCallback, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { toast as useToast } from "@/hooks/use-toast"

import { useRouter } from "next/navigation"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getFallback } from "@/lib/utils"
import { updateUser } from "@/actions/user.actions"
import { votingProfileSchema } from "@/lib/schema"
export default function VotingPVotingProfileFormrofileForm({
  name,
  image,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  name: string
  image: string
}) {
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
          "There was an error updating your profile. The photo must be less than 4MB.",
        variant: "destructive",
      })
    },
    onUploadBegin: () => {},
  })
  useEffect(() => {
    if (urlsUpdated) {
      const UpdateUserProfile = async () => {
        const response = await updateUser(form.getValues().name, urls[0])
        if (response.status === 200) {
          setFiles([])
          setUrls([])
          setPreview("")
          setLoading(false)

          // Mettre à jour le contexte ou l'état global ici
          // Exemple : updateGlobalUserContext({ name: form.getValues().name, image: urls[0] })

          toast("Profile Updated", {
            description: "Your profile has been updated successfully",
            style: {
              backgroundColor: "#ebebe9",
              color: "#307491",
              fontWeight: "bold",
            },
          })
        } else {
          setLoading(false)
          useToast({
            title: "Update Error",
            description: "There was an error updating your profile",
            variant: "destructive",
          })
        }
        setIsOpen(false)
        setUrlsUpdated(false)
      }
      UpdateUserProfile()
    }
  }, [urlsUpdated, urls])
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })
  const form = useForm<z.infer<typeof votingProfileSchema>>({
    resolver: zodResolver(votingProfileSchema),
    defaultValues: {
      name: name || "",
      image: image || "",
    },
  })
  async function onSubmit(values: z.infer<typeof votingProfileSchema>) {
    setLoading(true)
    if (preview) {
      startUpload(files)
    } else {
      const response = await updateUser(form.getValues().name, urls[0])
      if (response.status === 200) {
        setFiles([])
        setUrls([])
        setPreview("")
        setLoading(false)
        router.refresh()

        toast("Profile Updated", {
          description: "Your profile has been updated successfully",
          style: {
            backgroundColor: "#ebebe9",
            color: "#307491",
            fontWeight: "bold",
          },
        })
      } else {
        setLoading(false)
        useToast({
          title: "Update Error",
          description: "There was an error updating your profile.",
          variant: "destructive",
        })
      }
      setIsOpen(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-2 md:mt-3">
          <div
            className={`space-y-2 rounded-lg px-4 py-2 outline-dashed outline-2 outline-gray-400 md:space-y-4 md:py-4 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <div className="flex justify-center">
              <Avatar
                {...getRootProps()}
                className="size-12 cursor-pointer content-center md:size-20"
              >
                <AvatarImage
                  src={preview || image || `https://avatar.vercel.sh/${name}`}
                />
                <AvatarFallback>{getFallback(name)}</AvatarFallback>
                <input {...getInputProps()} disabled={loading} />
              </Avatar>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Username"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                type="submit"
                className="mt-4 flex w-full gap-3 py-4"
                disabled={loading}
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    className="inline h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.828C84.9918 29.0405 86.963 32.6785 88.4303 36.607C89.3271 38.9051 91.5422 40.6043 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                {loading ? "Loading" : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
