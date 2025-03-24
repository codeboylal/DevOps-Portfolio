import { useState, useEffect } from "react";
import axios from "axios";
import cross from "../../pages/profile/img/cross.svg";

export default function ProfileEditModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    languages: [],
    newLanguage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");

      if (!profileId || !token) {
        console.error("Profile ID or token missing");
        return;
      }

      const response = await axios.get(`http://localhost:8089/api/profile/get-profile/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = response.data;
      console.log("Fetched Profile Data:", profileData);

      setFormData({
        name: profileData.fullName || "", // Ensure `name` is properly set
        email: profileData.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        languages: profileData.languages || [],
        newLanguage: "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing field:", name, "Value:", value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageInputKeyDown = (e) => {
    if (e.key === "Enter" && formData.newLanguage.trim() !== "") {
      if (!formData.languages.includes(formData.newLanguage.trim())) {
        setFormData((prev) => ({
          ...prev,
          languages: [...prev.languages, formData.newLanguage.trim()],
          newLanguage: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, newLanguage: "" }));
      }
      e.preventDefault();
    }
  };

  const handleLanguageSelect = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const removeLanguage = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");

      if (!profileId || !token) {
        setError("Profile ID or token is missing.");
        return;
      }

      console.log("Submitting Data:", formData);

      const response = await axios.put(
        `http://localhost:8089/api/profile/update-profile/${profileId}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          languages: formData.languages,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Profile Update Response:", response);

      setSuccess(true);
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-[32px] rounded-[24px] w-1/2 shadow-lg">
        <h2 className="text-xl font-bold text-[#FF702D] mb-4">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Profile updated successfully!</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full font-normal p-2 mb-3 border rounded-[8px]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />

          <div className="mb-3">
            <p className="mb-2">Languages</p>
            <input
              type="text"
              name="newLanguage"
              placeholder="Add Language (Press Enter)"
              value={formData.newLanguage}
              onChange={handleChange}
              onKeyDown={handleLanguageInputKeyDown}
              className="w-full font-normal p-2 mb-3 border rounded-[8px]"
            />

            <div className="flex flex-wrap gap-2">
              {formData.languages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center px-3 py-1 bg-[#FFE7DC] text-[#FF702D] rounded-[8px]"
                >
                  <span>{lang}</span>
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <img src={cross} alt="cross icon" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-2">
              {["English", "Hindi", "French"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`px-3 py-1 rounded border mr-2 ${
                    formData.languages.includes(lang)
                      ? "bg-red-500 text-white"
                      : "bg-[#FFE7DC] text-[#FF702D]"
                  }`}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  {lang}
                </button>
              ))}
              <span className="opacity-40">(Select from languages)</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 border-2 border-[#4B4B4B] font-normal rounded-[8px] bg-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#FF702D] text-white rounded-[8px]"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
