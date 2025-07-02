'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateWorkflowPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [langflowId, setLangflowId] = useState('');
  const [owner, setOwner] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/langflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        langflowId,
        owner,
      }),
    });

    if (response.ok) {
      router.push('/workflows');
    } else {
      alert('Failed to create workflow.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Workflow</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Workflow Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="langflowId" className="block text-sm font-medium text-gray-700">LangFlow ID (Optional)</label>
            <input
              type="text"
              id="langflowId"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={langflowId}
              onChange={(e) => setLangflowId(e.target.value)}
            />
            <p className="mt-1 text-sm text-gray-500">This ID would link to an actual flow in your LangFlow instance.</p>
          </div>
          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
            <input
              type="text"
              id="owner"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Workflow
          </button>
        </form>

        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">LangFlow UI Integration Note:</p>
          <p className="text-sm">In a real application, after creating the workflow here, you would typically redirect the user to the LangFlow UI (e.g., `http://your-langflow-instance/flow/${langflowId}`) to design or edit the actual flow using its visual interface. This application would primarily manage the metadata and trigger the LangFlow UI.</p>
        </div>
      </div>
    </div>
  );
}
