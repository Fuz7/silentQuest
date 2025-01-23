import BreathingMeditateLayout from "../../../Layout/BreathingMeditateLayout";
import meditationTimer from "@images/dashboard/meditate/meditationTimer.svg";
import meditatingPerson from "@images/dashboard/meditate/meditatingPerson.svg";
import customSessionCloseButton from "@images/dashboard/meditate/customSessionCloseButton.svg";
import pauseButton from "@images/dashboard/meditate/pauseButton.svg";
import stopButton from "@images/dashboard/meditate/stopButton.svg";
import playButton from "@images/dashboard/meditate/playButton.svg";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "@vendor/tightenco/ziggy";

export default function Meditate({}) {
  const route = useRoute()
  const [isCustomModalVisible, setCustomModalVisible] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timerDuration, setTimerDuration] = useState(600);
  const [remainingSeconds, setRemainingSeconds] = useState(600);
  const [sessionName, setSessionName] = useState('Short Session');
  const [sendToRoute,setSendToRoute] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null);
  const {data,setData,post} = useForm({
    duration:0,
  })

  function sendDurationToDB(prevSeconds){
    setData("duration",( (timerDuration - prevSeconds)))
    setSendToRoute(true)
  }

  useEffect(()=>{
    if(data.duration !== 0 && sendToRoute){
      setSendToRoute(false)
      post(route('meditate.store'))
    }
  },[data.duration,sendToRoute])

  useEffect(()=>{
    
    const mounted = addEventListener('beforeunload',()=>{
      if(countdownStarted){
          sendDurationToDB(remainingSeconds)
      }
    })
    return () => removeEventListener('beforeunload',mounted)
  },[countdownStarted,countdownStarted,remainingSeconds])

  useEffect(() => {
    if (countdownStarted && timerDuration === remainingSeconds) {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setRemainingSeconds((prevSeconds) => {
            if (prevSeconds <= 1) {
              sendDurationToDB(prevSeconds -1)
              clearInterval(intervalRef.current);
              setCountdownStarted(false);
              return timerDuration;
            }
            return prevSeconds - 1;
          });

        }
      }, 1000);

      return () => clearInterval(intervalRef.current); // Cleanup interval on re-render
    } else if (!countdownStarted && timerDuration !== remainingSeconds) {

    }
  }, [countdownStarted, timerDuration]);
  return (
    <>
      <BreathingMeditateLayout type={"meditate"}>
        <div className="flex mt-[18px] w-[1080px] pl-[60px]">
          <div className="flex mt-[32px] flex-col gap-[25px]">
            <FixedSessionButton
              setRemainingSeconds={setRemainingSeconds}
              setTimerDuration={setTimerDuration}
              setSessionName={setSessionName}
              title={"Short Session"}
              duration={10}
            />
            <FixedSessionButton
              setRemainingSeconds={setRemainingSeconds}
              setTimerDuration={setTimerDuration}
              setSessionName={setSessionName}
              title={"Medium Session"}
              duration={30}
            />
            <FixedSessionButton
              setRemainingSeconds={setRemainingSeconds}
              setTimerDuration={setTimerDuration}
              setSessionName={setSessionName}
              title={"Extended Session"}
              duration={60}
            />
            <button
              onClick={() => {
                setCustomModalVisible(true);
              }}
              type="button"
              className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-center items-center rounded-[20px]"
            >
              <span className=" leading-none">
                Custom Session
              </span>
            </button>
          </div>
          <div className="ml-[230px] w-[420px] flex flex-col items-center">
            <div className="flex justify-center relative">
              <img
                className="w-[350px] h-[350px]"
                src={meditationTimer}
                alt=""
              />
              <img
                className="w-[400px] h-[400px] absolute top-[70px] left-1/2 -translate-x-1/2"
                src={meditatingPerson}
                alt=""
              />
            </div>

            <CountdownTimer sessionName={sessionName} remainingSeconds={remainingSeconds} />
            <TimerControlButtons remainingSeconds={remainingSeconds} setRemainingSeconds={setRemainingSeconds} timerDuration={timerDuration}
              setCountdownStarted={setCountdownStarted} countdownStarted={countdownStarted} intervalRef={intervalRef}
              isPaused={isPaused} setIsPaused={setIsPaused} sendDurationToDB={sendDurationToDB}></TimerControlButtons>
          </div>
        </div>
      </BreathingMeditateLayout>
      <CustomSessionModal
        isCustomModalVisible={isCustomModalVisible}
        setCustomModalVisible={setCustomModalVisible}
        setTimerDuration={setTimerDuration}
        setRemainingSeconds={setRemainingSeconds}
        setSessionName={setSessionName}
      />
    </>
  );
}

