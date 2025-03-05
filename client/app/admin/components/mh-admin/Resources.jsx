"use client";
import React, { useState } from "react";

export const Resources = ({ userName }) => {
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState(""); // For articles
  const [type, setType] = useState("article"); // "article" or "video"
  const [content, setContent] = useState(""); // For article content
  const [videoDescription, setVideoDescription] = useState(""); // For video description
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let mediaUrl = "";
      if (type === "video" && video) {
        // Request secure upload signature for video
        const sigResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sign-upload`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ folder: "Videos" }),
          }
        );
        const { timestamp, signature, api_key } = await sigResponse.json();

        const formData = new FormData();
        formData.append("file", video);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("folder", "Videos");

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
        const cloudRes = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
        const cloudData = await cloudRes.json();
        mediaUrl = cloudData.secure_url;
      }

      const resourceData = {
        title,
        userName, // MHP's name from admin prop
        headline: type === "article" ? headline : "",
        type,
        content: type === "video" ? videoDescription : content,
        mediaUrl: type === "video" ? mediaUrl : "",
        categories: JSON.stringify(categories),
      };

      const resourceRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/resources`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData),
        }
      );

      if (resourceRes.ok) {
        setMessage("Resource added successfully!");
        setTitle("");
        setHeadline("");
        setContent("");
        setVideoDescription("");
        setVideo(null);
        setCategories([]);
      } else {
        setMessage("Failed to add resource.");
      }
    } catch (error) {
      console.error("Error adding resource", error);
      setMessage("Failed to add resource.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Type:</label>
          <select
            className="border rounded px-2 py-1 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="article">Article</option>
            <option value="video">Video</option>
          </select>
        </div>
        {type === "article" && (
          <>
            <div>
              <label className="block font-medium">Headline:</label>
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Content:</label>
              <textarea
                className="border rounded px-2 py-1 w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {type === "video" && (
          <>
            <div>
              <label className="block font-medium">Video Description:</label>
              <textarea
                className="border rounded px-2 py-1 w-full"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Upload Video:</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                required
              />
            </div>
          </>
        )}
        <div>
          <label className="block font-medium">Categories:</label>
          <div className="flex space-x-4 flex-wrap">
            {availableCategories.map((cat) => (
              <label key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  value={cat}
                  checked={categories.includes(cat)}
                  onChange={handleCategoryChange}
                />
                <span className="ml-2">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Resource"}
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};



