import icons from "~/assets/js/icons";

export const NAV_LINKS = [
  { title: "Overview", link: "/", icon: icons.home },
  {
    title: "Members",
    icon: icons.group,
    link: "/members",
    // children: [
    //   { title: "All Members", link: "/members" },
    //   { title: "All Chapters", link: "/chapters" },
    // ],
  },
  { title: "Events", link: "/events", icon: icons.calendar },
  { title: "Resources", link: "/resources", icon: icons.play },
  { title: "Transactions", link: "/transactions", icon: icons.file },
  { title: "Store", link: "/store", icon: icons.store },
  // { title: "Messages", link: "/messages", icon: icons.message },
  {
    title: "Others",
    icon: icons.list,
    children: [
      { title: "Devotionals", link: "/others/devotionals" },
      { title: "Manage Admins", link: "/others/admins" },
      { title: "My Profile", link: "/others/profile" },
    ],
  },
];
