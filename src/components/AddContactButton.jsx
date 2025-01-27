import React, { useState } from "react";
import axios from "axios";

const AddContactButton = ({ onAddContact, isLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedUrl = await Promise.all(
        files.map(async (file) => {
          const { data } = await axios.post(
            "https://vortexwebpropertymanagement.com/api/files/presigned-url",
            {
              key: file.name,
              contentType: file.type,
            }
          );

          // Upload file to S3 using the pre-signed URL
          await axios.put(data.presignedUrl.presignedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          return `https://aghali.s3.ap-south-1.amazonaws.com/${file.name}`;
          // return data.publicUrl; // Store the public URL
        })
      );

      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      setNewContact((prev) => ({
        ...prev,
        ...(imageFiles.length > 0 && { avatar: uploadedUrl }),
      }));
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact(newContact);
    setShowModal(false);
    // Reset form
    setNewContact({
      name: "",
      email: "",
      phone: "",
      avatar: "",
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Contact
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Contact</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="photos"
                  multiple
                  className="block w-full border p-2 rounded"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Adding..." : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContactButton;
