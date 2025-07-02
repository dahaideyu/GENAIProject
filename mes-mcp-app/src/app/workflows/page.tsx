'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Workflow {
  id: string;
  name: string;
  description: string;
  langflowId: string;
  owner: string;
  lastModified: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const response = await fetch('/api/langflow');
      const data = await response.json();
      setWorkflows(data);
    };

    fetchWorkflows();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Workflows</h1>

      <div className="mb-4">
        <Link href="/workflows/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create New Workflow
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">LangFlow ID</th>
              <th className="py-2 px-4 border-b">Owner</th>
              <th className="py-2 px-4 border-b">Last Modified</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((workflow) => (
              <tr key={workflow.id}>
                <td className="py-2 px-4 border-b">{workflow.name}</td>
                <td className="py-2 px-4 border-b">{workflow.description}</td>
                <td className="py-2 px-4 border-b">{workflow.langflowId}</td>
                <td className="py-2 px-4 border-b">{workflow.owner}</td>
                <td className="py-2 px-4 border-b">{new Date(workflow.lastModified).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/workflows/${workflow.id}`}>
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm">
                      View/Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
