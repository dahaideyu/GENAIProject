import { NextResponse } from 'next/server';

export interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

let productionOrders: ProductionOrder[] = [
  { id: '1', product: 'Product A', quantity: 100, dueDate: '2025-07-10', status: 'Completed' },
  { id: '2', product: 'Product B', quantity: 200, dueDate: '2025-07-12', status: 'In Progress' },
  { id: '3', product: 'Product C', quantity: 150, dueDate: '2025-07-15', status: 'Pending' },
];

export async function GET() {
  return NextResponse.json(productionOrders);
}

export async function POST(request: Request) {
  const newOrder: ProductionOrder = await request.json();
  newOrder.id = (productionOrders.length + 1).toString();
  productionOrders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedOrder: ProductionOrder = await request.json();
  const index = productionOrders.findIndex(order => order.id === updatedOrder.id);

  if (index !== -1) {
    productionOrders[index] = { ...productionOrders[index], ...updatedOrder };
    return NextResponse.json(productionOrders[index]);
  } else {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }
}
