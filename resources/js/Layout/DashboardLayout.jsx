import navDashboardAccountIcon from "@images/dashboard/layout/navDashboardAccountIcon.svg";
import navDashboardExerciseIcon from "@images/dashboard/layout/navDashboardExerciseIcon.svg";
import navDashboardHomeIcon from "@images/dashboard/layout/navDashboardHomeIcon.svg";
import navDashboardLearnIcon from "@images/dashboard/layout/navDashboardLearnIcon.svg";
import navDashboardMusicIcon from "@images/dashboard/layout/navDashboardMusicIcon.svg";
import navDashboardWhiteAccountIcon from "@images/dashboard/layout/navDashboardWhiteAccountIcon.svg";
import navDashboardWhiteExerciseIcon from "@images/dashboard/layout/navDashboardWhiteExerciseIcon.svg";
import navDashboardWhiteHomeIcon from "@images/dashboard/layout/navDashboardWhiteHomeIcon.svg";
import navDashboardWhiteLearnIcon from "@images/dashboard/layout/navDashboardWhiteLearnIcon.svg";
import navDashboardWhiteMusicIcon from "@images/dashboard/layout/navDashboardWhiteMusicIcon.svg";
import navDashboardLogoutIcon from "@images/dashboard/layout/navDashboardLogoutIcon.svg";
import navDashboardLogo from "@images/dashboard/layout/navDashboardLogo.svg";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "@vendor/tightenco/ziggy";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MusicPlayer from "./MusicPlayer.jsx";
import MusicListLayout from "./MusicListLayout.jsx";
import { useStopwatch } from "react-timer-hook";
import axios from "axios";
import { debounce } from "lodash";

export default function DashboardLayout({ children, type }) {
    const route = useRoute();
    const [musicQueue, setMusicQueue] = useState([]);
    const [musicIndex, setMusicIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const audioRef = useRef();

    const stopWatch = useStopwatch()


    const debouncedSaveUserMusicTime = debounce(saveUserMusicTime, 50);
    useEffect(() => {

        window.addEventListener('beforeunload', debouncedSaveUserMusicTime)
        return () => window.removeEventListener('beforeunload', debouncedSaveUserMusicTime)
    }, [stopWatch.totalSeconds])

    useEffect(() => {
        fetch("/music/mostPlayed")
            .then((response) => response.json())
            .then((data) => {
                setMusicQueue((queue) => [...queue, data["mostPlayed"]]);
            });
    }, []);

    async function saveUserMusicTime() {
        try {
            const response = await axios.post('/userMusic/store', {
                duration: stopWatch.totalSeconds,
                musicId: musicQueue[musicIndex].id
            });
            stopWatch.reset()

        } catch (error) {
        }

    }

    return (
        <>
            <main className="min-h-[100vh] flex bg-[#F6F4F0]">
                <header className="w-[160px] flex flex-col items-center justify-between min-h-[100vh] fixed left-0 py-[50px]">
                    <div className="flex flex-col gap-[50px]">
                        <DashboardNavButtons route={route} currentType={type} />
                    </div>
                    <LogoutButton route={route} />
                </header>
                <div className="min-w-[160px]"></div>
                <section className="flex relative">
                    {type === "Dashboard/Music/Music"
                        ? React.cloneElement(children, {
                            musicIndex,
                            setMusicIndex,
                            musicQueue,
                            setMusicQueue,
                            audioRef,
                            setIsPaused,
                            saveUserMusicTime,
                        })
                        : children}
                </section>
                <MusicListLayout
                    musicIndex={musicIndex}
                    setMusicIndex={setMusicIndex}
                    musicQueue={musicQueue}
                    setMusicQueue={setMusicQueue}
                    type={type}
                    audioRef={audioRef}
                    setIsPaused={setIsPaused}
                    saveUserMusicTime={saveUserMusicTime}
                ></MusicListLayout>
                <MusicPlayer
                    saveUserMusicTime={saveUserMusicTime}
                    musicQueue={musicQueue}
                    setMusicQueue={setMusicQueue}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    audioRef={audioRef}
                    musicIndex={musicIndex}
                    setMusicIndex={setMusicIndex}
                    stopWatch={stopWatch}
                />
            </main>
        </>
    );
}

function DashboardNavButtons({ route, currentType }) {
    const navRouteArray = [
        "home",
        "learn.show",
        "meditate.show",
        "music.show",
        "account.show",
    ];
    const navImgSrcArray = [
        {
            default: navDashboardHomeIcon,
            active: navDashboardWhiteHomeIcon,
        },
        {
            default: navDashboardLearnIcon,
            active: navDashboardWhiteLearnIcon,
        },
        {
            default: navDashboardExerciseIcon,
            active: navDashboardWhiteExerciseIcon,
        },
        {
            default: navDashboardMusicIcon,
            active: navDashboardWhiteMusicIcon,
        },
        {
            default: navDashboardAccountIcon,
            active: navDashboardWhiteAccountIcon,
        },
    ];
    const buttonNamesArray = [
        "Dashboard/Dashboard",
        "Dashboard/Learn/Learn",
        [
            "Dashboard/Meditate/Meditate",
            "Dashboard/Breathing/Breathing",
            "Dashboard/Breathing/BreathingList",
        ],
        "music",
        "Dashboard/Account/Account",
    ];
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
    function find() { }

    return (
        <>
            <Link
                className={`w-[45px] aspect-square flex justify-center items-center mr-[10px]
          rounded-[10px]
      dashboardLink relative ${buttonName === currentType ? "bg-[#2E5077]" : ""}
      ${Array.isArray(buttonName) &&
                    buttonName.includes(currentType) &&
                    "bg-[#2E5077]"
                    }`}
                href={route(routeName)}
            >
                <span className="absolute top-[8px] left-[-10px] bg-[#2E5077] w-[3px] hidden rounded-[20px] h-[30px]"></span>
                <div className="w-fit ">
                    {buttonName === currentType ||
                        (Array.isArray(buttonName) &&
                            buttonName.includes(currentType)) ? (
                        <img src={imgSrc.active} alt="" />
                    ) : (
                        <img src={imgSrc.default} alt="" />
                    )}
                </div>
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
