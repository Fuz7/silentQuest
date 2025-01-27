import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import dropdownIcon from '@images/dashboard/breathing/dropdownIcon.svg'
import grayBar from '@images/dashboard/breathing/grayBar.svg'
import lockedIcon from '@images/dashboard/breathing/lockedIcon.svg'
import closeButton from '@images/dashboard/breathing/closeButton.svg'
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useRoute } from "@vendor/tightenco/ziggy";
export default function BreathingList({ breathingList, }) {

  const { data, setData, post } = useForm({
    id: null,
  })
  const [beginnerVisible, setBeginnerVisible] = useState(false)
  const [intermediateVisible, setIntermediateVisible] = useState(false)
  const [advanceVisible, setAdvanceVisible] = useState(false)
  const [isHidden,setIsHidden] = useState(true)
  const exp = 400
  const INTERMEDIATE_EXP_REQUIRED = 500
  const ADVANCE_EXP_REQUIRED = 1500
  const [requiredExp,setRequiredExp] = useState(0)
  useEffect(() => {
    if (data.id !== null) {
      post(route('breathing'))
    }
  }, [data.id])
  console.log(window.location.href)
  return (
    <>

      <BreathingMeditateLayout type={'breathing'}>
        <div className="mt-[18px] ml-[60px] w-[1020px] flex gap-[30px] flex-col cursor-pointer">
          <div className="div w-[850px] min-h-[80px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        rounded-[10px] flex flex-col bg-white  pr-[30px] pl-[20px] relative ">
            <BreathingHeader title={"Beginner"} difficultyVisible={beginnerVisible} setDifficultVisible={setBeginnerVisible} />
            <div className={`${beginnerVisible ? 'h-[235px]' : 'h-[0px]'}  transition-[height]  overflow-hidden w-full`}>
              {breathingList.beginner.map((breathing, index) => {
                return (
                  <BreathingItem key={"beginner" + breathing.name} setData={setData} id={breathing.id} breathingList={breathingList} index={index} name={breathing.name} exp={breathing.exp} />
                )
              })}
            </div>
          </div>

          <div className={`div w-[850px] min-h-[80px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        rounded-[10px] flex flex-col ${exp >= INTERMEDIATE_EXP_REQUIRED ? 'bg-white' : 'bg-[#CCCCCC]'}  pr-[30px] pl-[20px] relative `}>
            {exp >= INTERMEDIATE_EXP_REQUIRED ? (
              <>
                <BreathingHeader title={"Intermediate"} difficultyVisible={intermediateVisible} setDifficultVisible={setIntermediateVisible} />
                <div className={`${intermediateVisible ? 'h-[235px]' : 'h-[0px]'}  transition-[height]  overflow-hidden w-full`}>

                  {breathingList.intermediate.map((breathing, index) => {
                    return (
                      <BreathingItem key={"Intermediate" + breathing.name} setData={setData} id={breathing.id} breathingList={breathingList} index={index} name={breathing.name} exp={breathing.exp} />
                    )
                  })}
                </div>
              </>

            ) :
              <LockedBreathingHeader requiredExp={INTERMEDIATE_EXP_REQUIRED}
              setRequiredExp={setRequiredExp} setIsHidden={setIsHidden} title={"Intermediate"} />
            }
          </div>
          <div className={`div w-[850px] min-h-[80px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        rounded-[10px] flex flex-col ${exp >= ADVANCE_EXP_REQUIRED ? 'bg-white' : 'bg-[#CCCCCC]'}  pr-[30px] pl-[20px] relative `}>
            {exp >= ADVANCE_EXP_REQUIRED ? (
              <>
                <BreathingHeader title={"Advance"} difficultyVisible={advanceVisible} setDifficultVisible={setAdvanceVisible} />
                <div className={`${advanceVisible ? 'h-[235px]' : 'h-[0px]'}  transition-[height]  overflow-hidden w-full`}>
                  {breathingList.advance.map((breathing, index) => {
                    return (
                      <BreathingItem key={"Advance" + breathing.name} setData={setData} id={breathing.id} breathingList={breathingList} index={index} name={breathing.name} exp={breathing.exp} />
                    )
                  })}
                </div>
              </>
            ) : (
              <LockedBreathingHeader requiredExp={ADVANCE_EXP_REQUIRED}
              setRequiredExp={setRequiredExp} setIsHidden={setIsHidden} title={"Advanced"} />
            )
            }
          </div>
        </div>
      </BreathingMeditateLayout>
      <LockedCategoryCard exp={exp} requiredExp={requiredExp} isHidden={isHidden} setIsHidden={setIsHidden} />
    </>
  )
}

