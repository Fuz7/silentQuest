import musicListLayoutPlay from "@images/dashboard/layout/music/musicListLayoutPlay.svg";
import axios from "axios";
import { useEffect, useState } from "react";


export default function MusicList({musicIndex,setMusicIndex,musicQueue,
  setMusicQueue,setIsPaused,audioRef,saveUserMusicTime,type}) {
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    const getFiveRandomMusic = async () => {
      const response = await axios.get('/music/randomMusic/fetchFive')
      setMusicList(response.data)

    }
    getFiveRandomMusic()
  }, [])
  return (
    <div className={`fixed   right-0 top-0 w-[660px] h-[900px] bg-[#F6F4F0]
    drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] pt-[300px] pl-[50px] 
    flex flex-col gap-[30px] ${type ==="Dashboard/Music/Music"&&'hidden'}`}>
      {musicList.map((music, index) => {
        return <MusicCard key={music.name + index} music={music} musicIndex={musicIndex}
        saveUserMusicTime={saveUserMusicTime}
        setMusicIndex={setMusicIndex} musicQueue={musicQueue} setMusicQueue={setMusicQueue}
        setIsPaused={setIsPaused} audioRef={audioRef} />
      })}
    </div>
  )
}

function MusicCard({ music,musicIndex,setMusicIndex,
  musicQueue,setMusicQueue,setIsPaused,audioRef,saveUserMusicTime }) {
  const { image, name,id } = music

  function getMusicIndexInQueueIfItExist(){
    const queueIndex = musicQueue.findIndex((music)=>music.id===id)
    return(queueIndex)
  }

  function handleClick(){
    if(musicQueue[musicIndex].id === music.id) return
    saveUserMusicTime()
    const queueIndex = getMusicIndexInQueueIfItExist()
    if(queueIndex !== -1){
      const queueWithoutQueueIndex = musicQueue.filter((_,index)=>index !== queueIndex)
      const queueWithSelectedMusicAtTop = [...queueWithoutQueueIndex,music]
      setMusicQueue(queueWithSelectedMusicAtTop)
      setMusicIndex((queueWithSelectedMusicAtTop.length -1))
      audioRef.current.pause()
      setIsPaused(false) 
    }else{
      setMusicQueue([...musicQueue,music])
      setMusicIndex((musicQueue.length))
      audioRef.current.pause()
      setIsPaused(false) 

    }
  }
const apiUrl = import.meta.env.VITE_APP_URL;

  return (
    <div className="flex gap-[50px]">
      <button onClick={handleClick} className="w-[100px] h-[80px] musicList relative bg-slate-200 rounded-[10px]
        shadow-[4px_4px_6px_rgba(0,0,0,0.15)] overflow-hidden">
        <span className="absolute top-0 left-0 h-full w-full invisible 
           bg-[#0000008a] flex justify-center items-center">
            <img src={musicListLayoutPlay} alt="" />
        </span>
        <img className="w-full h-full object-cover" src={apiUrl+image} alt="" />
      </button>
      <p className="font-Poppins-Regular text-[25px] text-[#272628] leading-none mt-[5px]">{name}</p>
    </div>
  )

}