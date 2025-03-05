// components/dashboard/resources/AttendeeResources.jsx
"use client";
import React, { useEffect, useState } from "react";

export const AttendeeResources = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("");

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
      <h1 className="text-2xl font-bold mb-4">Resource Library</h1>
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Category:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="stress management">Stress Management</option>
          <option value="anxiety">Anxiety</option>
          <option value="meditation">Meditation</option>
        </select>
      </div>
      {resources.length ? (
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource._id} className="p-4 border rounded-md shadow-sm">
              <h2 className="text-xl font-semibold">{resource.title}</h2>
              <p className="text-sm text-gray-500">
                Categories: {resource.categories.join(", ")}
              </p>
              {resource.type === "article" ? (
                <p className="mt-2">{resource.content}</p>
              ) : resource.type === "video" ? (
                <video controls className="mt-2 w-full" src={resource.mediaUrl} />
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

// export default AttendeeResources;
