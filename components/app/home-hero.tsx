import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CircleArrowDown, Zap } from "lucide-react"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import Link from "next/link"

const HomeHero = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-[1] max-w-screen-md text-center">
        <Badge className="rounded-full border-none">
          <Zap className="fill-current" />
          Votify Website
        </Badge>
        <h1 className="mt-6 text-4xl font-bold !leading-[1.2] tracking-tight sm:text-5xl md:text-6xl">
          Welocome to our Voting Website
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Create your own voting rooms and share it with your friends and
          family. A modern, fast, and secure voting website, designed to offer
          users a smooth experience. Whether it's managing votes,everything is
          in your hands. Ready to make your voice count? 🚀
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href={"/votingRooms"}>
            <Button size="lg" className="rounded-full text-base">
              Create Your Own Room
              <CircleArrowDown className="!h-5.5 !w-5.5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
