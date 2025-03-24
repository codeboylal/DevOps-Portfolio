import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {

  const base_url = import.meta.env.VITE_API;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    organizationName: "",
    languages: "",
    profilePicture: "",
    coverPhoto: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true); // State to track profile check

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(`${base_url}/profile/check-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.exists) {
          localStorage.setItem("profileId", response.data.profileId);
          navigate("/profile"); // Redirect to profile page if it exists
        } else {
          setCheckingProfile(false); // Allow form rendering
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        setCheckingProfile(false);
      }
    };

    checkProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, [e.target.name]: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${base_url}/profile/create-profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("profileId", response.data.profile._id);
      setSuccess(true);
      alert("Profile Created Successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingProfile) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">Checking profile...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create Profile</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Profile created successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Secondary Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            value={formData.languages}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <label className="block text-gray-600">Profile Picture:</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          <label className="block text-gray-600">Cover Photo:</label>
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
