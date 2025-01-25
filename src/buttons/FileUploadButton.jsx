import React from "react";

const FileUploadButton = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <div className="flex flex-col items-center">

      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-500"
      >
        <div
          className="flex justify-center items-center w-16 h-16 bg-green-100 border-2 border-green-600 rounded-full"
        >
          <span className="text-4xl font-bold">+</span>
        </div>
        <span className="mt-2 text-lg font-medium">Upload</span>
      </label>
    </div>
  );
};

export default FileUploadButton;
