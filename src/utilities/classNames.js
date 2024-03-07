/**
 * Generates a string of space-separated class names from the provided arguments,
 * filtering out falsy values. Supports both strings and objects as input.
 *
 * @param {...(string|Object<string, boolean>)} classes - Class names or objects with boolean values.
 * @return {string} - A string of space-separated class names.
 *
 * @example
 * classNames("foo", "bar", "baz"); // Output: "foo bar baz"
 * classNames("active", { disabled: false, hidden: true }, "highlight"); // Output: "active hidden highlight"
 */

export const classNames = (...classes) => {
  return classes
    .map((classItem) => {
      if (typeof classItem === "string") {
        return classItem;
      } else if (typeof classItem === "object" && classItem !== null) {
        return Object.entries(classItem)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
};
