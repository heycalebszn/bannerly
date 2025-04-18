import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, Star, Clock, TrendingUp } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RaptoBanner } from "../assets";

const demoTemplates = [
  {
    id: 1,
    title: "Developer Portfolio",
    category: "Developer",
    tags: ["React", "Node.js", "TypeScript"],
    imageUrl: RaptoBanner,
    popularity: 2341,
    isNew: true,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    category: "Designer",
    tags: ["Figma", "UI/UX", "Design"],
    imageUrl: RaptoBanner,
    popularity: 1945,
    isNew: false,
  },
  {
    id: 3,
    title: "Full Stack Developer",
    category: "Developer",
    tags: ["JavaScript", "Python", "MongoDB"],
    imageUrl: RaptoBanner,
    popularity: 1756,
    isNew: true,
  },
  {
    id: 4,
    title: "Product Designer",
    category: "Designer",
    tags: ["Adobe XD", "Sketch", "Prototyping"],
    imageUrl: RaptoBanner,
    popularity: 1592,
    isNew: false,
  },
  {
    id: 5,
    title: "Backend Engineer",
    category: "Developer",
    tags: ["Java", "Spring", "AWS"],
    imageUrl: RaptoBanner,
    popularity: 1288,
    isNew: false,
  },
  {
    id: 6,
    title: "Mobile Developer",
    category: "Developer",
    tags: ["React Native", "Flutter", "Swift"],
    imageUrl: RaptoBanner,
    popularity: 1122,
    isNew: true,
  },
  {
    id: 7,
    title: "Game Developer",
    category: "Developer",
    tags: ["Unity", "C#", "3D Modeling"],
    imageUrl: RaptoBanner,
    popularity: 987,
    isNew: false,
  },
  {
    id: 8,
    title: "Motion Designer",
    category: "Designer",
    tags: ["After Effects", "Premiere", "Animation"],
    imageUrl: RaptoBanner,
    popularity: 854,
    isNew: true,
  },
];

const BannerCard = ({ template }) => (
  <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-purple-500/50 hover:bg-white/10">
    <div className="relative">
      <img 
        src={template.imageUrl} 
        alt={template.title} 
        className="w-full object-cover aspect-[2/1]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
        <div>
          {template.tags.map((tag, index) => (
            <span key={index} className="mr-2 mb-2 inline-block rounded-full bg-black/50 px-2 py-1 text-xs text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link to={`/template/${template.id}`}>
            <button className="rounded bg-purple-600 px-3 py-1 text-xs font-medium text-white hover:bg-purple-700">
              Preview
            </button>
          </Link>
          <Link to={`/customize/${template.id}`}>
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-purple-800 hover:bg-gray-100">
              Use
            </button>
          </Link>
        </div>
      </div>
      {template.isNew && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full px-2 py-0.5 text-xs font-bold text-white">
          NEW
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{template.title}</h3>
        <span className="flex items-center text-xs text-gray-400">
          <Star className="mr-1 h-3 w-3 text-yellow-400" /> {template.popularity.toLocaleString()}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-400">{template.category}</p>
    </div>
  </div>
);

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Popular");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All", "Developer", "Designer", "Full Stack", "Mobile", "Game Dev"];
  const sortOptions = ["Popular", "Newest", "Trending"];
  
  const filteredTemplates = demoTemplates.filter(template => {
    // Filter by search query
    if (searchQuery && !template.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== "All" && template.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });
  
  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (selectedSort === "Popular") {
      return b.popularity - a.popularity;
    } else if (selectedSort === "Newest") {
      return b.isNew ? 1 : -1;
    }
    // For trending, we could use a different metric, but for this demo we'll use popularity
    return b.popularity - a.popularity;
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-10 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-purple-900/30 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600">Banner</span> Templates
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Browse through our collection of professionally designed banner templates for developers and designers
          </p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8 px-4 md:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              {/* Categories */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/50">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span>{selectedCategory}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-white/10 hidden group-hover:block">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                          selectedCategory === category ? "text-purple-400" : "text-gray-300"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sort */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/50">
                  {selectedSort === "Popular" && <Star className="h-4 w-4 text-gray-400" />}
                  {selectedSort === "Newest" && <Clock className="h-4 w-4 text-gray-400" />}
                  {selectedSort === "Trending" && <TrendingUp className="h-4 w-4 text-gray-400" />}
                  <span>{selectedSort}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                
                <div className="absolute right-0 z-10 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-white/10 hidden group-hover:block">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                          selectedSort === option ? "text-purple-400" : "text-gray-300"
                        }`}
                        onClick={() => setSelectedSort(option)}
                      >
                        <div className="flex items-center">
                          {option === "Popular" && <Star className="h-4 w-4 mr-2" />}
                          {option === "Newest" && <Clock className="h-4 w-4 mr-2" />}
                          {option === "Trending" && <TrendingUp className="h-4 w-4 mr-2" />}
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Templates Grid */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {sortedTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template) => (
                <BannerCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
          
          {/* Load More button */}
          {sortedTemplates.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all">
                Load More Templates
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-black/20 mt-auto">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-8 md:p-12 rounded-2xl border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Create Your Custom Banner
          </h2>
          <p className="text-gray-300 mb-8">
            Start from scratch and design a banner that perfectly represents your personal brand
          </p>
          <Link to="/get-started">
            <button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
              Create Custom Banner
            </button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ExplorePage;