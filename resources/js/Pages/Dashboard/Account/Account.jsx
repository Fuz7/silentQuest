export default function Account({auth}){
  
  return(
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
      <div className="w-[800px] h-[177px] bg-white p-[20px] flex flex-col gap-[50px] rounded-[10px]
       drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h3 className=" text-[#272628] font-Poppins-Medium text-[20px]">Total accumulated</h3>
      </div>
    </div>
  )
}