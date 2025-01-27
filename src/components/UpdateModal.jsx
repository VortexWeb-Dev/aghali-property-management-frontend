import React, { useState } from 'react';
import axios from 'axios';

const StatusUpdateButton = ({ cardId, existingStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = [
    { value: 'Normal', label: 'Normal' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Critical', label: 'Critical' }
  ];

  const handleStatusUpdate = async () => {
    try {
      await axios.patch(`https://vortexwebpropertymanagement.com/api/maintenances/${cardId}`, {
        "status": selectedStatus
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating status:', error);
    }
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold  rounded-lg shadow-md hover:shadow-lg transition-all duration-200 h-10 w-32"
      >
        Update Status
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 text-left border rounded-lg bg-white hover:bg-gray-50 focus:outline-none"
            >
              {selectedStatus ? statusOptions.find(opt => opt.value === selectedStatus)?.label : 'Select new status'}
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      setSelectedStatus(option.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusUpdate}
            disabled={!selectedStatus}
            className={`h-10 w-32 rounded-lg text-white ${
              selectedStatus 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateButton;