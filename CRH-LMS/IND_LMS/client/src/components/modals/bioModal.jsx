import { useState, useEffect } from "react";
import axios from "axios";

export default function BioEditModal({ isOpen, onClose, initialBio, onSave }) {
  const [bio, setBio] = useState(initialBio || "");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const base_url = import.meta.env.VITE_API;

  useEffect(() => {
    setBio(initialBio); // Update bio when modal opens
  }, [initialBio]);

  const handleSave = async () => {
    if (bio.trim() === "" || bio === initialBio) return; // Prevent empty or unchanged bio updates

    setLoading(true);
    try {
      const response = await axios.put(
        `${base_url}/bio/update-bio`,
        { bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.bio)
      onSave(response.data.bio); // Update parent state
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating bio:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-[32px] m-[10px] rounded-[24px] lg:w-[688px] lg:h-[361px] shadow-lg">
        <h2 className="text-lg font-bold text-[#FF702D] pb-5">Edit Bio</h2>
        <textarea
          className="w-full lg:w-[624px] lg:h-[191px] h-32 resize-none p-2 border-2 border-[#BDBDBD] text-[#767676] font-normal rounded-[8px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 border-gray-500 font-light text-[#4B4B4B] rounded-[8px] bg-transparent mr-2"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-[8px] font-light text-white transition ${
              bio === initialBio || bio.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FF702D] hover:bg-[#e65b1f]"
            }`}
            disabled={bio === initialBio || bio.trim() === ""}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
