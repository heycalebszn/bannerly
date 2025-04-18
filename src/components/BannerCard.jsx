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
    if (!imageUrl) return;
    const text = encodeURIComponent("Check out my new customized banner!");
    const url = encodeURIComponent(siteLink);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(
      facebookShareUrl,
      "_blank",
      "width=550,height=420,menubar=no,toolbar=no"
    );
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
  };

  const downloadBanner = () => {
    setIsGenerating(true); //Start the animation

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
    <section className="flex flex-col items-center justify-center md:pt-[100px] relative  max-w-full w-[90vw] m-auto">
      <h1 className="md:flex text-white text-[25px] underline hidden mb-10">
        Preview
      </h1>

      <button
        onClick={() => setShowPreviewModal(true)}
        className="md:hidden bg-white text-purple-700 text-[16px] mb-4 p-[8px] rounded-[15px] font-semibold w-[200px] mt-[30px] w-full"
      >
        View Full Preview
      </button>

      {showPreviewModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 md:hidden">
          <div
            className="relative w-full h-full flex flex-col"
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
                  className="text-white flex-col overflow-hidden w-[600px] px-[35px] text-left h-[270px] py-[30px] border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] rounded-lg"
                  
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
                          (l) => l.name == lang
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

      {isGenerating && (
        <div className="flex items-center justify-center w-full h-full bg-opacity-50 z-50 mb-[10px]">
          <div className="text-white text-xl font-bold animate-pulse">
            Generating...
          </div>
        </div>
      )}
      <div
        id="banner"
        className={`hidden md:flex flex-col text-white overflow-hidden w-full rounded-lg shadow-lg relative aspect-[3/1] md:aspect-[5/2]`}
        style={{
          backgroundImage: rgbabackground.startsWith("https")
            ? `url(${rgbabackground})`
            : rgbabackground.startsWith("linear") ||
              rgbabackground.startsWith("radial")
            ? rgbabackground
            : "linear-gradient(to right, rgb(41,41,41) 70%, #494949)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
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
      <button
        onClick={downloadBanner}
        className="bg-white text-purple-700 text-[18px] mt-[50px] p-[8px] rounded-[15px] font-semibold w-[300px]  mb-[50px]"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Download Banner"}
      </button>

      {imageUrl && (
        <div className="flex flex-col items-center justify-center m-auto gap-2">
          <h1 className="text-white text-[20px] mt-[50px]">Share to:</h1>
          <div className="flex items-center justify-center m-auto gap-2">
            <div
              onClick={shareToTwitter}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]"
            >
              <Twitter className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div
              onClick={shareToFacebook}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]"
            >
              <Facebook className="md:w-[25px] text-white w-[20px]" />
            </div>
            <div
              onClick={shareToLinkedIn}
              className="bg-transparent border border-gray-500 md:p-[10px] rounded-[10px] cursor-pointer p-[8px]"
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
};

export default BannerCard;