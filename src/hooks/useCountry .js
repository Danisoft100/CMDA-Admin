import { useMemo } from "react";
import { Country, State } from "country-state-city";

const useCountry = () => {
  // getting all unique country codes
  const uniqueCountryCodes = useMemo(() => {
    return [
      ...new Set(
        Country.getAllCountries().map((country) => ({
          label: "+" + country.phonecode,
          value: "+" + country.phonecode,
        }))
      ),
    ];
  }, []);

  // get all states by country code
  const getAllStatesByCountryCode = (countryCode) => {
    return [
      ...new Set(
        State.getStatesOfCountry(countryCode).map((state) => ({
          label: state.name,
          value: state.name,
        }))
      ),
    ];
  };

  return { uniqueCountryCodes, getAllStatesByCountryCode };
};

export default useCountry;
