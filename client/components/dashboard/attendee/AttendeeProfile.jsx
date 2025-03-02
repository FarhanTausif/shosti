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

const ProfileRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-4 px-2 hover:bg-slate-50/50 rounded-lg transition-colors">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-slate-900 font-medium">{value || '-'}</span>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="p-8 rounded-2xl border border-slate-200/60
                      bg-white/80 backdrop-blur-lg
                      hover:border-indigo-200/80 hover:shadow-2xl
                      transition-all duration-300 hover:-translate-y-2
                      shadow-xl shadow-indigo-100/20">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-8">
          Attendee Profile
        </h3>
        {isEditing ? (
          <div className="space-y-6">
            {/* Read-only fields */}
            <div className="space-y-4">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/40">
                <label className="text-sm font-medium text-slate-500">Username</label>
                <p className="mt-1 text-slate-900 font-medium">{profileData.username}</p>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/40">
                <label className="text-sm font-medium text-slate-500">Email</label>
                <p className="mt-1 text-slate-900 font-medium">{profileData.email}</p>
              </div>
            </div>
  
            {/* Editable fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200/60 rounded-xl 
                            bg-white/70 focus:ring-2 focus:ring-indigo-200/80 
                            focus:border-indigo-300/50 transition-all outline-none
                            placeholder:text-slate-400/80"
                  placeholder="Enter your address"
                />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Contact Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileData.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200/60 rounded-xl 
                            bg-white/70 focus:ring-2 focus:ring-indigo-200/80 
                            focus:border-indigo-300/50 transition-all outline-none
                            placeholder:text-slate-400/80"
                  placeholder="Enter phone number"
                />
              </div>
  
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profileData.age || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200/60 rounded-xl 
                              bg-white/70 focus:ring-2 focus:ring-indigo-200/80 
                              focus:border-indigo-300/50 transition-all outline-none"
                  />
                </div>
  
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Sex</label>
                  <select
                    name="sex"
                    value={profileData.sex || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200/60 rounded-xl 
                              bg-white/70 focus:ring-2 focus:ring-indigo-200/80 
                              focus:border-indigo-300/50 transition-all outline-none"
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
  
            <button
              onClick={handleSave}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white 
                        rounded-lg font-semibold hover:from-indigo-700 hover:to-teal-600 
                        transition-all transform hover:scale-[1.02] shadow-md hover:shadow-indigo-200/40
                        active:scale-95 text-sm"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="divide-y divide-slate-200/60">
              <ProfileRow label="Username" value={profileData.username} />
              <ProfileRow label="Email" value={profileData.email} />
              <ProfileRow label="Address" value={profileData.address} />
              <ProfileRow label="Phone Number" value={profileData.phoneNumber} />
              <ProfileRow label="Age" value={profileData.age} />
              <ProfileRow label="Sex" value={profileData.sex} />
            </div>
  
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 px6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white 
                        rounded-lg font-semibold hover:from-indigo-700 hover:to-teal-600 
                        transition-all transform hover:scale-[1.02] shadow-md hover:shadow-indigo-200/40
                        active:scale-95 text-sm"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default AttendeeProfile;


