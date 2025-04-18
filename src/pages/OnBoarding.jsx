import { Link } from "react-router-dom";
import { 
  Code, 
  Paintbrush,
  Users, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Zap, 
  Fingerprint, 
  Layers, 
  Star,
  Laptop,
  MousePointer,
  Download,
  ChevronRight,
  Play,
  ArrowUpRight,
  X,
 } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import React, { useState, useEffect, useRef } from "react";
import { David, RaptoBanner, RaptoPFP } from "../assets";

// const FeatureCard = ({ icon: Icon, title, description }) => (
//   <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-white/10">
//     <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
//       <Icon className="w-6 h-6 text-purple-400" />
//     </div>
//     <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const TestimonialCard = ({ name, role, quote, avatar }) => (
//   <div className="bg-white/5 p-6 rounded-xl border border-white/10">
//     <p className="text-gray-300 italic mb-4">"{quote}"</p>
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
//         {avatar || name.charAt(0)}
//       </div>
//       <div>
//         <p className="font-medium text-white">{name}</p>
//         <p className="text-sm text-gray-400">{role}</p>
//       </div>
//     </div>
//   </div>
// );

const FloatingElement = ({ children, delay, duration, className }) => {
  return (
    <div 
      className={`animate-float ${className}`} 
      style={{ 
        animationDelay: `${delay}s`, 
        animationDuration: `${duration}s` 
      }}
    >
      {children}
    </div>
  );
};

// Animated gradient background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -z-10 inset-0 bg-black"></div>
      <div className="absolute -z-9 top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -z-9 bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -z-9 top-1/2 left-1/3 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

