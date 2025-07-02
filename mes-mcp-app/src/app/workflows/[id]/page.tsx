'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Workflow {
  id: string;
  name: string;
  description: string;
  langflowId: string;
  owner: string;
  lastModified: string;
}

export default function WorkflowDetailPage() {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedLangflowId, setEditedLangflowId] = useState('');
  const [editedOwner, setEditedOwner] = useState('');

  useEffect(() => {
    if (id) {
      const fetchWorkflow = async () => {
        // In a real app, you'd fetch a single workflow by ID
        const response = await fetch('/api/langflow');
        const data: Workflow[] = await response.json();
        const foundWorkflow = data.find(wf => wf.id === id);
        if (foundWorkflow) {
          setWorkflow(foundWorkflow);
          setEditedName(foundWorkflow.name);
          setEditedDescription(foundWorkflow.description);
          setEditedLangflowId(foundWorkflow.langflowId);
          setEditedOwner(foundWorkflow.owner);
        }
      };
      fetchWorkflow();
    }
  }, [id]);

  const handleSave = async () => {
    if (!workflow) return;

    const updatedWorkflow = {
      ...workflow,
      name: editedName,
      description: editedDescription,
      langflowId: editedLangflowId,
      owner: editedOwner,
    };

    // In a real app, you'd send a PUT request to update the workflow
    // For this mock, we'll just update the local state
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setWorkflow(updatedWorkflow);
    setIsEditing(false);
    alert('Workflow updated successfully!');
  };

  if (!workflow) {
    return <p>Loading workflow details...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Workflow: {workflow.name}</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        {isEditing ? (
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Workflow Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="langflowId" className="block text-sm font-medium text-gray-700">LangFlow ID</label>
              <input
                type="text"
                id="langflowId"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedLangflowId}
                onChange={(e) => setEditedLangflowId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
              <input
                type="text"
                id="owner"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={editedOwner}
                onChange={(e) => setEditedOwner(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p><strong>Description:</strong> {workflow.description}</p>
            <p><strong>LangFlow ID:</strong> {workflow.langflowId}</p>
            <p><strong>Owner:</strong> {workflow.owner}</p>
            <p><strong>Last Modified:</strong> {new Date(workflow.lastModified).toLocaleString()}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit Workflow Metadata
              </button>
              <a
                href={`http://localhost:8000/flow/${workflow.langflowId}`} // Placeholder for actual LangFlow UI URL
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Open in LangFlow UI
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-bold">LangFlow UI Integration Note:</p>
          <p className="text-sm">The 'Open in LangFlow UI' button is a placeholder. In a real integration, this would link directly to the LangFlow instance where the actual flow can be visually edited. You would need to have a LangFlow instance running and accessible at the specified URL (e.g., `http://localhost:8000`).</p>
        </div>
      </div>
    </div>
  );
}
