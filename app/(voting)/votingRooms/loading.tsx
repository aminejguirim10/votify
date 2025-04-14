import VotingRoomCardSkeleton from "@/components/app/voting-voting-room-card-skeleton"

export default function Loading() {
  return (
    <section className="mx-auto max-w-full p-8 md:p-12 lg:p-16">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <VotingRoomCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}
