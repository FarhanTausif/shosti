"use client";
import React, { useState, useEffect } from "react";

const fetchProfileData = async (userName) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/${userName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) throw new Error("Error fetching profile data");
  return await response.json();
};

const updateProfileData = async (userName, profileData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mhps/${userName}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData)
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return await response.json();
};

const MHPProfile = ({ userName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData(userName);
        setProfileData(data);
      } catch (err) {
        setError("Error loading profile data");
      }
    };
    if (userName) loadProfileData();
  }, [userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateProfileData(userName, profileData);
      setProfileData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError("Error saving profile data");
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">MHP Profile</h3>
      {isEditing ? (
        <div className="space-y-5">
          <input type="text" name="mobileNumber" value={profileData.mobileNumber} onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200" placeholder="Mobile Number" />
          <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg"
              placeholder="Location"
            />
            <input
              type="text"
              name="rosterOnline"
              value={profileData.rosterOnline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg"
              placeholder="Roster (Online)"
            />
            <input
              type="text"
              name="rosterOffline"
              value={profileData.rosterOffline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg"
              placeholder="Roster (Offline)"
            />
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg"
              placeholder="Educational Qualification"
            />
          <button onClick={handleSave} className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 transition-all">
            Save
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>BMDC Reg No:</strong> {profileData.bmdcRegNo}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Mobile Number:</strong> {profileData.mobileNumber}</p>
            <p><strong>Location:</strong> {profileData.location}</p>
            <p><strong>Roster (Online):</strong> {profileData.rosterOnline}</p>
            <p><strong>Roster (Offline):</strong> {profileData.rosterOffline}</p>
            <p><strong>Educational Qualification:</strong> {profileData.education}</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 transition-all">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MHPProfile;