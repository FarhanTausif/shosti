"use client";
import React, { useState, useEffect } from "react";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  const [profileData, setProfileData] = useState({
    username: "",
    bmdcRegNo: "",
    email: "",
    mobileNumber: "",
    location: "",
    education: "",
    rosterOnline: {},
    rosterOffline: {}
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await fetchProfileData(userName);
        setProfileData({
          ...data,
          rosterOnline: data.rosterOnline || {},
          rosterOffline: data.rosterOffline || {}
        });
        // setProfileData(data);
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

  const handleDayToggle = (rosterType, day, isChecked) => {
    setProfileData(prev => {
      const roster = { ...prev[rosterType] };
      if (isChecked) {
        // Add day with an empty default value if not present
        roster[day] = roster[day] || "";
      } else {
        delete roster[day];
      }
      return { ...prev, [rosterType]: roster };
    });
  };

  const handleTimeChange = (rosterType, day, value) => {
    setProfileData(prev => ({
      ...prev,
      [rosterType]: { ...prev[rosterType], [day]: value }
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateProfileData(userName, profileData);
      setProfileData({
        ...updatedData.mhp,
        rosterOnline: updatedData.mhp.rosterOnline || {},
        rosterOffline: updatedData.mhp.rosterOffline || {}
      });
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
          {/* Editable basic profile fields */}
          <div className="grid grid-cols-1 gap-4">
            <input 
              type="text" 
              name="mobileNumber" 
              value={profileData.mobileNumber} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg focus:ring-2 focus:ring-indigo-200" 
              placeholder="Mobile Number" 
            />
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
              name="education" 
              value={profileData.education} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200/60 rounded-lg" 
              placeholder="Educational Qualification" 
            />
          </div>

          {/* Online Availability */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Online Availability</h4>
            {days.map(day => (
              <div key={day} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  // checked={!!profileData.rosterOnline[day]}
                  onChange={(e) => handleDayToggle('rosterOnline', day, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="w-24">{day}</span>
                {profileData.rosterOnline[day] !== undefined && (
                  <input
                    type="text"
                    value={profileData.rosterOnline[day]}
                    onChange={(e) => handleTimeChange('rosterOnline', day, e.target.value)}
                    placeholder="e.g. 9 AM - 5 PM"
                    className="flex-1 px-4 py-2.5 border border-slate-200/60 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Offline Availability */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800">Offline Availability</h4>
            {days.map(day => (
              <div key={day} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  //  checked={!!profileData.rosterOffline[day]}
                  onChange={(e) => handleDayToggle('rosterOffline', day, e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="w-24">{day}</span>
                {profileData.rosterOffline[day] !== undefined && (
                  <input
                    type="text"
                    value={profileData.rosterOffline[day]}
                    onChange={(e) => handleTimeChange('rosterOffline', day, e.target.value)}
                    placeholder="e.g. 9 AM - 5 PM"
                    className="flex-1 px-4 py-2.5 border border-slate-200/60 rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>

          <button onClick={handleSave} className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-lg font-medium hover:from-indigo-700 transition-all">
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Read-only profile display */}
          <div className="space-y-4">
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>BMDC Reg No:</strong> {profileData.bmdcRegNo}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Mobile Number:</strong> {profileData.mobileNumber}</p>
            <p><strong>Location:</strong> {profileData.location}</p>
            <p><strong>Educational Qualification:</strong> {profileData.education}</p>
          </div>
          <div>
            <strong>Online Availability:</strong>
            {Object.entries(profileData.rosterOnline || {}).length > 0 ? (
              Object.entries(profileData.rosterOnline).map(([day, time]) => (
                <div key={day} className="ml-4">
                  {day}: {time}
                </div>
              ))
            ) : (
              <div className="ml-4">Not Available</div>
            )}
          </div>
          <div>
            <strong>Offline Availability:</strong>
            {Object.entries(profileData.rosterOffline || {}).length > 0 ? (
              Object.entries(profileData.rosterOffline).map(([day, time]) => (
                <div key={day} className="ml-4">
                  {day}: {time}
                </div>
              ))
            ) : (
              <div className="ml-4">Not Available</div>
            )}
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
