import { Link } from "@inertiajs/react"
import { useRoute } from "@vendor/tightenco/ziggy";

export default function BreathingMeditateLayout({ children, type }) {
  const route = useRoute()
  return (
    <div className="flex flex-col ">
      <nav className="flex gap-[100px] ml-[60px] mt-[60px] mb-[50px]">
        <Link href={route('meditate.show')}
          className={`text-[32px] font-Poppins-Medium 
        ${type === "meditate" ? 'text-[#2E5077]' : 'text-[#979CA6]'} 
        relative leading-none`}>
          <span className={`absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[170px] h-[5px] 
            bg-[#2E5077] rounded-full ${type !== 'meditate' && 'invisible'}`}></span>
          Meditate
        </Link>
        <Link href={route('breathing.show')}
          className={`text-[32px] font-Poppins-Medium 
      ${type === "breathing" ? 'text-[#2E5077]' : 'text-[#979CA6]'}
       relative leading-none`}>
          <span className={`absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[170px] h-[5px] 
            bg-[#2E5077] rounded-full ${type !== 'breathing' && 'invisible'}`}></span>

          Breathing</Link>
      </nav>
      {children}
    </div>
  )
}