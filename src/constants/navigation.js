import icons from "~/assets/js/icons";

export const NAV_LINKS = [
  { title: "Overview", link: "/", icon: icons.home },
  {
    title: "Members",
    icon: icons.group,
    children: [
      { title: "All Members", link: "/members" },
      { title: "Transitions", link: "/transitions" },
    ],
  },
  {
    title: "Events & Trainings",
    link: "/events",
    icon: icons.calendar,
    children: [
      { title: "All Events", link: "/events" },
      { title: "Trainings", link: "/trainings" },
    ],
  },
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
  { title: "Messaging", link: "/messaging", icon: icons.message },
  {
    title: "Others",
    icon: icons.list,
    children: [
      { title: "Volunteer", link: "/others/jobs" },
      { title: "Devotionals", link: "/others/devotionals" },
      { title: "Manage Admins", link: "/others/admins" },
      { title: "My Profile", link: "/others/profile" },
    ],
  },
];
