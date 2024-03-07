import { useState } from "react";

export const useFileUpload = ({
  allowedTypes = [
    "image/jpeg", //jpeg
    "image/png", //png
    "image/webp", //webp
    "image/avif", //avif
    "image/svg+xml", //svg
    "application/pdf", //pdf
    "application/msword", //doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
    "application/vnd.ms-powerpoint", //ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", //pptx
    "application/vnd.ms-excel", //xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //xlsx
    "application/zip",
    "application/vnd.rar",
    // Add more allowed MIME types for other office document formats
  ],
  allowedSize = 2, // In Megabytes(MB)
} = {}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const allowedSizeInBytes = allowedSize * 1024 * 1024;

  const handleUpload = (file) => {
    if (file && allowedTypes.includes(file.type) && file.size <= allowedSizeInBytes) {
      setUploadedFile(file);
      setErrMsg("");
    } else if (!allowedTypes.includes(file.type)) {
      setErrMsg("Invalid file type.");
    } else if (file.size > allowedSizeInBytes) {
      setErrMsg(`Maximum file size is ${allowedSize}MB.`);
    }
  };

  const handleBrowseFiles = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleUpload(file);
  };

  return {
    handleBrowseFiles,
    handleDragOver,
    handleDrop,
    uploadedFile,
    setUploadedFile,
    errMsg,
  };
};
