'use client';

import { useEffect, useState } from 'react';

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

interface SalesOrder {
  id: string;
  product: string;
  quantity: number;
  deliveryDate: string;
}

export default function FulfillmentPage() {
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [prodResponse, salesResponse] = await Promise.all([
        fetch('/api/mes'),
        fetch('/api/sales'),
      ]);
      const prodData = await prodResponse.json();
      const salesData = await salesResponse.json();
      setProductionOrders(prodData);
      setSalesOrders(salesData);
    };

    fetchData();
  }, []);

  const getDiscrepancies = () => {
    const discrepancies: string[] = [];

    salesOrders.forEach(salesOrder => {
      const matchingProductionOrder = productionOrders.find(
        prodOrder => prodOrder.product === salesOrder.product
      );

      if (!matchingProductionOrder) {
        discrepancies.push(
          `Sales Order ${salesOrder.id} for ${salesOrder.product} has no matching production order.`
        );
      } else {
        if (matchingProductionOrder.quantity < salesOrder.quantity) {
          discrepancies.push(
            `Production Order ${matchingProductionOrder.id} for ${matchingProductionOrder.product} has insufficient quantity (${matchingProductionOrder.quantity}) for Sales Order ${salesOrder.id} (${salesOrder.quantity}).`
          );
        }
        // Simple date comparison, can be more complex
        if (new Date(matchingProductionOrder.dueDate) > new Date(salesOrder.deliveryDate)) {
          discrepancies.push(
            `Production Order ${matchingProductionOrder.id} for ${matchingProductionOrder.product} is due after Sales Order ${salesOrder.id} delivery date.`
          );
        }
      }
    });

    return discrepancies;
  };

  const discrepancies = getDiscrepancies();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Fulfillment Analysis</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sales Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b text-center">{order.id}</td>
                  <td className="py-2 px-4 border-b text-center">{order.product}</td>
                  <td className="py-2 px-4 border-b text-center">{order.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">{order.deliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Production Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {productionOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border-b text-center">{order.id}</td>
                  <td className="py-2 px-4 border-b text-center">{order.product}</td>
                  <td className="py-2 px-4 border-b text-center">{order.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">{order.dueDate}</td>
                  <td className="py-2 px-4 border-b text-center">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Discrepancies</h2>
        {discrepancies.length > 0 ? (
          <ul className="list-disc pl-5">
            {discrepancies.map((discrepancy, index) => (
              <li key={index} className="text-red-600 mb-2">{discrepancy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No discrepancies found between sales and production orders.</p>
        )}
      </div>
    </div>
  );
}
