import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function HomeTestimonials() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            What our users say about us
          </h2>
          <p>
            We are proud to have a community of users who trust Votify for their
            voting needs. Their feedback drives our continuous improvement.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-2 sm:col-span-2 sm:p-6 md:gap-8 lg:row-span-2">
            <CardHeader>
              <Image
                src={"/assets/logo.png"}
                width={1200}
                height={1200}
                className="h-[50px] w-[50px]"
                alt="Votify Logo"
              />
            </CardHeader>
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="md:text-xl md:font-medium">
                  Votify has revolutionized how we conduct our student council
                  elections. The platform is incredibly secure and
                  user-friendly. Setting up elections is straightforward, and
                  the real-time results feature has made the entire voting
                  process transparent and efficient. It's exactly what our
                  university needed.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
                      alt="Shekinah Tshiokufila"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="text-sm font-semibold">
                      Shekinah Tshiokufila
                    </cite>
                    <span className="block text-sm font-medium text-muted-foreground">
                      Student Council President
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="md:text-xl md:font-medium">
                  Votify made our club elections seamless and secure. The
                  interface is intuitive and the verification system ensures
                  complete integrity of the voting process.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                      alt="Jonathan Yombo"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>JY</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-semibold">
                      Jonathan Yombo
                    </cite>
                    <span className="block text-sm text-muted-foreground">
                      Club Organizer
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  The analytics and reporting features in Votify are
                  outstanding. It helped us understand voter patterns and make
                  our election process more engaging.
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
                      alt="Yucel Faruksahan"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>YF</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-semibold">
                      Yucel Faruksahan
                    </cite>
                    <span className="block text-sm text-muted-foreground">
                      Election Coordinator
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="card variant-mixed">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  As a community leader, I appreciate how Votify has simplified
                  our decision-making process. The mobile voting feature is
                  particularly helpful for our diverse member base.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      alt="Angela Okello"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>AO</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-semibold">Angela Okello</cite>
                    <span className="block text-sm text-muted-foreground">
                      Community Leader
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
