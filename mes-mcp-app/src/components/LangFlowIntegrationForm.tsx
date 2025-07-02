'use client';

import { useState } from 'react';

export function LangFlowIntegrationForm() {
  const [langFlowApi, setLangFlowApi] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState('');

  const handleSaveIntegration = async () => {
    setIntegrationStatus('Saving integration...');
    // Simulate API call to save LangFlow configuration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (langFlowApi) {
        setIntegrationStatus('LangFlow integration saved successfully!');
      } else {
        setIntegrationStatus('Saving failed: Please provide LangFlow API endpoint.');
      }
    } catch (error) {
      setIntegrationStatus('Saving failed: An error occurred.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="langFlowApi" className="block text-sm font-medium text-gray-700">LangFlow API Endpoint</label>
        <input
          type="text"
          id="langFlowApi"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={langFlowApi}
          onChange={(e) => setLangFlowApi(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="selectedModel" className="block text-sm font-medium text-gray-700">Select Model</label>
        <select
          id="selectedModel"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="">-- Select a model --</option>
          <option value="model1">Analysis Model 1</option>
          <option value="model2">Optimization Model 2</option>
        </select>
      </div>
      <button
        onClick={handleSaveIntegration}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Save Integration
      </button>
      {integrationStatus && <p className="mt-2 text-sm text-gray-600">{integrationStatus}</p>}
    </div>
  );
}
