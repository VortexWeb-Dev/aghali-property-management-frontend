import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProperty = () => {
  const navigate = useNavigate();

  const generalFields = [
    { name: "name", type: "text", placeholder: "Property Name" },
    { name: "buildYear", type: "number", placeholder: "Year Built" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "city", type: "text", placeholder: "City" },
    { name: "stateOrRegion", type: "text", placeholder: "State / Region" },
    { name: "zip", type: "text", placeholder: "Zip" },
    { name: "country", type: "text", placeholder: "Country" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    buildYear: "",
    address: "",
    city: "",
    stateOrRegion: "",
    zip: "",
    country: "",
    type: "Single Unit",
    beds: 1,
    baths: 1,
    size: "",
    marketRent: "",
    deposit: "",
    parking: "Call for availability",
    laundry: "In-Unit",
    ac: "Central",
    feature: [],
    amenities: [],
    photos: [],
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/properties", formData); 
      navigate("/properties"); // Redirect after successful submission
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Currency
            </label>
            <select
              name="currency"
              className="border w-full p-2 rounded"
              onChange={handleChange}
              defaultValue="$ US Dollar"
            >
              <option value="$ US Dollar">$ US Dollar</option>
              <option value="AED"> د.إ AED</option>
              <option value="₹ Indian Rupee">₹ Indian Rupee</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Property Photo
            </label>
            <input
              type="file"
              name="photos"
              multiple
              className="block w-full border p-2 rounded"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  photos: Array.from(e.target.files).map((file) =>
                    URL.createObjectURL(file)
                  ),
                }))
              }
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
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h2 className="text-xl font-bold mb-2">Property Type</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Single Unit"
                checked={formData.type === "Single Unit"}
                onChange={handleChange}
              />
              Single Unit
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Multi Unit"
                checked={formData.type === "Multi Unit"}
                onChange={handleChange}
              />
              Multi Unit
            </label>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="beds"
            placeholder="Beds"
            className="border p-2 rounded w-full"
            value={formData.beds}
            onChange={handleChange}
          />
          <input
            type="number"
            name="baths"
            placeholder="Baths"
            className="border p-2 rounded w-full"
            value={formData.baths}
            onChange={handleChange}
          />
          <input
            type="number"
            name="size"
            placeholder="Size (sq.ft)"
            className="border p-2 rounded w-full"
            value={formData.size}
            onChange={handleChange}
          />
          <input
            type="number"
            name="marketRent"
            placeholder="Market Rent"
            className="border p-2 rounded w-full"
            value={formData.marketRent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="deposit"
            placeholder="Deposit"
            className="border p-2 rounded w-full"
            value={formData.deposit}
            onChange={handleChange}
          />
        </div>

        {/* Features and Amenities */}
        <div>
          <h2 className="text-xl font-bold mb-2">Features</h2>
          <textarea
            name="feature"
            placeholder="Enter features separated by commas"
            className="w-full border p-2 rounded"
            value={formData.feature.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
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
            value={formData.amenities.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                amenities: e.target.value.split(",").map((a) => a.trim()),
              }))
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
