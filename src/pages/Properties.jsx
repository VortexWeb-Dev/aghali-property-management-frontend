import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

const PropertiesPage = () => {
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

  return (
    <div className="p-6">
      {/* Header Section */}
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
          <PlusCircle className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && <div className="p-6 text-red-500">Error: {error}</div>}

      {/* Properties Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={property.id || index} {...property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;