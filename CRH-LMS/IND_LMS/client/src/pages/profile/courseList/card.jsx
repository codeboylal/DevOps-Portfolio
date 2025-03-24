import { useState } from "react";
import { useNavigate } from "react-router-dom";
import redirect from "../img/redirect.svg";

const CourseSmallCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-orange-50 transition-all duration-200 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image */}
      <img src={course.image} alt={course.title} className="w-12 h-12 rounded-md" />

      {/* Course Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-semibold">{course.title}</h3>
        <p className="text-xs text-gray-600">{course.organization}</p>
        <p
          className={`text-xs font-semibold ${
            course.status === "Active"
              ? "text-blue-500"
              : course.status === "Completed"
              ? "text-green-500"
              : "text-orange-500"
          }`}
        >
          {course.status}
        </p>
      </div>

      {/* Redirect Button (Visible Only on Hover) */}
      {isHovered && (
        <img
          src={redirect}
          alt="Go to Course"
          className="w-[16px] h-[16px] cursor-pointer absolute right-4"
          onClick={() => navigate(`/course/${course.id}`)}
        />
      )}
    </div>
  );
};

export default CourseSmallCard;
