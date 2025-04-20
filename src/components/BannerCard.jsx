import { toPng } from "html-to-image";
import { Facebook, Github, Linkedin, Twitter, Download, Share2, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { PRESET_THEMES, PATTERN_STYLES } from "./Form";

// Function to determine if a color is light or dark
const isLightColor = (color) => {
  // Remove any non-hex characters
  const hex = color.replace(/[^0-9A-F]/gi, '');
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

// Function to get text color based on background
const getTextColor = (backgroundColor) => {
  if (backgroundColor.startsWith('linear-gradient')) {
    // For gradients, we'll use the first color
    const firstColor = backgroundColor.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#000000';
    return isLightColor(firstColor) ? 'text-gray-900' : 'text-white';
  }
  return isLightColor(backgroundColor) ? 'text-gray-900' : 'text-white';
};

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
  modern: {
    name: "Modern",
    styles: {
      container: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
      title: "text-white",
      subtitle: "text-indigo-200",
      social: "text-pink-200",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/20",
      divider: "bg-white/30",
    }
  },
  cyberpunk: {
    name: "Cyberpunk",
    styles: {
      container: "bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500",
      title: "text-black",
      subtitle: "text-gray-900",
      social: "text-gray-900",
      stackTitle: "text-black font-bold",
      stackIcon: "bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-black/20",
      divider: "bg-black/30",
    }
  },
  ocean: {
    name: "Ocean",
    styles: {
      container: "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400",
      title: "text-white",
      subtitle: "text-blue-100",
      social: "text-cyan-100",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/20",
      divider: "bg-white/30",
    }
  },
  sunset: {
    name: "Sunset",
    styles: {
      container: "bg-gradient-to-r from-orange-500 via-red-500 to-purple-500",
      title: "text-white",
      subtitle: "text-orange-100",
      social: "text-red-100",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/20",
      divider: "bg-white/30",
    }
  },
  forest: {
    name: "Forest",
    styles: {
      container: "bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500",
      title: "text-white",
      subtitle: "text-green-100",
      social: "text-emerald-100",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/20",
      divider: "bg-white/30",
    }
  },
  minimal: {
    name: "Minimal",
    styles: {
      container: "bg-white",
      title: "text-gray-900",
      subtitle: "text-gray-600",
      social: "text-gray-700",
      stackTitle: "text-gray-900 font-bold",
      stackIcon: "bg-gray-100 p-2 rounded-lg shadow-sm",
      divider: "bg-gray-300",
    }
  },
  dark: {
    name: "Dark",
    styles: {
      container: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
      title: "text-white",
      subtitle: "text-gray-300",
      social: "text-gray-400",
      stackTitle: "text-white font-bold",
      stackIcon: "bg-gray-800 p-2 rounded-lg border border-gray-700",
      divider: "bg-gray-600",
    }
  }
};

const LAYOUTS = {
  standard: {
    name: "Standard",
    component: ({ formData, selectedLanguages, availableLanguages, themeStyles }) => (
      <div className="flex flex-col justify-between h-full p-8 md:p-10 lg:p-12">
        <div>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${themeStyles.title}`}>{formData.name}</h1>
          <p className={`text-2xl md:text-3xl lg:text-4xl mt-4 ${themeStyles.subtitle}`}>{formData.field}_</p>
          
          <div className={`flex items-center mt-8 md:mt-10 ${themeStyles.social}`}>
            <div className="flex items-center">
              <Twitter className="w-8 h-8 md:w-10 md:h-10 mr-4" />
              <p className="text-xl md:text-2xl">{formData.twitter}</p>
            </div>
            <span className={`w-px h-8 mx-8 ${themeStyles.divider}`}></span>
            <div className="flex items-center">
              <Github className="w-8 h-8 md:w-10 md:h-10 mr-4" />
              <p className="text-xl md:text-2xl">{formData.github}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-8">
          <h1 className={`text-2xl md:text-3xl mr-6 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="flex gap-4">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${themeStyles.stackIcon}`}
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
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold ${themeStyles.title}`}>{formData.name}</h1>
        <p className={`text-3xl md:text-4xl lg:text-5xl mt-6 ${themeStyles.subtitle}`}>{formData.field}_</p>
        
        <div className={`flex items-center justify-center mt-10 md:mt-12 ${themeStyles.social}`}>
          <div className="flex items-center">
            <Twitter className="w-8 h-8 md:w-10 md:h-10 mr-4" />
            <p className="text-xl md:text-2xl">{formData.twitter}</p>
          </div>
          <span className={`w-px h-8 mx-8 ${themeStyles.divider}`}></span>
          <div className="flex items-center">
            <Github className="w-8 h-8 md:w-10 md:h-10 mr-4" />
            <p className="text-xl md:text-2xl">{formData.github}</p>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16">
          <h1 className={`text-2xl md:text-3xl mb-8 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="flex gap-6 justify-center">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 ${themeStyles.stackIcon}`}
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
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold ${themeStyles.title}`}>{formData.name}</h1>
          <p className={`text-3xl md:text-4xl lg:text-5xl mt-6 ${themeStyles.subtitle}`}>{formData.field}_</p>
          
          <div className={`flex items-center mt-10 md:mt-12 ${themeStyles.social}`}>
            <div className="flex items-center">
              <Twitter className="w-8 h-8 md:w-10 md:h-10 mr-4" />
              <p className="text-xl md:text-2xl">{formData.twitter}</p>
            </div>
            <span className={`w-px h-8 mx-8 ${themeStyles.divider}`}></span>
            <div className="flex items-center">
              <Github className="w-8 h-8 md:w-10 md:h-10 mr-4" />
              <p className="text-xl md:text-2xl">{formData.github}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center items-center p-8 md:p-12">
          <h1 className={`text-2xl md:text-3xl mb-10 ${themeStyles.stackTitle}`}>Stack:</h1>
          <div className="grid grid-cols-3 gap-6">
            {selectedLanguages.map((lang) => {
              const langObj = availableLanguages.find((l) => l.name === lang);
              return langObj ? (
                <img
                  key={lang}
                  src={langObj.icon}
                  alt={langObj.name}
                  className={`w-16 h-16 md:w-20 md:h-20 ${themeStyles.stackIcon}`}
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
  
  // Updated dimensions to match Twitter's recommended banner size
  const [desktopDimensions, setDesktopDimensions] = useState({ width: 1500, height: 500 });
  const [mobileDimensions, setMobileDimensions] = useState({ width: 750, height: 250 });

  const siteLink = "https://bannerly.vercel.app";
  
  // Get dynamic text colors based on background
  const textColor = getTextColor(formData.rgbabackground || THEMES[theme].styles.container);
  const textColorLight = textColor === 'text-white' ? 'text-gray-200' : 'text-gray-700';
  const textColorLighter = textColor === 'text-white' ? 'text-gray-300' : 'text-gray-600';

  // Update theme styles with dynamic colors
  const themeStyles = {
    ...THEMES[theme].styles,
    title: textColor,
    subtitle: textColorLight,
    social: textColorLighter,
    stackTitle: textColor,
    stackIcon: textColor === 'text-white' 
      ? 'bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/20'
      : 'bg-black/20 backdrop-blur-sm p-2 rounded-lg border border-black/20',
    divider: textColor === 'text-white' ? 'bg-white/30' : 'bg-black/30',
  };

  const LayoutComponent = LAYOUTS[currentLayout]?.component || LAYOUTS.standard.component;

  // Common background style generator
  const getBackgroundStyle = (isMobile = false) => {
    if (formData.rgbabackground?.startsWith("https")) {
      return {
        backgroundImage: `url(${formData.rgbabackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      };
    }
    
    if (formData.rgbabackground?.startsWith("linear") || formData.rgbabackground?.startsWith("radial")) {
      const selectedTheme = PRESET_THEMES.find(theme => theme.value === formData.rgbabackground);
      
      if (selectedTheme && selectedTheme.pattern) {
        const patternStyle = PATTERN_STYLES[selectedTheme.pattern];
        const patternColor = selectedTheme.patternColor.replace('#', '');
        const patternImage = patternStyle.backgroundImage.replace('%23COLOR%', patternColor);
        
        return {
          background: `${formData.rgbabackground}, ${patternImage}`,
          backgroundSize: 'cover, auto',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, repeat'
        };
      }
      
      return {
        background: formData.rgbabackground,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    // If no custom background is set, use the theme's background
    return {
      background: THEMES[currentTheme]?.styles?.container || THEMES.classic.styles.container,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
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
        style={{
          ...getBackgroundStyle(),
          width: `${desktopDimensions.width}px`,
          height: `${desktopDimensions.height}px`,
        }}
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