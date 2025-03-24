import React, { useState } from "react";
import TeacherCard from "../../components/container/teacherCard/teacherCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import teacher from "../../assets/teachers/teacher1.svg"

// Dummy Data
const teachers = [
  {
    id: 1,
    image: teacher,
    name: "Chris Watson",
    designation: "Python teacher",
  },
  {
    id: 2,
    image: teacher,
    name: "Chris Watson",
    designation: "Python teacher",
  },
  {
    id: 3,
    image: teacher,
    name: "Chris Watson",
    designation: "Python teacher",
  },
  {
    id: 4,
    image: teacher,
    name: "Chris Watson",
    designation: "Python teacher",
  },
];

const TeachersSection = () => {
  const [index, setIndex] = useState(0);

  // Handle Next
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % teachers.length);
  };

  // Handle Previous
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? teachers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full mt-10 mb-10 px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Our best talented <span className="text-orange-500">Teachers</span>
      </h2>

      {/* Slider Container */}
      <div className="overflow-hidden w-full flex justify-center">
        <div
          className="flex flex-col md:flex-row transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} {...teacher} />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-0 right-5 flex gap-2">
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={prevSlide}
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={nextSlide}
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TeachersSection;
