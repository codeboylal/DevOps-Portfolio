import { useState } from "react";
import courseCardImage from "../img/courseCardImage.svg"
import CourseSmallCard from "./card.jsx";

const courses = [
  {
    id: 1,
    title: "Figma Advance",
    organization: "CodroidHub Pvt. Ltd.",
    image: courseCardImage,
    status: "Active",
  },
  {
    id: 2,
    title: "Figma Advance",
    organization: "CodroidHub Pvt. Ltd.",
    image: courseCardImage,
    status: "Completed",
  },
  {
    id: 3,
    title: "Figma Advance",
    organization: "CodroidHub Pvt. Ltd.",
    image: courseCardImage,
    status: "Not Started",
  },
  {
    id: 4,
    title: "Figma Advance",
    organization: "CodroidHub Pvt. Ltd.",
    image: courseCardImage,
    status: "Active",
  },
  {
    id: 5,
    title: "Figma Advance",
    organization: "CodroidHub Pvt. Ltd.",
    image: courseCardImage,
    status: "Completed",
  },
];

const CoursesList = () => {

  const [activeTab, setActiveTab] = useState("All");

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.status === activeTab);

  return (
    <div className="p-4 bg-white shadow-md w-full h-full rounded-[24px]">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="mt-4 space-y-2">
        {filteredCourses.map((course) => (
          <CourseSmallCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
