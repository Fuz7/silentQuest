
import { Link } from "@inertiajs/react"
import navLoginAuthIcon from '@images/auth/navLoginAuthIcon.svg'
import navRegisterAuthIcon from '@images/home/navHomeIcon.svg'
export default function AuthLayout({children,type}){
  return(
    <>
      <main>  
      <header className="fixed top-0 w-full z-10">
        <nav className="pt-[25px] px-[120px] flex justify-start items-center">
          <Link href={'/'}>
            {type === 'login' && (<img src={navLoginAuthIcon} alt="" />)}
            {type === 'register' && (<img src={navRegisterAuthIcon} alt="" />)}
            

          </Link>
        </nav>
      </header>
        <section>
        {children}  
        </section>
      </main>
    </>
  )
}