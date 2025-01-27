import React, { useState, useEffect } from "react";
import PropertyDetails from "./PropertyDetails";
import DeleteEntity from "./DeleteEntity";
import UpdatePropertyButton from "./UpdatePropertyButton";
import axios from "axios";
import toast from "react-hot-toast";

const Property = ({ id }) => {
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPropertyData, setNewPropertyData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://vortexwebpropertymanagement.com/api/properties/${id}`
        );
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
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewPropertyData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  // Handle update request
  // const handleUpdate = async () => {
  //   try {
  //     const response = await axios.patch(`https://vortexwebpropertymanagement.com/api/properties/${id}`, newPropertyData);
  //     if (response.status === 200) {
  //       setPropertyData({
  //         ...propertyData,
  //         ...newPropertyData, // Update the property data with new values
  //       });
  //       toast.success("Property updated successfully!");
  //     }
  //   } catch (error) {
  //     toast.success("Error updating property");
  //   }
  // };
  const onUpdatePropertyData = async (updatedPropertyData) => {
    try {
      // Make a PATCH request to the backend to update the PropertyData
      const response = await axios.patch(
        `https://vortexwebpropertymanagement.com/api/properties/${updatedPropertyData.id}`,
        updatedPropertyData
      );

      if (response.status === 200) {
        console.log("PropertyData updated successfully:", response.data);

        // Update the PropertyData in your state (if applicable)
        // setPropertyData((prevPropertyData) =>
        //   prevPropertyData.map((PropertyData) =>
        //     PropertyData.id === updatedPropertyData.id
        //       ? { ...PropertyData, ...updatedPropertyData }
        //       : PropertyData
        //   )
        // );

        setPropertyData({
          ...propertyData,
          ...updatedPropertyData, // Update the property data with new values
        });

        toast.success("PropertyData updated successfully!");
      }
    } catch (error) {
      console.error("Error updating PropertyData:", error);
      toast.success("Failed to update PropertyData. Please try again.");
    }
  };
  if (loading) return <div className="p-6">Loading property details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!propertyData)
    return <div className="p-6">No property data available</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300 p-4">
      {/* View Property Title */}
      <div className="flex items-center justify-end px-16 bg">
        <h1 className="text-3xl font-bold m-10">View Property Details</h1>
        <div className="gap-10 flex ">
          <DeleteEntity entityName="properties" entityId={id} />
          <UpdatePropertyButton
            onUpdateProperty={onUpdatePropertyData}
            existingProperty={propertyData}
          />
        </div>
      </div>

      <div className="bg-gray-100 w-full min-h-screen mx-8 px-10 rounded-2xl shadow-lg ">
        <div className="mx-8 mt-4">Property Photo</div>
        <div className="flex justify-center">
          <img
            src={propertyData.photos[0]}
            alt=""
            className="m-8 rounded-2xl shadow-2xl h-96 w-[1600px] "
          />
        </div>

        {/* content */}
        <div className="text-2xl text-gray-500 mx-10">General Information</div>
        <PropertyDetails propertyData={propertyData}></PropertyDetails>
      </div>
    </div>
  );
};

export default Property;
