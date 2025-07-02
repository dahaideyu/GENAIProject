'use client';

import { useEffect, useState } from 'react';

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [newDueDate, setNewDueDate] = useState('');
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState('');
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedStatus, setEditedStatus] = useState<'Pending' | 'In Progress' | 'Completed'>('Pending');

  const fetchOrders = async () => {
    const response = await fetch('/api/mes');
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmitNewOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/mes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: newProduct,
        quantity: newQuantity,
        dueDate: newDueDate,
        status: 'Pending', // New orders start as Pending
      }),
    });

    if (response.ok) {
      setNewProduct('');
      setNewQuantity(0);
      setNewDueDate('');
      fetchOrders(); // Refresh the list of orders
    } else {
      alert('Failed to create order.');
    }
  };

  const handleEditClick = (order: ProductionOrder) => {
    setEditingOrderId(order.id);
    setEditedProduct(order.product);
    setEditedQuantity(order.quantity);
    setEditedDueDate(order.dueDate);
    setEditedStatus(order.status);
  };

  const handleSaveEdit = async (orderId: string) => {
    const response = await fetch('/api/mes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: orderId,
        product: editedProduct,
        quantity: editedQuantity,
        dueDate: editedDueDate,
        status: editedStatus,
      }),
    });

    if (response.ok) {
      setEditingOrderId(null);
      fetchOrders(); // Refresh the list of orders
    } else {
      alert('Failed to update order.');
    }
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Production Orders</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create New Order</h2>
        <form onSubmit={handleSubmitNewOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
            <input
              type="text"
              id="product"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Existing Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b text-center">{order.id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      value={editedProduct}
                      onChange={(e) => setEditedProduct(e.target.value)}
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    order.product
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingOrderId === order.id ? (
                    <input
                      type="number"
                      value={editedQuantity}
                      onChange={(e) => setEditedQuantity(parseInt(e.target.value))}
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    order.quantity
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingOrderId === order.id ? (
                    <input
                      type="date"
                      value={editedDueDate}
                      onChange={(e) => setEditedDueDate(e.target.value)}
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    order.dueDate
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingOrderId === order.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value as 'Pending' | 'In Progress' | 'Completed')}
                      className="w-full border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {editingOrderId === order.id ? (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleSaveEdit(order.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(order)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
