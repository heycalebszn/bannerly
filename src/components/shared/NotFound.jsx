import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowLeft, Sparkles } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 md:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-2 bg-purple-500/20 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            This Feature is <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">Coming Soon</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We're working hard to bring this feature to life. Stay tuned for updates as we roll out new enhancements to Bannerly v3.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Want to be notified when it's ready?</h2>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Notify Me
              </button>
            </form>
          </div>
          
          <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ComingSoonPage;