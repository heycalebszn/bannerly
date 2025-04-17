import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Tag,
  User,
  MessageSquare,
  ArrowRight,
  BookOpen,
  PenTool,
  Code,
  Layout,
  Palette
} from "lucide-react";
import React from "react";
import { RaptoBanner, RaptoPFP } from "../assets";
// Blog post data (in a real app, this would come from an API or CMS)
const blogPosts = [
  {
    id: 1,
    title: "How to Make Your Developer Profile Stand Out in 2025",
    excerpt: "Learn the key elements that make developer profiles memorable and how to optimize your social presence for job opportunities.",
    coverImage: RaptoBanner,
    category: "Career Tips",
    author: "Alex Morgan",
    authorAvatar: RaptoPFP,
    date: "April 14, 2025",
    readTime: "5 min read",
    tags: ["portfolio", "career", "branding"],
    featured: true
  },
  {
    id: 2,
    title: "The Psychology of Color in Developer Branding",
    excerpt: "Explore how color choices in your social profiles can influence perception and help convey your professional identity.",
    coverImage: RaptoBanner,
    category: "Design",
    author: "Sophia Chen",
    authorAvatar: RaptoPFP,
    date: "April 8, 2025",
    readTime: "4 min read",
    tags: ["design", "branding", "psychology"]
  },
  {
    id: 3,
    title: "Showcasing Your Tech Stack: Best Practices",
    excerpt: "Tips on how to effectively present your programming languages and tools in your online profiles.",
    coverImage: RaptoBanner,
    category: "Development",
    author: "James Wilson",
    authorAvatar: RaptoPFP,
    date: "April 2, 2025",
    readTime: "6 min read",
    tags: ["tech stack", "skills", "portfolio"]
  },
  {
    id: 4,
    title: "From Junior to Senior: Building Your Developer Brand",
    excerpt: "How consistent personal branding can accelerate your career path from junior to senior developer roles.",
    coverImage: RaptoBanner,
    category: "Career Tips",
    author: "Alex Morgan",
    authorAvatar: RaptoPFP,
    date: "March 28, 2025",
    readTime: "7 min read",
    tags: ["career", "branding", "growth"]
  },
  {
    id: 5,
    title: "UI Design Trends for Developers in 2025",
    excerpt: "Stay ahead of the curve with these emerging design trends that every developer should know about.",
    coverImage: RaptoBanner,
    category: "Design",
    author: "Emma Lewis",
    authorAvatar: RaptoPFP,
    date: "March 20, 2025",
    readTime: "5 min read",
    tags: ["ui", "design", "trends"]
  },
  {
    id: 6,
    title: "Social Media Optimization for Developers",
    excerpt: "Practical strategies to optimize your social media profiles for networking and job opportunities.",
    coverImage: RaptoBanner,
    category: "Career Tips",
    author: "Chris Patel",
    authorAvatar: RaptoPFP,
    date: "March 15, 2025",
    readTime: "4 min read",
    tags: ["social media", "networking", "career"]
  }
];

// Categories with icons
const categories = [
  { name: "All", count: blogPosts.length, icon: BookOpen },
  { name: "Career Tips", count: 3, icon: User },
  { name: "Design", count: 2, icon: PenTool },
  { name: "Development", count: 1, icon: Code },
  { name: "Tutorials", count: 0, icon: Layout },
  { name: "Resources", count: 0, icon: Palette }
];

const BlogCard = ({ post, featured = false }) => (
  <div className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all ${featured ? 'md:col-span-2' : ''}`}>
    <div className="relative">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className={`w-full object-cover ${featured ? 'h-72' : 'h-56'}`}
      />
      <div className="absolute top-4 left-4">
        <span className="bg-purple-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <h3 className={`font-bold text-white mb-3 ${featured ? 'text-2xl' : 'text-xl'}`}>
        {post.title}
      </h3>
      <p className="text-gray-400 mb-4">{post.excerpt}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img 
              src={post.authorAvatar} 
              alt={post.author} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-gray-300">{post.author}</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {post.readTime}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        <Link to={`/blog/${post.id}`} className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium">
          Read more <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  </div>
);

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-12 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-black/40 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Insights, tutorials, and resources for developers and designers to enhance their online presence
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..." 
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.name 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-1.5" />
                  {category.name}
                  <span className="ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && searchTerm === "" && (
        <div className="pb-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Article</h2>
              <div className="ml-3 h-px bg-white/20 flex-grow"></div>
            </div>
            
            <BlogCard post={featuredPost} featured={true} />
          </div>
        </div>
      )}
      
      {/* Blog Posts Grid */}
      <div className="pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {selectedCategory !== "All" || searchTerm !== "" ? (
            <>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory !== "All" ? `${selectedCategory} Articles` : "Search Results"}
                </h2>
                <div className="ml-3 h-px bg-white/20 flex-grow"></div>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center">
                  <p className="text-gray-300 mb-4">No articles found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <Link to="/blog/all" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                  View all <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.filter(post => !post.featured).slice(0, 6).map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="py-16 px-4 md:px-6 lg:px-8 bg-black/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Get the latest articles, tutorials, and updates delivered to your inbox
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            No spam, ever. We send emails about once a month.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 pt-12 pb-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Banner Builder</h3>
              <p className="text-gray-400 mb-4">
                Create stunning social media banners to showcase your tech skills and professional identity.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
              <ul className="space-y-2">
                {categories.filter(cat => cat.name !== "All" && cat.count > 0).map((category, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(category.name);
                        window.scrollTo(0, 0);
                      }}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name} ({category.count})
                    </button>
                  </li>
                ))}
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

export default BlogPage;