import React from "react";

function OrangeCards({ title, number = 0 }) {
  return (
    <div className="w-full lg:h-[162px] max-h-[162px] bg-gradient-to-tr from-[#FF9D6F] to-[#FF702D] rounded-[24px] text-white relative p-4 flex flex-col justify-center transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      <label className="absolute top-2 left-4 text-base font-medium">
        {title}
      </label>
      <div className="flex items-center justify-center text-5xl font-bold mt-6">
        {number}
      </div>
    </div>
  );
}

export default OrangeCards;
