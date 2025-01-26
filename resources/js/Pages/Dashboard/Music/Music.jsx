import musicPlaylistPlay from "@images/dashboard/layout/music/musicPlaylistPlay.svg";

export default function Music({ randomMusics,musicIndex,setMusicIndex,musicQueue,
  setMusicQueue,setIsPaused,audioRef,saveUserMusicTime
 }) {
  console.log(randomMusics)
  return (
    <div className="flex flex-col gap-[40px] mt-[60px]">
      <h2 className="ml-[60px] text-[#2E5077] font-Poppins-Medium text-[32px]
      ">Music Playlist</h2>
      <div className="ml-[110px] max-w-[1400px] grid grid-cols-2 gap-x-[58px] gap-y-[42px]
      mb-[60px]">
      {randomMusics.map((music,index)=>{
        return <MusicCard key={music.name + index + "lib"} music={music} musicIndex={musicIndex}
        setMusicIndex={setMusicIndex} musicQueue={musicQueue} saveUserMusicTime={saveUserMusicTime}
        setMusicQueue={setMusicQueue}
        setIsPaused={setIsPaused} audioRef={audioRef} />
      })}


      </div>
    </div>
  )
}

function MusicCard({ music, musicIndex, setMusicIndex, musicQueue,
  setMusicQueue, setIsPaused, audioRef,saveUserMusicTime }) {

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
  const { image, name,id } = music
  return (
    <>
      <div className="flex gap-[42px]">
        <button onClick={handleClick} className="w-[140px] h-[112px] musicList relative bg-slate-200 rounded-[10px]
        shadow-[4px_4px_6px_rgba(0,0,0,0.15)] overflow-hidden">
          <span className="absolute top-0 left-0 h-full w-full invisible 
           bg-[#0000008a] flex justify-center items-center">
            <img src={musicPlaylistPlay} alt="" />
          </span>
          <img className="w-full h-full object-cover" src={image} alt="" />
        </button>
        <p className="font-Poppins-Regular text-[25px] text-[#272628  ] leading-none mt-[5px]">
          {name}</p>
      </div>
    </>
  )
}