import React from 'react';

const Page = () => {
  // Sample data structure for land information
  const landData = {
    id: 'LN001',
    name: 'Sunrise Estate',
    location: '1234 Palm Avenue, Lagos',
    size: '500 acres',
    owner: 'John Doe',
    ownershipType: 'Freehold',
    zoning: 'Residential',
    registeredDate: '2023-01-15',
    marketValue: '$5,000,000',
    transactionHistory: [
      {
        date: '2024-07-01',
        action: 'Ownership Transfer',
        previousOwner: 'Jane Smith',
        newOwner: 'John Doe',
        value: '$4,500,000',
      },
      {
        date: '2023-01-15',
        action: 'Initial Registration',
        previousOwner: 'N/A',
        newOwner: 'Jane Smith',
        value: '$4,000,000',
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Land Details</h1>

      {/* Land Basic Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-2">{landData.name}</h2>
        <p className="text-gray-700"><strong>ID:</strong> {landData.id}</p>
        <p className="text-gray-700"><strong>Location:</strong> {landData.location}</p>
        <p className="text-gray-700"><strong>Size:</strong> {landData.size}</p>
        <p className="text-gray-700"><strong>Owner:</strong> {landData.owner}</p>
        <p className="text-gray-700"><strong>Ownership Type:</strong> {landData.ownershipType}</p>
        <p className="text-gray-700"><strong>Zoning:</strong> {landData.zoning}</p>
        <p className="text-gray-700"><strong>Registered Date:</strong> {landData.registeredDate}</p>
        <p className="text-gray-700"><strong>Market Value:</strong> {landData.marketValue}</p>
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b-2 py-2">Date</th>
              <th className="border-b-2 py-2">Action</th>
              <th className="border-b-2 py-2">Previous Owner</th>
              <th className="border-b-2 py-2">New Owner</th>
              <th className="border-b-2 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {landData.transactionHistory.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b py-2">{transaction.date}</td>
                <td className="border-b py-2">{transaction.action}</td>
                <td className="border-b py-2">{transaction.previousOwner}</td>
                <td className="border-b py-2">{transaction.newOwner}</td>
                <td className="border-b py-2">{transaction.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Features */}
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">Transfer Ownership</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-4">Edit Land Details</button>
      </div>
    </div>
  );
};

export default Page;
