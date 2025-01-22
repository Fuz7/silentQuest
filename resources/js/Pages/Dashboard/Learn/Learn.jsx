import learn1 from "@images/dashboard/learn/learn1.png";
import learn2 from "@images/dashboard/learn/learn2.png";
import learn3 from "@images/dashboard/learn/learn3.png";
import learn4 from "@images/dashboard/learn/learn4.png";
import learn5 from "@images/dashboard/learn/learn5.png";
import learn6 from "@images/dashboard/learn/learn6.png";
import learn7 from "@images/dashboard/learn/learn7.png";
import learn8 from "@images/dashboard/learn/learn8.png";
import learn9 from "@images/dashboard/learn/learn9.png";

export default function Learn() {
    const cardTitles = [
        "Inner Health Studio",
        "Mindful.org",
        "The Art of Living Foundation",
        "PositivePsychology.com",
        "The Guided Meditation Site",
        "Insight Timer",
        "Mindfulness Exercises",
        "Flourish After 40",
        "Awake & Mindful",
    ];
    const cardDescription = [
        "A diverse collection of guided meditation scripts aimed at calming the mind and promoting relaxation.",
        "Guided meditation scripts from influential women in the mindfulness movement, covering topics like deep relaxation and embodied awareness.",
        "Guided meditations addressing stress, anxiety, depression, and sleep improvement, suitable for both beginners and experienced practitioners.",
        "Three simple guided meditation scripts designed to improve well-being, including mindfulness and relaxation techniques.",
        "An expanding range of free guided meditation scripts for inspiration and personal use.",
        "A vast collection of free meditations, including specific sessions for sleep improvement and focus enhancement.",
        "Provides a variety of guided meditations focusing on stress reduction, anxiety relief, and overall mindfulness practices.",
        "Features free guided meditation scripts aimed at relaxation, stress relief, and enhancing self-esteem.",
        "Offers free guided meditations specifically designed to relieve stress and promote a calmer mind.",
    ];
    const cardBackgroundImages = [
        learn1,
        learn2,
        learn3,
        learn4,
        learn5,
        learn6,
        learn7,
        learn8,
        learn9,
    ];
    const cardUrls = [
        "https://www.innerhealthstudio.com/meditation-scripts.html",
        "https://www.mindful.org/guided-meditation-scripts-from-the-powerful-women-of-the-mindfulness-movement/",
        "https://www.artofliving.org/us-en/meditation/beginners-guide/online-guided-meditation",
        "https://positivepsychology.com/guided-meditation-scripts/",
        "https://www.the-guided-meditation-site.com/guided-meditation-scripts.html",
        "https://insighttimer.com/meditation-topics/sleep",
        "https://mindfulnessexercises.com/meditation/stress/guided/",
        "https://flourishafter40.com/15-free-guided-meditation-scripts/",
        "https://awakeandmindful.com/free-guided-meditations-to-relieve-stress/",
    ];
    return (
        <div className="flex flex-col mt-[60px] gap-[58px] ml-[60px]">
            <h2 className="font-Poppins-Medium text-[32px] text-black">
                Discover Guided Meditation
            </h2>
            <div className="flex flex-wrap gap-[45px] gap-y-[25px] max-w-[1500px]">
                {cardTitles.map((titles, index) => {
                    return (
                        <LearnCard
                            key={titles + index}
                            title={cardTitles[index]}
                            description={cardDescription[index]}
                            imgSrc={cardBackgroundImages[index]}
                            url={cardUrls[index]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function LearnCard({ title, description, imgSrc,url }) {
    return (
        <>
            <div
                style={{
                    backgroundImage: `url('${imgSrc}')`,
                }}
                className="w-[450px] h-[220px] rounded-[20px] pl-[30px] pt-[30px] flex flex-col drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
                <h1 className="font-Poppins-Bold text-[20px] text-black leading-none">
                    {title}
                </h1>
                <p className="mt-[55px] font-Poppins-Regular text-[14px] text-[#979CA6] max-w-[362px] leading-none">
                    {description}
                </p>
                <a
                    target="_blank"
                    href={url}
                    className="mt-auto ml-auto w-[150px] h-[40px]  bg-[#2E5077]  font-Poppins-SemiBold 
              text-[18px] text-white  mr-[20px] mb-[20px] rounded-[10px] flex justify-center items-center
              "
                >
                    <div
                        className="
               "
                    >
                        Read More
                    </div>
                </a>
            </div>
        </>
    );
}
