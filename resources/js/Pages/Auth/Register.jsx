import AuthLayout from "../../Layout/AuthLayout"
import registerBackground from '@images/auth/registerBackground.svg'
import registerPasswordIcon from '@images/auth/registerPasswordIcon.svg'
import closedRegisterPasswordIcon from '@images/auth/closedRegisterPasswordIcon.svg'
import { Link } from "@inertiajs/react"
import {useRoute} from '@vendor/tightenco/ziggy'
import { useState } from "react"
export default function Register(){
  const route = useRoute()
  const [isPasswordVisible,setIsPasswordVisible] = useState(false) 
  return(
    <>
    <AuthLayout type={'register'}>
    <section className="min-h-[100vh] relative flex flex-col items-end pr-[300px] pt-[160px]">
      <img className="absolute left-0 bottom-0" src={registerBackground} alt="" />
      <h1 className="font-Poppins-Bold text-[88px] text-[#272628]">Create Account</h1>
      <input placeholder="Full Name" className="border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] mt-[70px]
       border-[#979CA6]  focus-visible:outline-none" type="text" />
      <input placeholder="Email Address" className="border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] mt-[40px]
       border-[#979CA6]  focus-visible:outline-none" type="text" />
       <div className="relative w-fit">
      <input  placeholder="Password" className="border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] mt-[40px]
       border-[#979CA6]  focus-visible:outline-none"
       type={isPasswordVisible?'text':'password'} />

       <button 
        onClick={()=>{
          setIsPasswordVisible(!isPasswordVisible)
        }}
       className="absolute right-0 bottom-[10px] w-fit h-fit">

       {isPasswordVisible?
       
       (<img src={closedRegisterPasswordIcon}></img>)
       :
       (<img src={registerPasswordIcon}></img>)
       
       }
       </button>
       </div>
       <button className="bg-[#2E5077] w-[450px] max-w-[450px] font-Poppins-Bold text-[20px]
       text-[#FFFFFF] border-none h-[55px] rounded-[16px] mt-[50px]">Create Account</button>
       <div className="flex  w-full justify-center gap-[10px] max-w-[450px] mt-[60px]">
        <p className="font-Poppins-Regular text-[20px] text-[#323232]">Don't have an account?</p>
        <Link  href={route('login.show')}>
        <button className="border-none text-[#323232] font-Poppins-Bold 
        text-[20px] underline underline-offset-2">Sign In</button>
        </Link>
       </div>
    </section>
    </AuthLayout>
    </>
  )
}