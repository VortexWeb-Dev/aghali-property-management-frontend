import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUp, ArrowDown } from 'lucide-react';
import AddAccountingButton from './../components/AddAccountingButton';
import DeleteEntity from '../components/DeleteEntity';

const AccountingPage = () => {
  const [accountings, setAccountings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountings = async () => {
      try {
        const response = await axios.get('http://3.110.171.244:3000/accountings');
        setAccountings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountings();
  }, []);

  // Handler to add new transaction to state
  const handleAddTransaction = (newTransaction) => {
    setAccountings(prev => [newTransaction, ...prev]);
  };

  // Render loading state
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">View Your Accountings</h1>

      <div className="flex justify-between items-center mb-6">
        <div>
          <AddAccountingButton onAddTransaction={handleAddTransaction} />
        </div>
        {/* <div className="flex items-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <ArrowUp className="w-5 h-5" />
            Income
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <ArrowDown className="w-5 h-5" />
            Expense
          </button>
        </div> */}
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
            {accountings.map((accounting) => (
              <tr key={accounting.id} className="border-b">
                <td className="py-3 px-4">{accounting.transaction_type}</td>
                <td className="py-3 px-4">{accounting.amount}</td>
                <td className="py-3 px-4">{new Date(accounting.transaction_date).toLocaleString()}</td>
                <td className="py-3 px-4">{new Date(accounting.due_date).toLocaleString()}</td>
                <td className="py-3 px-4">{accounting.payment_status}</td>
                <td className="py-3 px-4">{accounting.payment_method}</td>
                <td className="py-3 px-4">{accounting.invoice_number}</td>
                <td className="py-3 px-4">{accounting.notes}</td>
                <td className="py-3 px-4"><DeleteEntity entityId={accounting.id} entityName="accountings"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingPage;