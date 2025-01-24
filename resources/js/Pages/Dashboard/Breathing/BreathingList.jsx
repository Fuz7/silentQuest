import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import dropdownIcon from '@images/dashboard/breathing/dropdownIcon.svg'
import grayBar from '@images/dashboard/breathing/grayBar.svg'
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

  useEffect(()=>{
    if (data.id !== null){
      post(route('breathing'))
    }
  },[data.id])

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
          <div className="div w-[850px] min-h-[80px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        rounded-[10px] flex flex-col bg-white  pr-[30px] pl-[20px] relative ">
            <BreathingHeader title={"Intermediate"} difficultyVisible={intermediateVisible} setDifficultVisible={setIntermediateVisible} />
            <div className={`${intermediateVisible ? 'h-[235px]' : 'h-[0px]'}  transition-[height]  overflow-hidden w-full`}>
              {breathingList.intermediate.map((breathing, index) => {
                return (
                  <BreathingItem key={"Intermediate" + breathing.name} setData={setData} id={breathing.id} breathingList={breathingList} index={index} name={breathing.name} exp={breathing.exp} />
                )
              })}
            </div>
          </div>
          <div className="div w-[850px] min-h-[80px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        rounded-[10px] flex flex-col bg-white  pr-[30px] pl-[20px] relative ">
            <BreathingHeader title={"Advance"} difficultyVisible={advanceVisible} setDifficultVisible={setAdvanceVisible} />
            <div className={`${advanceVisible ? 'h-[235px]' : 'h-[0px]'}  transition-[height]  overflow-hidden w-full`}>
              {breathingList.advance.map((breathing, index) => {
                return (
                  <BreathingItem key={"Advance" + breathing.name} setData={setData} id={breathing.id} breathingList={breathingList} index={index} name={breathing.name} exp={breathing.exp} />
                )
              })}
            </div>
          </div>
        </div>
      </BreathingMeditateLayout>
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

function BreathingItem({ name, exp, index, breathingList, id,setData }) {

  return (
    <div
    onClick={()=>{
      setData('id',id)
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