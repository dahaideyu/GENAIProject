'use client';

import { useState } from 'react';

export function MesConnectionForm() {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [testResult, setTestResult] = useState('');

  const handleTestConnection = async () => {
    setTestResult('Testing connection...');
    // In a real application, you would make an API call to your backend
    // which would then attempt to connect to the MES with the provided credentials.
    // For this mock, we'll simulate a success or failure.
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (apiEndpoint && username && password) {
        setTestResult('Connection successful!');
      } else {
        setTestResult('Connection failed: Please fill all fields.');
      }
    } catch (error) {
      setTestResult('Connection failed: An error occurred.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700">API Endpoint</label>
        <input
          type="text"
          id="apiEndpoint"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleTestConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Test Connection
      </button>
      {testResult && <p className="mt-2 text-sm text-gray-600">{testResult}</p>}
    </div>
  );
}
