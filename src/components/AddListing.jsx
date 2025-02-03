import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    listingType: "Rent",
    listingStatus: "Active",
    availableFrom: "",
    listingDate: "",
    expiryDate: "",
    property: null,
    listedBy: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 


        const [propertyResponse, userResponse] = await Promise.all([
          axios.get("https://vortexwebpropertymanagement.com/api/properties"),
          //   axios.get('https://vortexwebpropertymanagement.com/api/users')
        ]);
        setProperties(propertyResponse.data);
        // setUsers(userResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const [tenants, setTenants] = useState([]);
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/contacts"
        );
        const simplifiedTenants = response.data.map((tenant) => ({
          id: tenant.id,
          name: tenant.name,
        }));
        setTenants(simplifiedTenants);
      } catch (err) {
        console.log("Error while fetching tenants: ", err);
        toast.error("Error fetching tenants: ", err);
      }
    };

    fetchTenants();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertyChange = (e) => {
    setFormData({
      ...formData,
      property: properties.find((prop) => prop.id === parseInt(e.target.value)),
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "https://vortexwebpropertymanagement.com/api/listings",
        formData
      );
      navigate("/listings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
        <button onClick={() => navigate("/listings")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span>Back to Listings</span>
      </div>
      <h1 className="text-2xl font-bold">Create Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="listingType"
              className="block text-gray-700 font-medium"
            >
              Listing Type
            </label>
            <select
              id="listingType"
              name="listingType"
              value={formData.listingType}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            >
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Lease">Lease</option>
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
            rows={4}
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="availableFrom"
              className="block text-gray-700 font-medium"
            >
              Available From
            </label>
            <input
              type="date"
              id="availableFrom"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="listingDate"
              className="block text-gray-700 font-medium"
            >
              Listing Date
            </label>
            <input
              type="date"
              id="listingDate"
              name="listingDate"
              value={formData.listingDate}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-gray-700 font-medium"
            >
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="property"
                className="block text-gray-700 font-medium"
              >
                Property
              </label>
              <select
                id="property"
                name="property"
                value={formData.property?.id || ""}
                onChange={handlePropertyChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
                required
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.id} - {property.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="listedBy"
                className="block text-gray-700 font-medium"
              >
                Listed By
              </label>
              <select
                id="listedBy"
                name="listedBy"
                value={formData.listedBy?.id || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    listedBy: tenants.find(
                      (tenant) => tenant.id === parseInt(e.target.value)
                    ),
                  });
                }}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
                required
              >
                <option value="">Select a person</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.id} - {tenant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListingPage;
