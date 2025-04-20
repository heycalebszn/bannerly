import { toPng } from "html-to-image";
import { Facebook, Github, Linkedin, Twitter, Download, Share2, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const THEMES = {
  classic: {
    name: "Classic",
    styles: {
      container: "bg-gradient-to-r from-gray-800 to-gray-900",
      title: "text-white",
      subtitle: "text-gray-200",
      social: "text-gray-300",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white p-2 rounded-md",
      divider: "bg-white",
    }
  },
  neon: {
    name: "Neon",
    styles: {
      container: "bg-black",
      title: "text-purple-400 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]",
      subtitle: "text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.6)]",
      social: "text-green-400",
      stackTitle: "text-purple-400 font-bold",
      stackIcon: "bg-black border border-purple-500 p-2 rounded-md",
      divider: "bg-purple-500",
    }
  },
  minimal: {
    name: "Minimal",
    styles: {
      container: "bg-white",
      title: "text-gray-900",
      subtitle: "text-gray-700",
      social: "text-gray-800",
      stackTitle: "text-gray-900 font-bold",
      stackIcon: "bg-gray-100 p-2 rounded-md shadow-sm",
      divider: "bg-gray-400",
    }
  },
  gradient: {
    name: "Gradient",
    styles: {
      container: "bg-gradient-to-r from-purple-700 to-blue-500",
      title: "text-white",
      subtitle: "text-blue-100",
      social: "text-white",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white/90 p-2 rounded-md",
      divider: "bg-white/70",
    }
  },
  dark: {
    name: "Dark",
    styles: {
      container: "bg-gray-900",
      title: "text-white",
      subtitle: "text-gray-300",
      social: "text-gray-300",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-gray-800 border border-gray-700 p-2 rounded-md",
      divider: "bg-gray-600",
    }
  }
};

const LAYOUTS = {
  standard: {
    name: "Standard",
    component: ({ formData, selectedLanguages, availableLanguages, themeStyles }) => (
      <div className="flex flex-col justify-between h-full p-6 md:p-8 lg:p-10">
        {/* User Info */}
        <div>
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-semibold ${themeStyles.title}`}>{formData.name}</h1>
          <p className={`text-lg md:text-xl lg:text-2xl mt-2 ${themeStyles.subtitle}`}>{formData.field}_</p>
          
          <div className={`flex items-center mt-4 md:mt-6 ${themeStyles.social}`}>
            <div className="flex items-center">
              <Twitter className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <p className="text-base md:text-lg">{formData.twitter}</p>
            </div>
            <span className={`w-px h-6 mx-4 ${themeStyles.divider}`}></span>
            <div className="flex items-center">
              <Github className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <p className="text-base md:text-lg">{formData.github}</p>
            </div>
          </div>
        </div>
        
        {/* Stack */}
        <div className="flex items-center justify-end">
          <h1 className={`text-base md:text-lg mr-3 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="flex gap-2">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${themeStyles.stackIcon}`}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    )
  },
  centered: {
    name: "Centered",
    component: ({ formData, selectedLanguages, availableLanguages, themeStyles }) => (
      <div className="flex flex-col items-center justify-center text-center h-full p-8 md:p-12 lg:p-16">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold ${themeStyles.title}`}>{formData.name}</h1>
        <p className={`text-xl md:text-2xl lg:text-3xl mt-2 ${themeStyles.subtitle}`}>{formData.field}_</p>
        
        <div className={`flex items-center justify-center mt-6 md:mt-8 ${themeStyles.social}`}>
          <div className="flex items-center">
            <Twitter className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            <p className="text-base md:text-lg">{formData.twitter}</p>
          </div>
          <span className={`w-px h-6 mx-4 ${themeStyles.divider}`}></span>
          <div className="flex items-center">
            <Github className="w-5 h-5 md:w-6 md:h-6 mr-2" />
            <p className="text-base md:text-lg">{formData.github}</p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12">
          <h1 className={`text-lg md:text-xl mb-4 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="flex gap-3 justify-center">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${themeStyles.stackIcon}`}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    )
  },
  sideBySide: {
    name: "Side by Side",
    component: ({ formData, selectedLanguages, availableLanguages, themeStyles }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-semibold ${themeStyles.title}`}>{formData.name}</h1>
          <p className={`text-xl md:text-2xl lg:text-3xl mt-2 ${themeStyles.subtitle}`}>{formData.field}_</p>
          
          <div className={`flex items-center mt-6 md:mt-8 ${themeStyles.social}`}>
            <div className="flex items-center">
              <Twitter className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <p className="text-base md:text-lg">{formData.twitter}</p>
            </div>
            <span className={`w-px h-6 mx-4 ${themeStyles.divider}`}></span>
            <div className="flex items-center">
              <Github className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <p className="text-base md:text-lg">{formData.github}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-center p-8 md:p-12">
          <h1 className={`text-lg md:text-xl mb-6 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="grid grid-cols-3 gap-4">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-10 h-10 md:w-12 md:h-12 ${themeStyles.stackIcon}`}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    )
  }
};

const BannerCard = ({
  formData, 
  selectedLanguages,
  availableLanguages,
  theme = "classic",
  layout = "standard",
  aspectRatio = "3/1",
  customStyles = {},
  onDownloadComplete = () => {},
  onShareComplete = () => {},
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentLayout, setCurrentLayout] = useState(layout);
  
  // Updated dimensions
  const [desktopDimensions, setDesktopDimensions] = useState({ width: 1500, height: 500 });
  const [mobileDimensions, setMobileDimensions] = useState({ width: 750, height: 250 });

  const siteLink = "https://bannerly.vercel.app";
  
  const themeConfig = THEMES[currentTheme] || THEMES.classic;
  const themeStyles = { ...themeConfig.styles, ...(customStyles[currentTheme] || {}) };
  const LayoutComponent = LAYOUTS[currentLayout]?.component || LAYOUTS.standard.component;

  // Common background style generator
  const getBackgroundStyle = (isMobile = false) => {
    const baseStyle = {
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    if (formData.rgbabackground?.startsWith("https")) {
      return { 
        ...baseStyle,
        backgroundImage: `url(${formData.rgbabackground})`
      };
    }
    
    if (formData.rgbabackground?.startsWith("linear") || formData.rgbabackground?.startsWith("radial")) {
      return { 
        backgroundImage: formData.rgbabackground 
      };
    }

    return { 
      background: THEMES[currentTheme]?.styles?.background 
    };
  };
  
  const shareToFacebook = () => {
    if (!imageUrl) return;
    const text = encodeURIComponent("Check out my new customized banner!");
    const url = encodeURIComponent(siteLink);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(
      facebookShareUrl,
      "_blank",
      "width=550,height=420,menubar=no,toolbar=no"
    );
    onShareComplete("facebook");
  };

  const shareToTwitter = () => {
    if (!imageUrl) return;
    
    const text = encodeURIComponent("Check out my new customized banner!");
    const url = encodeURIComponent(siteLink);
    const hashtags = encodeURIComponent("DeveloperBanner,Bannerly");
    
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
    
    window.open(
      twitterShareUrl,
      "_blank",
      "width=550,height=420,menubar=no,toolbar=no"
    );
    onShareComplete("twitter");
  };

  const shareToLinkedIn = () => {
    if (!imageUrl) return;
    const text = encodeURIComponent("Check out my new customized banner!");
    const url = encodeURIComponent(siteLink);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`;
    window.open(
      linkedInUrl,
      "_blank",
      "width=550,height=420,menubar=no,toolbar=no"
    );
    onShareComplete("linkedin");
  };

  const downloadBanner = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const isMobile = window.innerWidth < 768 || showPreviewModal;
      const bannerId = isMobile ? "banner-preview" : "banner";
      const bannerNode = document.getElementById(bannerId);

      if (!bannerNode) {
        setIsGenerating(false);
        return;
      }

      // Store original dimensions
      const originalDimensions = {
        width: bannerNode.offsetWidth,
        height: bannerNode.offsetHeight
      };

      // Set explicit dimensions for capture
      bannerNode.style.width = `${isMobile ? mobileDimensions.width : desktopDimensions.width}px`;
      bannerNode.style.height = `${isMobile ? mobileDimensions.height : desktopDimensions.height}px`;

      // Force reflow
      bannerNode.getBoundingClientRect();

      toPng(bannerNode)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${formData.name.replace(/\s+/g, '-').toLowerCase()}-banner.png`;
          link.href = dataUrl;
          link.click();
          setImageUrl(dataUrl);
          onDownloadComplete(dataUrl);
        })
        .catch(console.error)
        .finally(() => {
          // Reset dimensions after capture
          bannerNode.style.width = "";
          bannerNode.style.height = "";
          setIsGenerating(false);
        });
    }, 500);
  };

  useEffect(() => {
    setCurrentTheme(theme);
    setCurrentLayout(layout);
  }, [theme, layout]);

  return (
    <section className="flex flex-col items-center justify-center md:pt-[100px] relative max-w-full w-[90vw] m-auto">
      <h1 className="md:flex text-white text-[25px] underline hidden mb-10">
        Preview
      </h1>

      <button
        onClick={() => setShowPreviewModal(true)}
        className="md:hidden bg-white text-purple-700 text-[16px] mb-4 p-[8px] rounded-[15px] font-semibold w-full mt-[30px]"
      >
        View Full Preview
      </button>

      {showPreviewModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 md:hidden">
          <div className="relative w-full h-full flex flex-col">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-white text-xl font-bold">Preview</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-white text-2xl"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="min-w-[600px] flex items-center justify-center p-4">
                <div
                  id="banner-preview"
                  className="text-white flex-col overflow-hidden rounded-lg"
                  style={{
                    ...getBackgroundStyle(true),
                    width: `${mobileDimensions.width}px`,
                    height: `${mobileDimensions.height}px`,
                  }}
                >
                  <LayoutComponent 
                    formData={formData}
                    selectedLanguages={selectedLanguages}
                    availableLanguages={availableLanguages}
                    themeStyles={themeStyles}
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#0c031b]/80 backdrop-blur-sm p-4">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={downloadBanner}
                  className="bg-white text-purple-700 text-[18px] p-[8px] rounded-[15px] font-semibold w-[300px] flex items-center justify-center gap-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="animate-pulse">Generating...</span>
                  ) : (
                    <>
                      <Download size={20} />
                      <span>Download Banner</span>
                    </>
                  )}
                </button>

                {imageUrl && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-white text-[20px]">Share to:</h1>
                    <div className="flex items-center justify-center gap-2">
                      <div
                        onClick={shareToTwitter}
                        className="bg-transparent border border-gray-500 p-[8px] rounded-[10px] cursor-pointer"
                      >
                        <Twitter className="text-white w-[20px]" />
                      </div>
                      <div
                        onClick={shareToFacebook}
                        className="bg-transparent border border-gray-500 p-[8px] rounded-[10px] cursor-pointer"
                      >
                        <Facebook className="text-white w-[20px]" />
                      </div>
                      <div
                        onClick={shareToLinkedIn}
                        className="bg-transparent border border-gray-500 p-[8px] rounded-[10px] cursor-pointer"
                      >
                        <Linkedin className="text-white w-[20px]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="flex items-center justify-center w-full h-full bg-opacity-50 z-50 mb-[10px]">
          <div className="text-white text-xl font-bold animate-pulse">
            Generating...
          </div>
        </div>
      )}
      
      <div
        id="banner"
        className="hidden md:block w-full rounded-lg shadow-lg overflow-hidden"
        style={getBackgroundStyle()}
      >
        <LayoutComponent 
          formData={formData}
          selectedLanguages={selectedLanguages}
          availableLanguages={availableLanguages}
          themeStyles={themeStyles}
        />
      </div>
      
      <button
        onClick={downloadBanner}
        className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-[300px] mb-[50px] hidden md:flex items-center justify-center gap-2"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <span className="animate-pulse">Generating...</span>
        ) : (
          <>
            <Download size={20} />
            <span>Download Banner</span>
          </>
        )}
      </button>

      {imageUrl && (
        <div className="flex flex-col items-center justify-center m-auto gap-2">
          <h1 className="text-white text-[20px] mt-[50px] flex items-center gap-2">
            <Share2 size={20} />
            <span>Share to:</span>
          </h1>
          <div className="flex items-center justify-center m-auto gap-2">
            <div
              onClick={shareToTwitter}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px] hover:bg-gray-800 transition-colors"
            >
              <Twitter className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div
              onClick={shareToFacebook}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px] hover:bg-gray-800 transition-colors"
            >
              <Facebook className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div
              onClick={shareToLinkedIn}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px] hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="md:w-[25px] text-white w-[20px]" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

BannerCard.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    rgbabackground: PropTypes.string,
  }).isRequired,
  selectedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  theme: PropTypes.string,
  layout: PropTypes.string,
  aspectRatio: PropTypes.string,
  customStyles: PropTypes.object,
  onDownloadComplete: PropTypes.func,
  onShareComplete: PropTypes.func,
}; 

export default BannerCard;