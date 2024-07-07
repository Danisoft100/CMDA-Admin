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
  {
    title: "Payments",
    link: "/payments",
    icon: icons.card,
    children: [
      { title: "Orders", link: "/payments/orders" },
      { title: "Subscriptions", link: "/payments/subscriptions" },
      { title: "Donations", link: "/payments/donations" },
    ],
  },
  { title: "Products", link: "/products", icon: icons.store },
  // { title: "Messages", link: "/messages", icon: icons.message },
  {
    title: "Others",
    icon: icons.list,
    children: [
      { title: "Volunteer Jobs", link: "/others/volunteer-jobs" },
      { title: "Devotionals", link: "/others/devotionals" },
      { title: "Manage Admins", link: "/others/admins" },
      { title: "My Profile", link: "/others/profile" },
    ],
  },
];