function BreathingHeader({ difficultyVisible, setDifficultVisible, title }) {
  return (
    <>
      <span className={`absolute top-[80px] left-0 w-full  ${difficultyVisible ? 'visible' : 'invisible'} bg-[#979CA6] h-[1px]`}></span>
      <div onClick={() => {
        setDifficultVisible(!difficultyVisible)
      }} className="ml-[10px] h-[80px] flex items-center justify-between">
        <div className="font-Poppins-Medium text-[24px] leading-none text-[#272628]">
          {title}
        </div>
        <img className={`${difficultyVisible && 'rotate-180'} transition-transform`} src={dropdownIcon} alt="" />
      </div>

    </>
  )
}

function LockedBreathingHeader({ title,setIsHidden,setRequiredExp,requiredExp }) {
  return (
    <>
      <div onClick={() => {
        setRequiredExp(requiredExp)
        setIsHidden(false)
      }} className="ml-[10px] h-[80px] flex items-center justify-between">
        <div className="font-Poppins-Medium text-[24px] leading-none text-[#272628]">
          {title}
        </div>
        <img src={lockedIcon} alt="" />
      </div>

    </>
  )
}

function BreathingItem({ name, exp, index, breathingList, id, setData }) {

  return (
    <div
      onClick={() => {
        setData('id', id)
      }}
      className={`flex items-center w-full  px-[10px] font-Poppins-Regular text-[22px] text-[#272628]
                   cursor-pointer hover:bg-[#F0F0F0] h-[50px] rounded-[10px]
                   ${index === 0 ? 'mt-[27px]' : 'mt-[15px]'} ${index === breathingList.lenght - 1 && 'mb-[28px]'}`}>
      <img src={grayBar} alt="" />
      <p className="ml-[15px] ">{name}</p>
      <p className="ml-auto">{exp}exp</p>
    </div>

  )
}

function LockedCategoryCard({ exp, requiredExp, isHidden, setIsHidden }) {
  const expPercentageValue = parseInt((exp / requiredExp) * 100)
  return (
    <div className={`absolute ${isHidden ?'hidden':'flex'} left-0 top-0 w-full h-full justify-center 
    items-center bg-[#00000025] text-[#272628] overflow-hidden`}>
      <div className="w-[600px] h-[260px] rounded-[20px] pt-[20px]
      bg-[#F6F4F0] px-[30px] flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-Poppins-SemiBold text-[#272628] 
          leading-none text-[24px]">Locked</p>
          <button onClick={()=>setIsHidden(true)}>
          <img src={closeButton} alt="" />

          </button>
        </div>
        <div className="mt-[10px] text-[20px] font-Poppins-Regular">
          <p>Requires {requiredExp.toLocaleString()} EXP to unlock</p>
        </div>
        <div className="mt-[37px] font-Poppins-Medium text-[64px] leading-none">
          {expPercentageValue}%
        </div>
        <div className="mt-[10px] w-full h-[15px] rounded-[5px] bg-[#CCCCCC]">
          <div 
          style={{
            width: `${expPercentageValue}%`,
          }}
          className={`h-full bg-[#4DA1A9] rounded-[5px]`}></div>
        </div>
        <div className="mt-[10px] text-[#979CA6] text-[20px]
      font-Poppins-Regular leading-none">
          {exp.toLocaleString()}exp / {requiredExp.toLocaleString() }exp
        </div>
      </div>
    </div>
  )
}