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
            <Link href={route('home')}>
            <button className='w-fit mb-[42px]' type='button'>
              <img src={navDashboardLogo} alt="" />
            </button>
            </Link>
            <Link href={route('home')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardHomeIcon} alt="" />
            </button>
            </Link>
            <Link href={route('learn.show')}>
            <button className='w-fit ' type='button'>
              <img src={navDashboardLearnIcon} alt="" />
            </button>
            </Link>
            <button className='w-fit ' type='button'>
              <img src={navDashboardExerciseIcon} alt="" />
            </button>
            <button className='w-fit ' type='button'>
              <img src={navDashboardMusicIcon} alt="" />
            </button>
            <button className='w-fit ' type='button'>
              <img src={navDashboardAccountIcon} alt="" />
            </button>

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
    <form onSubmit={submit}>
      <button type='submit'>
        <img src={navDashboardLogoutIcon} alt="" />
      </button>
    </form>
  )
}