import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

export default function EducationEditModal({ isOpen, onClose, refreshEducation, initialData }) {
  const { request, loading } = useApi();

  const [formData, setFormData] = useState({
    educationLevel: "",
    university: "",
    courseName: "",
    specialization: "",
    courseType: "Full time",
    startYear: "",
    endYear: "",
    marks: "",
    isPrimaryEducation: false,  // Corrected key name
  });

  // When editing, update formData with initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        educationLevel: initialData.educationLevel || "",
        university: initialData.university || "",
        courseName: initialData.courseName || "",
        specialization: initialData.specialization || "",
        courseType: initialData.courseType || "Full time",
        startYear: initialData.startYear || "",
        endYear: initialData.endYear || "",
        marks: initialData.marks || "",
        isPrimaryEducation: initialData.isPrimaryEducation || false, // Ensure Boolean
      });
    }
  }, [initialData]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (initialData) {
        // If editing, send a PUT request
        await request("PUT", `/education/update/${initialData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Education updated successfully!");
      } else {
        // If adding new, send a POST request
        await request("POST", "/education/add", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Education added successfully!");
      }

      onClose();
      refreshEducation(); // Refresh list
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-1/2 shadow-lg">
        <h2 className="text-xl font-bold text-[#FF702D] mb-4">Education</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select education</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
            <input
              type="text"
              name="university"
              placeholder="University Name"
              value={formData.university}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              name="courseName"
              placeholder="Course name"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <p className="font-semibold mb-2">Course type</p>
          <div className="flex items-center gap-4 mb-4">
            {["Full time", "Part time", "Distance learning"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="courseType"
                  value={type}
                  checked={formData.courseType === type}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>

          <p className="font-semibold mb-2">Start & End Year</p>
          <div className="flex gap-3 mb-3">
            <select name="startYear" value={formData.startYear} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Start Year</option>
              {Array.from({ length: 30 }, (_, i) => 2000 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span>To</span>
            <select name="endYear" value={formData.endYear} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">End Year</option>
              {Array.from({ length: 30 }, (_, i) => 2000 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="marks"
            placeholder="Marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-3"
          />

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              name="isPrimaryEducation"
              checked={formData.isPrimaryEducation}
              onChange={handleChange}
            />
            <p>Make this my primary Education</p>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border-2 rounded-lg border-gray-500 mr-2">
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`px-4 py-2 rounded-lg bg-[#FF702D] text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
