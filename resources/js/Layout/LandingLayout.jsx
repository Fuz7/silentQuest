import { Link } from "@inertiajs/react"
import navHomeIcon from '@images/landing/navHomeIcon.svg'
import navAccountIcon from '@images/landing/navAccountIcon.svg'
import { useRoute } from '@vendor/tightenco/ziggy'
import HeroSection from "../Pages/Landing/Hero/HeroSection"
import { motion, useScroll } from "motion/react"
export default function LandingLayout({ }) {
  const route = useRoute()




  return (
    <>
      <main id="scroller" className="relative ">
          {/* part of hero section is in here */}
          <HeroSection />


        <section className="min-h-[100vh]">
            <Navbar />
        </section>
      </main>
    </>
  )
}

function Navbar() {
  return (<header className="sticky top-0 w-full">
    <nav className="pt-[25px] px-[120px] flex justify-between items-center">
      <Link href={'/'}>
        <img src={navHomeIcon} alt="" />
      </Link>
      <div className="h-fit">
        <Link href={route('login')} className="flex gap-[10px] items-center">
          <p className="text-[14px] font-Poppins-Regular">Login/Register</p>
          <img src={navAccountIcon} alt="" />
        </Link>
      </div>
    </nav>
  </header>);
}