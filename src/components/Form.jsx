import {ChevronDown, X } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { memo, useCallback, useMemo, useState } from "react";
import BannerCard from "./BannerCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TECH_STACK_CONFIG } from "../config/techStack";
import { MAX_STACK_SELECTIONS } from "../constants";
import PropTypes from "prop-types";
import GradientSelector from "./gradientSelector";

const initialFormState = {
  name: "",
  field: "",
  twitter: "",
  github: "",
  rgbabackground: "",
};

const FormInput = memo(({ icon: Icon, ...props }) => (
  <div className="flex border border-gray-500 p-[5px] gap-2 rounded-md bg-transparent h-[40px] outline-none">
    {Icon && <Icon className="text-white" />}
    <input
      className="w-full text-gray-300 bg-transparent outline-none autofill:bg-transparent autofill:focus:bg-transparent"
      {...props}
    />
  </div>
));
FormInput.propTypes = {
  icon: PropTypes.elementType,
};
FormInput.displayName = "FormInput";

const TechStackTag = memo(({ name, icon, onRemove }) => (
  <div className="flex items-center gap-1 px-2 py-1 border border-purple-500 rounded-md bg-purple-500/10">
    <img src={icon} alt={name} className="w-4 h-4" />
    <span className="text-sm text-purple-400">{name}</span>
    <X
      className="w-4 h-4 text-purple-400 cursor-pointer hover:text-purple-300"
      onClick={() => onRemove(name)}
    />
  </div>
));
TechStackTag.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
TechStackTag.displayName = "TechStackTag";

const TechStackDropdown = memo(
  ({
    isOpen,
    searchTerm,
    onSearchChange,
    filteredTech,
    selectedTech,
    onTechSelect,
    onToggle,
  }) => (
    <div className="relative w-full">
      <div
        onClick={onToggle}
        className="flex items-center justify-between w-full p-2 transition-colors border border-gray-500 rounded-md cursor-pointer hover:border-purple-400"
      >
        <input
          type="text"
          placeholder="Search technologies..."
          className="w-full text-gray-300 bg-transparent outline-none"
          value={searchTerm}
          onChange={onSearchChange}
          onClick={(e) => e.stopPropagation()}
        />
        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div
          className="absolute w-full mt-1 bg-gray-900 border border-gray-700 rounded-md
                    shadow-lg max-h-[250px] sm:max-h-[300px] overflow-y-auto z-10"
        >
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              onClick={() => onTechSelect(tech.name)}
              className={`
              flex items-center gap-2 p-2 cursor-pointer
              transition-colors hover:bg-gray-800
              ${
                selectedTech.includes(tech.name)
                  ? "bg-purple-500/10 text-purple-400"
                  : "text-gray-400"
              }
            `}
            >
              <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
              <span className="text-sm capitalize">{tech.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
);
TechStackDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filteredTech: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTech: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTechSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};
TechStackDropdown.displayName = "TechStackDropdown";

const Form = () => {
  const [formData, setFormData] = useLocalStorage(
    "bannerFormData",
    initialFormState
  );
  const [selectedTech, setSelectedTech] = useLocalStorage("selectedTech", []);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const filteredTech = useMemo(
    () =>
      TECH_STACK_CONFIG.filter((tech) =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const handleFormChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const handleTechSelect = useCallback(
    (techName) => {
      setSelectedTech((prev) => {
        if (prev.includes(techName)) {
          return prev.filter((tech) => tech !== techName);
        }
        if (prev.length >= MAX_STACK_SELECTIONS) return prev;
        return [...prev, techName];
      });
    },
    [setSelectedTech]
  );

  const handleTechRemove = useCallback(
    (techName) => {
      setSelectedTech((prev) => prev.filter((tech) => tech !== techName));
    },
    [setSelectedTech]
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setShowBanner(true);
  }, []);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleGradientChange = (gradient) => {
    setFormData((prev) => ({
      ...prev,
      rgbabackground: gradient,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-center text-left pt-[50px] sm:pt-[100px] w-full">
      <div className="w-full px-4">
        <form
          className="flex justify-center flex-col w-full max-w-[500px] p-[15px] sm:p-[20px] mb-[50px] sm:mb-[100px] m-auto"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white font-bold text-[28px] sm:text-[40px] pb-[30px] sm:pb-[50px] text-center">
            Let&apos;s Get you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-300 to-purple-600">
              Started
            </span>
            !
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-white text-[16px] sm:text-[20px]">
                Full Name
              </label>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g Mathew Mitchels"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-[16px] sm:text-[20px]">
                Field
              </label>
              <FormInput
                type="text"
                name="field"
                value={formData.field}
                onChange={handleFormChange}
                placeholder="e.g Frontend and UI Designer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-[16px] sm:text-[20px]">
                Socials
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <FormInput
                  icon={FaXTwitter}
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleFormChange}
                  placeholder="Twitter handle"
                />
                <FormInput
                  icon={FaGithub}
                  name="github"
                  value={formData.github}
                  onChange={handleFormChange}
                  placeholder="Github username"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-[16px] sm:text-[20px]">
                Tech Stack
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTech.map((techName) => {
                  const tech = TECH_STACK_CONFIG.find(
                    (t) => t.name === techName
                  );
                  return (
                    <TechStackTag
                      key={techName}
                      name={techName}
                      icon={tech.icon}
                      onRemove={handleTechRemove}
                    />
                  );
                })}
              </div>

              <TechStackDropdown
                isOpen={isOpen}
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                filteredTech={filteredTech}
                selectedTech={selectedTech}
                onTechSelect={handleTechSelect}
                onToggle={toggleDropdown}
              />

              <p className="text-sm text-gray-400">
                Selected: {selectedTech.length}/{MAX_STACK_SELECTIONS}{" "}
                technologies
              </p>
            </div>

            <div>
              <label className="text-white text-[16px] sm:text-[20px]">
                Background
              </label>
              <div className="mt-2">
                <GradientSelector onGradientChange={handleGradientChange} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-white text-purple-700 text-[16px] sm:text-[18px] mt-[30px] sm:mt-[50px]
                   p-[8px] rounded-[15px] font-semibold w-full hover:bg-purple-50 transition-colors hover:bg-transparent hover:border hover:border-gray-500 duration-300"
          >
            Generate Banner! 👩‍🍳
          </button>
        </form>
      </div>

      {showBanner && (
        <div className="w-full">
          <BannerCard
            formData={formData}
            selectedLanguages={selectedTech}
            availableLanguages={TECH_STACK_CONFIG}
          />
        </div>
      )}
    </section>
  );
};

export default Form;
