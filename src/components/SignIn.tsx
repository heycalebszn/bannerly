import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  LockKeyhole, 
  Mail, 
  Github, 
  ArrowRight, 
  CalendarClock, 
  BellRing,
  Check
} from "lucide-react";
import React from "react";
const SignInComingSoon = () => {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Would handle notification sign-up
    setNotified(true);
  };
  
  const features = [
    {
      title: "Social Sign-in",
      description: "Quick authentication with your GitHub and other social accounts",
      icon: Github,
      available: false
    },
    {
      title: "Project Saving",
      description: "Save and organize all your banner and profile picture designs",
      icon: Check,
      available: false
    },
    {
      title: "Theme Library Access",
      description: "Access and save your favorite themes and templates",
      icon: Check,
      available: false
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row min-h-screen pt-16">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-md mx-auto w-full">
            {/* Coming Soon Badge */}
            <div className="flex items-center mb-6">
              <div className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full flex items-center text-sm font-medium">
                <CalendarClock className="w-4 h-4 mr-2" />
                Coming in July 2025
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Sign In</h1>
            <p className="text-gray-400 mb-8">
              User accounts are coming soon with our premium plans
            </p>
            
            <div className="bg-white/5 border border-purple-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <BellRing className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Feature Preview</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    We're building user accounts to save your designs, access premium features, and customize your experience. Sign up to be notified when this feature launches.
                  </p>
                  
                  {!notified ? (
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col sm:flex-row gap-3 mb-2">
                        <div className="relative flex-grow">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                          <input 
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium transition-colors whitespace-nowrap"
                        >
                          Notify Me
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-purple-900/40 text-white p-3 rounded-lg border border-purple-500/30">
                      <p className="flex items-center text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-400" /> 
                        We'll notify you when user accounts are ready!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              <h3 className="font-semibold text-lg">What's coming with user accounts:</h3>
              
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 p-2 bg-purple-500/20 rounded-lg">
                    <feature.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-6 text-center">
              <p className="text-gray-400 mb-4">Want to try Banner Builder now?</p>
              <Link to="/get-started">
                <button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors flex items-center mx-auto">
                  Continue As Guest <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Side - Visual */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-md w-full">
              {/* Login Interface Preview */}
              <div className="bg-gray-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl p-6 mb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <LockKeyhole className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-center mb-6">Sign in to your account</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="opacity-60 pointer-events-none">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input 
                        type="email"
                        disabled
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="opacity-60 pointer-events-none">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-300">Password</label>
                      <a className="text-sm text-purple-400">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input 
                        type="password"
                        disabled
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <button disabled className="w-full bg-purple-600 opacity-60 text-white rounded-lg px-4 py-3 font-medium transition-colors">
                  Sign In
                </button>
                
                <div className="mt-4 text-center">
                  <span className="text-gray-400 text-sm">Don't have an account? </span>
                  <a className="text-purple-400 text-sm font-medium">Sign up</a>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/40 text-purple-300">
                  <CalendarClock className="w-4 h-4 mr-2" />
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SignInComingSoon;