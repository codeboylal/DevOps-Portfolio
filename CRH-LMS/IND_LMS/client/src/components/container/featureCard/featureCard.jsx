import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-[15.59px] max-w-[278.36px] max-h-[226.06px]">
      <img src={icon} alt={title} className="w-[93px] h-[93px] text-[#FF702D]" />
      <h3 className="text-[18px] font-semibold text-gray-900 text-center">{title}</h3>
      <p className="text-[14px] text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
