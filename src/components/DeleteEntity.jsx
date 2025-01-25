import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const DeleteEntity = ({entityName, entityId }) => {
    const navigate = useNavigate()
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://3.110.171.244:3000/${entityName}/${entityId}`);
      if (response.status === 200) {
        navigate(`/${entityName}`)
        toast.success('Property deleted successfully!');
      }
    } catch (error) {
      toast.error('Error deleting property');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="h-5 p-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 flex justify-center items-center "
    >
      <Trash2 className="w-5 h-5" />

    </button>
  );
};

export default DeleteEntity;
