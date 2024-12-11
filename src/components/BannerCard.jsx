import { Facebook, Github, Linkedin, Twitter } from "lucide-react"
import { toPng } from "html-to-image"
import { useState } from "react";
import PropTypes from 'prop-types';

const BannerCard = ({ formData, selectedLanguages, availableLanguages, }) => {
    const { name, field, twitter, github } = formData;
    const [isGenerating, setIsGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const siteLink = "https://bannerly.vercel.app";

    const shareToFacebook = () => {
        const facebookShareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(
            `Check out my new customized banner! You can also get yours at ${siteLink}`
        )}`;
        window.open(facebookShareUrl, "_blank");
    }
    const shareToTwitter = () => {
        const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(
            `Check out my new customized banner! You can also get yours at ${siteLink}`
        )}`;
        window.open(twitterShareUrl, "_blank");
    }
    const shareToLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(imageUrl)}`;
        window.open(linkedInUrl, "_blank");
    }
    console.log(formData)

    const downloadBanner = () => {
        setIsGenerating(true); //Start the animation

        setTimeout(() => {
        const bannerNode = document.getElementById("banner");

        if(!bannerNode){
            setIsGenerating(false)
            return;
        }
        
        toPng(bannerNode)
        .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "custom.png";
            link.href = dataUrl;
            link.click();
            setImageUrl(dataUrl)
        })
        .catch((err) => {
            console.error("Could not generate image", err);
        })
        .finally(() => {
            setIsGenerating(false);
        })
    }, 1000);// 3 seconds delay
    }
    return(
        <section className="flex flex-col items-center justify-center pt-[50px] sm:pt-[100px] w-full">
           <h1 className="text-white text-[20px] sm:text-[25px] underline mb-6">Preview</h1>

           {isGenerating && (
            <div className="flex items-center justify-center w-full py-4 bg-opacity-50 z-50">
                <div className="text-white text-lg sm:text-xl font-bold animate-pulse">
                    Generating...
                </div>
            </div>
           )}
        <div id="banner" className="bg-gradient-to-r from-[rgb(41,41,41)] from-70% to-[#494949] 
                w-full max-w-[600px] md:max-w-none
                h-[270px] sm:h-[400px] md:h-[600px] 
                px-[20px] sm:px-[35px] md:px-[120px] 
                py-[20px] sm:py-[30px] md:py-[50px]
                text-white flex flex-col overflow-hidden">
            <div className="flex flex-col">
                <h1 className="text-[28px] sm:text-[35px] md:text-[80px] font-semibold 
                            pl-[10px] md:pl-[18px] pt-[20px] sm:pt-[30px]">
                    {name}
                </h1>
                <p className="text-[16px] sm:text-[20px] md:text-[35px] 
                            pl-[10px] md:pl-[20px]">
                    {field}_
                </p>
                <div className="flex mt-[15px] sm:mt-[20px] items-center gap-4">
                <div className="flex items-center gap-2">
                    <Twitter className="w-[30px] sm:w-[40px] md:w-[70px]" />
                    <p className="text-[12px] sm:text-[15px] md:text-[25px]">{twitter}</p>
                    <span className="w-[1px] h-[25px] bg-white ml-[8px]"></span>
                </div>
                <div className="flex items-center gap-2">
                    <Github className="w-[30px] sm:w-[40px] md:w-[70px]" />
                    <p className="text-[12px] sm:text-[15px] md:text-[25px]">{github}</p>
                </div>
                </div>
            </div>
            <div className="flex items-end justify-end mt-[20px] sm:mt-[30px] md:mt-[150px]">
                <h1 className="font-bold text-[16px] sm:text-[20px] md:text-[25px] pr-[15px] sm:pr-[30px]">
                    Stack:
                </h1>
                <div className="flex gap-2 flex-wrap">
                    {selectedLanguages.map((lang) => {
                        const langObj = availableLanguages.find((l) => l.name === lang);
                        return langObj ? (
                            <img
                             key={lang}
                             src={langObj.icon}
                             alt={lang}
                             className="w-[25px] sm:w-[30px] md:w-[50px] 
                                     p-[6px] sm:p-[8px] bg-white rounded-md"
                            />
                        ) : null;
                    })}
                </div>
            </div>
            
        </div>
        <button onClick={downloadBanner} className="bg-white text-purple-700 text-[16px] sm:text-[18px] 
                        mt-[30px] sm:mt-[50px] p-[8px] rounded-[15px] 
                        font-semibold w-full max-w-[300px] mb-[30px] sm:mb-[50px]
                        hover:bg-purple-50 transition-colors disabled:opacity-50" disabled={isGenerating}>{isGenerating ? "Generating..." : "Download Banner"}</button>

        {imageUrl && (
            <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-white text-[16px] sm:text-[20px]">Share to:</h1>
            <div className="flex items-center gap-3">
            <button onClick={shareToTwitter} className="bg-transparent border border-gray-500 
                                        p-[6px] sm:p-[8px] md:p-[10px] rounded-[10px] 
                                        cursor-pointer hover:border-purple-500 transition-colors">
                <Twitter className="w-[18px] sm:w-[20px] md:w-[25px] text-white" />
            </button>
            <button onClick={shareToFacebook} className="bg-transparent border border-gray-500 
                                        p-[6px] sm:p-[8px] md:p-[10px] rounded-[10px] 
                                        cursor-pointer hover:border-purple-500 transition-colors">
                <Facebook className="w-[18px] sm:w-[20px] md:w-[25px] text-white" />
            </button>
            <button onClick={shareToLinkedIn} className="bg-transparent border border-gray-500 
                                        p-[6px] sm:p-[8px] md:p-[10px] rounded-[10px] 
                                        cursor-pointer hover:border-purple-500 transition-colors">
                <Linkedin className="w-[18px] sm:w-[20px] md:w-[25px] text-white" />
            </button>
            </div>
            </div>
            )}
        </section>
    )
}

BannerCard.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired,
        github: PropTypes.string.isRequired,
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
