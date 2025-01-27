import React, { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

const AddMaintenanceButton = ({ onAddMaintenance }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRequest, setNewRequest] = useState({
    request_type: "",
    category: "",
    sub_category: "",
    issue: "",
    sub_issue: "",
    title: "",
    details: "",
    property: { id: "" },
    tenant: { id: "" },
    available_datetime: "",
  });

  // Handle input changes for new request
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for nested property and tenant
    if (name === "property_id") {
      setNewRequest((prev) => ({
        ...prev,
        property: { id: value },
      }));
    } else if (name === "tenant_id") {
      setNewRequest((prev) => ({
        ...prev,
        tenant: { id: value },
      }));
    } else {
      setNewRequest((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit new maintenance request
  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Transform datetime to ISO string if not already
      const requestPayload = {
        ...newRequest,
        available_datetime: new Date(
          newRequest.available_datetime
        ).toISOString(),
      };

      // Make POST request
      const response = await axios.post(
        "https://vortexwebpropertymanagement.com/api/maintenances",
        requestPayload
      );

      // Call parent's add maintenance function
      onAddMaintenance(response.data);

      // Close modal and reset form
      setShowModal(false);
      setNewRequest({
        request_type: "",
        category: "",
        sub_category: "",
        issue: "",
        sub_issue: "",
        title: "",
        details: "",
        property: { id: "" },
        tenant: { id: "" },
        available_datetime: "",
      });
    } catch (err) {
      // Optionally handle error (you might want to pass error handling to parent)
      console.error("Failed to add maintenance request", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        Add Request
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add Maintenance Request</h2>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Request Type</label>
                  <select
                    name="request_type"
                    value={newRequest.request_type}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Type</option>
                    <option value="Basic">Basic</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    name="category"
                    value={newRequest.category}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Category</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="House Exterior">House Exterior</option>
                    <option value="Household">Household</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Appliances">Appliances</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Sub Category</label>
                  <input
                    type="text"
                    name="sub_category"
                    value={newRequest.sub_category}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                    placeholder="E.g., Lights"
                  />
                </div>
                <div>
                  <label className="block mb-2">Issue</label>
                  <input
                    type="text"
                    name="issue"
                    value={newRequest.issue}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                    placeholder="E.g., Electrical Outage"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newRequest.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block mb-2">Details</label>
                <textarea
                  name="details"
                  value={newRequest.details}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2 h-24"
                  placeholder="Provide more context about the issue"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Property ID</label>
                  <input
                    type="number"
                    name="property_id"
                    value={newRequest.property.id}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2">Tenant ID</label>
                  <input
                    type="number"
                    name="tenant_id"
                    value={newRequest.tenant.id}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Available Date/Time</label>
                <input
                  type="datetime-local"
                  name="available_datetime"
                  value={newRequest.available_datetime}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMaintenanceButton;
