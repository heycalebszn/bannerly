import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Share2, Download, Copy, Filter, Search, ChevronDown, Bookmark, BookmarkCheck } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RaptoBanner, RaptoPFP } from "../assets";

const galleryItems = [
  {
    id: 1,
    title: "React Developer Portfolio",
    creatorName: "Alex Johnson",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 342,
    downloads: 127,
    tags: ["React", "Developer", "Dark Theme"],
    featured: true,
  },
  {
    id: 2,
    title: "UI/UX Designer Banner",
    creatorName: "Sarah Williams",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 256,
    downloads: 98,
    tags: ["UI/UX", "Designer", "Minimalist"],
    featured: false,
  },
  {
    id: 3,
    title: "Full Stack Engineer Brand",
    creatorName: "Marcus Chen",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 189,
    downloads: 76,
    tags: ["Full Stack", "JavaScript", "MERN"],
    featured: true,
  },
  {
    id: 4,
    title: "Creative Developer Space",
    creatorName: "Jamie Rodriguez",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 215,
    downloads: 94,
    tags: ["Creative", "Developer", "Colorful"],
    featured: false,
  },
  {
    id: 5,
    title: "Machine Learning Engineer",
    creatorName: "Priya Patel",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 178,
    downloads: 62,
    tags: ["ML", "Python", "Data Science"],
    featured: true,
  },
  {
    id: 6,
    title: "Cybersecurity Specialist",
    creatorName: "Jordan Smith",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 145,
    downloads: 53,
    tags: ["Security", "Networking", "Dark"],
    featured: false,
  },
  {
    id: 7,
    title: "Game Developer Portfolio",
    creatorName: "Chris Taylor",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 224,
    downloads: 87,
    tags: ["Game Dev", "Unity", "3D"],
    featured: true,
  },
  {
    id: 8,
    title: "Mobile App Developer",
    creatorName: "Zoe Garcia",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 162,
    downloads: 71,
    tags: ["Mobile", "React Native", "iOS"],
    featured: false,
  },
  {
    id: 9,
    title: "DevOps Engineer Banner",
    creatorName: "Noah Wilson",
    creatorAvatar: RaptoPFP,
    imageUrl: RaptoBanner,
    likes: 135,
    downloads: 48,
    tags: ["DevOps", "Cloud", "Docker"],
    featured: false,
  },
];

const GalleryItem = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);
  
  const handleCopyLink = () => {
    // Mock copy to clipboard functionality
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-purple-500/50 hover:bg-white/10">
      <div className="relative aspect-[2/1]">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        {item.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-2 py-0.5 text-xs font-bold text-white">
            FEATURED
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleSave}
              className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors"
              aria-label={saved ? "Unsave banner" : "Save banner"}
            >
              {saved ? (
                <BookmarkCheck className="w-5 h-5 text-purple-400" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <div className="flex items-center mt-1">
                <img 
                  src={item.creatorAvatar} 
                  alt={item.creatorName} 
                  className="w-6 h-6 rounded-full mr-2" 
                />
                <span className="text-sm text-gray-300">{item.creatorName}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/banner/${item.id}`}>
                <button className="rounded-lg bg-transparent border border-white px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors">
                  Preview
                </button>
              </Link>
              <Link to={`/customize/${item.id}`}>
                <button className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 transition-colors">
                  Customize
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{liked ? item.likes + 1 : item.likes}</span>
            </button>
            <div className="relative">
              <button 
                onClick={handleCopyLink}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                  Link copied!
                </div>
              )}
            </div>
            <Link to={`/download/${item.id}`}>
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
                <span>{item.downloads}</span>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300 hover:bg-white/10 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [activeTab, setActiveTab] = useState("all");
  
  const filters = ["All", "Featured", "Developer", "Designer", "Dark", "Colorful"];
  
  // Filter gallery items based on search and selected filter
  useEffect(() => {
    let results = galleryItems;
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedFilter === "Featured") {
      results = results.filter(item => item.featured);
    } else if (selectedFilter !== "All") {
      results = results.filter(item => 
        item.tags.some(tag => tag.toLowerCase() === selectedFilter.toLowerCase())
      );
    }
    
    // Apply tab filter
    if (activeTab === "trending") {
      results = [...results].sort((a, b) => b.likes - a.likes);
    } else if (activeTab === "popular") {
      results = [...results].sort((a, b) => b.downloads - a.downloads);
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedFilter, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-900/30 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                Community <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">Gallery</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl">
                Explore banners created by our community of developers and designers
              </p>
            </div>
            
            <Link to="/get-started">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                Create Your Own Banner
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 px-4 md:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search banners..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/50">
                <Filter className="h-4 w-4 text-gray-400" />
                <span>{selectedFilter}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              
              <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-white/10 hidden group-hover:block">
                <div className="py-1">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        selectedFilter === filter ? "text-purple-400" : "text-gray-300"
                      }`}
                      onClick={() => setSelectedFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mt-6 flex border-b border-white/10">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "all" 
                  ? "text-purple-400 border-b-2 border-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "trending" 
                  ? "text-purple-400 border-b-2 border-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("trending")}
            >
              Trending
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "popular" 
                  ? "text-purple-400 border-b-2 border-purple-400" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Most Downloaded
            </button>
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white mb-2">No banners found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Creator Spotlight */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
            {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white mb-2">No banners found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("All");
                  setActiveTab("all");
                }}
                className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Load More button */}
          {filteredItems.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all">
                Load More Banners
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Creator Spotlight */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Featured Creator <span className="text-purple-400">Spotlight</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/600/450" 
                  alt="Featured Creator Banner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">Advanced React Developer Banner</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-300">Most liked banner this month</span>
                    <span className="ml-4 flex items-center text-sm text-gray-300">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500 mr-1" /> 487
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Emma Wilson" 
                  className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">Emma Wilson</h3>
                  <p className="text-gray-400">Senior Frontend Developer</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                "As a developer who values clean aesthetics and functionality, I created this banner to showcase my React expertise while maintaining a modern, professional look. The gradient background represents the blend of creativity and technical skill that I bring to every project."
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300">
                  React
                </span>
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300">
                  Redux
                </span>
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300">
                  TypeScript
                </span>
                <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-300">
                  Next.js
                </span>
              </div>
              
              <div className="flex gap-3">
                <a href="https://github.com/emmadev" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </button>
                </a>
                <a href="https://twitter.com/emmadev" target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    Twitter
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Banner Creation CTA */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-8 md:p-12 rounded-2xl border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Own Banner?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of creators and showcase your skills with a professional, eye-catching banner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <button className="bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
                Create Your Banner
              </button>
            </Link>
            <Link to="/explore">
              <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
                Explore Templates
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GalleryPage;