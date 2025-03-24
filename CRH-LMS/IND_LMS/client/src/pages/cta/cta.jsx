import backgroundImage from "../../assets/cta.svg";

const stats = [
  { value: "20+", label: "Categories" },
  { value: "105", label: "Instructors" },
  { value: "200", label: "Courses" },
  { value: "350", label: "Classes" },
];

const StatsSection = () => {
  return (
    <section
      className="relative w-full h-[301px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0"></div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 w-[81.56%] gap-6 text-white text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-5xl md:text-[79px] font-semibold leading-tight md:leading-[96px]">
              {stat.value}
            </span>
            <span className="text-lg md:text-3xl font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
