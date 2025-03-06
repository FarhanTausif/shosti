"use client";
import React, { useState, useEffect } from "react";

export const MyResources = ({ email }) => {
  const [myResources, setMyResources] = useState([]);

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
      }
    };

    if (email) {
      fetchMyResources();
    } else {
      console.log("No email found");
    }
  }, [email]);

  // Delete Resource Function
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
          body: JSON.stringify({ mhpEmail: email }), // Ensure only the owner can delete
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMyResources(myResources.filter((resource) => resource._id !== id)); // Remove from UI
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
      <h2 className="text-2xl font-bold mb-4">My Uploaded Resources</h2>
      {myResources.length > 0 ? (
        <div className="space-y-4">
          {myResources.map((resource) => (
            <div key={resource._id} className="p-4 border rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{resource.title}</h3>
              {resource.type === "article" && resource.headline && (
                <p className="text-lg font-bold">{resource.headline}</p>
              )}
              <p className="text-sm text-gray-600">
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

              {/* Delete Button */}
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
        <p>No resources uploaded yet.</p>
      )}
    </div>
  );
};
