/**
 * Formats a date string into a readable date and time format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (dateString) => {
  if (!dateString) {
    return "No date set";
  }

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    // Format the date
    const day = date.toLocaleString("en-US", { day: "numeric" });
    const monthShort = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${monthShort} ${day}, ${year} at ${time}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Formats a date string into just the date part (no time)
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) {
    return "No date set";
  }

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const day = date.toLocaleString("en-US", { day: "numeric" });
    const monthShort = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${monthShort} ${day}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Formats a date string into just the time part
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted time string
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) {
    return "No time set";
  }

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid time";
    }

    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

export default formatDateTime;
