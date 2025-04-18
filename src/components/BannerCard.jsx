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
      {/* Mobile Preview Button */}
      <button
        onClick={() => setShowPreviewModal(true)}
        className="md:hidden bg-white text-purple-700 text-base font-semibold py-2 px-4 rounded-lg w-full max-w-xs mb-6"
      >
        View Full Preview
      </button>

      {/* Mobile Preview Modal */}
      {showPreviewModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 md:hidden">
          <div
            className="relative w-full h-full flex flex-col"
            style={{
              background:
                "radial-gradient(circle at center, #0c031b 0%, #140c2c 35%, #19082f 60%, #0c031b 100%)",
            }}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-white text-xl font-bold">Preview</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="min-w-[600px] flex items-center justify-center p-4">
                <div
                  id="banner-preview"
                  className="bg-gradient-to-r from-[rgb(41,41,41)] from-70% to-[#494949] text-white flex-col overflow-hidden w-[600px] px-[35px] text-left h-[270px] py-[30px] border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg"
                  style={{
                    background: rgbabackground?.startsWith("https")
                      ? `url(${rgbabackground})`
                      : rgbabackground?.startsWith("linear") || rgbabackground?.startsWith("radial")
                      ? rgbabackground
                      : "linear-gradient(to right, rgb(41,41,41) 70%, #494949)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                  }}
                >
                  <div>
                    <h1 className="pt-[10px] text-[35px] font-semibold pl-[10px]">
                      {name}
                    </h1>
                    <p className="text-[20px] pl-[10px]">{field}_</p>
                    <div className="flex mt-[20px] items-center">
                      <div className="flex items-center">
                        <Twitter className="w-[40px]" />
                        <p className="text-[15px]">{twitter} </p>
                        <span className="w-[1px] h-[25px] bg-white ml-[8px]"></span>
                      </div>
                      <div className="flex items-center">
                        <Github className="w-[40px]" />
                        <p className="text-[15px]">{github}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-end mt-[30px]">
                    <h1 className="font-bold text-[20px] pr-[30px]">Stack:</h1>
                    <div className="flex gap-2">
                      {selectedLanguages.map((lang) => {
                        const langObj = availableLanguages.find(
                          (l) => l.name === lang
                        );
                        return langObj ? (
                          <img
                            key={lang}
                            src={langObj.icon}
                            alt={langObj.name}
                            className="w-[30px] bg-white p-[8px] rounded-md"
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#0c031b]/80 backdrop-blur-sm p-4">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={downloadBanner}
                  className="bg-white text-purple-700 text-[18px] p-[8px] rounded-[15px] font-semibold w-[300px]"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Download Banner"}
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
        className="hidden flex-col text-white overflow-hidden w-full rounded-lg shadow-lg relative aspect-[3/1] md:aspect-[5/2]"
        style={{
          backgroundImage: rgbabackground?.startsWith("https")
            ? `url(${rgbabackground})`
            : rgbabackground?.startsWith("linear") || rgbabackground?.startsWith("radial")
            ? rgbabackground
            : "linear-gradient(to right, rgb(41,41,41) 70%, #494949)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="flex flex-col justify-between h-full p-6 md:p-8 lg:p-12">
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

      {/* Visible Banner Preview for Desktop */}
      <div
        className="hidden md:flex flex-col text-white overflow-hidden w-full rounded-lg shadow-lg relative aspect-[3/1] md:aspect-[5/2]"
        style={{
          backgroundImage: rgbabackground?.startsWith("https")
            ? `url(${rgbabackground})`
            : rgbabackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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