import { useEffect, useMemo, useRef, useState } from "react";
import prevButton from "@images/dashboard/layout/music/prevButton.svg";
import pauseButton from "@images/dashboard/layout/music/pauseButton.svg";
import playButton from "@images/dashboard/layout/music/playButton.svg";
import nextButton from "@images/dashboard/layout/music/nextButton.svg";

export default function MusicPlayer({ music }) {
  const audioRef = useRef()
  const [isPaused, setIsPaused] = useState(true)
  function handlePlayStopButton() {
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false)

    } else if (audioRef.current && !isPaused) {
      audioRef.current.pause();
      setIsPaused(true)
    }
  }
  function handle() {
    audioRef.current.src = music[1]
    audioRef.current.play()
  }

  return (<div className="fixed right-0 top-[100px] w-[500px] h-[150px]
   bg-[#272628] pl-[25px] pt-[25px] pr-[15px] rounded-l-[20px] flex gap-[15px]">
    <div className="w-[125px] h-[100px] bg-red-300 rounded-[10px]">

    </div>
    <div className="flex flex-col items-center grow gap-[25px]">
      <p className="font-Poppins-Regular text-[20px] text-[#F6F4F0]">
        Gentle Ocean Wave
      </p>
      <div className="flex gap-[25px]">
        <button type="button">
          <img
            src={prevButton} alt="" />
        </button>
        <button onClick={handlePlayStopButton}
          type="button">
          <img className="w-[50px] h-[50px]" src={isPaused ? playButton : pauseButton} alt="" />

        </button>
        <button onClick={handle}
          type="button">
          <img src={nextButton} alt="" />
        </button>
      </div>
    </div>
    <audio ref={audioRef} loop src={music !== false ? (music[0]) : null} ></audio>
    
  </div>)
}