// Feature highlight component
const FeatureHighlight = ({ icon: Icon, label, color }) => {
  return (
    <div className="flex items-center gap-2 text-gray-300 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

// Feature card with icon and hover effects
const FeatureCard = ({ icon: Icon, title, description, isNew }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-500 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg inline-flex mb-4 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all duration-300">
        <Icon className="h-6 w-6 text-purple-400 group-hover:text-purple-300" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {isNew && (
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            New in V3
          </span>
        )}
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Process step card with animated number
const ProcessStep = ({ number, title, description, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mx-auto mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto relative z-10 shadow-lg shadow-purple-900/30">
          <span className="text-white">{number}</span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Testimonial card with quote styling
const TestimonialCard = ({ name, role, avatar, quote, platform, rating = 5, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {avatar || name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-white">{name}</h4>
            <p className="text-gray-400 text-sm">{role}</p>
          </div>
        </div>
        
        {platform && (
          <div className="bg-gray-800 rounded-md py-1 px-2 text-xs text-gray-300">
            {platform}
          </div>
        )}
      </div>
      
      <div className="relative">
        <div className="absolute -top-3 -left-1 text-purple-500 opacity-30 text-4xl font-serif">"</div>
        <p className="text-gray-300 relative z-10 italic">{quote}</p>
        <div className="absolute -bottom-5 -right-1 text-purple-500 opacity-30 text-4xl font-serif">"</div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill={i < rating ? 'currentColor' : 'none'} />
          ))}
        </div>
        <span className="text-xs text-gray-400">Verified User</span>
      </div>
    </div>
  );
};

// Feature comparison item for pricing section
const FeatureItem = ({ text, included = true }) => (
  <div className="flex items-center py-2">
    <div className={`p-1 rounded-full mr-3 ${included ? 'bg-green-500/20' : 'bg-gray-700'}`}>
      {included ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-500" />
      )}
    </div>
    <span className={included ? 'text-gray-200' : 'text-gray-400'}>{text}</span>
  </div>
);

// Plan card for the pricing section
const PlanCard = ({ name, price, description, features, isPopular, isComingSoon, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`relative bg-gray-900/80 backdrop-blur-sm border ${
        isPopular ? 'border-purple-500' : 'border-gray-800'
      } rounded-xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isPopular ? 'shadow-lg shadow-purple-900/20' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            Most Popular
          </div>
        </div>
      )}
      
      {isComingSoon && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            Coming in V3
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-white">${price}</span>
          {price > 0 && <span className="text-gray-400 ml-1">/month</span>}
        </div>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>
      
      <div className="space-y-1">
        {features.map((feature, index) => (
          <FeatureItem key={index} text={feature.text} included={feature.included} />
        ))}
      </div>
      
      <div className="mt-6">
        <Link to={isComingSoon ? "#waitlist" : "/get-started"}>
          <button 
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
              isPopular 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                : isComingSoon
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {isComingSoon ? 'Join Waitlist' : 'Get Started'}
          </button>
        </Link>
      </div>
    </div>
  );
};

// Video modal component
const VideoModal = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden w-full max-w-4xl z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition-colors z-20"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Product Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Section header with animated background
const SectionHeader = ({ title, highlight, description }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div 
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="inline-flex mb-4 px-4 py-1.5 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40">
        <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
        <span className="text-sm font-medium text-purple-300">New in V3</span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{highlight}</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        {description}
      </p>
    </div>
  );
};

// Tabbed showcase component
const TabbedShowcase = () => {
  const [activeTab, setActiveTab] = useState('developers');
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const tabs = [
    { id: 'developers', label: 'For Developers' },
    { id: 'designers', label: 'For Designers' },
    { id: 'creators', label: 'For Content Creators' }
  ];
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex space-x-2 overflow-x-auto pb-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-900/20'
                : 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="relative rounded-xl overflow-hidden border border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
        
        {activeTab === 'developers' && (
          <div className="relative">
            <img 
              src={RaptoBanner}
              alt="Developer Banner Example" 
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Showcase Your Tech Stack</h3>
              <p className="text-gray-300 mb-4">Highlight your programming languages, frameworks, and tools with custom icons and beautiful layouts.</p>
              <Link to="/templates/developers">
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                  View Developer Templates
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'designers' && (
          <div className="relative">
            <img 
              src={RaptoBanner}
              alt="Designer Banner Example" 
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Highlight Your Portfolio</h3>
              <p className="text-gray-300 mb-4">Create a stunning banner that showcases your design skills with customizable layouts and style options.</p>
              <Link to="/templates/designers">
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                  View Designer Templates
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'creators' && (
          <div className="relative">
            <img 
              src={RaptoBanner}
              alt="Content Creator Banner Example" 
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Grow Your Audience</h3>
              <p className="text-gray-300 mb-4">Create eye-catching banners that help you build your personal brand and connect with your followers.</p>
              <Link to="/templates/creators">
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                  View Creator Templates
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stats counter component
const StatCounter = ({ value, label, prefix = '', suffix = '', delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let timeout;
    if (isVisible) {
      let start = 0;
      const duration = 2000; // ms
      const step = 15; // ms per frame
      const increment = value / (duration / step);
      
      const updateCount = () => {
        start += increment;
        if (start < value) {
          setCount(Math.floor(start));
          timeout = setTimeout(updateCount, step);
        } else {
          setCount(value);
        }
      };
      
      timeout = setTimeout(updateCount, delay);
    }
    
    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);
  
  return (
    <div 
      ref={ref}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {prefix}{isVisible ? count.toLocaleString() : 0}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
};

// Particle effect component
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 -z-5">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full opacity-30"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

const OnBoarding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <ParticleEffect />
      {/* <Header /> */}
      
      <div className={`relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-24 px-4 md:px-8 lg:px-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center px-4 py-2 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-700/40 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
          {/* <span className="text-sm font-medium text-purple-300">
            Announcing V3 - Available Now</span> */}
          <span className="text-sm font-medium text-purple-300">
            Anticipate V3 - Coming Soon</span>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            The Ultimate
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"> Social Banner </span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-purple-500 opacity-75" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
            Platform
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Create stunning, personalized banners with AI-powered design tools and next-gen customization options.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link to="/get-started">
                <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50 w-full">
                  <span className="flex items-center justify-center gap-2">
                    Create Your Banner
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></span>
                </button>
              </Link>
              
              <a href="#features">
                <button className="bg-transparent border border-gray-600 hover:border-white text-white text-lg px-8 py-3 rounded-lg font-medium transition-colors w-full flex items-center justify-center gap-2">
                  Explore Features
                </button>
              </a>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <FeatureHighlight icon={Zap} label="AI-Powered" color="text-yellow-400" />
            <FeatureHighlight icon={Code} label="Developer Friendly" color="text-cyan-400" />
            <FeatureHighlight icon={Layers} label="New Templates" color="text-purple-400" />
          </div>
        </div>
        
        <div className="relative mt-16 lg:mt-20 w-full max-w-6xl perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-20 h-12 bottom-0 rounded-b-xl"></div>
          
          <div className="relative group transform transition-all hover:-rotate-x-2 hover:scale-[1.01] duration-500">
            <FloatingElement delay={0.5} duration={3} className="absolute -top-8 -right-8 z-20">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-lg shadow-lg rotate-6">
                <div className="bg-gray-900 p-3 rounded-md">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </FloatingElement>
            
            <FloatingElement delay={1.2} duration={4} className="absolute -bottom-6 -left-6 z-20">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-1 rounded-lg shadow-lg -rotate-12">
                <div className="bg-gray-900 p-3 rounded-md">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </FloatingElement>
            
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-purple-900/30 border border-purple-800/20 backdrop-blur-sm">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 py-2 px-4 flex items-center gap-2 border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400 mx-auto">preview.bannerly.dev</div>
              </div>
              
              <img
                className="w-full object-cover"
                src={RaptoBanner}
                alt="Bannerly V3 Dashboard Preview"
              />
            </div>
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-full py-2 px-6 border border-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-300 font-medium">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-gray-300 text-sm">+2,500 users already using V3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(20px); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-x-2 {
          transform: rotateX(2deg);
        }
      `}</style>
    </div>


    <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black/20 to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Powerful Features"
            highlight="For Everyone"
            description="Create professional banners in minutes with our easy-to-use tools and AI-powered customization options."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard 
              icon={Code}
              title="Tech Stack Showcase"
              description="Highlight your programming languages and tools with custom icons and beautiful layouts to showcase your expertise."
            />
            <FeatureCard 
              icon={Paintbrush}
              title="AI Design Assistant"
              description="Let our AI suggest design elements and color schemes based on your profile and preferences."
              isNew={true}
            />
            <FeatureCard 
              icon={Users}
              title="Social Integration"
              description="Seamlessly connect your social profiles to import data and share your new banner with your network."
            />
            <FeatureCard 
              icon={Zap}
              title="Quick Generation"
              description="Create professional banners in seconds with our streamlined design process and templates."
            />
            <FeatureCard 
              icon={Fingerprint}
              title="Unique Designs"
              description="Every banner is crafted to be unique with custom elements that reflect your personal brand."
              isNew={true}
            />
            <FeatureCard 
              icon={Layers}
              title="Advanced Export Options"
              description="Export your banner in multiple formats and sizes optimized for different platforms."
              isNew={true}
            />
          </div>
        </div>
      </section>

      {/* New V3 Highlight Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Introducing V3
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI-Powered Banner Generation
              </h2>
              <p className="text-gray-300 mb-6">
                Our new AI system analyzes thousands of professional banners to help you create designs that stand out while maintaining your personal brand identity.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-green-600/20 p-1 rounded text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Personalized Recommendations</h3>
                    <p className="text-gray-400 text-sm">Get design suggestions based on your role, industry, and personal style preferences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-green-600/20 p-1 rounded text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Smart Color Matching</h3>
                    <p className="text-gray-400 text-sm">Automatic color scheme generation that complements your existing branding or profile picture.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-green-600/20 p-1 rounded text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Content Generation</h3>
                    <p className="text-gray-400 text-sm">Suggest professional bios and taglines that highlight your skills and experience.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 py-2.5 rounded-lg transition-all"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Watch Demo
                </button>
                <Link to="/ai-features">
                  <button className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-white text-white px-5 py-2.5 rounded-lg transition-colors">
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl rounded-full"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl shadow-purple-900/10">
                <div className="bg-gray-900 py-2 px-4 flex items-center gap-2 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto">AI Design Assistant</div>
                </div>
                <img
                  className="w-full object-cover"
                  src={RaptoBanner}
                  alt="AI Design Assistant Preview"
                />
                <div className="p-4 bg-gray-900/80 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-white">Banner Generation Progress</div>
                    <div className="text-sm text-purple-400">78%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="text-xs text-gray-400">Processing design elements...</div>
                    <div className="text-xs text-gray-400 text-right">Estimated time: 12s</div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 p-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg rotate-6 shadow-lg">
                <div className="bg-gray-900 p-3 rounded">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 p-1 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg -rotate-12 shadow-lg">
                <div className="bg-gray-900 p-3 rounded">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced "How It Works" Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="How It"
            highlight="Works"
            description="Creating your custom banner is simple and takes just a few steps. Our intuitive process guides you from start to finish."
          />

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <ProcessStep 
                number="1"
                title="Choose Your Role"
                description="Select whether you're a developer, designer, or content creator to get templates tailored to your needs."
                delay={0}
              />
              <ProcessStep 
                number="2"
                title="Customize Your Design"
                description="Add your details, select colors, upload assets, and let our AI assist with optimizing your banner design."
                delay={200}
              />
              <ProcessStep 
                number="3"
                title="Export & Share"
                description="Download your banner in multiple formats and sizes, ready to use across all your professional profiles."
                delay={400}
              />
            </div>
          </div>
          
          <div className="mt-16 md:mt-24 flex justify-center">
            <Link to="/get-started">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Trusted by"
            highlight="Thousands"
            description="Hear what our users have to say about their experience with our banner generation platform."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Alex Morgan"
              role="Frontend Developer"
              quote="The tech stack showcase feature is perfect for my GitHub profile. It took less than 5 minutes to create a professional banner that highlights my skills."
              platform="GitHub"
              rating={5}
              delay={0}
            />
            <TestimonialCard 
              name="Sarah Chen"
              role="UX Designer"
              quote="As a designer, I'm very picky about visuals. This tool exceeded my expectations with its AI color recommendations and clean aesthetic options."
              platform="Dribbble"
              rating={5}
              delay={200}
            />
            <TestimonialCard 
              name="James Wilson"
              role="Content Creator"
              quote="The new V3 features are game-changing. My YouTube channel banner looks professional and helps me stand out in a crowded space."
              platform="YouTube"
              rating={4}
              delay={400}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/testimonials">
              <button className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 mx-auto transition-colors">
                View all success stories
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-900/10 to-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={50000} suffix="+" label="Banners Created" delay={0} />
            <StatCounter value={98} suffix="%" label="Satisfaction Rate" delay={300} />
            <StatCounter value={120} suffix="+" label="Template Options" delay={600} />
            <StatCounter value={15000} suffix="+" label="Active Users" delay={900} />
          </div>
        </div>
      </section>

      {/* Use Case Showcase Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Perfect For"
            highlight="Everyone"
            description="See how different professionals use our platform to create stunning banners for their profiles."
          />

          <TabbedShowcase />
        </div>
      </section>

      {/* New AI Features Detailed Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-black/20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
            <div className="absolute -bottom-40 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
          </div>
          
          <div className="mb-16 text-center">
            <div className="inline-flex mb-4 px-4 py-1.5 bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-700/40">
              <Laptop className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-300">Exclusive in V3</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our newest version integrates advanced AI technology to make banner creation faster, smarter, and more personalized than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-white mb-6">Smart Content Generation</h3>
              <p className="text-gray-300 mb-6">
                Our AI analyzes your profile data to suggest professional taglines, bios, and descriptions that highlight your unique skills and experience.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Fingerprint className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Personalized Taglines</h4>
                    <p className="text-gray-400">The AI suggests professional taglines that highlight your expertise and career focus.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Skill Highlighting</h4>
                    <p className="text-gray-400">Automatically identifies and highlights your most relevant skills based on your role and industry.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Paintbrush className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Visual Style Matching</h4>
                    <p className="text-gray-400">Suggests design elements that match your existing branding and online presence.</p>
                  </div>
                </div>
              </div>
              
              <Link to="/ai-features">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2">
                  Explore AI Features
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-full"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl shadow-purple-900/10">
                <div className="bg-gray-900 py-2 px-4 flex items-center gap-2 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400 mx-auto">AI Content Assistant</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Generated Tagline Options:</div>
                    <div className="bg-gray-800/70 p-3 rounded-lg text-white mb-2 cursor-pointer hover:bg-gray-800 transition-colors">
                      Full-Stack Developer specializing in React & Node.js
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg text-white mb-2 cursor-pointer relative">
                      Building scalable web applications with modern technologies
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="bg-gray-800/70 p-3 rounded-lg text-white cursor-pointer hover:bg-gray-800 transition-colors">
                      JavaScript expert passionate about clean code & performance
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Recommended Skills to Highlight:</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">React.js</div>
                      <div className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-sm">Node.js</div>
                      <div className="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded text-sm">TypeScript</div>
                      <div className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-sm">GraphQL</div>
                      <div className="bg-pink-600/20 text-pink-400 px-2 py-1 rounded text-sm">AWS</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">
                      Regenerate options
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1 rounded transition-colors">
                      Apply Selected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Try It"
            highlight="Now"
            description="Experience our interface with this interactive demo and see how easy it is to create your professional banner."
          />

          <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/10">
            <div className="bg-gray-900 py-3 px-4 flex items-center gap-2 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-400 mx-auto">Interactive Demo - V3 Builder</div>
            </div>
            
            <div className="relative h-96 md:h-[500px]">
              <img 
                src={RaptoBanner} 
                alt="Interactive Demo" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center">
                <Laptop className="h-16 w-16 text-purple-400 mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Interactive Demo</h3>
                <p className="text-gray-300 mb-8 max-w-md text-center">
                  Experience our easy-to-use banner builder with our interactive demo.
                </p>
                <Link to="/demo">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Try Interactive Demo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Simple"
            highlight="Pricing"
            description="Choose the plan that works best for you, from free options to premium features for power users."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              name="Free"
              price={0}
              description="Perfect for getting started with basic banner creation."
              features={[
                { text: "Basic templates", included: true },
                { text: "Standard export formats", included: true },
                { text: "Tech stack showcase", included: true },
                { text: "Community support", included: true },
                { text: "AI design assistance", included: false },
                { text: "Advanced customization", included: false },
                { text: "Priority support", included: false }
              ]}
              delay={0}
            />
            
            <PlanCard
              name="Pro"
              price={12}
              description="Unlock AI features and advanced customization options."
              features={[
                { text: "All Free features", included: true },
                { text: "AI design assistance", included: true },
                { text: "Premium templates", included: true },
                { text: "Advanced customization", included: true },
                { text: "Remove watermarks", included: true },
                { text: "Priority support", included: true },
                { text: "Advanced analytics", included: false }
              ]}
              isPopular={true}
              delay={200}
            />
            
            <PlanCard
              name="Enterprise"
              price={49}
              description="For teams and businesses needing advanced features."
              features={[
                { text: "All Pro features", included: true },
                { text: "Team collaboration", included: true },
                { text: "Brand management", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Custom integrations", included: true },
                { text: "Dedicated support", included: true },
                { text: "API access", included: true }
              ]}
              delay={400}
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Not seeing what you need? Contact us for custom solutions.
            </p>
            <Link to="/contact">
              <button className="bg-transparent border border-gray-600 hover:border-white text-white px-5 py-2.5 rounded-lg transition-colors">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex mb-4 px-4 py-1.5 bg-green-900/30 backdrop-blur-sm rounded-full border border-green-700/40">
            <Download className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-300">New Desktop App</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get Started with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">V3 Today</span>
          </h2>
          
          <p className="text-gray-300 mb-12 text-lg">
            Try our new and improved platform with advanced AI features and stunning templates to create the perfect banner for your professional profiles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30 flex items-center justify-center gap-2 w-full sm:w-auto">
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            
            <Link to="/demo">
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                View Live Demo
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-black/40 border-t border-white/10 pt-12 pb-8 px-4 md:px-6 lg:px-8 mt-auto">
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
      </footer> */}
      <VideoModal 
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoId="dQw4w9WgXcQ" 
      />
      <Footer />
    </div>
  );
};

export default OnBoarding;