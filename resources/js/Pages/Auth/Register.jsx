import AuthLayout from "../../Layout/AuthLayout";
import registerBackground from "@images/auth/registerBackground.svg";
import registerPasswordIcon from "@images/auth/registerPasswordIcon.svg";
import registerErrorIcon from "@images/auth/registerErrorIcon.svg";
import closedRegisterPasswordIcon from "@images/auth/closedRegisterPasswordIcon.svg";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
  return (
    <>
      <AuthLayout type={"register"}>
        <section className="min-h-[100vh] relative flex flex-col items-end pr-[300px] pt-[160px]">
          <img
            className="absolute left-0 bottom-0"
            src={registerBackground}
            alt=""
          />
          <h1 className="font-Poppins-Bold text-[88px] text-[#272628] mb-[70px]">
            Create Account
          </h1>
          <Form route={route} />
          <div className="flex  w-full justify-center gap-[10px] max-w-[450px] mt-[20px]">
            <p className="font-Poppins-Regular text-[20px] text-[#323232]">
              Already Have an account?
            </p>
            <Link href={route("login")}>
              <button
                className="border-none text-[#323232] font-Poppins-Bold 
        text-[20px] underline underline-offset-2"
              >
                Sign In
              </button>
            </Link>
          </div>
        </section>
      </AuthLayout>
    </>
  );
}

function Form({ route }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { data, errors, setData, post } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("auth.register"));
  };
  console.log(data);
  return (
    <>
      <form className="flex flex-col" onSubmit={submit}>
        <input
          name="username"
          value={data.username}
          onChange={(e) => setData("username", e.target.value)}
          placeholder="Full Name"
          className={`border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] ${errors.username ? "border-[#E91429]" : "mb-[40px] border-[#979CA6]"
            } 
         focus-visible:outline-none`}
          type="text"
        />
        {errors.username && (
          <div className="flex gap-[5px] mt-[12px] mb-[27px]">
            <img src={registerErrorIcon} alt="" />
            <p className="font-Poppins-Regular text-[#E91429]">
              {errors.username}
            </p>
          </div>
        )}
        <input
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          placeholder="Email Address"
          className={`border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] ${errors.email ? "border-[#E91429]" : "mb-[40px] border-[#979CA6]"
            } 
         focus-visible:outline-none`}
          type="text"
        />
        {errors.email && (
          <div className="flex gap-[5px] mt-[12px] mb-[27px]">
            <img src={registerErrorIcon} alt="" />
            <p className="font-Poppins-Regular text-[#E91429]">
              {errors.email}
            </p>
          </div>
        )}
        <div className="relative w-fit mb-[50px]">
          <input
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            placeholder="Password"
            className={`border-b-[1px] font-Poppins-Regular text-[20px]
       pb-[5px] w-[450px] ${errors.password ? "border-[#E91429]" : "mb-[40px] border-[#979CA6]"
              } 
         focus-visible:outline-none`}
            type={isPasswordVisible ? "text" : "password"}
          />

          {errors.password && (
            <div className="flex gap-[5px] mt-[12px] mb-[27px]">
              <img src={registerErrorIcon} alt="" />
              <p className="font-Poppins-Regular text-[#E91429]">
                {errors.password}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
            className="absolute right-0 top-[10px] w-fit h-fit"
          >
            {isPasswordVisible ? (
              <img src={closedRegisterPasswordIcon}></img>
            ) : (
              <img src={registerPasswordIcon}></img>
            )}
          </button>
        </div>
        <button
          className="bg-[#2E5077] w-[450px] max-w-[450px] font-Poppins-Bold text-[20px]
       text-[#FFFFFF] border-none h-[55px] rounded-[16px] "
        >
          Create Account
        </button>
      </form>
    </>
  );
}
