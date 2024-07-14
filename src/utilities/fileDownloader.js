export function downloadFile(filedata, filename) {
  // Create a URL for the file data
  const url = URL.createObjectURL(filedata);

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || "File");

  // Append the link to the document body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link and revoking the object URL
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
