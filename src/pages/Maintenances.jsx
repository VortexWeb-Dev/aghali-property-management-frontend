// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PlusCircle, Check, X } from 'lucide-react';

// const MaintenancePage = () => {
//   const [maintenanceRequests, setMaintenanceRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMaintenanceRequests = async () => {
//       try {
//         const response = await axios.get('/api/maintenances');
//         setMaintenanceRequests(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMaintenanceRequests();
//   }, []);

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Maintenance</h1>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
//           <PlusCircle className="w-5 h-5" />
//           Add Request
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {maintenanceRequests.map((request) => (
//           <div key={request.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-lg font-medium">{request.title}</h3>
//                 <p className="text-gray-500">{request.request_type} | {request.category} | {request.sub_category}</p>
//               </div>
//               <span className="px-2 py-1 rounded-full bg-gray-500 text-white">
//                 Pending
//               </span>
//             </div>
//             <p className="text-gray-700">{request.details}</p>
//             <p className="text-gray-500">Available: {new Date(request.available_datetime).toLocaleString()}</p>
//             <div className="flex justify-end space-x-2">
//               <button className="text-green-500 hover:text-green-600 transition-colors">
//                 <Check className="w-5 h-5" />
//               </button>
//               <button className="text-red-500 hover:text-red-600 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MaintenancePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X } from 'lucide-react';
import AddMaintenanceButton from './../components/AddMaintenance';

const MaintenancePage = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch maintenance requests
  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await axios.get('/api/maintenances');
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
    setMaintenanceRequests(prev => [newRequest, ...prev]);
  };

  // Render loading state
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  
  // Render error state
  if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Add Request Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Maintenance</h1>
        <AddMaintenanceButton onAddMaintenance={handleAddMaintenance} />
      </div>

      {/* Maintenance Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maintenanceRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{request.title}</h3>
                <p className="text-gray-500">{request.request_type} | {request.category} | {request.sub_category}</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-gray-500 text-white">
                Pending
              </span>
            </div>
            <p className="text-gray-700">{request.details}</p>
            <p className="text-gray-500">Available: {new Date(request.available_datetime).toLocaleString()}</p>
            <div className="flex justify-end space-x-2">
              <button className="text-green-500 hover:text-green-600 transition-colors">
                <Check className="w-5 h-5" />
              </button>
              <button className="text-red-500 hover:text-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenancePage;