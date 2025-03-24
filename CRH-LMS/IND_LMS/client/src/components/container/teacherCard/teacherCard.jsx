import React from "react";

const TeacherCard = ({ image, name, designation }) => {
  return (
    <div className="w-[316.49px] h-[469px] bg-[#FFEDE4] flex flex-col items-center p-4 rounded-2xl relative shadow-md">
      {/* Image */}
      <div className="w-full h-[330px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Name & Designation */}
      <h3 className="text-lg font-semibold text-gray-900 mt-3">{name}</h3>
      <p className="text-gray-600 text-sm">{designation}</p>
    </div>
  );
};

export default TeacherCard;
