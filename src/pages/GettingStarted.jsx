import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "lucide-react";

const fields = [
  {
    id: 1,
    name: "Software Engineer/Developer",
    icon: "💻",
    description: "For those who primarily build applications and write code",
    color: "bg-indigo-500"
  },
  {
    id: 2,
    name: "Designer",
    icon: "🎨",
    description: "For UX/UI designers, visual designers, and creatives",
    color: "bg-pink-500"
  },
  {
    id: 3,
    name: "Both",
    icon: "⚡",
    description: "For full-stack designers and creative developers",
    color: "bg-purple-500"
  },
];

export default function GettingStarted() {
  const [selected, setSelected] = useState(fields[1]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFields = searchQuery === "" 
    ? fields 
    : fields.filter(field => 
        field.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelect = (field) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelected(field);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Progress indicator */}
      <div className="pt-8 px-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between w-full mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">1</div>
            <div className="ml-2 text-sm font-medium">Choose Field</div>
          </div>
          <div className="h-1 flex-1 mx-4 bg-gray-700">
            <div className="h-full w-1/3 bg-purple-500 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">2</div>
            <div className="ml-2 text-sm font-medium text-gray-400">Details</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            What's your specialty?
          </h1>
          <p className="text-gray-300 text-lg max-w-lg mx-auto">
            Let us know your field so we can personalize your experience and recommend the right resources.
          </p>
        </div>

        {/* Search filter */}
        <div className="mb-8 relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search fields..."
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-3 text-gray-400">
            🔍
          </div>
        </div>

        {/* Field options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {filteredFields.map((field) => (
            <div
              key={field.id}
              onClick={() => handleSelect(field)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                selected.id === field.id
                  ? "border-purple-500 bg-gray-800"
                  : "border-gray-700 bg-gray-800/50 hover:bg-gray-800"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-full ${field.color} flex items-center justify-center text-2xl`}>
                  {field.icon}
                </div>
                {selected.id === field.id && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <CheckIcon size={16} />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-medium mb-2">{field.name}</h3>
              <p className="text-sm text-gray-400">{field.description}</p>
            </div>
          ))}
        </div>

        {filteredFields.length === 0 && (
          <div className="text-center py-8 bg-gray-800/30 rounded-lg">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-400">No fields match your search. Try a different keyword.</p>
          </div>
        )}

        {/* Continue button with animation */}
        <div className="text-center mt-12">
          <Link to="/form">
            <button
              className={`relative overflow-hidden px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 ${
                isAnimating
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              <span className="relative z-10">Continue</span>
              <span className={`absolute inset-0 bg-purple-500 transform transition-transform duration-300 ${
                isAnimating ? "scale-x-100" : "scale-x-0 origin-left"
              }`}></span>
            </button>
          </Link>
          <p className="text-gray-400 text-sm mt-4">You can always change this later in your profile settings</p>
        </div>
      </div>
    </div>
  );
}