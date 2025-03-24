const CategoryCard = ({ icon, title, courseCount, bgColor }) => {
  return (
    <div className={`flex flex-row items-center p-6 gap-3 rounded-[20px] ${bgColor} 
        w-full min-h-[120px] lg:w-[432px] lg:h-[161px] hover:scale-105 cursor-pointer hover:border-2 border-blue-500 transition-transform duration-200`}>
      
      {/* Icon */}
      <div className="w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full p-3 cursor-pointer">
        <img className="w-[40px] h-[40px] object-contain" src={icon} alt={title} />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{courseCount} Courses</p>
      </div>
      
    </div>
  );
};

export default CategoryCard;
