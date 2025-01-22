import navDashboardAccountIcon from '@images/dashboard/navDashboardAccountIcon.svg'
import navDashboardExerciseIcon from '@images/dashboard/navDashboardExerciseIcon.svg'
import navDashboardHomeIcon from '@images/dashboard/navDashboardHomeIcon.svg'
import navDashboardLearnIcon from '@images/dashboard/navDashboardLearnIcon.svg'
import navDashboardMusicIcon from '@images/dashboard/navDashboardMusicIcon.svg'
import navDashboardLogoutIcon from '@images/dashboard/navDashboardLogoutIcon.svg'
import navDashboardLogo from '@images/dashboard/navDashboardLogo.svg'
import { Link, useForm } from '@inertiajs/react'
import { useRoute } from '@vendor/tightenco/ziggy'

export default function DashboardLayout({ children }) {
  
  const route = useRoute()
  return (
    <>
      <main className="min-h-[100vh] flex bg-[#F6F4F0]">
        <header className="w-[160px] flex flex-col items-center justify-between py-[50px]">
          <div className="flex flex-col gap-[50px]">
            <Link className=' flex justify-center items-center' href={route('home')}>
            <button className='w-fit mb-[42px]' type='button'>
              <img src={navDashboardLogo} alt="" />
            </button>
            </Link>
            <Link className='w-[45px] aspect-square flex justify-center items-center mr-[10px]' href={route('home')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardHomeIcon} alt="" />
            </button>
            </Link>
            <Link className='w-[45px] aspect-square flex justify-center items-cente mr-[10px]r' href={route('learn.show')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardLearnIcon} alt="" />
            </button>
            </Link>
            <Link className='w-[45px] aspect-square flex justify-center items-center mr-[10px]' href={route('home')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardExerciseIcon} alt="" />
            </button>
            </Link>
            <Link className='w-[45px] aspect-square flex justify-center items-center mr-[10px]' href={route('home')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardMusicIcon} alt="" />
            </button>
            </Link>
            <Link className='w-[45px] aspect-square flex justify-center items-center mr-[10px]' href={route('home')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardAccountIcon} alt="" />
            </button>
            </Link>

          </div>
          <LogoutButton route={route}/>
        </header>
        <section>
          {children}
        </section>
      </main>
    </>
  )
}

function LogoutButton({route}) {
  const {post} = useForm()
  const submit = (e) => {
    e.preventDefault()
    post(route('auth.logout'))
  }
  return (
    <form className='' onSubmit={submit}>
      <button className=' aspect-square flex justify-center items-center mr-[5px]' type='submit'>
        <img src={navDashboardLogoutIcon} alt="" />
      </button>
    </form>
  )
}