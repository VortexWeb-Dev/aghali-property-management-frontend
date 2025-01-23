import React, { useState, useEffect } from "react";
import PropertyDetails from './PropertyDetails'
import DeleteButton from "./DeleteProperty";
import axios from "axios";

const Property = ({ id }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPropertyData, setNewPropertyData] = useState({
    name: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setPropertyData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  // Handle input changes for the update form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPropertyData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle update request
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`/api/properties/${id}`, newPropertyData);
      if (response.status === 200) {
        setPropertyData({
          ...propertyData,
          ...newPropertyData, // Update the property data with new values
        });
        alert("Property updated successfully!");
      }
    } catch (error) {
      alert("Error updating property");
    }
  };

  if (loading) return <div className="p-6">Loading property details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!propertyData) return <div className="p-6">No property data available</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200 p-4">
      {/* View Property Title */}
      <div className="flex items-center justify-end px-16">
      <h1 className="text-3xl font-bold m-10">View Property {id}</h1>
      <DeleteButton propertyId={id} />
      </div>

      <div className="bg-gray-100 w-full min-h-screen mx-8 px-10 rounded-2xl shadow-lg ">
        <div className="mx-8 mt-4">Property Photo</div>
        <div className="flex justify-center">
          <img
            src="hero.jpeg"
            alt=""
            className="m-8 rounded-2xl shadow-2xl h-96 w-[1600px] "
          />
        </div>
        
        {/* content */}
        <div className="text-2xl text-gray-500 mx-10">General Information</div>
        <PropertyDetails propertyData={propertyData}></PropertyDetails>

        {/* Update Property Form */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-semibold">Update Property Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={newPropertyData.name || propertyData.name}
            onChange={handleInputChange}
            className="mt-2 p-2 w-80 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Property Price"
            value={newPropertyData.price || propertyData.price}
            onChange={handleInputChange}
            className="mt-2 p-2 w-80 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Property Description"
            value={newPropertyData.description || propertyData.description}
            onChange={handleInputChange}
            className="mt-2 p-2 w-80 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
          >
            Update Property
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Property;
