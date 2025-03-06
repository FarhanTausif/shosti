"use client";
import React, { useState, useEffect } from "react";

export const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("");

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
    const fetchResources = async () => {
      try {
        const url = filter
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/resources?category=${encodeURIComponent(filter)}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/resources`;
        const response = await fetch(url);
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources", error);
      }
    };
    fetchResources();
  }, [filter]);
  const handleDelete = async (id) => {
    console.log("id from client: ",id);
    const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resources/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mhpEmail: "mh@gmail.com" }), // Ensure only the owner can delete
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setResources(resources.filter((resource) => resource._id !== id)); // Remove from UI
      } else {
        alert(result.message || "Failed to delete resource.");
      }
    } catch (error) {
      console.error("Error deleting resource", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Uploaded Resources</h1>
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {resources.length ? (
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="p-4 border rounded-md shadow-sm"
            >
              <h2 className="text-xl font-semibold">{resource.title}</h2>
              {resource.type === "article" && resource.headline && (
                <p className="text-lg font-bold">{resource.headline}</p>
              )}
              {resource.mhpName && (
                <p className="text-sm text-gray-600">
                  Added by: {resource.mhpName}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Categories: {resource.categories.join(", ")}
              </p>
              {resource.type === "article" ? (
                <p className="mt-2">{resource.content}</p>
              ) : resource.type === "video" ? (
                <>
                  <p className="mt-2">{resource.content}</p>
                  <video controls className="mt-2 w-full" src={resource.mediaUrl} />
                </>
              ) : null}
              <button
                onClick={() => handleDelete(resource._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No resources available at the moment.</p>
      )}
    </div>
  );
};


