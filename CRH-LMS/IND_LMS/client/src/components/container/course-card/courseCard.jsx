import React from "react";
import courseCardImage from "../../../assets/courseCardImage.svg"

const CourseCard = ({ image, title, description, progress, totalLessons }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-auto">
      {/* Course Image */}
      <div className="relative">
        <img src={courseCardImage} alt={title} className="w-full h-40 object-cover" />
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(progress / totalLessons) * 100}%` }}
            ></div>
          </div>
          <p className="text-right text-gray-500 text-xs mt-1">
            {progress}/{totalLessons} Lessons
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
