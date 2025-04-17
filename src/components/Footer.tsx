import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/40 border-t border-white/10 pt-12 pb-8 px-4 md:px-6 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-bold text-white mb-2">Bannerly</h3>
              <span className="bg-purple-600 text-xs font-bold text-white px-2 py-0.5 rounded">v3</span>
            </Link>
            <p className="text-gray-400 mt-4 mb-4">
              Create stunning social media banners to showcase your tech skills and professional identity.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com/bannerly" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <FaXTwitter className="w-5 h-5 text-gray-300" />
              </a>
              <a href="https://github.com/bannerly" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <FaGithub className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">Explore</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/get-started" className="text-gray-400 hover:text-white transition-colors">Get Started</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-white transition-colors">
                Pricing
                <span className="ml-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a href="mailto:hello@bannerly.app" className="text-purple-400 hover:text-purple-300 transition-colors">
              hello@bannerly.app
            </a>
            
            <h3 className="text-lg font-semibold mt-6 mb-4 text-white">Subscribe</h3>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bannerly. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/coming-soon" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/coming-soon" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/coming-soon" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;