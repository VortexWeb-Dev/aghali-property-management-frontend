

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, X } from "lucide-react";
import AddMaintenanceButton from "./../components/AddMaintenance";
import DeleteEntity from "./../components/DeleteEntity";
import StatusUpdateButton from "../components/UpdateModal";

const MaintenanceDashboard = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/maintenances"
        );
        setMaintenanceRequests(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceRequests();
  }, []);

  // Handler to add new maintenance request to state
  const handleAddMaintenance = (newRequest) => {
    setMaintenanceRequests((prev) => [newRequest, ...prev]);
  };

  const [selectedCard, setSelectedCard] = useState(maintenanceRequests);


  const renderCard = (card) => (
    <div
      key={card.id} // Keep a stable key (avoid Math.random)
      className={`relative border rounded-2xl p-6 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg 
        ${
          selectedCard?.id === card.id
            ? "bg-blue-50 border-blue-200"
            : "bg-white"
        }
      `}
      onClick={() => setSelectedCard(card)}
    >
      {/* Click to Expand Label */}
      <span className="absolute top-2 right-2 text-xs text-gray-400 italic">
        Click to Expand
      </span>

      <h2 className="font-semibold text-lg mb-3">{card.title}</h2>
      <p className="text-gray-600 mb-2">{card.category}</p>

      <div className="flex items-center justify-between mt-4">
        {/* Status - Ensure only valid status values are processed */}
        {card.status && (
          <p
            className={`text-sm font-medium ${
              card.status === "Critical"
                ? "text-red-500"
                : card.status === "Moderate"
                ? "text-yellow-600"
                : card.status === "Normal"
                ? "text-green-500"
                : "text-gray-500" // Default if status is unrecognized
            }`}
          >
            {card.status}
          </p>
        )}

        {/* Stage - Ensure only valid stage values are processed */}
        {card.stage && (
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              card.stage === "New"
                ? "bg-red-100 text-red-800"
                : card.stage === "Updated"
                ? "bg-green-100 text-green-800"
                : card.stage === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-600" // Default if stage is unrecognized
            }`}
          >
            {card.stage}
          </span>
        )}
      </div>
    </div>
  );

  if(loading) return (
    Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="h-3 w4 bg-gray-200 animate-pulse rounded-lg"
      />    
    ))
  )


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="m-2 flow-root">
        <h1 className="text-3xl text-gray-600 font-bold float-left">
          View Maintenance
        </h1>
        <div className=" flex float-right">
          <AddMaintenanceButton onAddMaintenance={handleAddMaintenance} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* First row: 1 normal + 1 expanded (spanning 2 cols) */}
        {

        maintenanceRequests.slice(0, 1).map(renderCard)
        }
        {selectedCard.length != 0 && (
          <div className="col-span-2 row-span-3 border rounded-2xl p-8 shadow-lg bg-white">
            <div className="flex gap-48">
              <h2 className="font-bold text-2xl mb-4">{selectedCard.title}</h2>
              <div className="flex gap-5 justify-center items-center">
                <DeleteEntity
                  entityId={selectedCard.id}
                  entityName="maintenances"
                />
                <StatusUpdateButton cardId={selectedCard.id} />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                <p className="text-gray-500 pb-5">
                  {selectedCard.request_type}{" "}
                  {selectedCard.request_type ? "|" : ""} {selectedCard.category}{" "}
                  {selectedCard.category ? "|" : ""} {selectedCard.sub_category}
                </p>
                <span className="font-semibold">Category:</span>{" "}
                {selectedCard.category}
              </p>
              <div className="flex items-center space-x-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Stage:</span>{" "}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      selectedCard.stage === "New"
                        ? "bg-red-100 text-red-800"
                        : selectedCard.stage === "Updated"
                        ? "bg-green-100 text-green-800"
                        : selectedCard.stage === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-600" // Default for unknown stages
                    }`}
                  >
                    {selectedCard.stage || "Unknown"}
                  </span>
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      selectedCard.status === "Critical"
                        ? "text-red-500"
                        : selectedCard.status === "Moderate"
                        ? "text-yellow-600"
                        : selectedCard.status === "Normal"
                        ? "text-green-500"
                        : "text-gray-500" // Default for unknown statuses
                    }`}
                  >
                    {selectedCard.status || "Unknown"}
                  </span>
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCard.details}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Second row: 1 normal card */}
        {maintenanceRequests.length > 0 ? (
          maintenanceRequests.slice(1, 2).map(renderCard)
        ) : (
          <div className="col-span-3">
            <p className="text-gray-500">No maintenance requests found</p>
          </div>
        )}


        {/* Third row: 1 normal card */}
        {
        maintenanceRequests.length > 0 ? (
          maintenanceRequests.slice(2, 3).map(renderCard)
        ) : (
          <div className="col-span-3">
            <p className="text-gray-500">No maintenance requests found</p>
          </div>
        )}

        {/* Remaining cards in a 3-column grid */}
        {maintenanceRequests.length > 0 ? (
          maintenanceRequests.slice(3).map(renderCard)
        ) : (
          <div className="col-span-3">
            <p className="text-gray-500">No maintenance requests found</p>
          </div>
        )}
      </div>

    </div>

  );
};

export default MaintenanceDashboard;
