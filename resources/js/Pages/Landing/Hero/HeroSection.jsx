import heroBackgroud from '@images/landing/heroSection/heroBackground.jpg'

export default function HeroSection(){
  return(
    <section className="min-h-[100vh] w-full">
      <img className='h-[100vh]' src={heroBackgroud} alt="" />
    </section>
  )
}