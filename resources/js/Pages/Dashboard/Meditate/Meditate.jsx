import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import meditationTimer from '@images/dashboard/meditate/meditationTimer.svg'
import meditatingPerson from '@images/dashboard/meditate/meditatingPerson.svg'
import customSessionCloseButton from '@images/dashboard/meditate/customSessionCloseButton.svg'
import { useState } from "react";

export default function Meditate() {
  const [isCustomModalVisible,setCustomModalVisible] = useState(false)
  return (
    <>
      <BreathingMeditateLayout type={'meditate'}>
        <div className="flex mt-[18px] w-[1080px] pl-[60px]">
          <div className="flex mt-[32px] flex-col gap-[25px]">
            <FixedSessionButton title={'Short Session'} duration={10} />
            <FixedSessionButton title={'Medium Session'} duration={30} />
            <FixedSessionButton title={'Extended Session'} duration={60} />
            <button
            onClick={()=>{
              setCustomModalVisible(true)
            }} 
            type="button" className="w-[100px] aspect-square bg-[#272628]
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
      <CustomSessionModal isCustomModalVisible={isCustomModalVisible} setCustomModalVisible={setCustomModalVisible}/>
    </>
  )
}

function FixedSessionButton({ title, duration }) {
  return (
    <button type="button" className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-start items-center rounded-[20px]">
      <span className="mt-[20px] leading-none">{title}</span>
      <span className="font-Poppins-Regular mt-[12px] leading-none">{duration} min</span>
    </button>

  )
}

function CustomSessionModal({isCustomModalVisible,setCustomModalVisible}){
  const [secondsInputValue,setSecondsInputValue] = useState('')
  const [minuteInputValue,setMinuteInputValue] = useState('')
  const [hourInputValue,setHourInputValue] = useState('')
  const handleSecondsChange = (e) => {
    let inputValue = e.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 59 || inputValue === '') {
        setSecondsInputValue(inputValue);
      }
    }
  };
  const handleMinuteChange = (e) => {
    let inputValue = e.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 59 || inputValue === '') {
        setMinuteInputValue(inputValue);
      }
    }
  };
  const handleHourChange = (e) => {
    let inputValue = e.target.value;

    
    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 23 || inputValue === '') {
        setHourInputValue(inputValue);
      }
    }
  };
  return(
      <div className={`absolute left-0 top-0 w-full h-full bg-[#00000025]
         ${isCustomModalVisible?'block':'hidden'}`}>
        <div className="absolute top-[295px] left-[390px] w-[400px] h-[225px] border-[1px] border-black  
        bg-[#F6F4F0] font-Poppins-SemiBold text-[20px] rounded-[20px] overflow-hidden
        flex flex-col ">
          <div className="h-[60px] w-full bg-[#D9D9D9] flex items-center px-[30px] justify-between " >
            <p className="leading-none">Custom Session</p>
            <button
            onClick={()=>{
              setCustomModalVisible(false)
            }}
             type="button">
              <img 
              src={customSessionCloseButton} alt="" />
            </button>
          </div>
          <div className="flex px-[30px] justify-between items-start mt-[20px] ">
            <div className="flex flex-col">
            <input
            onInput={handleHourChange} 
            value={hourInputValue}
            className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]" type="text"/>
            <p className="mt-[10px] leading-none">Hrs</p>
            </div>
            <p className="leading-none mt-[10px]">:</p>
            <div className="flex flex-col">
            <input
              onInput={handleMinuteChange}
              value={minuteInputValue}
            className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]" type="text"/>
            <p className="mt-[10px] leading-none">Mins</p>
            </div>
            <p className="leading-none mt-[10px]">:</p>
            <div className="flex flex-col">
            <input
              onInput={handleSecondsChange}
              value={secondsInputValue}
            className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]" type="text"/>
            <p className="mt-[10px] leading-none">Secs</p>
            </div>
          </div>
        <button className="mt-[23px] ml-auto flex justify-center items-center rounded-[5px]
        text-[16px] bg-[#2E5077] w-[70px] h-[30px] text-white mr-[30px]">Done</button>
        </div>
      </div>
  )
}