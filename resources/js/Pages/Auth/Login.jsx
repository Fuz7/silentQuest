import AuthLayout from "../../Layout/AuthLayout"
import loginIcon from '@images/auth/loginIcon.svg'
import loginPasswordIcon from '@images/auth/loginPasswordIcon.svg'
import closedLoginPasswordIcon from '@images/auth/closedLoginPasswordIcon.svg'
import loginErrorIcon from '@images/auth/loginErrorIcon.svg'
import { Link, useForm } from "@inertiajs/react"
import {useRoute} from '@vendor/tightenco/ziggy'
import { useState } from "react"
export default function Login(){
  const route = useRoute()
  return(
    <>
    <AuthLayout type={'login'}>

    <section className="bg-loginGradient min-h-[100vh] flex flex-col justify-start items-center pt-[120px]">
      <img src={loginIcon} alt="" />
      <h1 className="font-Poppins-Bold text-white text-[40px] mt-[30px]">Log in to Silent Quest</h1>
      <Form route={route} />
       <div className="flex gap-[20px] w-full max-w-[450px] mt-[60px]">
        <p className="font-Poppins-Regular text-[20px] text-white">Don't have an account?</p>
        <Link  href={route('register.show')}>
        <button className="border-none text-[#79D7BE] font-Poppins-Bold 
        text-[20px] underline underline-offset-2">Create an account</button>
        </Link>
       </div>
    </section>
    </AuthLayout>
    </>
  )
}

function Form({route}){
  const [isPasswordVisible,setIsPasswordVisible] = useState(false) 
  
  const {data,setData,errors,post} = useForm({
    email:'',
    password:'',
  }) 
  const submit = (e)=>{
    e.preventDefault()
    post(route('auth.login'))
  }
  return(
    <>
    {(errors.email || errors.password) && (
    <div className="w-[500px] bg-[#F73649] h-[80px] mt-[30px] flex items-center pl-[30px] gap-[20px]">
      <img src={loginErrorIcon} alt="" />
      
      <p className="font-Poppins-Regular text-[16px] text-white">{errors.email || errors.password}</p>
    </div>
    )}
    <form onSubmit={submit} className="flex flex-col">
      <input
      value={data.email}
      onChange={(e)=>setData("email",e.target.value)}
      className="bg-transparent border-b-[1px] mt-[60px]
      border-white border-solid  text-[20px] text-white w-[450px]
      font-Poppins-Regular py-[5px] focus-visible:outline-none" placeholder="Email Address" type="text" />
       <div className="relative w-fit">
      <input 
      value={data.password}
      onChange={(e)=>setData("password",e.target.value)}
      className="bg-transparent border-b-[1px] mt-[30px]
      border-white border-solid  text-[20px] text-white w-[450px]
      font-Poppins-Regular py-[5px] focus-visible:outline-none" placeholder="Password" 
      type={isPasswordVisible?'text':'password'} />
       <button 
       type="button"
       onClick={()=>{
         setIsPasswordVisible(!isPasswordVisible)
        }}
        className="absolute right-0 bottom-[10px] w-fit h-fit">
       {isPasswordVisible?
       
       (<img src={closedLoginPasswordIcon}></img>)
       :
       (<img src={loginPasswordIcon}></img>)
       
      }
       </button>
       </div>
       <button type="submit" className="bg-[#79D7BE] w-[450px] max-w-[450px] font-Poppins-Bold text-[20px]
       text-[#272628] border-none h-[50px] rounded-[16px] mt-[40px]">Sign In</button>
    
    </form>
    </>
  )
}