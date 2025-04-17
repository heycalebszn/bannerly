import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Code } from "lucide-react";
import { David } from "../assets";
import Header from "../components/Header";
import { PaintBrushIcon } from "@heroicons/react/20/solid";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10">
    <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
      <Icon className="w-6 h-6 text-purple-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, quote, avatar }) => (
  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
    <p className="text-gray-300 italic mb-4">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <p className="font-medium text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

const OnBoarding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center pt-8 pb-16 lg:pt-16 lg:pb-24 px-4 md:px-6 lg:px-8">
        <Header />

        <div className="max-w-5xl mx-auto mt-12 lg:mt-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Get your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">
              customized
            </span>{" "}
            Social Banner
          </h1>
          <p className="mt-4 md:mt-6 text-xl md:text-2xl lg:text-3xl text-gray-300">
            For Software Developers & Designers
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                Get Started <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="#features">
              <button className="bg-transparent border border-gray-500 hover:border-white text-white text-lg px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
                Learn More
              </button>
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 w-full max-w-5xl">
          <img
            className="rounded-xl shadow-2xl shadow-purple-900/20 w-full object-cover"
            src={David}
            alt="Banner example"
          />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Create Professional Banners <span className="text-purple-400">In Minutes</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Customize your social media presence with our easy-to-use banner generator built specifically for tech professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard 
              icon={Code}
              title="Tech Stack Showcase"
              description="Highlight your programming languages and tools with custom icons and beautiful layouts."
            />
            <FeatureCard 
              icon={PaintBrushIcon}
              title="Custom Designs"
              description="Choose from premium gradients or upload your own background images for a unique look."
            />
            <FeatureCard 
              icon={Users}
              title="Social Integration"
              description="Seamlessly add your Twitter and GitHub profiles to grow your professional network."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It <span className="text-purple-400">Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Creating your custom banner is simple and takes just a few steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Choose Your Field</h3>
              <p className="text-gray-400">Select whether you're a developer, designer, or both to customize your experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Fill Your Details</h3>
              <p className="text-gray-400">Add your name, tech stack, social handles, and choose your background style</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Generate & Download</h3>
              <p className="text-gray-400">Preview your banner, make any final adjustments, and download it ready to use</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Developers <span className="text-purple-400">Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Join hundreds of developers who've enhanced their online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Alex Johnson" 
              role="Frontend Developer"
              quote="This tool saved me so much time! My GitHub profile looks way more professional now."
            />
            <TestimonialCard 
              name="Sarah Williams" 
              role="UI/UX Designer"
              quote="The customization options are exactly what I needed to showcase my design skills."
            />
            <TestimonialCard 
              name="Marcus Chen" 
              role="Full Stack Developer"
              quote="I love how easy it is to highlight my tech stack with those cool icons."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-8 md:p-12 rounded-2xl border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stand Out?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Create your professional banner in minutes and elevate your online presence
          </p>
          <Link to="/get-started">
            <button className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors">
              Create Your Banner Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 pt-12 pb-8 px-4 md:px-6 lg:px-8 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Banner Builder</h3>
              <p className="text-gray-400 mb-4">
                Create stunning social media banners to showcase your tech skills and professional identity.
              </p>
              <div className="flex gap-3">
                <a href="https://x.com/heyrapto" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <FaXTwitter className="w-5 h-5 text-gray-300" />
                </a>
                <a href="https://github.com/heycalebszn" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <FaGithub className="w-5 h-5 text-gray-300" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/get-started" className="text-gray-400 hover:text-white transition-colors">Get Started</Link></li>
                <li><Link to="/form" className="text-gray-400 hover:text-white transition-colors">Create Banner</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Have questions or feedback?</p>
              <a href="mailto:contact@bannerbuilder.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                contact@bannerbuilder.com
              </a>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Banner Builder. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for developers and designers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnBoarding;