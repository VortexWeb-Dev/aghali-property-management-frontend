import React, { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

const AddAccountingButton = ({ onAddTransaction }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    transaction_type: "",
    amount: "",
    transaction_date: "",
    due_date: "",
    payment_status: "",
    payment_method: "",
    invoice_number: "",
    notes: "",
    property: { id: "" },
    tenant: { id: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested property and tenant
    if (name === "property_id") {
      setNewTransaction((prev) => ({
        ...prev,
        property: { id: value },
      }));
    } else if (name === "tenant_id") {
      setNewTransaction((prev) => ({
        ...prev,
        tenant: { id: value },
      }));
    } else {
      setNewTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitTransaction = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Transform dates to ISO string
      const requestPayload = {
        ...newTransaction,
        transaction_date: new Date(
          newTransaction.transaction_date
        ).toISOString(),
        due_date: new Date(newTransaction.due_date).toISOString(),
        amount: parseFloat(newTransaction.amount),
      };

      // Make POST request
      const response = await axios.post(
        "http://3.110.171.244/api/accountings",
        requestPayload
      );

      // Call parent's add transaction function
      onAddTransaction(response.data);

      // Close modal and reset form
      setShowModal(false);
      setNewTransaction({
        transaction_type: "",
        amount: "",
        transaction_date: "",
        due_date: "",
        payment_status: "",
        payment_method: "",
        invoice_number: "",
        notes: "",
        property: { id: "" },
        tenant: { id: "" },
      });
    } catch (err) {
      console.error("Failed to add transaction", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        Add Transaction
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Transaction</h2>
            <form onSubmit={handleSubmitTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Transaction Type</label>
                  <select
                    name="transaction_type"
                    value={newTransaction.transaction_type}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Type</option>
                    <option value="Rent">Rent</option>
                    <option value="Security Deposit">Security Deposit</option>
                    <option value="Maintenance Charge">
                      Maintenance Charge
                    </option>
                    <option value="Late Fee">Late Fee</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="w-full border rounded p-2"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Transaction Date</label>
                  <input
                    type="datetime-local"
                    name="transaction_date"
                    value={newTransaction.transaction_date}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2">Due Date</label>
                  <input
                    type="datetime-local"
                    name="due_date"
                    value={newTransaction.due_date}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Payment Status</label>
                  <select
                    name="payment_status"
                    value={newTransaction.payment_status}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Payment Method</label>
                  <select
                    name="payment_method"
                    value={newTransaction.payment_method}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Method</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Invoice Number</label>
                  <input
                    type="text"
                    name="invoice_number"
                    value={newTransaction.invoice_number}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    placeholder="Enter invoice number"
                  />
                </div>
                <div>
                  <label className="block mb-2">Property ID</label>
                  <input
                    type="number"
                    name="property_id"
                    value={newTransaction.property.id}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Tenant ID</label>
                  <input
                    type="number"
                    name="tenant_id"
                    value={newTransaction.tenant.id}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={newTransaction.notes}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 h-24"
                  placeholder="Additional notes"
                ></textarea>
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
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Add Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAccountingButton;
