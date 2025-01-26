import { useEffect, useMemo, useRef, useState } from "react";
import prevButton from "@images/dashboard/layout/music/prevButton.svg";
import pauseButton from "@images/dashboard/layout/music/pauseButton.svg";
import playButton from "@images/dashboard/layout/music/playButton.svg";
import nextButton from "@images/dashboard/layout/music/nextButton.svg";
import expandIcon from "@images/dashboard/layout/music/expandIcon.svg";
import collapseIcon from "@images/dashboard/layout/music/collapseIcon.svg";
import {useForm } from "@inertiajs/react";
import axios from "axios";
import { isObject } from "../utils";

export default function MusicPlayer({ musicQueue,setMusicQueue,saveUserMusicTime,
  musicIndex,setMusicIndex,isPaused,setIsPaused,audioRef,stopWatch, }) {
  const [isExpanded,setIsExpanded] = useState(true)
  const [isAnimating,setIsAnimating] = useState(false)
  // console.log(musicQueue)
  function takeIdFromQueue(){
    const idArray = musicQueue.map((music)=>music.id)
    return (idArray)
  }

  async function getRandomMusic(type){

    const response = await axios.get('/music/randomMusic/fetch',{
      params:{
        idArray:takeIdFromQueue(),
      }
    })
    const data = response.data
    if((isObject(data))){
      type === "next"?setMusicQueue((music)=> [...music,response.data.randomMusic]):
                      setMusicQueue((music)=>[response.data.randomMusic,...music])
      return true
    }else{
      return null
    }
  }

  function handlePlayStopButton() {
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      stopWatch.start()
      setIsPaused(false)

    } else if (audioRef.current && !isPaused) {
      audioRef.current.pause();
      stopWatch.pause()
      setIsPaused(true)
    }
  }

  useEffect(()=>{
    if(!isPaused){
      console.log('music index ' + musicIndex)
      setTimeout(() => {
        if(!stopWatch.isRunning){
          stopWatch.start()
        }
        audioRef.current.play()
      }, 20);
    }
  },[musicIndex,isPaused,musicQueue])

  async function handleNext(){
    console.log(stopWatch.totalSeconds)
    saveUserMusicTime()
    if(musicIndex !== musicQueue.length - 1){
      setMusicIndex((index)=>index+1)
      audioRef.current.pause()
      setIsPaused(false)
      return
    }
    const randomMusic = await getRandomMusic("next")
    if(randomMusic || musicIndex < musicQueue.length - 1){
      setMusicIndex((index)=>index+1)
      audioRef.current.pause()
      setIsPaused(false)

    }else{
      setMusicIndex(0)
      audioRef.current.pause()
      setIsPaused(false)
    }
  }

  async function handlePrev(){
    saveUserMusicTime()
    if(musicIndex !== 0){
      setMusicIndex((index)=>index - 1)
      audioRef.current.pause()
      setIsPaused(false)
      return
    }
    const randomMusic = await getRandomMusic("prev")
    if(randomMusic && musicIndex > 0){
      setMusicIndex((index)=>index-1)
      audioRef.current.pause()
      setIsPaused(false)
    }else if(randomMusic && musicIndex === 0){
      setMusicIndex(0)
      audioRef.current.pause()
      setIsPaused(false)

    }
    else{
      setMusicIndex(musicQueue.length - 1)
      audioRef.current.pause()
      setIsPaused(false)
    }

  }

  return (<div className={`fixed right-0 top-[100px] w-[500px] h-[150px]
    transition-transform ease-out duration-500 ${!isExpanded&&'translate-x-[310px]'}
   bg-[#272628] pl-[25px] pt-[25px] pr-[15px] rounded-l-[20px] flex gap-[15px]`}>
    <button
    onClick={()=>{
      setIsExpanded(!isExpanded)
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
      }, 500);
    }} 
    className={`w-[125px] h-[100px] rounded-[10px] overflow-hidden 
      ${!isAnimating?'musicImage':'cursor-auto'} relative`}>
      <img src={musicQueue.length > 0 ? musicQueue[musicIndex].image : null} className="w-[125px] h-[100px] object-cover" alt="" />
      <span className="absolute w-[125px] h-[100px] bg-[#0000008a] z-10 invisible
      top-0 left-0 flex justify-center items-center">
          <img src={isExpanded?expandIcon:collapseIcon} alt="" />
      </span>
    </button>
    <div className="flex flex-col items-center grow gap-[25px]">
      <p className="font-Poppins-Regular text-[20px] text-[#F6F4F0]">
        {musicQueue.length > 0 && musicQueue[musicIndex].name}
      </p>
      <div className="flex gap-[25px]">
        <button onClick={handlePrev} type="button">
          <img
            src={prevButton} alt="" />
        </button>
        <button onClick={handlePlayStopButton}
          type="button">
          <img className="w-[50px] h-[50px]" src={isPaused ? playButton : pauseButton} alt="" />

        </button>
        <button onClick={handleNext}
          type="button">
          <img src={nextButton} alt="" />
        </button>
      </div>
    </div>
    <audio ref={audioRef} loop src={musicQueue.length > 0 ? ((musicQueue[musicIndex]).audio) : undefined} ></audio>
    
  </div>
  )
}