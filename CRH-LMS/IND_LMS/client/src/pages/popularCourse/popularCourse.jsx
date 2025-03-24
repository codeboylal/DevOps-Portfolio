import React from "react";
import CourseCard from "../../components/container/courseCardReuseable/courseCard";
import course from "../../assets/courseImage.svg";
import lesson from "../../assets/lesson.svg";
import graph from "../../assets/graph.svg";
import rupee from "../../assets/rupee.svg";
import stars from "../../assets/stars.svg";
import watch from "../../assets/watch.svg";
import Button from "../../components/button/button";

const PopularCourses = () => {
  return (
    <>
     <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-[32px] px-[24px] sm:pt-[48px] sm:px-[48px]">
  {/* Title */}
  <div className="font-inter font-medium text-[28px] sm:text-[32px] leading-[100%] text-center sm:text-left w-full sm:w-[343px] h-auto">
    <span>Most Popular </span>
    <span className="font-bold text-[#FF702D]">Courses</span>
  </div>

  {/* Button */}
  <Button className="bg-[#FF702D] text-white font-inter font-medium text-[20px] sm:text-[24px] leading-[100%] tracking-[0] px-3 py-2 sm:px-4 sm:py-2 rounded-md w-auto h-auto">
    View All
  </Button>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-[24px] px-[48px] pb-[48px]">
        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
        >
          {/* Ratings & Price */}
          <div className="flex items-center justify-between">
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row  justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>

        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
        >
          {/* Ratings & Price */}
          <div className="flex items-center justify-between">
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>

        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
          badge="Free"
        >
          {/* Ratings & Price */}
          <div className="flex items-center justify-between">
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>

        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
        >
          {/* Ratings & Price */}
          <div className="flex items-center justify-between">
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>

        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
          badge="Free"
        >
          {/* Ratings & Price */}
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Ratings */}
            <div className="flex justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>

        <CourseCard
          image={course}
          title="PHP Advanced"
          description="Advance PHP Knowledge with JS to make smart web applications."
        >
          {/* Ratings & Price */}
          <div className="flex items-center justify-between">
            {/* Ratings */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
              <img
                src={stars}
                alt="Rating"
                className="w-[90px] h-4 object-contain"
              />
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                5.0
              </span>
              <span className="text-[#4B4B4B] font-[500] text-[14px] ml-1 mt-1">
                (120+)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              <img src={rupee} alt="Price" className="w-4 h-4 object-contain" />
              <span className="text-orange-500 font-bold text-lg">12.00</span>
            </div>
          </div>

          {/* Enroll Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3">
            Enroll Course
          </button>

          {/* Course Details */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-600 text-sm mt-3">
            <div className="flex  items-center gap-1">
              <img
                src={lesson}
                alt="Lessons"
                className="w-4 h-4 object-contain"
              />
              <span>13 Lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={graph} alt="Level" className="w-4 h-4 object-contain" />
              <span>22 Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={watch}
                alt="Duration"
                className="w-4 h-4 object-contain"
              />
              <span>40 minutes</span>
            </div>
          </div>
        </CourseCard>
      </div>
    </>
  );
};

export default PopularCourses;
