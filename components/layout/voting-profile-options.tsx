import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFallback } from "@/lib/utils"
import VotingProfileOptionsButtons from "@/components/layout/voting-profile-options-buttons"

const VotingProfileOptions = ({
  name,
  image,
}: {
  name: string
  image: string
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary">
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={image || `https://avatar.vercel.sh/${name}`} />
            <AvatarFallback>{getFallback(name)}</AvatarFallback>
          </Avatar>

          {name}
        </div>
      </PopoverTrigger>
      <PopoverContent className="mb-2 ml-4 w-fit">
        <VotingProfileOptionsButtons name={name} image={image} />
      </PopoverContent>
    </Popover>
  )
}

export default VotingProfileOptions
