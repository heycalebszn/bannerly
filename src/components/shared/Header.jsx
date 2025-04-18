import { Link } from "react-router-dom";
import { B } from "../../assets";

const Header = () => {
    return (
        <header>
            <Link
                to={"/"}
                className="border border-gray-400 p-2 rounded-[30px] flex gap-2 w-[150px] items-center justify-center mb-[20px] md:p-[8px] hover:bg-purple-600 transition ease-in-out delay-75 cursor-pointer text-white mx-auto mt-[5vh]"
            >
                <img src={B} className="w-[25px] rounded-full" />
                <span className="text-lg sm:text-md">Bannerly</span>
            </Link>
        </header>
    );
};

export default Header;
