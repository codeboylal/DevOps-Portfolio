import React from "react";
import FeatureCard from "../../components/container/featureCard/featureCard";
import track from "../../assets/feature/track.svg";
import browser from "../../assets/feature/browser.svg";
import signup from "../../assets/feature/signup.svg";

const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 pb-4 px-[115px] text-center">
      <FeatureCard
        icon={signup}
        title="Sign up for Free"
        description="Create a free account to access our course library"
      />
      <FeatureCard
        icon={browser}
        title="Browse & Purchase Courses"
        description="Choose from a wide range of subjects to fit your career goals"
      />
      <FeatureCard
        icon={track}
        title="Track Progress at Your Own Pace"
        description="Learn at your convenience and earn certifications"
      />
    </div>
  );
};

export default FeaturesSection;
