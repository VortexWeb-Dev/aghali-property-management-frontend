import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import PropertyCard from "./../components/PropertyCard";
// import {properties as dummyProperties} from './../dummyData/data'

export const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/properties"
        );
        setProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="p-6">Loading properties...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Properties</h1>
          <div className="text-gray-500 mt-1">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-blue-500">Properties</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/properties/add")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={property.id || index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
