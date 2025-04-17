import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { 
  User, Briefcase, Twitter, Github, Search, ChevronDown, 
  X, Upload, Check, ArrowRight, Eye
} from "lucide-react";
import { TECH_STACK_CONFIG } from "../config/techStack";
import { MAX_STACK_SELECTIONS } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BannerCard from "./BannerCard";

const initialFormState = {
  name: "",
  field: "",
  twitter: "",
  github: "",
  rgbabackground: "linear-gradient(to right, #4f46e5, #9333ea)",
};

// Color themes for quick selection
const PRESET_THEMES = [
  { id: 1, name: "Deep Purple", value: "linear-gradient(to right, #4f46e5, #9333ea)" },
  { id: 2, name: "Ocean Blue", value: "linear-gradient(to right, #0ea5e9, #2563eb)" },
  { id: 3, name: "Forest", value: "linear-gradient(to right, #10b981, #059669)" },
  { id: 4, name: "Sunset", value: "linear-gradient(to right, #f59e0b, #ef4444)" },
  { id: 5, name: "Midnight", value: "linear-gradient(to right, #1e293b, #334155)" },
];

const Form = () => {
  const [formData, setFormData] = useLocalStorage("bannerFormData", initialFormState);
  const [selectedTech, setSelectedTech] = useLocalStorage("selectedTech", []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTech = useMemo(() => 
    TECH_STACK_CONFIG.filter(tech => 
      tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [formData, formErrors, setFormData]);

  const handleTechSelect = useCallback((techName) => {
    setSelectedTech(prev => {
      if (prev.includes(techName)) {
        return prev.filter(tech => tech !== techName);
      }
      if (prev.length >= MAX_STACK_SELECTIONS) {
        return prev;
      }
      return [...prev, techName];
    });
  }, [setSelectedTech]);

  const handleTechRemove = useCallback((techName) => {
    setSelectedTech(prev => prev.filter(tech => tech !== techName));
  }, [setSelectedTech]);

  const handleThemeSelect = useCallback((themeValue) => {
    setFormData(prev => ({
      ...prev,
      rgbabackground: themeValue,
    }));
  }, [setFormData]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          rgbabackground: data.secure_url,
        }));
        // Schedule deletion (implementation not shown for brevity)
      }
    } catch (error) {
      console.error("Upload error:", error);
      // Show a friendly error message
      setFormErrors(prev => ({
        ...prev,
        image: "Image upload failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.field.trim()) errors.field = "Field is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      setShowBanner(true);
      setIsSubmitting(false);
      // Scroll to banner
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    }, 800);
  }, [formData]);

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!formData.name.trim() || !formData.field.trim()) {
        validateForm();
        return;
      }
    }
    setActiveStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  // Group tech stack by category for better organization
  const techCategories = useMemo(() => {
    const categories = {};
    
    filteredTech.forEach(tech => {
      // This is a simple categorization for illustration
      // In a real app, you might have categories in your data
      let category = "Frontend";
      if (tech.name.includes("node") || tech.name.includes("python") || 
          tech.name.includes("java") || tech.name.includes("php")) {
        category = "Backend";
      } else if (tech.name.includes("figma") || tech.name.includes("design") || 
                tech.name.includes("sketch") || tech.name.includes("adobe")) {
        category = "Design";
      }
      
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(tech);
    });
    
    return categories;
  }, [filteredTech]);

  return (
    <div className="min-h-screen bg-gray-900 pt-8 pb-24">
      <div className="">
        {/* Progress Steps */}
        <div className="mb-12 max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                ${activeStep === 1 ? "bg-purple-600" : activeStep > 1 ? "bg-green-500" : "bg-gray-700"}`}>
                {activeStep > 1 ? <Check size={20} /> : "1"}
              </div>
              <span className="mt-2 text-sm text-gray-300">Basic Info</span>
            </div>
            
            <div className="h-1 flex-1 mx-2 bg-gray-700">
              <div className={`h-full bg-purple-500 rounded transition-all duration-300 
                ${activeStep > 1 ? "w-full" : "w-0"}`} />
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                ${activeStep === 2 ? "bg-purple-600" : activeStep > 2 ? "bg-green-500" : "bg-gray-700"}`}>
                {activeStep > 2 ? <Check size={20} /> : "2"}
              </div>
              <span className="mt-2 text-sm text-gray-300">Tech Stack</span>
            </div>
            
            <div className="h-1 flex-1 mx-2 bg-gray-700">
              <div className={`h-full bg-purple-500 rounded transition-all duration-300 
                ${activeStep > 2 ? "w-full" : "w-0"}`} />
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                ${activeStep === 3 ? "bg-purple-600" : "bg-gray-700"}`}>
                3
              </div>
              <span className="mt-2 text-sm text-gray-300">Design</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Dev Banner</span>
            </h1>
            <button 
              type="button" 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700/50"
            >
              <Eye size={16} />
              {isPreviewMode ? "Hide Preview" : "Preview"}
            </button>
          </div>

          {/* Step 1: Basic Information */}
          <div className={`transition-all duration-300 ${activeStep === 1 ? "block" : "hidden"}`}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    className={`pl-10 w-full p-3 bg-gray-900 border ${formErrors.name ? 'border-red-500' : 'border-gray-600'} 
                      rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Professional Field</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Briefcase size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleFormChange}
                    placeholder="e.g. Frontend Developer, UI Designer"
                    className={`pl-10 w-full p-3 bg-gray-900 border ${formErrors.field ? 'border-red-500' : 'border-gray-600'} 
                      rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>
                {formErrors.field && <p className="mt-1 text-sm text-red-500">{formErrors.field}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Twitter Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Twitter size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleFormChange}
                      placeholder="@username"
                      className="pl-10 w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">GitHub Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Github size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleFormChange}
                      placeholder="username"
                      className="pl-10 w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Tech Stack */}
          <div className={`transition-all duration-300 ${activeStep === 2 ? "block" : "hidden"}`}>
            <div>
              <label className="block text-gray-300 mb-2 text-base font-medium">Your Tech Stack</label>
              <p className="text-gray-400 text-sm mb-4">
                Select up to {MAX_STACK_SELECTIONS} technologies that you work with
              </p>
              
              {/* Selected Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-4 min-h-12">
                {selectedTech.length === 0 && (
                  <p className="text-gray-500 text-sm italic">No technologies selected yet</p>
                )}
                
                {selectedTech.map(techName => {
                  const tech = TECH_STACK_CONFIG.find(t => t.name === techName);
                  return (
                    <div 
                      key={tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800 border border-purple-500/50 rounded-full group"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                      <span className="text-sm text-gray-200">{tech.name}</span>
                      <button 
                        type="button"
                        onClick={() => handleTechRemove(tech.name)}
                        className="w-4 h-4 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                      >
                        <X size={12} className="text-gray-300" />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-sm text-gray-400 mb-4">
                {selectedTech.length}/{MAX_STACK_SELECTIONS} technologies selected
              </div>
              
              {/* Tech Search */}
              <div className="relative mb-4" ref={dropdownRef}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    className="pl-10 pr-10 w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {Object.entries(techCategories).length === 0 && (
                      <div className="p-3 text-gray-400 text-center">No technologies found</div>
                    )}
                    
                    {Object.entries(techCategories).map(([category, techs]) => (
                      <div key={category}>
                        <div className="sticky top-0 bg-gray-700 px-3 py-2 text-xs font-semibold text-gray-300">
                          {category}
                        </div>
                        {techs.map(tech => (
                          <div
                            key={tech.name}
                            onClick={() => handleTechSelect(tech.name)}
                            className={`flex items-center gap-3 px-3 py-2 cursor-pointer
                              ${selectedTech.includes(tech.name) 
                                ? "bg-purple-500/10 text-purple-300" 
                                : "hover:bg-gray-700/50 text-gray-300"}`}
                          >
                            <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                            <span className="flex-1">{tech.name}</span>
                            {selectedTech.includes(tech.name) && (
                              <Check size={16} className="text-purple-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-6">
                <h3 className="text-purple-300 font-medium mb-2">Pro Tip</h3>
                <p className="text-gray-300 text-sm">
                  Select a balanced mix of languages, frameworks, and tools that best represent your expertise.
                  This will make your profile banner more accurate and appealing.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Background & Design */}
          <div className={`transition-all duration-300 ${activeStep === 3 ? "block" : "hidden"}`}>
            <div>
              <label className="block text-gray-300 mb-2 text-base font-medium">Choose Background Style</label>
              
              {/* Color Themes */}
              <div className="flex flex-wrap gap-2 mb-6">
                {PRESET_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleThemeSelect(theme.value)}
                    className={`h-12 w-12 rounded-lg overflow-hidden p-0.5 border transition-all
                      ${formData.rgbabackground === theme.value 
                        ? "border-white scale-110" 
                        : "border-transparent hover:border-gray-400"}`}
                  >
                    <div 
                      className="w-full h-full rounded"
                      style={{ background: theme.value }}
                    />
                  </button>
                ))}
                
                {/* Upload Image Option */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`h-12 w-12 rounded-lg overflow-hidden border border-dashed border-gray-400 
                    flex items-center justify-center hover:border-white transition-all
                    ${typeof formData.rgbabackground === 'string' && formData.rgbabackground.startsWith('http') 
                      ? 'border-white scale-110' : ''}`}
                >
                  <Upload size={18} className="text-gray-400" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </button>
              </div>
              
              {/* Background Preview */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 text-sm font-medium">Background Preview</label>
                <div 
                  className="w-full h-32 rounded-lg overflow-hidden"
                  style={{
                    background: formData.rgbabackground,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              
              {/* Custom Upload Info */}
              <div className="bg-gray-800/70 rounded-lg p-4">
                <h3 className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                  <Upload size={16} />
                  Custom Image Upload
                </h3>
                <p className="text-gray-400 text-sm">
                  For best results, upload an image that's at least 1200×400px. 
                  Uploaded images will be automatically removed after 10 minutes to save space.
                </p>
              </div>
            </div>
          </div>

          {/* Form Navigation */}
          <div className="flex justify-between mt-8">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500 flex items-center gap-2"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg text-white flex items-center gap-2
                  ${isSubmitting 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-purple-600 hover:bg-purple-500"}`}
              >
                {isSubmitting ? "Generating..." : "Generate Banner"}
                {!isSubmitting && "✨"}
              </button>
            )}
          </div>
        </form>
        
        {/* Banner Preview */}
        {(showBanner || isPreviewMode) && (
          <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-all duration-500 w-full">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Eye size={20} />
              {showBanner ? "Your Generated Banner" : "Banner Preview"}
            </h2>
            <BannerCard
              formData={formData}
              selectedLanguages={selectedTech}
              availableLanguages={TECH_STACK_CONFIG}
            />
            {!showBanner && (
              <div className="mt-4 text-center text-gray-400 text-sm italic">
                This is a preview. Submit the form to generate your final banner.
              </div>
            )}
            {showBanner && (
              <div className="mt-8 flex justify-center gap-4">
                <button 
                  type="button"
                  className="px-6 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600"
                >
                  Download
                </button>
                <button 
                  type="button"
                  className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-500"
                >
                  Share
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;