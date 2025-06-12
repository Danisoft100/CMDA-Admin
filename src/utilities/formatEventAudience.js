/**
 * Formats event audience/member groups for display
 * @param {string|string[]} audience - The audience type(s) for the event
 * @returns {string} - Formatted audience string
 */
export const formatEventAudience = (audience) => {
  if (!audience) {
    return "All Members";
  }
  // If it's an array, join the values
  if (Array.isArray(audience)) {
    if (audience.length === 0) {
      return "All Members";
    }
    // Format each item and join with commas
    const formatted = audience.map((item) => formatSingleAudience(item));
    return formatted.join(", ");
  }

  // If it's a single string
  return formatSingleAudience(audience);
};

/**
 * Helper function to format a single audience type
 * @param {string} audience - Single audience type
 * @returns {string} - Formatted audience string
 */
const formatSingleAudience = (audience) => {
  if (!audience || typeof audience !== "string") {
    return "All Members";
  }

  // Handle common audience types
  const audienceMap = {
    Student: "Students",
    Doctor: "Doctors",
    Nurse: "Nurses",
    Allied: "Allied Health",
    AlliedHealth: "Allied Health",
    GlobalNetwork: "Global Network",
    Executive: "Executive",
    Associate: "Associate",
    Fellowship: "Fellowship",
    Membership: "Membership",
    All: "All Members",
    Everyone: "All Members",
  };

  // Return mapped value or capitalize the original string
  return audienceMap[audience] || audience.charAt(0).toUpperCase() + audience.slice(1).toLowerCase();
};

export default formatEventAudience;
