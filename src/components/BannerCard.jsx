import { toPng } from "html-to-image";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const BannerCard = ({ formData, selectedLanguages, availableLanguages }) => {
  const { name, field, twitter, github, rgbabackground } = formData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const siteLink = "https://bannerly.vercel.app";
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const shareToFacebook = () => {
    const facebookShareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}&text=${encodeURIComponent(
      `Check out my new customized banner! You can also get yours at ${siteLink}`
    )}`;
    window.open(facebookShareUrl, "_blank");
  };

  const shareToTwitter = () => {
    const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
      imageUrl
    )}&text=${encodeURIComponent(
      `Check out my new customized banner! You can also get yours at ${siteLink}`
    )}`;
    window.open(twitterShareUrl, "_blank");
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      imageUrl
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  const downloadBanner = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const bannerNode = document.getElementById("banner");

      if (!bannerNode) {
        setIsGenerating(false);
        return;
      }

      bannerNode.classList.remove("hidden");

      toPng(bannerNode)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "custom.png";
          link.href = dataUrl;
          link.click();
          setImageUrl(dataUrl);
        })
        .catch((err) => {
          console.error("Could not generate image", err);
        })
        .finally(() => {
          bannerNode.classList.add("hidden");
          setIsGenerating(false);
        });
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 pt-8 md:pt-24 relative">
      {/* Preview Title */}
      <h1 className="hidden md:block text-white text-2xl font-semibold underline mb-10">
        Preview
      </h1>

      {/* Mobile Preview Button */}
      <button
        onClick={() => setShowPreviewModal(true)}
        className="md:hidden bg-white text-purple-700 text-base font-semibold py-2 px-4 rounded-lg w-full max-w-xs mb-6"
      >
        View Full Preview
      </button>

      {/* Mobile Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 md:hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div 
              className="bg-gradient-to-r from-zinc-800 from-70% to-zinc-700 text-white 
                       w-full h-full min-h-[70vh] rounded-lg border border-purple-500/30 
                       shadow-lg p-4 flex flex-col justify-between"
            >
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-semibold pt-2 md:pt-4">{name}</h1>
                <p className="text-base md:text-lg mt-1">{field}_</p>
                
                <div className="flex items-center mt-4 md:mt-6 space-x-3 md:space-x-4">
                  <div className="flex items-center">
                    <Twitter className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    <p className="text-xs md:text-sm">{twitter}</p>
                  </div>
                  <span className="w-px h-4 md:h-6 bg-white mx-1 md:mx-2"></span>
                  <div className="flex items-center">
                    <Github className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                    <p className="text-xs md:text-sm">{github}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-end mt-4 md:mt-6">
                <h1 className="font-bold text-sm md:text-base mr-2 md:mr-3">Stack:</h1>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {selectedLanguages.map((lang) => {
                    const langObj = availableLanguages.find((l) => l.name === lang);
                    return langObj ? (
                      <img
                        key={lang}
                        src={langObj.icon}
                        alt={langObj.name}
                        className="w-6 h-6 md:w-8 md:h-8 bg-white p-0.5 md:p-1 rounded-md"
                      />
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-black/50 backdrop-blur-sm">
            <button
              onClick={downloadBanner}
              className="bg-white text-purple-700 text-base font-semibold 
                       py-2 px-4 rounded-lg w-full"
            >
              {isGenerating ? "Generating..." : "Download Banner"}
            </button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isGenerating && (
        <div className="flex items-center justify-center w-full p-4 mb-4">
          <div className="text-white text-xl font-bold animate-pulse">
            Generating...
          </div>
        </div>
      )}

      {/* Main Banner Preview (hidden for image generation) */}
      <div
        id="banner"
        className="hidden md:flex flex-col text-white overflow-hidden w-full rounded-lg shadow-lg"
        style={{
          backgroundImage: rgbabackground?.startsWith("https")
            ? `url(${rgbabackground})`
            : rgbabackground?.startsWith("linear") || rgbabackground?.startsWith("radial")
            ? rgbabackground
            : "linear-gradient(to right, rgb(41,41,41) 70%, #494949)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "300px",
          height: "auto"
        }}
      >
        <div className="flex flex-col justify-between h-full p-6 md:p-8 lg:p-12">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">{name}</h1>
            <p className="text-lg md:text-xl lg:text-2xl mt-1 md:mt-2">{field}_</p>
            
            <div className="flex items-center mt-4 md:mt-6">
              <div className="flex items-center">
                <Twitter className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <p className="text-sm md:text-base">{twitter}</p>
              </div>
              <span className="w-px h-4 md:h-6 bg-white mx-3 md:mx-4"></span>
              <div className="flex items-center">
                <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <p className="text-sm md:text-base">{github}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-end mt-4 md:mt-6">
            <h1 className="font-bold text-base md:text-lg mr-2 md:mr-3">Stack:</h1>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {selectedLanguages.map((lang) => {
                const langObj = availableLanguages.find((l) => l.name === lang);
                return langObj ? (
                  <img
                    key={lang}
                    src={langObj.icon}
                    alt={langObj.name}
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white p-1 rounded-md"
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Visible Banner Preview for Desktop */}
      <div
        className="hidden md:flex flex-col text-white overflow-hidden w-full rounded-lg shadow-lg mt-8"
        style={{
          backgroundImage: rgbabackground?.startsWith("https")
            ? `url(${rgbabackground})`
            : rgbabackground?.startsWith("linear") || rgbabackground?.startsWith("radial")
            ? rgbabackground
            : "linear-gradient(to right, rgb(41,41,41) 70%, #494949)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
        {/* Content Container */}
        <div className="flex flex-col justify-between h-full p-8 md:p-12 lg:p-16">
          {/* User Info */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">{name}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl mt-2">{field}_</p>
            
            <div className="flex items-center mt-6 md:mt-8">
              <div className="flex items-center">
                <Twitter className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <p className="text-base md:text-lg">{twitter}</p>
              </div>
              <span className="w-px h-6 bg-white mx-4"></span>
              <div className="flex items-center">
                <Github className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <p className="text-base md:text-lg">{github}</p>
              </div>
            </div>
          </div>
          
          {/* Stack */}
          <div className="flex items-center justify-end">
            <h1 className="font-bold text-lg md:text-xl mr-4">Stack:</h1>
            <div className="flex gap-2">
              {selectedLanguages.map((lang) => {
                const langObj = availableLanguages.find((l) => l.name === lang);
                return langObj ? (
                  <img
                    key={lang}
                    src={langObj.icon}
                    alt={langObj.name}
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white p-1 md:p-2 rounded-md"
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadBanner}
        className="bg-white text-purple-700 text-lg font-semibold py-2 px-6 rounded-lg w-full max-w-xs mt-12 mb-12"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Download Banner"}
      </button>

      {/* Share Options */}
      {imageUrl && (
        <div className="flex flex-col items-center justify-center gap-4 mt-8 mb-12">
          <h1 className="text-white text-xl">Share to:</h1>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={shareToTwitter}
              className="bg-transparent border border-gray-500 p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Twitter className="text-white w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={shareToFacebook}
              className="bg-transparent border border-gray-500 p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Facebook className="text-white w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={shareToLinkedIn}
              className="bg-transparent border border-gray-500 p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="text-white w-5 h-5 md:w-6 md:h-6" />
            </button>
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
};

export default BannerCard;