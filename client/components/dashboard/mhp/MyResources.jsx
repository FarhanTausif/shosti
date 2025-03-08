"use client";
import React, { useState, useEffect, useRef } from "react";

export const MyResources = ({ email }) => {
  const [myResources, setMyResources] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  const availableCategories = [
    "Stress Management",
    "Anxiety",
    "Depression",
    "Mindfulness Exercises and Meditation",
    "Bipolar Disorder",
    "Generalized Anxiety Disorder",
    "Social Anxiety Disorder",
    "Panic Disorder",
    "Post-Traumatic Stress Disorder (PTSD)",
    "Obsessive-Compulsive Disorder (OCD)",
    "Attention-Deficit/Hyperactivity Disorder (ADHD)",
    "Sleep Disorders",
    "Anger Management",
    "Workplace Mental Health"
  ];

  useEffect(() => {
    const fetchMyResources = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/resources/mr/?mhpEmail=${email}`
        );
        const data = await response.json();
        setMyResources(data);
      } catch (error) {
        console.error("Error fetching resources", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchMyResources();
  }, [email]);

  const filteredResources = myResources.filter(resource => {
    const typeMatch = selectedType === "all" || resource.type === selectedType;
    const categoryMatch = !categoryFilter || resource.categories.includes(categoryFilter);
    return typeMatch && categoryMatch;
  });

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resources/${resourceToDelete}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mhpEmail: email }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMyResources(myResources.filter((resource) => resource._id !== resourceToDelete));
      }
    } catch (error) {
      console.error("Error deleting resource", error);
    } finally {
      setShowDeleteModal(false);
      setResourceToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-50 sticky top-0">
              <h2 className="text-2xl font-bold text-indigo-600 pr-4">
                {selectedArticle.title}
              </h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-500 hover:text-gray-700 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto" ref={contentRef}>
              <div className="space-y-6">
                {selectedArticle.headline && (
                  <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-4">
                    {selectedArticle.headline}
                  </h3>
                )}
                <div className="prose max-w-none text-gray-700 space-y-4">
                  {selectedArticle.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-justify leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md flex flex-col shadow-xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-red-50">
              <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">Are you sure you want to delete this resource? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  Delete Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">
          My Uploaded Resources
        </h1>
        <p className="text-gray-600">Manage your shared mental health resources</p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full">
            {["all", "article", "video"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {type === 'all' ? 'All Resources' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </button>
            ))}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-64 px-4 py-3 rounded-xl border-2 border-indigo-100 bg-indigo-50 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 transition-all outline-none appearance-none text-gray-700 font-medium cursor-pointer bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0ZjQ2ZTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNiA5bDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25em] hover:bg-indigo-100"
          >
            <option value="" className="text-gray-400 bg-white">
              All Categories
            </option>
            {availableCategories.map((cat) => (
              <option 
                key={cat} 
                value={cat}
                className="bg-white text-gray-700 hover:bg-indigo-50 py-2"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {resource.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'video' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-teal-100 text-teal-800'
                  }`}>
                    {resource.type.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {resource.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {resource.type === "article" ? (
                  <div className="space-y-4">
                    {resource.headline && (
                      <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-indigo-500 pl-4">
                        {resource.headline}
                      </h3>
                    )}
                    <p className="text-gray-600 line-clamp-4 text-sm">
                      {resource.content}
                    </p>
                    {resource.content.length > 300 && (
                      <button
                        onClick={() => setSelectedArticle(resource)}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        Read Full Article →
                      </button>
                    )}
                  </div>
                ) : (
                  // <div className="space-y-4">
                  //   <p className="text-gray-600 line-clamp-2 text-sm">
                  //     {resource.content}
                  //   </p>
                  //   <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  //     <video 
                  //       controls 
                  //       className="w-full h-full object-cover"
                  //       src={resource.mediaUrl}
                  //     />
                  //   </div>
                  // </div>
                  <div className="mb-4">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <video 
                        controls 
                        className="w-full h-full object-cover"
                        src={resource.mediaUrl}
                      />
                    </div>
                    {resource.content && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Video Description:
                        </p>
                        <p className="text-gray-600 line-clamp-2 text-sm">
                          {resource.content}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setResourceToDelete(resource._id);
                      setShowDeleteModal(true);
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">No resources found matching your criteria</p>
        </div>
      )}
    </div>
  );
};