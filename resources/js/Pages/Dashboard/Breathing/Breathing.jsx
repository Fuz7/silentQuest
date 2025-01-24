import { useEffect, useRef, useState } from "react";
import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import backArrow from '@images/dashboard/breathing/backArrow.svg'
import { motion, useAnimate } from "motion/react";
import { useRoute } from "@vendor/tightenco/ziggy";
import { Link, useForm } from "@inertiajs/react";


export default function Breathing({ exerciseData}) {
  const [scope, animate] = useAnimate()
  const [isStarted, setIsStarted] = useState(null)
  const [instructionName, setInstructionName] = useState('')
  const [animationStarted, setAnimationStarted] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [isDisabled, setIsDisabled] = useState()
  const patternArray = formatDashToArray(exerciseData.pattern)
  const maxDelay = getMaxElement(patternArray)
  const [countdownText, setCountdownText] = useState(maxDelay)
  const route = useRoute()
  const startRef = useRef()
  const countdownRef = useRef(null)
  const {post} = useForm({
    exercise_id:exerciseData.id,
  })

  function submitUserExercise(){
    post(route('breathing.store'))
  }
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function getMaxElement(arr) {
    if (arr.length === 0) {
      throw new Error("Array is empty");
    }
    return Math.max(...arr);
  }

  useEffect(() => {
    if (isDisabled && countdownRef.current === null) {
      countdownRef.current = setInterval(() => {
        setCountdownText((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
            return maxDelay;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }else{
      setCountdownText(maxDelay)
    }

    // Cleanup function to clear interval when component unmounts or dependencies change
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [isDisabled, maxDelay]);

  useEffect(() => {
    if (isStarted) {
      const triggerAnimation = async (i) => {
        if (i < patternArray.length && startRef.current) {
          let count = patternArray[i] - 1
          if (i === 0 && startRef.current) {
            animate('p', { opacity: [0, 1] }, { duration: 1 })
            setInstructionName('Inhale')
            await delay(1000)
            const countInterval = setInterval(async () => {
              if (count > 0 && startRef.current) {
                setInstructionName(count)
                count -= 1
              } else if (count < 1 && startRef.current) {
                setInstructionName('0')
                clearInterval(countInterval)
                await animate('p', { opacity: [1, 0] }, { duration: 1 })
              } else {
                clearInterval(countInterval)
                animate('p', { opacity: [1, 0] }, { duration: 1 })
                setInstructionName('')
              }
            }, 1000)
            await delay(1000)
            animate(".circleOrigin", {
              scale: 1.1,
              translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
            },
              { duration: patternArray[i] })
            await delay(patternArray[i] * 1000)
            triggerAnimation(i + 1)
          } else if (i === 1 && startRef.current) {
            setInstructionName('')
            animate('p', { opacity: [0, 1] }, { duration: 1 })
            setInstructionName('Hold')
            await delay(1000)
            const countInterval = setInterval(async () => {
              if (count > 0 && startRef.current) {
                setInstructionName(count)
                count -= 1
              } else if (count < 1 && startRef.current) {
                setInstructionName('0')
                await animate('p', { opacity: [1, 0] }, { duration: 1 })
                clearInterval(countInterval)
              } else {
                setInstructionName('')
                clearInterval(countInterval)
              }
            }, 1000)
            await delay(1000)
            animate(".circleOrigin", {
              scale: 1.1,
              translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
            },
              { duration: patternArray[i] })
            await delay((patternArray[i] * 1000) - 100) 
            triggerAnimation(i + 1)
          } else if (i === 2 && startRef.current) {
            setInstructionName('')
            animate('p', { opacity: [0, 1] }, { duration: 1 })
            setInstructionName('Exhale')
            await delay(1000)
            const countInterval = setInterval(async () => {
              if (count > 0 && startRef.current) {
                setInstructionName(count)
                count -= 1
              } else if (count < 1 && startRef.current) {
                setInstructionName('0')
                animate('p', { opacity: [1, 0] }, { duration: 1 })
                clearInterval(countInterval)
              } else {
                setInstructionName('')
                clearInterval(countInterval)
              }
            }, 1000)
            animate(".circleOrigin", {
              scale: (patternArray.length === 4 ? 0.9 : 1),
              translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
            },
              { duration: patternArray[i] })
            await delay(patternArray[i] * 1000)
            triggerAnimation(i + 1)
            if (patternArray.length !== 4) {
              setAnimationStarted(false)
            }
          } else if (i === 3 && startRef.current) {
            setInstructionName('')
            animate('p', { opacity: [0, 1] }, { duration: 1 })
            setInstructionName('Hold')
            await delay(1000)
            const countInterval = setInterval(async () => {
              if (count > 0 && startRef.current) {
                setInstructionName(count)
                count -= 1
              } else if (count < 1 && startRef.current) {
                setInstructionName('0')
                animate('p', { opacity: [1, 0] }, { duration: 1 })
                clearInterval(countInterval)
              } else {
                setInstructionName('')
                clearInterval(countInterval)
              }
            }, 1000)
            animate(".circleOrigin", {
              scale: 0.9,
              translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
            },
              { duration: patternArray[i] })
            await delay(patternArray[i] * 1000)
            triggerAnimation(i + 1)
            setAnimationStarted(false)
          }
        }
      }
      if (!animationStarted && cycle < 1) {
        setCycle(cycle + 1)
        triggerAnimation(0)
        setAnimationStarted(true)
      } else if (!animationStarted && cycle === 1) {
        animate(".circleOrigin", {
          scale: 1,
          translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
        },
          { duration: 1 })
        setCycle(0)
        setIsStarted(false)
        setAnimationStarted(false)
        startRef.current = false
        submitUserExercise()
      }
    }
    else if (isStarted === false) {
      const returnToPosition = async () => {
        animate(".circleOrigin", {
          scale: 1,
          translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
        },
          { duration: 0.5 })
        await delay((maxDelay * 1000) - 300)
        animate(".circleOrigin", {
          scale: 1,
          translateX: ['-50%', '-50%'], translateY: ['-50%', '-50%']
        },
          { duration: 0.3 })
        setInstructionName('')

      }
      setInstructionName('')
      returnToPosition()
    }
  }, [isStarted, setInstructionName, cycle, animationStarted])

  function formatDashToArray(data) {
    return data.split('-').map(Number)
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);

  }

  return (
    <BreathingMeditateLayout type={'breathing.show'}>
      <div className="w-[1080px] grow relative flex justify-center pt-[50px] pl-[220px]">
        <div className="absolute left-[60px] top-[8px] flex gap-[15px]">
          <Link href={route('breathing.show')}>
            <img className="w-[30px] h-[30px]" src={backArrow} alt="" />
          </Link>
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-Poppins-Medium text-[32px] leading-none text-[#272628]">{capitalize(exerciseData.category)}</h3>
            <p className="font-Poppins-Regular text-[18px] leading-none text-[#979CA6] mt-[10px]">{exerciseData.cycle} cycles per session</p>
            <p className="font-Poppins-Regular text-[18px] leading-tight text-[#979CA6] max-w-[247px]">{exerciseData.description}</p>
          </div>
        </div>
        <div ref={scope} className="flex flex-col relative w-full min-w-[360px]">
          <div className="absolute left-1/2 -translate-x-1/2
           w-[360px] h-[360px]">
            <div className="absolute w-[360px] h-[360px] bg-[#2E5077] rounded-full
            left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
            <motion.div

              className="absolute w-[290px] h-[290px] bg-[#4DA1A9] rounded-full circleOrigin
            left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></motion.div>
            <div className="absolute w-[220px] h-[220px] bg-[#79D7BE] rounded-full circleOrigin
            left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
            <div className="absolute w-[150px] h-[150px] bg-[#FFFFFF] rounded-full 
            left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center
            font-Poppins-Medium text-[24px] text-[#272628] leading-none">
              <p>
                {instructionName}
              </p>
            </div>
          </div>
          <div className="mt-[420px] font-Poppins-Medium self-center text-[24px] text-[#272628]">
            {exerciseData.name}
          </div>
          <button
            disabled={isDisabled}
            onClick={() => {
              setIsStarted(!isStarted)
              if (isStarted) {
                startRef.current = false
                setAnimationStarted(false)
                setCycle(0)
                setIsDisabled(true)
                setTimeout(() => {
                  setIsDisabled(false)
                }, maxDelay * 1000);
              } else {
                startRef.current = true
              }
            }}
            type="button" className={`font-Poppins-SemiBold text-[32px]  
              self-center mt-[40px] ${isDisabled ? 'bg-[#D9D9D9]' : 'bg-[#79D7BE]'}
          w-[250px] h-[60px] text-[#272628] leading-none  rounded-[15px]`}>
            {isStarted ? 'STOP' : 'START'}
          </button>
          <span className={`mt-[15px] text-[#979CA6] self-center font-Poppins-Regular 
            ${isDisabled ? 'visible' : 'invisible'}`}>
            Cooldown active. Please wait <span className="text-[#272628]">{countdownText}</span> seconds
          </span>
        </div>
      </div>
    </BreathingMeditateLayout>
  )
}