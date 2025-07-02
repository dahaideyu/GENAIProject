'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export default function Dashboard() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/mes');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const getChartData = () => {
    const statusCounts = {
      'Pending': 0,
      'In Progress': 0,
      'Completed': 0,
    };

    orders.forEach(order => {
      statusCounts[order.status]++;
    });

    return {
      labels: ['Pending', 'In Progress', 'Completed'],
      datasets: [
        {
          label: 'Number of Orders',
          data: [statusCounts.Pending, statusCounts['In Progress'], statusCounts.Completed],
          backgroundColor: [
            'rgba(255, 206, 86, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Production Order Status Overview',
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Production Dashboard</h1>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Status Distribution</h2>
        <Bar data={getChartData()} options={options} />
      </div>
      {/* You can add more charts and analytics here */}
    </div>
  );
}
