import navDashboardAccountIcon from "@images/dashboard/navDashboardAccountIcon.svg";
import navDashboardExerciseIcon from "@images/dashboard/navDashboardExerciseIcon.svg";
import navDashboardHomeIcon from "@images/dashboard/navDashboardHomeIcon.svg";
import navDashboardLearnIcon from "@images/dashboard/navDashboardLearnIcon.svg";
import navDashboardMusicIcon from "@images/dashboard/navDashboardMusicIcon.svg";
import navDashboardWhiteAccountIcon from "@images/dashboard/navDashboardWhiteAccountIcon.svg";
import navDashboardWhiteExerciseIcon from "@images/dashboard/navDashboardWhiteExerciseIcon.svg";
import navDashboardWhiteHomeIcon from "@images/dashboard/navDashboardWhiteHomeIcon.svg";
import navDashboardWhiteLearnIcon from "@images/dashboard/navDashboardWhiteLearnIcon.svg";
import navDashboardWhiteMusicIcon from "@images/dashboard/navDashboardWhiteMusicIcon.svg";
import navDashboardLogoutIcon from "@images/dashboard/navDashboardLogoutIcon.svg";
import navDashboardLogo from "@images/dashboard/navDashboardLogo.svg";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "@vendor/tightenco/ziggy";

export default function DashboardLayout({ children, type }) {
  const route = useRoute();
  return (
    <>
      <main className="min-h-[100vh] flex bg-[#F6F4F0]">
        <header className="w-[160px] flex flex-col items-center justify-between py-[50px]">
          <div className="flex flex-col gap-[50px]">
            <DashboardNavButtons route={route} currentType={type} />
          </div>
          <LogoutButton route={route} />
        </header>
        <section className="flex">{children}</section>
      </main>
    </>
  );
}

function DashboardNavButtons({ route, currentType }) {
  const navRouteArray = ["home", "learn.show", "home", "home", "home"];
  const navImgSrcArray = [
    {
      default: navDashboardHomeIcon,
      active: navDashboardWhiteHomeIcon
    },
    {
      default: navDashboardLearnIcon,
      active: navDashboardWhiteLearnIcon
    },
    {
      default: navDashboardExerciseIcon,
      active: navDashboardWhiteExerciseIcon
    },
    {
      default: navDashboardMusicIcon,
      active: navDashboardWhiteMusicIcon
    },
    {
      default: navDashboardAccountIcon,
      active: navDashboardWhiteAccountIcon
    },
  ];
  const buttonNamesArray = ["dashboard", "learn", "exercise", "music", "account"];

  return (
    <>
      <Link
        className=" flex justify-center items-center"
        href={route("home")}
      >
        <button className="w-fit mb-[42px]" type="button">
          <img src={navDashboardLogo} alt="" />
        </button>
      </Link>
      {navRouteArray.map((routeName, index) => {
        return (
          <NavButton
            key={routeName + index}
            route={route}
            routeName={routeName}
            imgSrc={navImgSrcArray[index]}
            buttonName={buttonNamesArray[index]}
            currentType={currentType}
          />
        );
      })}
    </>
  );
}

function NavButton({ route, routeName, imgSrc, buttonName, currentType }) {
  return (
    <>
      <Link
        className={`w-[45px] aspect-square flex justify-center items-center mr-[10px]
          rounded-[10px]
      dashboardLink relative ${buttonName === currentType ? 'bg-[#2E5077]' : ''}`}
        href={route(routeName)}
      >

        <span className="absolute top-[8px] left-[-10px] bg-[#2E5077] w-[3px] hidden rounded-[20px] h-[30px]"></span>
        <button className="w-fit " type="button">

          {buttonName === currentType ?
          (
          <img src={imgSrc.active} alt="" />
          ) :
          (
          <img src={imgSrc.default} alt="" />
          )}
        </button>
      </Link>
    </>
  );
}

function LogoutButton({ route }) {
  const { post } = useForm();
  const submit = (e) => {
    e.preventDefault();
    post(route("auth.logout"));
  };
  return (
    <form className="" onSubmit={submit}>
      <button
        className=" aspect-square flex justify-center items-center mr-[5px]"
        type="submit"
      >
        <img src={navDashboardLogoutIcon} alt="" />
      </button>
    </form>
  );
}
