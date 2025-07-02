import { NextResponse } from 'next/server';

export interface SalesOrder {
  id: string;
  product: string;
  quantity: number;
  deliveryDate: string;
}

let salesOrders: SalesOrder[] = [
  { id: 'SO1', product: 'Product A', quantity: 100, deliveryDate: '2025-07-10' },
  { id: 'SO2', product: 'Product B', quantity: 220, deliveryDate: '2025-07-12' },
  { id: 'SO3', product: 'Product C', quantity: 150, deliveryDate: '2025-07-15' },
  { id: 'SO4', product: 'Product D', quantity: 50, deliveryDate: '2025-07-20' },
];

export async function GET() {
  return NextResponse.json(salesOrders);
}
