import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { Icons } from "../shared/icons"

const HomeVotingSystem = () => {
  return (
    <section id="about" className="relative px-6 py-10">
      <div className="mx-auto max-w-screen-md">
        <div className="">
          <div className="flex flex-1 flex-col items-center justify-center gap-12 md:flex-row md:text-left">
            <div className="flex flex-col gap-4 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
                How Our Voting System Works
              </h2>
              <p className="mb-6 text-justify text-sm text-muted-foreground md:text-base">
                Our voting system allows the creator of each room to design and
                create the elements of the vote.
              </p>
              <div className="flex gap-2">
                <Link href="/#services">
                  <Button variant={"outline"}>Learn More</Button>
                </Link>
                <Link href={"/signup"}>
                  <Button variant={"ghost"} className="flex gap-1">
                    Sign Up
                    <Icons.arrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/assets/img2.png"
                alt="Voting System"
                width={1800}
                height={1800}
                className="w-[500px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeVotingSystem
