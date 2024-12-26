import { David } from "../assets";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const OnBoarding = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center relative text-white gap-y-8 max-lg:gap-y-12 leading-tight">
            <div className="flex flex-col text-center z-[999px] relative items-center justify-center gap-y-6 max-lg:gap-y-10">
                <Header />

                <h1 className=" text-white font-bold lg:text-6xl md:text-4xl text-2xl md:leading-normal leading-tight">
                    Get your{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-600">
                        customized
                    </span>{" "}
                    Social banner.
                </h1>
                <p className=" text-lg text-transparent text-white md:text-3xl lg:text-4xl ">
                    for Software Developers & Designers.
                </p>
            </div>

            <Link to={"/get-started"}>
                <button className="bg-white text-purple-700 md:text-lg lg:text-xl p-2 lg:px-4 lg:py-3 rounded-lg font-semibold hover:text-white hover:bg-purple-700 transition ease-in align-middle">
                    get started! <span className="pl-3">👩‍🍳</span>
                </button>
            </Link>

            <div>
                <img
                    className="rounded-lg my-[10vh] max-w-[1000px] w-[95vw]"
                    src={David}
                    alt="david"
                />
            </div>

            <div className=" flex gap-4 mb-[3vh]">
                <a
                    href="https://x.com/heyrapto"
                    className="p-3 hover:text-black text-white hover:bg-slate-50 border-2 border-slate-500 transition ease-in-out delay-75"
                >
                    <FaXTwitter className="md:w-[25px] w-[20px]" />
                </a>

                <a
                    href="https://github.com/heycalebszn"
                    className="p-3 hover:text-black text-white hover:bg-slate-50 border-2 border-slate-500 transition ease-in-out delay-75"
                >
                    <FaGithub className="md:w-[25px] w-[20px]" />
                </a>
            </div>
        </div>
    );
};

export default OnBoarding;
