import dashboardIcon from '@images/dashboard/dashboardIcon.svg'

export default function Dashboard({ auth, date }) {
  console.log(date)
  return (<>
    <section className="flex">
      <div className="flex flex-col w-[1000px]">
        <Header auth={auth} />
        <Date date={date} />
      </div>
    </section>
  </>)
}

function Header({ auth }) {
  return (
    <>
      <div className="w-full h-[220px] bg-homeGradient rounded-[20px] 
            mt-[100px] relative pl-[40px] pt-[40px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="text-[#272628] font-Poppins-Medium text-[40px] leading-none">Hi {auth.username}</h2>
        <p className="font-Poppins-Regular mt-[46px] text-[#727272] leading-[110%] text-[18px] max-w-[532px]">
          Welcome back {auth.username}. We are glad you are here.
          Inspire the best work in people, enabling them to achieve
          their goals
        </p>
        <img className='absolute right-[22px] bottom-[13px]' src={dashboardIcon} alt="" />
      </div>
    </>
  )
}

function Date({ date }) {
  return (<>
    <div className='self-end mt-[40px] items-center flex gap-[52px]'>
      <p className='font-Poppins-Bold text-[25px] text-[#272628]'>{date.monthName}</p>
      <div className='flex gap-[15px] '>
        {date.weekdays.map((day, index) => {
          return (
            index !== 3 ?
              (<div
                className='w-[50px] aspect-square bg-[#D9D9D9] flex
                  text-[#272628] text-[20px] font-Poppins-Medium rounded-[10px]
                  justify-center items-center'
                key={index + "day"}>
                {day}
              </div>) :
              (
                <div className='w-[50px] aspect-square relative'>
                  <span className='absolute top-0 w-full h-[100px] bg-[#4DA1A9] rounded-[10px] py-[14px]
                    text-white font-Poppins-Medium
                    flex items-end justify-center'>{date.dayAbbreviation}</span>
                  <div className='relative aspect-square w-[50px] flex bg-[#79D7BE]
                    rounded-[10px] justify-center items-center text-[20px] text-[#2E5077] 
                    font-Poppins-SemiBold '
                    key={index + "day"}>{day}

                  </div>
                </div>)
          )
        })}
      </div>
    </div>
  </>)
}