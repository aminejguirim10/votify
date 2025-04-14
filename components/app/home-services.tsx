import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReactNode } from "react"
import { Icons } from "@/components/shared/icons"

export default function HomeServices() {
  return (
    <section
      id="services"
      className="bg-zinc-50 py-16 dark:bg-transparent md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4">
            We offer a range of services to help you create and manage your
            voting rooms.
          </p>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-1 gap-6 *:text-center md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Icons.vote className="size-8" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-semibold">Join Existing Voting Rooms</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Discover and join existing voting rooms created by others.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Icons.box className="size-8" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-semibold">Engage with the Community</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Connect with like-minded individuals and participate in
                meaningful discussions.
              </p>
            </CardContent>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Icons.bell className="size-8" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-semibold">Stay Informed and Updated</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Receive notifications about new voting rooms and important
                updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial absolute inset-0 from-transparent to-background to-75%"
    />
    <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-background">
      {children}
    </div>
  </div>
)
