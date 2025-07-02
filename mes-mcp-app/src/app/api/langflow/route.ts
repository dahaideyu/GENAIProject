import { NextResponse } from 'next/server';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  langflowId: string; // ID in the actual LangFlow instance
  owner: string;
  lastModified: string;
}

let workflows: Workflow[] = [
  {
    id: '1',
    name: 'Production Optimization Flow',
    description: 'Optimizes production schedule based on MES data.',
    langflowId: 'lf-prod-opt-123',
    owner: 'admin',
    lastModified: '2025-06-28T10:00:00Z',
  },
  {
    id: '2',
    name: 'Quality Control Anomaly Detection',
    description: 'Detects anomalies in product quality data.',
    langflowId: 'lf-qc-anomaly-456',
    owner: 'john.doe',
    lastModified: '2025-06-29T14:30:00Z',
  },
];

export async function GET() {
  return NextResponse.json(workflows);
}

export async function POST(request: Request) {
  const newWorkflow: Omit<Workflow, 'id' | 'lastModified'> = await request.json();
  const createdWorkflow: Workflow = {
    ...newWorkflow,
    id: (workflows.length + 1).toString(),
    lastModified: new Date().toISOString(),
  };
  workflows.push(createdWorkflow);
  return NextResponse.json(createdWorkflow, { status: 201 });
}
