import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUp, ArrowDown } from "lucide-react";
import AddAccountingButton from "./../components/AddAccountingButton";
import DeleteEntity from "../components/DeleteEntity";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AccountingPage = () => {
  const [accountings, setAccountings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountings = async () => {
      try {
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/accountings"
        );
        setAccountings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountings();
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setAccountings((prev) => [newTransaction, ...prev]);
  };

  const SkeletonTable = () => (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          {/* Use array for mapping table headers */}
          {["Transaction Type", "Amount", "Transaction Date", "Due Date", "Status", "Payment Method", "Invoice Number", "Notes", ""].map((header, index) => (
            <th key={index} className="py-3 px-4 text-left">
              <Skeleton width={100} /> {/* Adjust width as needed */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(5).fill(null).map((_, index) => ( // Create 5 skeleton rows
          <tr key={index} className="border-b">
            {Array(9).fill(null).map((__, cellIndex) => (
              <td key={cellIndex} className="py-3 px-4">
                <Skeleton  /> {/* Adjust width as needed */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );


  if (loading) return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        <Skeleton width={200} />
      </h1>
      <div className="flex justify-between items-center mb-6">
        <div><Skeleton width={150} /></div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <SkeletonTable />
      </div>
    </div>
  );

  if (error)
    return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">View Your Accountings</h1>

      <div className="flex justify-between items-center mb-6">
        <div>
          <AddAccountingButton onAddTransaction={handleAddTransaction} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left">Transaction Type</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Transaction Date</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Payment Method</th>
              <th className="py-3 px-4 text-left">Invoice Number</th>
              <th className="py-3 px-4 text-left">Notes</th>
              <th className="py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {accountings.length > 0 ? (
              accountings.map((accounting) => (
                <tr key={accounting.id} className="border-b">
                  <td className="py-3 px-4">{accounting.transaction_type}</td>
                  <td className="py-3 px-4">{accounting.amount}</td>
                  <td className="py-3 px-4">
                    {new Date(accounting.transaction_date).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(accounting.due_date).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{accounting.payment_status}</td>
                  <td className="py-3 px-4">{accounting.payment_method}</td>
                  <td className="py-3 px-4">{accounting.invoice_number}</td>
                  <td className="py-3 px-4">{accounting.notes}</td>
                  <td className="py-3 px-4">
                    <DeleteEntity
                      entityId={accounting.id}
                      entityName="accountings"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No accountings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingPage;