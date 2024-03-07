/**
 * Converts a string in camel, kebab, snake or pascal case or url to a capitalized words.
 * @param {String} inputString - The joined string to convert.
 * @returns {String} - a string of capitalized words separated by space.
 */

function convertToCapitalizedWords(inputString) {
  // Convert to words
  const words = inputString
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to camel Case
    .replace(/_/g, " ") // Replace underscores in snake_case with spaces
    .replace(/-/g, " ") // Replace hyphens in kebab-case with spaces
    .replace(/\//g, " ") // Replace forward slashes in URLs with spaces
    .split(" ");
  // Capitalize each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  // Join the words with spaces
  const result = capitalizedWords.join(" ");

  return result;
}

export default convertToCapitalizedWords;

/*
======= Example usage =======

convertToCapitalizedWords('camelCase') ==>  Output: Camel Case
convertToCapitalizedWords('PascalCase') ==>  Output: Pascal Case
convertToCapitalizedWords('snake_case') ==>  Output: Snake Case
convertToCapitalizedWords('kebab-case') ==>  Output: Kebab Case

*/
