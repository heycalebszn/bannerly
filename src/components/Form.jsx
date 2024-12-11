import { Github, Twitter, ChevronDown, X } from "lucide-react";
import BannerCard from "./BannerCard";
import { useState, useEffect } from "react";
import {
  solidity,
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
  mongo,
  docker,
  flutter,
  kubernetes,
  aws,
  azure,
  firebase,
  git,
  linux,
  csharp,
} from "../assets";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    twitter: "",
    github: "",
  });
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const availableLanguages = [
    { name: "angular", icon: angular },
    { name: "aws", icon: aws },
    { name: "azure", icon: azure },
    { name: "C#", icon: csharp },
    { name: "c++", icon: cpp },
    { name: "css", icon: css },
    { name: "dart", icon: dart },
    { name: "docker", icon: docker },
    { name: "express", icon: express },
    { name: "figma", icon: figma },
    { name: "firebase", icon: firebase },
    { name: "flutter", icon: flutter },
    { name: "git", icon: git },
    { name: "golang", icon: go },
    { name: "html", icon: html },
    { name: "java", icon: java },
    { name: "javascript", icon: js },
    { name: "kotlin", icon: kotlin },
    { name: "kubernetes", icon: kubernetes },
    { name: "linux", icon: linux },
    { name: "mongodb", icon: mongo },
    { name: "next", icon: next },
    { name: "node", icon: node },
    { name: "PHP", icon: php },
    { name: "postgresql", icon: psql },
    { name: "python", icon: python },
    { name: "react", icon: react },
    { name: "rust", icon: rust },
    { name: "solidity", icon: solidity },
    { name: "svelte", icon: svelte },
    { name: "tailwind", icon: tailwind },
    { name: "typescript", icon: ts },
    { name: "vue", icon: vue },
  ];
  const [showBanner, setShowBanner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter languages based on search term
  const filteredLanguages = availableLanguages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages((prev) => prev.filter((l) => l !== language));
    } else if (selectedLanguages.length < 5) {
      setSelectedLanguages((prev) => [...prev, language]);
    }
  };

  const removeLanguage = (language) => {
    setSelectedLanguages((prev) => prev.filter((l) => l !== language));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const savedData = localStorage.getItem("bannerFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bannerFormData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowBanner(true);
  };

  return (
    <section className="flex flex-col items-center justify-center text-left pt-[100px] w-full">
      <form
        className="flex justify-center flex-col w-[500px] p-[20px] mb-[100px] m-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white font-bold md:text-[40px] text-[30px] pb-[50px] text-center">
          Let&apos;s Get you{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-600">
            Started
          </span>
          !
        </h1>
        <div className="flex flex-col mb-[20px]">
          <label
            htmlFor="Full Name"
            className="text-white text-[20px] font-md pb-[10px]"
          >
            Full Name
          </label>
          <input
            className="w-full h-[40px] p-[10px] rounded-md outline-none bg-transparent border border-gray-500 text-gray-300"
            type="text"
            placeholder="e.g Caleb Kalejaiye"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="Role"
            className="text-white text-[20px] font-md pb-[10px]"
          >
            Field
          </label>
          <input
            className="w-full h-[40px] p-[10px] rounded-md outline-none bg-transparent border border-gray-500 text-gray-300"
            type="text"
            placeholder="e.g Frontend Developer and Designer"
            value={formData.field}
            onChange={handleChange}
            name="field"
          />
        </div>
        <div className="flex flex-col mt-[20px]">
          <h1 className="text-white text-[20px] pb-[10px]">Socials</h1>
          <div className="flex gap-4">
            <div className="flex border border-gray-500 p-[5px] gap-2 rounded-md bg-transparent h-[40px]">
              <Twitter className="text-white" />
              <input
                className="bg-transparent outline-none w-full text-gray-300"
                type="text"
                placeholder="e.g heyrapto"
                value={formData.twitter}
                onChange={handleChange}
                name="twitter"
              />
            </div>
            <div className="flex border border-gray-500 p-[5px] gap-2 rounded-md bg-transparent h-[40px]">
              <Github className="text-white" />
              <input
                className="bg-transparent outline-none w-full text-gray-300"
                type="text"
                placeholder="e.g heycalebszn"
                value={formData.github}
                onChange={handleChange}
                name="github"
              />
            </div>
          </div>
        </div>
        <div className="mt-[20px] relative">
          <h1 className="text-white pb-[10px] text-[20px]">
            Select Your Tech Stack
          </h1>

          {/* Selected Languages Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedLanguages.map((lang) => {
              const language = availableLanguages.find((l) => l.name === lang);
              return (
                <div
                  key={lang}
                  className="flex items-center gap-1 bg-purple-500/10 border border-purple-500 
                                         rounded-md px-2 py-1"
                >
                  <img src={language.icon} alt={lang} className="w-4 h-4" />
                  <span className="text-purple-400 text-sm">{lang}</span>
                  <X
                    className="w-4 h-4 text-purple-400 cursor-pointer hover:text-purple-300"
                    onClick={() => removeLanguage(lang)}
                  />
                </div>
              );
            })}
          </div>

          {/* Dropdown Button */}
          <div
            onClick={toggleDropdown}
            className="w-full border border-gray-500 rounded-md p-2 flex items-center justify-between
                             cursor-pointer hover:border-purple-400 transition-colors"
          >
            <input
              type="text"
              placeholder="Search technologies..."
              className="bg-transparent outline-none text-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <ChevronDown
              className={`text-gray-400 transition-transform duration-200 
                        ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute w-full mt-1 bg-gray-900 border border-gray-700 rounded-md 
                                  shadow-lg max-h-[300px] overflow-y-auto z-10"
            >
              {filteredLanguages.map((language) => (
                <div
                  key={language.name}
                  onClick={() => handleLanguageChange(language.name)}
                  className={`
                                    flex items-center gap-2 p-2 cursor-pointer
                                    transition-colors hover:bg-gray-800
                                    ${
                                      selectedLanguages.includes(language.name)
                                        ? "bg-purple-500/10 text-purple-400"
                                        : "text-gray-400"
                                    }
                                `}
                >
                  <img
                    src={language.icon}
                    alt={language.name}
                    className="w-5 h-5"
                  />
                  <span className="capitalize text-sm">{language.name}</span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-2 text-gray-400 text-sm">
            Selected: {selectedLanguages.length}/5 languages
          </p>
        </div>

        <button
          type="submit"
          className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-full"
        >
          generate banner! 👩‍🍳
        </button>
      </form>

      {showBanner && (
        <BannerCard
          formData={formData}
          selectedLanguages={selectedLanguages}
          availableLanguages={availableLanguages}
        />
      )}
    </section>
  );
};

export default Form;
