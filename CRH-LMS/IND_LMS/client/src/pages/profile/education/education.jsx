import React, { useState, useEffect } from "react";
import CollapsibleCard from "../collapseComponent/collapsibleCard";
import plus from "../img/plus.svg";
import pencil from "../img/pencil.svg";
import trash from "../img/trash.svg";
import EducationEditModal from "../../../components/modals/educationModal";
import DeleteConfirmationModal from "../../../components/modals/deleteModal";
import useApi from "../../../hooks/useApi";

const Education = () => {
  const { request, loading, error } = useApi();
  const [educationData, setEducationData] = useState([]);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  // Fetch Education Data
  const fetchEducation = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await request("GET", "/education/get", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducationData(data);
      const college = localStorage.setItem("college",data[0].university);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await request("DELETE", `/education/delete/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsDeleteModalOpen(false);
      fetchEducation();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <div className="flex gap-4 flex-col w-full">
      <CollapsibleCard
        title="Education"
        icon={plus}
        className="mx-3 my-4 hover:border hover:border-yellow-700 cursor-pointer"
        onClick={() => {
          setSelectedEducation(null);
          setIsEducationModalOpen(true);
        }}
      >
        {loading ? (
          <p className="text-gray-500 text-sm text-center py-2">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm text-center py-2">{error}</p>
        ) : educationData.length > 0 ? (
          educationData.map((item) => (
            <div
              key={item._id}
              className="p-4 rounded-lg border border-gray-200 hover:bg-orange-50 transition-all duration-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.educationLevel}</h3>
                <p className="text-gray-600">{item.university}</p>
                <p className="text-gray-400 text-sm">
                  {item.startYear} - {item.endYear} | {item.courseType}
                </p>
              </div>

              {/* Edit and Delete Buttons */}
              <div className="flex space-x-3 text-orange-500">
                <button
                  onClick={() => {
                    setSelectedEducation(item);
                    setIsEducationModalOpen(true);
                  }}
                >
                  <img src={pencil} alt="Edit" />
                </button>
                <button
                  onClick={() => {
                    setSelectedEducation(item);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-2">
            Please add education details.
          </p>
        )}
      </CollapsibleCard>

      {/* Modals */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(selectedEducation?._id)}
      />

      <EducationEditModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        educationData={selectedEducation}
        refreshEducation={fetchEducation}
        initialData={selectedEducation}
      />
    </div>
  );
};

export default Education;
