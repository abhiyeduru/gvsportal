import { Bookmark, User, Briefcase } from "lucide-react";
import { City } from "country-state-city";

// cities constants array of object
export const cities = City.getCitiesOfCountry("IN");

const profileMenu = [
  {
    name: "Profile",
    path: "/dashboard/settings",
    icon: <User />,
  },
  {
    name: "Applied Jobs",
    path: "/dashboard/settings/applied-jobs",
    icon: <Briefcase />,
  },
  {
    name: "Bookmarks",
    path: "/dashboard/settings/bookmarks",
    icon: <Bookmark />,
  },
];

const achievements = {
  name: [
    "Verified Teachers",
    "Active Tuitions",
    "Partner Schools",
    "Satisfied Parents",
  ],
  achievement: [
    {
      name: "10K+",
      target: "experienced educators",
    },
    {
      name: "5K+",
      target: "monthly tuitions",
    },
    {
      name: "500+",
      target: "reputed institutions",
    },
    {
      name: "98%",
      target: "parent satisfaction",
    },
  ],
};
export { profileMenu, achievements };
