/**
 * Convert CSV file to an array of objects.
 * @param {File} file - The CSV file to be converted.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing the CSV data.
 * @example
 * // Usage example:
 * convertCSVtoArray(file)
 *   .then((csvArray) => console.log(csvArray))
 *   .catch((error) => console.error("Error:", error));
 * //
 */

const convertCSVtoArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csvContent = reader.result;
      const csvArray = csvContent.split("\r\n");
      const headers = csvArray[0].split(",");
      const data = csvArray.slice(1).map((row) => {
        const values = row.split(",");
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index];
        });
        return rowData;
      });
      resolve(data);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export default convertCSVtoArray;
