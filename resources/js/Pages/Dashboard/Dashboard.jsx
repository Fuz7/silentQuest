import dashboardIcon from '@images/dashboard/dashboardIcon.svg'
import DashboardLayout from '../../Layout/DashboardLayout'
import dashboardExperienceBackground from
  '@images/dashboard/dashboardExperienceBackground.jpg'
import dashboardQuoteBackground from
  '@images/dashboard/dashboardQuoteBackground.jpg'
import dashboardMeditationIcon from
  '@images/dashboard/dashboardMeditationIcon.svg'
import dashboardMusicCardIcon from
  '@images/dashboard/dashboardMusicCardIcon.svg'
import dashboardKnowMoreCardIcon from
  '@images/dashboard/dashboardKnowMoreCardIcon.svg'
import { Link } from '@inertiajs/react'
import { useRoute } from "@vendor/tightenco/ziggy";


export default function Dashboard({ auth, date }) {
  console.log(auth)
  const route = useRoute();
  return (<>
         <div className="flex flex-col w-[1000px]">
          <Header auth={auth} />
          <Date date={date} />
          <h3 className='font-Poppins-Medium text-[25px] mt-[25px] ml-[40px]'>Some Insights</h3>
          <div className='flex min-w-full gap-[20px] mt-[40px] ml-[40px] flex-wrap'>
            <ExperienceCard />
            <ExerciseCard />
            <QuoteCard />
            <MeditationTimeCard />
            <MusicTimeCard />
            <KnowMoreCard />
          </div>
        </div>
  </>)
}

function Header({ auth }) {
  return (
    <>
      <div className="w-full h-[220px] bg-homeGradient rounded-[20px] 
            mt-[100px] relative pl-[40px] pt-[40px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="text-[#272628] font-Poppins-Medium text-[40px] leading-none">Hi {auth.username}</h2>
        <p className="font-Poppins-Regular mt-[46px] text-[#727272] leading-[110%] text-[18px] max-w-[532px]">
          Welcome back {auth.username}. We are glad you are here.
          Inspire the best work in people, enabling them to achieve
          their goals
        </p>
        <img className='absolute right-[22px] bottom-[13px]' src={dashboardIcon} alt="" />
      </div>
    </>
  )
}

function Date({ date }) {
  return (<>
    <div className='self-end mt-[40px] items-center flex gap-[52px]'>
      <p className='font-Poppins-Bold text-[25px] text-[#272628]'>{date.monthName}</p>
      <div className='flex gap-[15px] '>
        {date.weekdays.map((day, index) => {
          return (
            index !== 3 ?
              (<div
                className='w-[50px] aspect-square bg-[#D9D9D9] flex
                  text-[#272628] text-[20px] font-Poppins-Medium rounded-[10px]
                  justify-center items-center'
                key={index + "day"}>
                {day}
              </div>) :
              (
                <div key={index + "day"}
                  className='w-[50px] aspect-square relative'>
                  <span className='absolute top-0 w-full h-[100px] bg-[#4DA1A9] rounded-[10px] py-[14px]
                    text-white font-Poppins-Medium
                    flex items-end justify-center'>{date.dayAbbreviation}</span>
                  <div className='relative aspect-square w-[50px] flex bg-[#79D7BE]
                    rounded-[10px] justify-center items-center text-[20px] text-[#2E5077] 
                    font-Poppins-SemiBold '
                  >{day}

                  </div>
                </div>)
          )
        })}
      </div>
    </div>
  </>)
}

function ExperienceCard() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${dashboardExperienceBackground})`
        }}
        className={`w-[320px] h-[170px] pl-[30px] pt-[30px] flex flex-col
            `}>
        <h4 className='font-Poppins-Medium text-[30px] text-white leading-none'>
          Mindful Seeker</h4>
        <div className='mt-[55px] flex  items-center pr-[20px]'>
          <h5 className='font-Poppins-Regular text-[20px] text-white leading-none'>
            Experience Pts:</h5>
          <p className='font-Poppins-SemiBold text-white text-[24px] ml-auto leading-none'>1900exp</p>
        </div>
      </div>
    </>
  )
}

function ExerciseCard() {
  return (
    <>
      <div className='w-[170px] aspect-square flex flex-col items-center font-Poppins-SemiBold 
            rounded-[20px]
            text-[#2E5077] leading-none bg-[#79D7BE]'>
        <p className='text-[60px] leading-none mt-[40px]'>4</p>
        <h4 className='mt-[20px] text-[20px]'>Exercises</h4>
      </div>
    </>
  )
}

function QuoteCard() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${dashboardQuoteBackground})`
        }}
        className={`w-[430px] h-[170px] pl-[30px] pt-[30px] flex flex-col
            `}>
        <p className='font-Poppins-Regular text-[20px] max-w-[364px] text-white leading-none'>
          "Meditation is a lifelong gift.
          It&apos;s something you can call on at any time. I think it&apos;s a great thing."
        </p>

        <p className='font-Poppins-Regular text-white text-[20px] mt-[30px]
               ml-auto mr-[30px] leading-none'>- Paul McCartney</p>

      </div>
    </>
  )
}

function MeditationTimeCard() {
  return (
    <>
      <div className='w-[352px] h-[170px] flex flex-col pl-[30px] font-Poppins-SemiBold 
              rounded-[20px] relative overflow-hidden
              text-[#272628] leading-none bg-[#D4EDED] '>
        <img className='right-0 bottom-[-40px] absolute ' src={dashboardMeditationIcon} alt="" />
        <p className='text-[60px] leading-none font-Poppins-Bold mt-[40px] ml-[20px]'>12:30</p>
        <h4 className='mt-[20px] text-[20px]'>Meditation Time</h4>
      </div>
    </>
  )
}

function MusicTimeCard() {
  return (
    <div

      className={`w-[300px] h-[170px] pl-[30px] pt-[30px] bg-[#272628] flex flex-col
                font-Poppins-SemiBold rounded-[20px]
            `}>
      <div className='flex gap-[20px] items-center'>
        <img src={dashboardMusicCardIcon} alt="" />
        <h4 className=' text-[20px] text-white leading-none'>
          Music Time</h4>
      </div>

      <p className='ml-[10px] mt-[35px] text-[50px] text-white leading-none'>
        00:00:00</p>

    </div>
  )
}

function KnowMoreCard() {
  return (
    <>
      <Link
        href={route('learn.show')}
        className={`w-[268px] h-[170px] pl-[30px] pt-[30px] bg-[#2E5077] flex flex-col
                font-Poppins-Regular rounded-[20px]
            `}>
        <div className='flex gap-[20px] items-center'>
          <p className=' text-[20px] text-white max-w-[178px] leading-none'>
            Know more about meditations</p>
        </div>
        <img className='w-[30px] aspect-square mt-[18px] ml-auto mr-[50px]' src={dashboardKnowMoreCardIcon} alt="" />
      </Link>
    </>
  )
}