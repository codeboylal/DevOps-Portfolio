import React from "react";

const CourseCard = ({ image, title, description, badge, price, children }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-[435px] py-4 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-44 bg-gray-200 rounded-tl-lg rounded-tr-lg  overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {badge && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="mt-4 flex-1 px-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Custom Children (Ratings, Price, Button, Course Info) */}
      <div className="mt-4 px-3">{children}</div>
    </div>
  );
};

export default CourseCard;
