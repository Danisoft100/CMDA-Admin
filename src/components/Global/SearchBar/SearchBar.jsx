import { classNames } from "~/utilities/classNames";
import icons from "~/assets/js/icons";
import { useState } from "react";

const SearchBar = ({
  placeholder = "Search...",
  className,
  onSearch = console.log, // function to handle the search, it contains inputValue as a params
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(inputValue);
      }}
      className={classNames("relative", className)}
    >
      <input
        value={inputValue}
        className={classNames(
          "bg-white border border-gray placeholder:text-gray rounded-lg block w-full text-sm p-3 h-12 pr-24",
          "focus:ring focus:ring-primary/20 focus:bg-white focus:outline-none focus:border-transparent transition-all"
        )}
        placeholder={placeholder}
        required={false}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <button
          className="absolute top-3.5 right-16 mx-2 text-xl text-gray"
          type="button"
          onClick={() => {
            setInputValue("");
            onSearch("");
          }}
        >
          {icons.close}
        </button>
      )}
      <button
        type="submit"
        className="text-white absolute top-0 right-0 bg-primary hover:bg-primaryContainer h-12 font-medium rounded-e-lg text-sm px-6"
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
