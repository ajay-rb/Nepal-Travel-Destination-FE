import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchDestinations from "../hooks/useFetchDestinations";
import Navbar from "../components/Navbar";

const Home = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const {
    data: destinations,
    loading,
    error,
  } = useFetchDestinations({ selectedTag });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (destinations?.length > 0 && allTags.length === 0) {
      const tags = [
        ...new Set(destinations?.flatMap((dest) => dest.tags.split(","))),
      ];
      setAllTags(tags);
    }
  }, [destinations]);

  const filterDestinations = (tag) => {
    setSelectedTag(tag === "all" ? "" : tag);
    setIsDropdownOpen(false);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <Navbar />

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex items-center justify-center mb-4">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen ? "true" : "false"}
            aria-haspopup="true"
          >
            {selectedTag ? `Selected Tag: ${selectedTag}` : "Filter by Tags"}
            <svg
              className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm font-medium text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    filterDestinations("all");
                  }}
                >
                  All
                </a>
                {allTags.map((tag) => (
                  <a
                    key={tag}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-500"
                    onClick={(e) => {
                      e.preventDefault();
                      filterDestinations(tag);
                    }}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {destinations?.map((destination) => (
          <div key={destination.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={destination?.image_url}
              alt={destination?.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{destination?.name}</h2>
            <Link
              to={`/destination/${destination?.id}`}
              className="text-blue-600 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
