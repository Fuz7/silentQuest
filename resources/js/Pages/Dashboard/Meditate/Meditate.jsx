import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import meditationTimer from '@images/dashboard/meditate/meditationTimer.svg'
import meditatingPerson from '@images/dashboard/meditate/meditatingPerson.svg'
export default function Meditate() {
  return (
    <BreathingMeditateLayout type={'meditate'}>
      <div className="flex mt-[18px]">
        <div className="flex mt-[32px] flex-col gap-[25px]">
          <button type="button" className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-start items-center rounded-[20px]">
            <span className="mt-[20px] leading-none">Short Session</span>
            <span className="font-Poppins-Regular mt-[12px] leading-none">10 min</span>
          </button>
          <button type="button" className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-start items-center rounded-[20px]">
            <span className="mt-[20px] leading-none">Medium Session</span>
            <span className="font-Poppins-Regular mt-[12px] leading-none">30 min</span>
          </button>
          <button type="button" className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-start items-center rounded-[20px]">
            <span className="mt-[20px] leading-none">Extended Session</span>
            <span className="font-Poppins-Regular mt-[12px] leading-none">60 min</span>
          </button>
          <button type="button" className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-center items-center rounded-[20px]">
            <span className=" leading-none">Custom Session</span>
          </button>
        </div>
        <div className="ml-[250px] w-[400px] flex flex-col items-center">
          <div className="flex justify-center relative">
            <img className="w-[350px] h-[350px]" src={meditationTimer} alt="" />
            <img className="w-[400px] h-[400px] absolute top-[70px] left-1/2 -translate-x-1/2" src={meditatingPerson} alt="" />
          </div>
          <div className="mt-[135px] flex font-Poppins-Regular
         text-[24px] text-[#000000] gap-[20px]">
            <p>1h 23min 30sec</p>
            <p>Custom Session</p>
          </div>
          <button className="mt-[40px] w-[250px] h-[60px] text-[#272628] rounded-[15px]
            bg-[#79D7BE] font-Poppins-SemiBold text-[32px]">Start</button>
        </div>
      </div>
    </BreathingMeditateLayout>
  )
}