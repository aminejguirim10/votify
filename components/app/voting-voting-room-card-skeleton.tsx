import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/shared/icons"

const VotingRoomCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3">
            <Skeleton className="mb-1 h-6 w-20" />
            <Icons.bar className="text-[#307491]/75" />
            <Skeleton className="-ml-4 h-6 w-20" />
          </div>
          <Skeleton className="h-8 w-10" />
        </div>

        <CardTitle className="max-w-96 truncate lg:max-w-xs xl:max-w-xl">
          <Skeleton className="h-6 w-full" />
        </CardTitle>
        <CardDescription className="line-clamp-4">
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default VotingRoomCardSkeleton
