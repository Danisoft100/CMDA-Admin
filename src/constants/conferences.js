// Conference-specific constants for the admin panel
export const conferenceTypes = [
  { value: "National", label: "National Conference" },
  { value: "Zonal", label: "Zonal Conference" },
  { value: "Regional", label: "Regional Conference" },
];

export const conferenceZones = [
  { value: "Western", label: "Western Zone" },
  { value: "Eastern", label: "Eastern Zone" },
  { value: "Northern", label: "Northern Zone" },
];

export const conferenceRegions = [
  { value: "Americas & Caribbean", label: "Americas & Caribbean Region" },
  { value: "UK/Europe", label: "UK/Europe Region" },
  { value: "Australia/Asia", label: "Australia/Asia Region" },
  { value: "Middle East", label: "Middle East Region" },
  { value: "Africa", label: "Africa Region" },
];

export const registrationPeriods = [
  { value: "Regular", label: "Regular Registration" },
  { value: "Late", label: "Late Registration" },
];

// Enhanced member groups with new doctor categories
export const memberGroups = [
  { value: "Student", label: "Students" },
  { value: "Doctor_0_5_Years", label: "Doctors (0-5 years)" },
  { value: "Doctor_Above_5_Years", label: "Doctors (Above 5 years)" },
  { value: "Doctor", label: "All Doctors (Legacy)" }, // For backward compatibility
  { value: "GlobalNetwork", label: "Global Network" },
];

// Helper function to get display-friendly member group names
export const getMemberGroupDisplayName = (group) => {
  const groupMap = {
    Student: "Students",
    Doctor_0_5_Years: "Doctors (0-5 years)",
    Doctor_Above_5_Years: "Doctors (Above 5 years)",
    Doctor: "All Doctors",
    GlobalNetwork: "Global Network",
  };
  return groupMap[group] || group;
};

// Helper function to get currency for member group
export const getMemberGroupCurrency = (group) => {
  return group === "GlobalNetwork" ? "USD" : "NGN";
};

// Helper function to get default prices
export const getDefaultPrice = (group, period = "Regular") => {
  const basePrice = {
    Student: 500,
    Doctor_0_5_Years: 2500, // Lower price for junior doctors
    Doctor_Above_5_Years: 3500, // Higher price for senior doctors
    Doctor: 3000, // Average price for legacy
    GlobalNetwork: 20,
  };

  const multiplier = period === "Late" ? 1.5 : 1;
  return Math.round(basePrice[group] * multiplier);
};

// Zone mapping for different audience types
export const zonalConferenceTypes = {
  Student: "Student Zonal Conference",
  Doctor_0_5_Years: "Junior Doctor Zonal Conference",
  Doctor_Above_5_Years: "Senior Doctor Zonal Conference",
  Doctor: "Doctor Zonal Conference",
  GlobalNetwork: "Global Network Conference",
};
