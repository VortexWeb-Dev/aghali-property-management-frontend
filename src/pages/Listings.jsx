import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteEntity from "../components/DeleteEntity";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/listings"
        );
        const [listingsArray] = response.data;
        const validListings = listingsArray.filter(
          (item) => typeof item === "object" && item !== null
        );
        setListings(validListings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const ListingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(null).map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 space-y-4 animate-pulse">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton height={20} width={150} className="mb-2" /> {/* Title */}
              <Skeleton height={20} width={100} /> {/* Type */}
            </div>
            <Skeleton height={20} width={80} /> {/* Status */}
          </div>
          <Skeleton height={80} width="100%" /> {/* Description */}
          <div className="flex justify-between items-end">
            <div>
              <Skeleton height={20} width={80} className="mb-2" /> {/* Available From Label */}
              <Skeleton height={20} width={120} /> {/* Date */}
            </div>
            <Skeleton height={30} width={80} /> {/* Delete Button */}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton height={40} width={200} /> {/* Title */}
        <Skeleton height={40} width={150} /> {/* Add Listing Button */}
      </div>
      <ListingSkeleton />
    </div>
  );

  if (error)
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Listings</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => navigate("/listings/add")}
        >
          <PlusCircle className="w-5 h-5" />
          Add Listing
        </button>
      </div>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{listing.title}</h3>
                  <p className="text-gray-500">{listing.listingType}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full ${
                    listing.listingStatus === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {listing.listingStatus}
                </span>
              </div>
              <p className="text-gray-700">{listing.description}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500">Available From:</p>
                  <p className="text-gray-700">
                    {new Date(listing.availableFrom).toLocaleString()}
                  </p>
                </div>
                <DeleteEntity entityName="listings" entityId={listing.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-3 text-center text-gray-500 text-2xl">
          No listings found
        </div>
      )}
    </div>
  );
};

export default ListingsPage;