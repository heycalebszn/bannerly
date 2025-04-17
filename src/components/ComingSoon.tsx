import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Calendar, 
  Bell, 
  Image, 
  Sparkles, 
  Cpu, 
  Wand2, 
  Palette,
  User,
  Layout,
  Layers,
  Star
} from "lucide-react";
import React from "react";
import { RaptoBanner, RaptoPFP } from "../assets";
const FeatureCard = ({ icon: Icon, title, description, comingSoon = true, eta }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white/5 p-6 rounded-xl border ${comingSoon ? 'border-purple-500/30' : 'border-white/10'} transition-all duration-300 hover:border-purple-500/50 hover:bg-white/10 relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {comingSoon && (
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      )}
      
      <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      {eta && comingSoon && (
        <div className={`flex items-center text-sm ${isHovered ? 'text-purple-300' : 'text-gray-500'} transition-colors`}>
          <Calendar className="w-4 h-4 mr-1" />
          <span>Estimated: {eta}</span>
        </div>
      )}
    </div>
  );
};

const FeatureComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle subscription logic here
    setIsSubscribed(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/40 text-purple-300 mb-6">
            <Star className="w-4 h-4 mr-1" /> Version 3.0 Coming Soon
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">Banner Builder</span> is Coming
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're evolving beyond banners to give you a complete personalized social media presence. Here's what's coming in our biggest update yet.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors flex items-center">
              Join Waitlist <Bell className="ml-2 w-5 h-5" />
            </button>
            
            <Link to="/get-started">
              <button className="bg-transparent border border-gray-500 hover:border-white text-white text-lg px-8 py-3 rounded-lg font-medium transition-colors">
                Use Current Version
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="py-16 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Our Roadmap</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-700/30 hidden md:block"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 md:space-y-0">
              {/* Item 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right pb-6 md:pb-0">
                  <span className="text-sm font-semibold text-purple-400">Phase 1 (Current)</span>
                  <h3 className="text-2xl font-bold mb-2">Custom Social Banners</h3>
                  <p className="text-gray-400">Our foundation: Beautiful banners for developers and designers</p>
                </div>
                <div className="relative md:pl-8">
                  <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <img 
                      src={RaptoBanner}
                      alt="Banner example" 
                      className="rounded-lg w-full h-40 object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:order-2 md:text-left pb-6 md:pb-0">
                  <span className="text-sm font-semibold text-purple-400">Phase 2 (Coming in May)</span>
                  <h3 className="text-2xl font-bold mb-2">AI-Generated Profile Pictures</h3>
                  <p className="text-gray-400">Matching profile pictures generated from your preferences</p>
                </div>
                <div className="relative md:order-1 md:pr-8">
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <img 
                      src={RaptoPFP}
                      alt="Profile picture example" 
                      className="rounded-lg w-full h-40 object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right pb-6 md:pb-0">
                  <span className="text-sm font-semibold text-purple-400">Phase 3 (Coming in June)</span>
                  <h3 className="text-2xl font-bold mb-2">Theme Templates & Styles</h3>
                  <p className="text-gray-400">Professional themes for cohesive personal branding</p>
                </div>
                <div className="relative md:pl-8">
                  <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-400"></div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <img 
                      src={RaptoPFP}
                      alt="Theme templates example" 
                      className="rounded-lg w-full h-40 object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:order-2 md:text-left">
                  <span className="text-sm font-semibold text-purple-400">Phase 4 (Coming in July)</span>
                  <h3 className="text-2xl font-bold mb-2">Premium Features & Plans</h3>
                  <p className="text-gray-400">Advanced customization and priority rendering</p>
                </div>
                <div className="relative md:order-1 md:pr-8">
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-purple-400"></div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <img 
                      src={RaptoPFP}
                      alt="Premium features example" 
                      className="rounded-lg w-full h-40 object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Features Grid */}
      <div className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Upcoming Features</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Here's what we're building to take your social media presence to the next level
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={User}
              title="AI Profile Pictures"
              description="Generate unique profile pictures that match your style and tech identity with our advanced AI."
              eta="May 2025"
            />
            
            <FeatureCard 
              icon={Wand2}
              title="One-Click Generation"
              description="Create matching profile pictures and banners with a single click for a cohesive brand."
              eta="May 2025"
            />
            
            <FeatureCard 
              icon={Layout}
              title="Theme Templates"
              description="Choose from professionally designed themes that work across all your social platforms."
              eta="June 2025"
            />
            
            <FeatureCard 
              icon={Palette}
              title="Style Customization"
              description="Fine-tune colors, gradients, and visual effects to match your personal aesthetic."
              eta="June 2025"
            />
            
            <FeatureCard 
              icon={Layers}
              title="Multi-Platform Export"
              description="Automatically resize and optimize your graphics for different social platforms."
              eta="June 2025"
            />
            
            <FeatureCard 
              icon={Sparkles}
              title="Premium Effects"
              description="Access exclusive visual effects, animations, and design elements with our premium plans."
              eta="July 2025"
            />
          </div>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Be the First to Know</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to get early access and product updates about our v3 release
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-purple-900/40 text-white p-4 rounded-lg border border-purple-500/30 max-w-md mx-auto">
              <p className="flex items-center justify-center">
                <span className="mr-2">✓</span> 
                Thanks for subscribing! We'll keep you updated.
              </p>
            </div>
          )}
          
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">When exactly will v3 be released?</h3>
              <p className="text-gray-400">We're rolling out v3 features in phases starting May 2025. AI profile pictures will come first, followed by themes and templates in June, and premium features in July.</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Will the current banner builder still be available?</h3>
              <p className="text-gray-400">Yes! The current banner builder will remain fully functional and will be enhanced with the new features as they roll out.</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Will v3 require a paid subscription?</h3>
              <p className="text-gray-400">Basic features will remain free, but premium themes, advanced AI options, and priority rendering will be available with our upcoming subscription plans.</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">How will the AI profile picture generation work?</h3>
              <p className="text-gray-400">Our AI will use your preferences, selected style, and optional reference images to generate unique profile pictures that match your banner's aesthetics.</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">Can I join the beta testing program?</h3>
              <p className="text-gray-400">Yes! Subscribe to our newsletter above and check the beta testing option to get early access to new features before they're publicly released.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 md:px-6 lg:px-8 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can't Wait for v3? Try the Current Version Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our current banner builder is already helping thousands of developers and designers stand out
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/get-started">
              <button className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors">
                Create Your Banner Now
              </button>
            </Link>
            
            <button className="bg-transparent border border-white text-white hover:bg-white/10 text-lg px-8 py-3 rounded-lg font-medium transition-colors">
              View Examples
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/60 py-8 px-4 md:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Banner Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FeatureComingSoon;