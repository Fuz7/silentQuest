import DashboardLayout from "../../Layout/DashboardLayout"
import HomeLayout from "../../Layout/HomeLayout"

export default function Dashboard({userId}){
  console.log(userId)
  return(<>
    <DashboardLayout>
      <div className="text-[50px] mt-[50px] ">Dashboard</div>
    </DashboardLayout>
  </>)
}