import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
//   const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    listingType: 'Rent',
    listingStatus: 'Active',
    availableFrom: '',
    listingDate: '',
    expiryDate: '',
    property: null,
    listedBy: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyResponse, userResponse] = await Promise.all([
          axios.get('http://3.110.171.244:3000/properties'),
        //   axios.get('http://3.110.171.244:3000/users')
        ]);
        setProperties(propertyResponse.data);
        // setUsers(userResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertyChange = (e) => {
    setFormData({ ...formData, property: properties.find(prop => prop.id === parseInt(e.target.value)) });
  };

//   const handleListedByChange = (e) => {
//     setFormData({ ...formData, listedBy: users.find(user => user.id === parseInt(e.target.value)) });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('http://3.110.171.244:3000/listings', formData);
      navigate('/listings');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
        <button onClick={() => navigate('/listings')}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span >Back to Listings</span>
      </div>
      <h1 className="text-2xl font-bold">Create Listing</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
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
            <label htmlFor="listingType" className="block text-gray-700 font-medium">
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
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium">
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
            <label htmlFor="availableFrom" className="block text-gray-700 font-medium">
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
            <label htmlFor="listingDate" className="block text-gray-700 font-medium">
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
            <label htmlFor="expiryDate" className="block text-gray-700 font-medium">
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
          <div>
            <label htmlFor="property" className="block text-gray-700 font-medium">
              Property
            </label>
            <select
              id="property"
              name="property"
              value={formData.property?.id || ''}
              onChange={handlePropertyChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            >
              <option value="">Select a property</option>
              {properties.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.address}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="listedBy" className="block text-gray-700 font-medium">
              Listed By
            </label>
            {/* <select
              id="listedBy"
              name="listedBy"
              value={formData.listedBy?.id || ''}
              onChange={handleListedByChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select> */}
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