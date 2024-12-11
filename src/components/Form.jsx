import { Github, Twitter } from "lucide-react";
import BannerCard from "./BannerCard";
import { useState, useEffect } from "react";
import { solidity,
    html,
    css,
    js,
    ts,
    python,
    go,
    php,
    rust,
    figma,
    angular,
    svelte,
    react,
    tailwind,
    vue,
    node,
    express, 
    next,
    kotlin,
    java,
    cpp,
    dart,
    psql,
    mongo, } from "../assets"
const Form = () => {
    const [ formData, setFormData ] = useState({
        name: "",
        field: "",
        twitter: "",
        github: "",
    })
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const availableLanguages = [
        {name: "typescript", icon: 
     ts},
        {name: "javascript", icon: 
     js},
        {name: "vue", icon: 
     vue},
        {name: "react", icon: 
     react},
        {name: "svelte", icon: 
     svelte},
        {name: "solidity", icon: 
     solidity},
        {name: "rust", icon: 
     rust},
        {name: "tailwind", icon: 
     tailwind},
        {name: "python", icon: 
     python},
    ];
    const [showBanner, setShowBanner] = useState(false);

    const handleLanguageChange = (language) => {
        if(selectedLanguages.includes(language)) {
            setSelectedLanguages((prev) => prev.filter((l) => l !== language));
        } else if(selectedLanguages.length < 5) {
            setSelectedLanguages((prev) => [...prev, language]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    useEffect(() => {
        const savedData = localStorage.getItem("bannerFormData");
        if(savedData){
            setFormData(JSON.parse(savedData))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("bannerFormData", JSON.stringify(formData));
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowBanner(true)
    }

    return(
        <section className="flex flex-col items-center justify-center text-left pt-[100px] w-full">
        <form className="flex justify-center flex-col w-[500px] p-[20px] mb-[100px] m-auto" onSubmit={handleSubmit}>
            <h1 className="text-white font-bold md:text-[40px] text-[30px] pb-[50px] text-center">Let's Get you <span className="bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-600">Started</span>!</h1>
            <div className="flex flex-col mb-[20px]">
                <label htmlFor="Full Name" className="text-white text-[20px] font-md pb-[10px]">Full Name</label>
                <input className="w-full h-[40px] p-[10px] rounded-md outline-none bg-transparent border border-gray-500 text-gray-300" type="text" placeholder="e.g Caleb Kalejaiye" value={formData.name} onChange={handleChange} name="name" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="Role" className="text-white text-[20px] font-md pb-[10px]">Field</label>
                <input className="w-full h-[40px] p-[10px] rounded-md outline-none bg-transparent border border-gray-500 text-gray-300" type="text" placeholder="e.g Frontend Developer and Designer" value={formData.field} onChange={handleChange} name="field" />
            </div>
            <div className="flex flex-col mt-[20px]">
                <h1 className="text-white text-[20px] pb-[10px]">Socials</h1>
                <div className="flex gap-4">
                <div className="flex border border-gray-500 p-[5px] gap-2 rounded-md bg-transparent h-[40px]">
                    <Twitter className="text-white" />
                    <input className="bg-transparent outline-none w-full text-gray-300" type="text" placeholder="e.g heyrapto" value={formData.twitter} onChange={handleChange} name="twitter" />
                </div>
                <div className="flex border border-gray-500 p-[5px] gap-2 rounded-md bg-transparent h-[40px]">
                    <Github className="text-white" />
                    <input className="bg-transparent outline-none w-full text-gray-300" type="text" placeholder="e.g heycalebszn" value={formData.github} onChange={handleChange} name="github" />
                </div>
                </div>
            </div>
            <div className="mt-[20px]">
                <h1 className="text-white pb-[10px] text-[20px]">Stacks</h1>
                <div className="grid grid-cols-3 gap-4 w-[100%] p-2">
                    {availableLanguages.map((language) => (
                        <div className="">
                            <label key={language.name}
                            className={`flex items-center space-x-2 cursor-pointer ${
                                selectedLanguages.includes(language.name)
                                ? "text-gray-500"
                                : "text-gray-700"
                            }`}
                            >
                            <input 
                            type="checkbox"
                            value={language.name}
                            checked={selectedLanguages.includes(language.name)}
                            onChange={() => handleLanguageChange(language.name)}
                            className="form-checkbox h-5 w-5 text-blue-500"
                            />
                            <span>{language.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
                <p className="mt-2 text-gray-500">
                    You can select a maximum of <strong>5</strong> languages.
                </p>
            </div>

            <button type="submit" className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-full">generate banner! 👩‍🍳</button>
        </form>

        {showBanner && <BannerCard formData={formData} selectedLanguages={selectedLanguages} availableLanguages={availableLanguages} /> }
        </section>
    )
}

export default Form;