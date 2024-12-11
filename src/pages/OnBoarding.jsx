import { David, B } from "../assets";
import {Link} from "react-router-dom";
import {Twitter, Github} from "lucide-react";

const OnBoarding = () => {
    return(
        <div className="flex flex-col items-center justify-center text-center pt-[100px] relative">
            <div className="flex flex-col text-center z-[999px] relative items-center justify-center m-auto">
                <div className="border border-gray-400 p-2 rounded-[30px] flex gap-2 w-[150px] items-center 
                mb-[20px] md:p-[8px]">
                    <img src={B} className="w-[25px] md:w-[] rounded-full ml-[10px]" />
                    <span className='text-white md:text-[13px]'>Bannerly</span>
                </div>
            <h1 className="md:text-[70px] text-white text-[35px] font-bold">Get your <span className="bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-600">customized</span> Social banner.</h1>
            <p className="md:text-[60px] text-transparent text-white font-800 text-[20px]">for Software Developers & Designers.</p>
            </div>

            <Link to={"/get-started"}>
            <button className="bg-white text-purple-700 md:text-[20px] mt-[50px] w-[200px] p-[10px] rounded-[15px] font-semibold md:w-[300px] ">get started! 👩‍🍳</button>
            </Link>
            <div>
                <img className="rounded-[10px] mt-[100px] w-[1000px] md:px-[0px] px-[20px]" src={David} alt="david" />
                
            </div>
            <div className="mt-[50px] flex gap-4 mb-[30px]">
                <div className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]">
                    <a href="https://x.com/heyrapto">
                <Twitter className="md:w-[25px] text-white w-[20px]" />
                </a>
                </div>
                <div className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]">
                <a href="https:/github.com/heycalebszn">
                <Github className="md:w-[25px] text-white w-[20px]" />
                </a>
                </div>
            </div>
        </div>
    )
}

export default OnBoarding;