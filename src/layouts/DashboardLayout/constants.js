import icons from "~/assets/js/icons";

export const NAV_LINKS = [
  { title: "Overview", link: "/", icon: icons.home },
  {
    title: "Members",
    icon: icons.group,
    children: [
      { title: "All Members", link: "/members" },
      { title: "All Chapters", link: "/chapters" },
    ],
  },
  { title: "Events", link: "/events", icon: icons.calendar },
  { title: "Resources", link: "/resources", icon: icons.play },
  { title: "Transactions", link: "/transactions", icon: icons.file },
  { title: "Store", link: "/store", icon: icons.store },
  { title: "Messages", link: "/messages", icon: icons.message },
  {
    title: "Settings",
    icon: icons.settings,
    children: [
      { title: "Devotionals", link: "/settings/devotionals" },
      { title: "Manage Admins", link: "/settings/admins" },
      { title: "My Profile", link: "/settings/profile" },
    ],
  },
];
