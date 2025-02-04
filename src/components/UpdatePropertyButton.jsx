import React, { useState } from "react";
import axios from "axios";

const UpdatePropertyButton = ({
  onUpdateProperty,
  //   isLoading,
  existingProperty,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState(existingProperty);

  const handleFileUpload = async (e) => {
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
    } catch (error) {
      console.error("Error uploading files:", error);
    }
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
              {/* Currency Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    className="border w-full p-2 rounded"
                    onChange={handleInputChange}
                    defaultValue={existingProperty.currency}
                  >
                    <option value="$ US Dollar">$ US Dollar</option>
                    <option value="AED"> د.إ AED</option>
                    <option value="₹ Indian Rupee">₹ Indian Rupee</option>
                  </select>
                </div> */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Update Property Photo
                  </label>
                  <input
                    type="file"
                    name="photos"
                    multiple
                    className="block w-full border p-2 rounded"
                    onChange={handleFileUpload}
                  />
                </div>
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
                <div className="flex flex-col items-center">
                  {/* Hidden File Input */}
                  <input
                    id="file-upload"
                    type="file"
                    name="attachments"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
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
