import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const DeleteButton = ({ propertyId }) => {
    const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/properties/${propertyId}`);
      if (response.status === 200) {
        navigate("/properties")
        alert('Property deleted successfully!');
      }
    } catch (error) {
      alert('Error deleting property');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="h-5 p-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 flex justify-center items-center"
    >
      Delete 
    </button>
  );
};

export default DeleteButton;
