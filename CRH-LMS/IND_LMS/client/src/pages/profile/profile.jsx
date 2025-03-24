import React, { useState, useEffect } from "react";
import axios from "axios";
import PageSetup from "../../components/container/Page Setup/pageSetup";
import Pagination from "../../components/pagination/pagination";
import ProfileEditModal from "../../components/modals/editProfile";
import profileImagePlaceholder from "../profile/img/profileImage.png";
import backgroundImagePlaceholder from "../profile/img/background.png";
import { useNavigate } from "react-router-dom";
import Bio from "./bioSection/bio";
import email from "../../assets/profile/email.svg";
import number from "../../assets/profile/number.svg";
import org from "../../assets/profile/org.svg";
import courses from "../../assets/profile/courses.svg";
import location from "../../assets/profile/location.svg";
import lang from "../../assets/profile/lang.svg";
import Education from "./education/education";
import CoursesList from "./courseList/CoursesList";

const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const base_url = import.meta.env.VITE_API;

  const navigate = useNavigate();

  const profileId = localStorage.getItem("profileId");
  const college = localStorage.getItem("college")

  useEffect(() => {
    if (!profileId) {
      navigate("/");
    }

    const fetchProfile = async () => {
      if (!profileId) {
        console.error("No profile ID found in localStorage");
      }
      try {
        const response = await axios.get(
          `${base_url}/profile/get-profile/${profileId}`
        );
        setProfile(response.data);
        const profilePicture=localStorage.setItem("picture",response.data.profilePicture);
        const name = localStorage.setItem("name",response.data.fullName)
       
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [profileId, navigate, isModalOpen]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
        <div className="flex">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-[24px] h-auto pb-4">
              <div
                className="relative w-full h-[250px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    profile.coverPhoto || backgroundImagePlaceholder
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button className="absolute top-4 right-4 lg:hidden bg-white shadow-md px-6 py-2 text-sm rounded-md">
                  Update Cover
                </button>
                <button className="absolute hidden lg:block lg:bottom-10 lg:right-10 bg-white shadow-md px-6 py-2 text-sm rounded-md">
                  Update Cover
                </button>
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start relative">
                {/* Profile Picture with Half Ring Border */}
                <div className="absolute top-[-4rem] sm:top-[-5rem] left-1/2 sm:left-6 transform -translate-x-1/2 sm:translate-x-0">
                  <div className="relative w-32 h-32 mx-auto sm:mx-0">
                    <img
                      src={profile.profilePicture || profileImagePlaceholder}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    {/* Half Ring Effect */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-orange-500 border-t-transparent transform rotate-45"></div>
                  </div>
                </div>
              </div>

              <div className="sm:ml-6 mt-4 px-4 sm:mt-0 flex flex-col items-center lg:items-start sm:text-left">
                <div className="flex mt-10 justify-between w-full">
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
                      {profile.fullName}
                    </h1>
                    <p className="text-orange-500 text-sm">
                      {college || "No college"}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="sm:ml-auto bg-[#FFEDDE] text-orange-600 px-4 py-2 rounded-md shadow-md"
                    >
                      Edit Profile
                    </button>
                    <ProfileEditModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>

                <div className="mt-5 w-full flex justify-between items-start text-gray-600 text-sm space-y-1">
                  <div className="flex flex-col items-start gap-2">
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={email}
                          alt="Email:"
                        />
                      </span>{" "}
                      {profile.email || "N/A"}
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={location}
                          alt="Location:"
                        />
                      </span>{" "}
                      {profile.location || "N/A"}
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={courses}
                          alt="courses:"
                        />
                      </span>{" "}
                      {profile.courses ? profile.courses.length : "0"} Courses
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col space-y-2 text-gray-600 text-sm">
                    <p className="flex items-center gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={org}
                          alt="organisation:"
                        />
                      </span>{" "}
                      {profile.organizationName || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={number}
                          alt="Number:"
                        />
                      </span>{" "}
                      {profile.phone || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <span>
                        <img
                          className="w-[18px] h-[14px] "
                          src={lang}
                          alt="Language:"
                        />
                      </span>{" "}
                      {profile.languages ? profile.languages.join(", ") : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Section: Bio & Education */}
            <div className="mt-6 flex flex-col lg:flex-row gap-6">
              <div className="w-full flex flex-col lg:w-2/3 space-y-6">
                <Bio />
                <Education />
              </div>

              {/* Right Section: Courses List */}
              <div className="w-full lg:w-1/3">
                <CoursesList />
              </div>
            </div>
          </div>
        </div>
 
    </div>
  );
};

export default ProfileHeader;
