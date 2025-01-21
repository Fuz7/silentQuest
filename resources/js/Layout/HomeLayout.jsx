import { Link } from "@inertiajs/react"
import navHomeIcon from '@images/home/navHomeIcon.svg'
import navAccountIcon from '@images/home/navAccountIcon.svg'
import {useRoute} from '@vendor/tightenco/ziggy'

export default function HomeLayout({children}){
  const route = useRoute()
  return(
    <>
      <main>  
      <header className="fixed top-0 w-full">
        <nav className="pt-[25px] px-[120px] flex justify-between items-center">
          <Link href={'/'}>
            <img src={navHomeIcon} alt="" />
          </Link>
          <div className="h-fit">
            <Link href={route('login.show')} className="flex gap-[10px] items-center">
              <p className="text-[14px] font-Poppins-Regular">Login/Register</p>
              <img src={navAccountIcon} alt="" />
            </Link>
          </div>
        </nav>
      </header>
        <section>
        {children}  
        </section>
      </main>
    </>
  )
}