// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Check, X } from "lucide-react";
// import AddMaintenanceButton from "./../components/AddMaintenance";
// import DeleteEntity from "./../components/DeleteEntity";

// const MaintenancePage = () => {
//   const [maintenanceRequests, setMaintenanceRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch maintenance requests
//   useEffect(() => {
//     const fetchMaintenanceRequests = async () => {
//       try {
//         const response = await axios.get(
//           "https://vortexwebpropertymanagement.com/api/maintenances"
//         );
//         setMaintenanceRequests(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMaintenanceRequests();
//   }, []);

//   // Handler to add new maintenance request to state
//   const handleAddMaintenance = (newRequest) => {
//     setMaintenanceRequests((prev) => [newRequest, ...prev]);
//   };

//   // Render loading state
//   if (loading) return <div className="p-6 text-center">Loading...</div>;

//   // Render error state
//   if (error)
//     return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header with Add Request Button */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Maintenance</h1>
//         <AddMaintenanceButton onAddMaintenance={handleAddMaintenance} />
//       </div>

//       {/* Maintenance Requests Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {maintenanceRequests.map((request) => (
//           <div
//             key={request.id}
//             className="bg-white rounded-2xl shadow-md p-6 space-y-4"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium">{request.title}</h3>
                // <p className="text-gray-500">
                //   {request.request_type} | {request.category} |{" "}
                //   {request.sub_category}
                // </p>
//               </div>
//               <DeleteEntity entityName="maintenances" entityId={request.id} />
//             </div>
//             <p className="text-gray-700">{request.details}</p>
//             <p className="text-gray-500">
//               Available: {new Date(request.available_datetime).toLocaleString()}
//             </p>
//             <div className="flex justify-end space-x-2">
//               {/* <button className="text-green-500 hover:text-green-600 transition-colors">
//                 <Check className="w-5 h-5" />
//               </button>
//               <button className="text-red-500 hover:text-red-600 transition-colors">
//                 <X className="w-5 h-5" />
//               </button> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MaintenancePage;


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

  // console.log(maintenanceRequests);
  // console.log(maintenanceRequests);
  

  const renderCard = (card) => (

    

    <div
      // key={card.id}
      key={(Math.floor(Math.random()*10))}
      className={`border rounded-2xl p-6 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg 
        ${selectedCard.id === card.id ? "bg-blue-50 border-blue-200" : "bg-white"}
        `
    }
      onClick={() =>{
       setSelectedCard(card)}
      }
      
    >
      <h2 className="font-semibold text-lg mb-3">{card.title}</h2>
      <p className="text-gray-600 mb-2">{card.category}</p>
      <div className="flex items-center justify-between mt-4">
        <p
          className={`text-sm font-medium ${
            card.status === "Critical"
              ? "text-red-500"
              : card.status === "Moderate"
              ? "text-yellow-600"
              : "text-green-500"
          }`}
        >
          {card.status}
        </p>
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            card.status === "New"
              ? "bg-red-100 text-red-800"
              : card.status === "Updated"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {card.stage}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="m-2 flow-root">
        <h1 className="text-3xl text-gray-600 font-bold float-left">View Maintenance</h1>
        <div className=" flex float-right">
           <AddMaintenanceButton onAddMaintenance={handleAddMaintenance}/>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* First row: 1 normal + 1 expanded (spanning 2 cols) */}
        {maintenanceRequests.slice(0, 1).map(renderCard)}
        {(selectedCard.length !=0) && (
          <div className="col-span-2 row-span-3 border rounded-2xl p-8 shadow-lg bg-white">
            <div className="flex gap-48">
            <h2 className="font-bold text-2xl mb-4">{selectedCard.title}</h2>
            <div className="flex gap-5 justify-center items-center">
            <DeleteEntity entityId={selectedCard.id} entityName="maintenances"/>
            <StatusUpdateButton cardId={selectedCard.id} />
            </div>

            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
              <p className="text-gray-500 pb-5">
                  {selectedCard.request_type } {selectedCard.request_type? "|":""} {selectedCard.category} {selectedCard.category? "|":""}{" "}
                  {selectedCard.sub_category}
                </p>
                <span className="font-semibold">Category:</span> {selectedCard.category}
              </p>
              <div className="flex items-center space-x-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Stage:</span>{' '}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      selectedCard.stage === "New"
                        ? "bg-red-100 text-red-800"
                        : selectedCard.status === "Updated"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedCard.stage}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{' '}
                  <span
                    className={`font-medium ${
                      selectedCard.status === "Critical"
                        ? "text-red-500"
                        : selectedCard.Status === "Moderate"
                        ? "text-yellow-600"
                        : "text-green-500"
                    }`}
                  >
                    {selectedCard.status}
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCard.details}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Second row: 1 normal card */}
        {maintenanceRequests.slice(1, 2).map(renderCard)}
        
        {/* Third row: 1 normal card */}
        {maintenanceRequests.slice(2, 3).map(renderCard)}
        
        {/* Remaining cards in a 3-column grid */}
        {maintenanceRequests.slice(3).map(renderCard)}
      </div>
    </div>
  );
};

export default MaintenanceDashboard;