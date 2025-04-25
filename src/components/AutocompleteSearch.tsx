
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface AutocompleteSearchProps {
  doctors: Array<{ id: string; name: string }>;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const AutocompleteSearch = ({
  doctors,
  onSearch,
  searchTerm,
  setSearchTerm,
}: AutocompleteSearchProps) => {
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter suggestions based on searchTerm
    if (searchTerm.trim() !== "") {
      const filteredSuggestions = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3); // Show only top 3 matches
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, doctors]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSuggestions(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };
  
  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.trim() !== "" && setSuggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue"
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-medical-blue"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
      
      {showSuggestions && (
        <div className="absolute z-10 w-full bg-white mt-1 border rounded-md shadow-lg">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              <div className="ml-2">{doctor.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
