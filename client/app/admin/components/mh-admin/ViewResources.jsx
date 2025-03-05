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
            </div>
          ))}
        </div>
      ) : (
        <p>No resources available at the moment.</p>
      )}
    </div>
  );
};


