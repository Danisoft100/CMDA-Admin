import { useSelector } from "react-redux";
import { NAV_LINKS } from "~/constants/navigation";
import { selectAuth } from "~/redux/features/auth/authSlice";

export function useNavigationLink() {
  const { user } = useSelector(selectAuth);
  const userRole = user?.role;

  // Function to check if user has access
  const hasAccess = (role) => !role || userRole === role || userRole === "SuperAdmin";

  // Filter navigation links
  const filteredNavLinks = NAV_LINKS.map((navItem) => {
    // Filter children if they exist
    if (navItem.children) {
      const filteredChildren = navItem.children.filter((child) => hasAccess(child.role));
      if (filteredChildren.length > 0) {
        return { ...navItem, children: filteredChildren };
      }
      return null;
    }

    return hasAccess(navItem.role) ? navItem : null;
  }).filter(Boolean); // Remove null values

  return { navLinks: filteredNavLinks };
}
