import React, { useState } from "react";
import axios from "axios";
import { Upload, X } from "lucide-react";

const UpdatePropertyButton = ({
  onUpdateProperty,
  //   isLoading,
  existingProperty,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(existingProperty.photos[0]);
  const [updatedProperty, setUpdatedProperty] = useState(existingProperty);
  const [files, setFiles] = useState([]);

  const handleImgFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedUrl = await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.post(
            "https://vortexwebpropertymanagement.com/api/files/presigned-url",
            {
              key: file.name,
              contentType: file.type,
            }
          );

          // Upload file to S3 using the pre-signed URL
          await axios.put(data.presignedUrl.presignedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
        })
      );

      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      const nonImageFiles = files.filter(
        (file) => !file.type.startsWith("image/")
      );

      setUpdatedProperty((prev) => ({
        ...prev,
        ...(imageFiles.length > 0 && { photos: uploadedUrl }),
        ...(nonImageFiles.length > 0 && { attachments: uploadedUrl }),
      }));
      // Set preview for the first image file
      if (imageFiles.length > 0) {
        const fileUrl = URL.createObjectURL(imageFiles[0]);
        setPreview(fileUrl);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
    setFiles(files);
  };

  const handleDocFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedUrl = await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.post(
            "https://vortexwebpropertymanagement.com/api/files/presigned-url",
            {
              key: file.name,
              contentType: file.type,
            }
          );

          // Upload file to S3 using the pre-signed URL
          await axios.put(data.presignedUrl.presignedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
        })
      );

      // const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      const nonImageFiles = files.filter(
        (file) => !file.type.startsWith("image/")
      );

      setUpdatedProperty((prev) => ({
        ...prev,
        ...(nonImageFiles.length > 0 && { attachments: uploadedUrl }),
      }));

    } catch (error) {
      console.error("Error uploading files:", error);
    }
    setFiles(files);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProperty(updatedProperty);
    setShowModal(false);
  };

  const removeFile = (indexToRemove, isPhoto) => {
    if (isPhoto) {
      setPreview(null);
    }else{
      setFiles(files.filter((_, index) => index !== indexToRemove));
    }



    // Reset the input value to allow re-uploading the same file
    const input = document.getElementById("file-upload");
    if (input) {
      input.value = "";
    }
  };

  const generalFields = [
    { name: "name", type: "text", placeholder: "Property Name" },
    { name: "buildYear", type: "number", placeholder: "Year Built" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "stateOrRegion", type: "text", placeholder: "State / Region" },
    { name: "zip", type: "text", placeholder: "Zip" },
    { name: "country", type: "text", placeholder: "Country" },
  ];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition"
      >
        Update
      </button>

      {/* --------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-fit max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Update Property</h2>

            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              {/* Photo Upload */}
              <div className="flex items-center">
                <div>
                  <label className="group relative inline-flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Upload className="w-5 h-5 animate-bounce group-hover:animate-none" />
                    <span>Upload Property Photo</span>
                    <input
                      id="photo-upload"
                      type="file"
                      name="photos"
                      multiple
                      className=" w-full border p-2 rounded hidden"
                      onChange={handleImgFileUpload}
                      accept="image/*"
                    />
                  </label>

                </div>
                {preview && (
                  <div className="relative px-10">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-36 h-36 object-cover rounded-2xl border-2 border-violet-200 shadow-2xl"

                    />
                  {/* <button
                  onClick={() => removeFile(index, true)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button> */}
                  </div>
                )}
              </div>

              {/* General Information */}
              <div>
                <h2 className="text-xl font-bold mb-2">General Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {generalFields.map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="border p-2 rounded w-full"
                      value={updatedProperty[field.name]}
                      onChange={handleInputChange}
                    />
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h2 className="text-xl font-bold mb-2">Property Type</h2>
                <div className="flex gap-4">
                  <div className="p-4 border border-black rounded-md flex-1">
                    <label className="items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value="Single Unit"
                        checked={updatedProperty.type === "Single Unit"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Single Unit
                    </label>
                    <p className="inline-block font-thin pt-4">
                      Single family rentals (SFR) are rentals in which there is
                      only one rental associated with a specific address. This
                      type of property does not allow adding any units/rooms.
                    </p>
                  </div>

                  <div className="p-4 border border-black rounded-md flex-1">
                    <label className="items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value="Multi Unit"
                        checked={updatedProperty.type === "Multi Unit"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Multi Unit
                    </label>
                    <p className="inline-block font-thin pt-4">
                      Multi-unit property are for rentals in which there are
                      multiple rental units per a single address.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="block text-gray-700 font-semibold mb-2">
                  <span>Beds</span>
                  <input
                    type="number"
                    name="beds"
                    placeholder="Beds"
                    className="border p-2 rounded w-full"
                    value={updatedProperty.beds}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="block text-gray-700 font-semibold mb-2">
                  <span>Baths</span>
                  <input
                    type="number"
                    name="baths"
                    placeholder="Baths"
                    className="border p-2 rounded w-full"
                    value={updatedProperty.baths}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Parking
                  </label>
                  <select
                    name="parking"
                    className="border w-full p-2 rounded"
                    onChange={handleInputChange}
                    defaultValue={existingProperty.parking}
                  >
                    <option value="Covered"> Covered</option>
                    <option value="Uncovered"> Uncovered</option>
                    <option value="None"> None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Laundry
                  </label>
                  <select
                    name="laundry"
                    className="border w-full p-2 rounded"
                    onChange={handleInputChange}
                    defaultValue={existingProperty.laundry}
                  >
                    <option value="In-Unit"> In-Unit</option>
                    <option value="Shared"> Shared</option>
                    <option value="None"> None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    AC Type
                  </label>
                  <select
                    name="ac"
                    className="border w-full p-2 rounded"
                    onChange={handleInputChange}
                    defaultValue={existingProperty.ac}
                  >
                    <option value="Central"> Central</option>
                    <option value="Window"> Window</option>
                    <option value="None"> None</option>
                  </select>
                </div>

                <div className="block text-gray-700 font-semibold mb-2">
                  <span>Size (sq.ft)</span>
                  <input
                    type="number"
                    name="size"
                    placeholder="Size (sq.ft)"
                    className="border p-2 rounded w-full"
                    value={updatedProperty.size}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="block text-gray-700 font-semibold mb-2">
                  <span>Market Rent</span>
                  <input
                    type="number"
                    name="marketRent"
                    placeholder="Market Rent"
                    className="border p-2 rounded w-full"
                    value={updatedProperty.marketRent}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="block text-gray-700 font-semibold mb-2">
                  <span>Deposit</span>
                  <input
                    type="number"
                    name="deposit"
                    placeholder="Deposit"
                    className="border p-2 rounded w-full"
                    value={updatedProperty.deposit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Features and Amenities */}
              <div>
                <h2 className="text-xl font-bold mb-2">Features</h2>
                <textarea
                  name="feature"
                  placeholder="Enter features separated by commas"
                  className="w-full border p-2 rounded"
                  value={updatedProperty.feature.join(", ")}
                  onChange={(e) =>
                    setUpdatedProperty((prev) => ({
                      ...prev,
                      feature: e.target.value.split(",").map((f) => f.trim()),
                    }))
                  }
                />
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Amenities</h2>
                <textarea
                  name="amenities"
                  placeholder="Enter amenities separated by commas"
                  className="w-full border p-2 rounded"
                  value={updatedProperty.amenities.join(", ")}
                  onChange={(e) =>
                    setUpdatedProperty((prev) => ({
                      ...prev,
                      amenities: e.target.value.split(",").map((a) => a.trim()),
                    }))
                  }
                />
              </div>

              <h2 className="text-xl font-bold mb-2">Upload Attachment</h2>
              <div className="border border-dashed rounded-lg border-gray-700 h-36 flex justify-center items-center">
                <div className="flex gap-4 items-center overflow-y-auto">
                  {/* Hidden File Input */}
                  <input
                    id="file-upload"
                    type="file"
                    name="attachments"
                    multiple
                    className="hidden"
                    onChange={handleDocFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.html,.htm,.xml,.json,.csv,.tsv,.epub,.djvu,.ps,.eps,.tex,.latex,.blend,.ai,.psd,.indd,.zip,.rar,.7z"
                  />
                  {/* Label as Stylized Button */}

                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center cursor-pointer text-green-600 hover:text-green-500"
                  >
                    <div className="flex justify-center items-center w-16 h-16 bg-green-100 border-2 border-green-600 rounded-full">
                      <span className="text-3xl font-bold">+</span>
                    </div>
                    <span className="mt-2 text-lg font-medium">Upload</span>
                    <span className="font-thin">
                      Store documents and templates
                    </span>
                  </label>

                  {files.filter((file) => !file.type.startsWith("image/")).length > 0 && (
              <div className="mt-4 w-full max-w-md">
                <h3 className="text-lg font-medium mb-2">Uploaded Files:</h3>
                <ul className="space-y-2">
                  {files.filter((file) => !file.type.startsWith("image/")).map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-200 transition-colors"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
                </div>
              </div>
              <button
                type="submit"
                // disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                Update Property
                {/* {isLoading ? "Updating..." : "Update Property"} */}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePropertyButton;
