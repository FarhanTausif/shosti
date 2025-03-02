// app/components/dashboard/attendee/AttendeeProfile.jsx
"use client";
import React, { useState, useEffect } from "react";

const fetchAttendeeProfile = async (userName) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attendees/${userName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error fetching profile data");
  return await response.json();
};

const updateAttendeeProfile = async (userName, profileData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attendees/${userName}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return await response.json();
};

const AttendeeProfile = ({ userName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchAttendeeProfile(userName);
        setProfileData(data);
      } catch (err) {
        setError("Error loading profile data");
      }
    };
    if (userName) loadProfile();
  }, [userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateAttendeeProfile(userName, profileData);
      setProfileData(updatedData.attendee);
      setIsEditing(false);
    } catch (err) {
      setError("Error saving profile data");
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Attendee Profile</h3>
      {isEditing ?(
        <div className="space-y-5">
          {/* Display username and email as read-only text */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Username:</label>
            <p className="mt-1 text-slate-900">{profileData.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email:</label>
            <p className="mt-1 text-slate-900">{profileData.email}</p>
          </div>
          <input
            type="text"
            name="address"
            value={profileData.address || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200"
            placeholder="Address"
          />
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200"
            placeholder="Phone Number"
          />
          <input
            type="number"
            name="age"
            value={profileData.age || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200"
            placeholder="Age"
          />
          <select
            name="sex"
            value={profileData.sex || ""}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={handleSave}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 transition-all"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Address:</strong> {profileData.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {profileData.phoneNumber}
            </p>
            <p>
              <strong>Age:</strong> {profileData.age}
            </p>
            <p>
              <strong>Sex:</strong> {profileData.sex}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 transition-all"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendeeProfile;


