import { React, useState } from "react";
import styles from "./home.module.css";
import Navbar from "../navbar/Navbar";
import heroRight from "../../assets/heroRight.svg";
import InputField from "../../components/input/input";
import Button from "../../components/button/button";
import BrowseByCategory from "../browseByCategory/browseByCategory";
import StatsSection from "../cta/cta";
import Footer from "../footer/footer";
import PopularCourses from "../popularCourse/popularCourse";
import FeaturesSection from "../feature/feature";
import TeachersSection from "../teachers/teachers";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search functionality here
  };

  return (
    <>
      <div className="bg-white">
        <div className={styles.main}>
          <Navbar
            links={[
              { label: "Home", path: "/" },
              { label: "Courses", path: "/courses" },
              { label: "Dashboard", path: "/dashboard" },
              { label: "Contact", path: "/contact" },
            ]}
          />
        </div>

        <section className="max-h-[653px] flex flex-col-reverse lg:flex-row justify-around px-6 lg:px-[96px] items-center bg-[#FFEDE5] text-center lg:text-left">
          {/* Left Content */}
          <div className="max-w-[609px] flex flex-col gap-[13px] w-full">
            <h1 className="font-[400] text-[30px] lg:text-7xl font-maiden">
              Unlock Your Future <br className="hidden lg:block" /> with
              World-Class
            </h1>

            <h1 className="font-[400] text-[30px] lg:text-7xl font-maiden text-[#FF702D]">
              Online Learning
            </h1>

            <p className="font-[500] font-inter text-[16px] sm:text-[20px] lg:text-[26px]">
              Learn at Your Own Pace with Top Instructors!
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-[18px] w-full p-1 mx-auto lg:mx-0">
              <InputField
                type="text"
                placeholder="Search your courses..."
                className="flex-grow border-none outline-none px-4 py-2 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                className="bg-orange-500 text-white px-5 py-2 rounded-[15px] font-semibold text-sm"
              >
                SEARCH
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full flex justify-center lg:block">
            <img
              className="w-[300px] sm:w-[400px] lg:w-[623px] lg:h-[588px] lg:mt-[32px]"
              src={heroRight}
              alt="image"
            />
          </div>
        </section>

        <BrowseByCategory />
        <StatsSection/>
        <PopularCourses/>
        <FeaturesSection/>
        <TeachersSection/>
        <Footer/>
      </div>
    </>
  );
};

export default Home;
