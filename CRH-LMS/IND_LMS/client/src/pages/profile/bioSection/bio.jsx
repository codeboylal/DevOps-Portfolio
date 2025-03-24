import React, { useState, useEffect } from "react";
import axios from "axios";
import CollapsibleCard from "../collapseComponent/collapsibleCard";
import BioEditModal from "../../../components/modals/bioModal";
import pencil from "../img/pencil.svg";

const Bio = () => {
  const [bio, setBio] = useState("");
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(""); // Stores bio temporarily for the modal

  const token = localStorage.getItem("token");
  const base_url = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await axios.get(`${base_url}/bio/get-bio`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedBio = response.data.bio || "No bio available";
        console.log(response.data.bio);
        setBio(fetchedBio);
        setTempBio(fetchedBio); // Ensure modal opens with current bio
      } catch (error) {
        console.error("Error fetching bio:", error);
        setBio("No bio available");
      }
    };

    fetchBio();
  }, [token]);

  const updateBio = async (newBio) => {
    try {
      const response = await axios.put(
        `${base_url}/bio/update-bio`,
        { bio: newBio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBio(response.data.bio);
      setTempBio(response.data.bio); // Update modal preview
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <>
      <CollapsibleCard
        title="Bio"
        icon={pencil}
        className="mx-3 my-4 w-full px-4 sm:px-6 py-3 rounded-lg border border-gray-200 shadow-md transition-all duration-300 hover:border-yellow-700 cursor-pointer"
        onClick={() => {
          setTempBio(bio); // Ensure the modal opens with the latest bio
          setIsBioModalOpen(true);
        }}
      >
        <p className="text-gray-700 text-sm sm:text-base break-words">{bio}</p>
      </CollapsibleCard>

      <BioEditModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        initialBio={tempBio}
        onSave={updateBio}
      />
    </>
  );
};

export default Bio;
