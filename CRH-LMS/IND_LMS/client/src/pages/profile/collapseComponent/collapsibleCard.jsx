import React, { useState } from "react";
import arrow from "../img/arrow.svg"

const CollapsibleCard = ({ onClick, classname, icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-white shadow-md rounded-xl w-full p-4 border border-gray-200 transition-all duration-300 ${classname}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-orange-500 font-semibold text-sm sm:text-base md:text-lg">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={onClick} className="text-orange-500">
            <img src={icon} alt="icon" classname="w-[20px] h-[20px]" />
          </button>
          <button
            className="text-gray-400 text-sm sm:text-base"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <img className="w-[12px] h-[20px]" src={arrow} alt="arrow" /> :<img className="rotate-180 w-[12px] h-[20px]" src={arrow} alt="arrow" /> }
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-2 text-gray-600 text-xs sm:text-sm md:text-base break-words">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleCard;
