import heroBackground from '@images/landing/heroSection/heroBackground.jpg'
import landingDropDown from '@images/landing/heroSection/landingDropDown.svg'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef } from 'react'

export default function HeroSection() {

  const scrollerRef = useRef(document.body)
  const targetRef = useRef(null)

  const { scrollYProgress, scrollY } = useScroll({
    target:targetRef,
  })


  useMotionValueEvent(scrollYProgress, "change", (current) => {
    console.log(current)
  })

  const maskSize = useTransform(scrollYProgress,[0,1],['500px 350px','3000px 2400px'])


  return (
    <>
      <motion.section ref={targetRef} className="min-h-[300vh] mb-[1000px] relative">
        <div className="absolute left-0 top-0 w-full min-h-[300vh] ">
          <motion.div className="min-h-[100vh] sticky top-0 text-[#272628]">
            <h1 className="absolute left-[30px] top-[-30px] font-Poppins-Bold text-[200px]">SILENT QUEST</h1>
            <p className="font-Salsa text-[24px] absolute top-[320px] left-[70px] ">Breathe In. Let Go. Level Up</p>
            <p className="font-Salsa text-[24px] absolute top-[700px] left-[550px] ">Peace is Just a Breath Away</p>
            <p className="font-Salsa text-[24px] absolute top-[450px] left-[1010px] ">Peace is Just a Breath Away</p>
            <div className="font-Salsa text-[24px] absolute bottom-[33px] right-[70px]
              flex gap-[16px] items-center">
              <p>Step into serenity</p>
              <img src={landingDropDown} alt="" />
            </div>
          </motion.div>
        </div>
        <motion.div
          style={{
              maskSize
          }}
          // initial={{maskSize:'500px 350px'}}
          // transition={{duration:3}}
          // animate={{maskSize:'3000px 2400px'}}
          className="flower sticky top-0">
          <img className="h-[100vh] object-cover object-left-top" src={heroBackground} alt="" />
        </motion.div>
      </motion.section>
    </>
  )
}

