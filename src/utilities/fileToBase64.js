/**
 * Converts a File object to base64 string.
 * @param {File} file - The File object to convert.
 * @returns {Promise<string>} - A Promise that resolves with the base64 string.
 */

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // The result is the base64-encoded string
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as Data URL
    reader.readAsDataURL(file);
  });
}

export default fileToBase64;
