import CategoryCard from "../../components/container/categoryCard/categoryCard"
import web from "../../assets/browserCategory/web.svg"
import tech from "../../assets/browserCategory/tech.svg"
import sd from "../../assets/browserCategory/sd.svg"
import ai from "../../assets/browserCategory/ai.svg"
import anime from "../../assets/browserCategory/3danime.svg"
import development from "../../assets/browserCategory/development.svg"
import ds from "../../assets/browserCategory/ds.svg"
import game from "../../assets/browserCategory/game.svg"
import multi from "../../assets/browserCategory/multi.svg"


const BrowseByCategory = () => {
  const categories = [
    { icon: development, title: "Development", courseCount: 3, bgColor: "bg-[#E5F6F7]" },
    { icon: tech, title: "Technology", courseCount: 3, bgColor: "bg-[#FFEFD5]" },
    { icon: ai, title: "Artificial Intelligence", courseCount: 3, bgColor: "bg-[#FFE5E5]" },
    { icon: ds, title: "Data Science", courseCount: 3, bgColor: "bg-[#E5F7E5]" },
    { icon: multi, title: "Graphics and Multimedia", courseCount: 3, bgColor: "bg-[#E5F7FB]" },
    { icon:web, title: "Web Designing", courseCount: 3, bgColor: "bg-[#EFE5FF]" },
    { icon: sd, title: "Software Development", courseCount: 3, bgColor: "bg-[#F3E5FF]" },
    { icon: game, title: "Game Development", courseCount: 3, bgColor: "bg-[#FFE5D5]" },
    { icon: anime, title: "3D + Animation", courseCount: 3, bgColor: "bg-[#FFE5E5]" },
  ];

  return (
    <section className="flex justify-center flex-wrap items-start content-start pb-[48px] gap-6 max-w-[1440px] mx-auto bg-white">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full pt-[32px] px-[24px] sm:pt-[48px] sm:px-[48px]">
  {/* Title */}
  <h2 className="text-[28px] sm:text-[32px] font-bold leading-[100%] text-center sm:text-left">
    Browse By <span className="text-[#FF702D]">Category</span>
  </h2>

  {/* View All Link */}
  <a href="#" className="text-[#FF702D] font-semibold text-[20px] sm:text-[24px]">
    View All
  </a>
</div>


      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory;
