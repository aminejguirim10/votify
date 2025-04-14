import HomeHero from "@/components/app/home-hero"
import HomeVotingSystem from "@/components/app/home-voting-system"
import HomeServices from "@/components/app/home-services"
import HomeTestimonials from "@/components/app/home-testimonials"
import HomeFooter from "@/components/app/home-footer"

const HomePage = () => {
  return (
    <section>
      <HomeHero />
      <HomeVotingSystem />
      <HomeServices />
      <HomeTestimonials />
      <HomeFooter />
    </section>
  )
}

export default HomePage
