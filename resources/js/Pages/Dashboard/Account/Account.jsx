export default function Account({ auth }) {

  return (
    <div className="w-[1080px] flex flex-col pl-[60px] pt-[60px]">
      <h2 className="font-Poppins-Medium text-[32px] text-[#2E5077] leading-none mb-[46px]">Account Details</h2>
      <div className="flex pl-[20px] flex-col gap-[22px] mb-[40px]">
        <div className="flex gap-[30px] items-center">
          <p className="font-Poppins-Medium text-[24px] text-[#727272] leading-none">Name:</p>
          <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">{auth.username}</p>
        </div>
        <div className="flex gap-[37px] items-center">
          <p className="font-Poppins-Medium text-[24px] text-[#727272] leading-none">Email:</p>
          <p className="font-Poppins-Medium text-[32px] text-[#272628] leading-none">{auth.email}</p>
        </div>
      </div>
      <div className="w-[800px] h-[186px] bg-white p-[20px] flex flex-col gap-[50px] rounded-[10px]
       drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-[30px]">
        <h3 className=" text-[#272628] font-Poppins-Medium text-[20px]">Total accumulated</h3>
        <div className="flex justify-between pr-[30px]">
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">24</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Exercises</p>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">00h 00m 00s</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Meditation Time</p>
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="font-Poppins-SemiBold text-[32px] text-[#272628] leading-none">00h 00m 00s</p>
            <p className="font-Poppins-Regular text-[20px] text-[#979CA6] leading-none">Music Time</p>
          </div>
        </div>
      </div>
      <div className="flex gap-[30px]  ">
        <div className="w-[350px] h-[240px] flex flex-col bg-white rounded-[10px]
         drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="h-[60px] border-b-[1px] border-[#979CA6] p-[20px] pt-[21px]
          text-[#272628] text-[20px] leading-none font-Poppins-Medium">
            Breathing Exercises Count
          </div>
          <div className="h-full px-[50px] pt-[30px] flex flex-col text-[20px] font-Poppins-Regular text-[#272628] gap-[30px]">
            <div className="flex justify-between">
              <div className="leading-none">Beginner</div>
              <div className="leading-none">12</div>
            </div>
            <div className="flex justify-between">
              <div className="leading-none">Intermediate</div>
              <div className="leading-none">8</div>
            </div>
            <div className="flex justify-between">
              <div className="leading-none">Advance</div>
              <div className="leading-none">4</div>
            </div>
          </div>
        </div>

        <div className="w-[420px] h-[240px] flex flex-col bg-white rounded-[10px]
         drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="h-[60px] border-b-[1px] border-[#979CA6] p-[20px] pt-[21px]
          text-[#272628] text-[20px] leading-none font-Poppins-Medium">
            Meditation Title
          </div>
          <div className="flex flex-col px-[50px] pt-[30px] gap-[25px] text-[#272628]">
            <h2 className="text-[30px] font-Poppins-SemiBold leading-none">Mindful Seeker</h2>
            <div className="flex flex-col gap-[13px]">
              <div className="flex justify-between font-Poppins-Regular text-[20px]">
                <p className="leading-none">Experience Pts:</p>
                <p className="leading-none">1000exp</p>
              </div>
              <div className="flex justify-between font-Poppins-Regular text-[#979CA6]">
                <p className="text-[16px] max-w-[150px] leading-none">Experience points needed to ascend:</p>
                <p className="text-[20px]">2000exp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}