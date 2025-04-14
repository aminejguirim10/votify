import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function VotingRoomLoading() {
  return (
    <div className="mx-auto flex max-w-full flex-col gap-12 p-8 md:p-12 lg:p-16">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Skeleton className="h-10 w-full" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="mx-auto w-full max-w-md">
            <CardHeader>
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