function FixedSessionButton({
  title,
  duration,
  setTimerDuration,
  setRemainingSeconds,
  setSessionName,
}) {
  return (
    <button
      onClick={() => {
        setTimerDuration(duration * 60);
        setRemainingSeconds(duration * 60);
        setSessionName(title)
      }}
      type="button"
      className="w-[100px] aspect-square bg-[#272628]
           text-[#F6F4F0] text-[16px] font-Poppins-Medium flex flex-col justify-start items-center rounded-[20px]"
    >
      <span className="mt-[20px] leading-none">{title}</span>
      <span className="font-Poppins-Regular mt-[12px] leading-none">
        {duration} min
      </span>
    </button>
  );
}

function TimerControlButtons({ setCountdownStarted, countdownStarted, timerDuration,remainingSeconds, setRemainingSeconds, isPaused, setIsPaused, intervalRef,sendDurationToDB }) {
  
  return (
    <>
      {countdownStarted ? (
        <div className="flex gap-[60px] mt-[50px]">
          {isPaused ? (
            <button
              onClick={() => {
                setIsPaused(false)

                intervalRef.current = setInterval(() => {

                  setRemainingSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                      sendDurationToDB(prevSeconds -1)
                      clearInterval(intervalRef.current);
                      setCountdownStarted(false);
                      return timerDuration;
                    }
                    return prevSeconds - 1;
                  });
                }, 1000);
              }
              }
              type="button">
              <img src={playButton} alt="" />
            </button>
          ) : (
            <button
              onClick={() => {
                clearInterval(intervalRef.current);

                setIsPaused(true)
              }}
              type="button">
              <img src={pauseButton} alt="" />
            </button>

          )}
          <button
            onClick={() => {
              sendDurationToDB( remainingSeconds)
              setCountdownStarted(false)
              setRemainingSeconds(timerDuration)
            }}
            type="button">

            <img src={stopButton} alt="" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setCountdownStarted(true)
          }}
          type="button"
          className="mt-[40px] w-[250px] h-[60px] text-[#272628] rounded-[15px]
              bg-[#79D7BE] font-Poppins-SemiBold text-[32px]"
        >
          Start
        </button>
      )}
    </>
  )
}

function CustomSessionModal({ isCustomModalVisible, setCustomModalVisible, setTimerDuration, setRemainingSeconds, setSessionName }) {
  const [secondsInputValue, setSecondsInputValue] = useState("");
  const [minuteInputValue, setMinuteInputValue] = useState("");
  const [hourInputValue, setHourInputValue] = useState("");

  const resetInputs = () => {
    setCustomModalVisible(false);
    setHourInputValue('');
    setMinuteInputValue('');
    setSecondsInputValue('');

  }

  const submitTime = () => {

    const hour = Number(hourInputValue) * 3600
    const minute = Number(minuteInputValue) * 60
    const seconds = Number(secondsInputValue)
    const totalTime = hour + minute + seconds
    setTimerDuration(totalTime)
    setRemainingSeconds(totalTime)
    setSessionName('Custom Session')
  }

  const handleSecondsChange = (e) => {
    let inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 59 || inputValue === "") {
        setSecondsInputValue(inputValue);
      }
    }
  };
  const handleMinuteChange = (e) => {
    let inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 59 || inputValue === "") {
        setMinuteInputValue(inputValue);
      }
    }
  };
  const handleHourChange = (e) => {
    let inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);

      if (number <= 23 || inputValue === "") {
        setHourInputValue(inputValue);
      }
    }
  };
  return (
    <div
      className={`absolute left-0 top-0 w-full h-full bg-[#00000025]
         ${isCustomModalVisible ? "block" : "hidden"}`}
    >
      <div
        className="absolute top-[295px] left-[390px] w-[400px] h-[225px] border-[1px] border-black  
        bg-[#F6F4F0] font-Poppins-SemiBold text-[20px] rounded-[20px] overflow-hidden
        flex flex-col "
      >
        <div className="h-[60px] w-full bg-[#D9D9D9] flex items-center px-[30px] justify-between ">
          <p className="leading-none">Custom Session</p>
          <button
            onClick={() => {
              resetInputs()
            }}
            type="button"
          >
            <img src={customSessionCloseButton} alt="" />
          </button>
        </div>
        <div className="flex px-[30px] justify-between items-start mt-[20px] ">
          <div className="flex flex-col">
            <input
              onInput={handleHourChange}
              value={hourInputValue}
              className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]"
              type="text"
            />
            <p className="mt-[10px] leading-none">Hrs</p>
          </div>
          <p className="leading-none mt-[10px]">:</p>
          <div className="flex flex-col">
            <input
              onInput={handleMinuteChange}
              value={minuteInputValue}
              className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]"
              type="text"
            />
            <p className="mt-[10px] leading-none">Mins</p>
          </div>
          <p className="leading-none mt-[10px]">:</p>
          <div className="flex flex-col">
            <input
              onInput={handleSecondsChange}
              value={secondsInputValue}
              className="w-[100px] h-[40px] text-right pr-[10px] border border-black rounded-[5px]"
              type="text"
            />
            <p className="mt-[10px] leading-none">Secs</p>
          </div>
        </div>
        <button
          onClick={() => {
            submitTime()
            resetInputs()

          }}
          className="mt-[23px] ml-auto flex justify-center items-center rounded-[5px]
        text-[16px] bg-[#2E5077] w-[70px] h-[30px] text-white mr-[30px]"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function CountdownTimer({ remainingSeconds, sessionName }) {
  function formatTime(remainingSeconds) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    let formattedTime = "";
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}min `;
    }
    if (seconds > 0 || formattedTime === "" || hours > 0 || minutes > 0) {
      formattedTime += `${seconds}sec`;
    }
    return formattedTime.trim();
  }

  return (
    <>
      <div
        className="mt-[135px] flex font-Poppins-Regular
         text-[24px] text-[#000000] gap-[20px]"
      >
        <p>{formatTime(remainingSeconds)}</p>
        <p>{sessionName}</p>
      </div>
    </>
  )
}