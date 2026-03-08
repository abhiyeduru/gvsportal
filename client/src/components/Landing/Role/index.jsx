import Card from "./Card";

const cardData = [
  {
    iconBg: "bg-[#D1FADF]",
    src: "/roles/ForStudents.png", // Keeping the original image paths for now
    title: "For Teachers",
    titleColor: "text-[#0AA482]",
    paragraph:
      "Showcase your skills, find teaching jobs at top schools, or offer private tuitions to students in your area.",
  },
  {
    iconBg: "bg-[#FFEAE0]",
    src: "/roles/ForCompanies.png",
    title: "For Institutions",
    titleColor: "text-[#FF6E76]",
    paragraph:
      "Redefine your hiring process. Connect with qualified educators and manage your teaching staff efficiently.",
  },
  {
    iconBg: "bg-[#EFEDFF]",
    src: "/roles/ForColleges.png",
    title: "For Parents",
    titleColor: "text-[#693CF3]",
    paragraph:
      "Find the best tutors for your children. Browse verified profiles, schedule demo classes, and track progress.",
  },
];

const Role = () => {
  return (
    <div className="flex lg:py-12 p-2 mx-auto sm:max-w-xs lg:max-w-screen-xl mb-[80px] gap-y-16 flex-wrap md:gap-x-7 items-center justify-center flex-col lg:flex-row">
      {cardData?.map(({ iconBg, src, title, paragraph, titleColor }, index) => (
        <Card
          key={index}
          delay={index / 4} // control paragraph text animation delay
          paragraph={paragraph}
          iconBg={iconBg}
          title={title}
          src={src}
          titleColor={titleColor}
        />
      ))}
    </div>
  );
};

export default Role;
