export default function RecommendationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">AI-Driven Production Recommendations</h1>
      <p className="mt-4">AI-driven recommendations for optimizing production will be displayed here.</p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sample Recommendation</h2>
        <p><strong>Recommendation:</strong> Adjust production line B to prioritize Product X for the next 24 hours.</p>
        <p className="mt-2"><strong>Reasoning:</strong> Analysis of current MES data indicates a potential bottleneck in Product X production, which could impact upcoming high-priority sales orders. Prioritizing this product on line B will help mitigate the risk and ensure on-time delivery.</p>
        <div className="mt-4 flex space-x-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Accept Recommendation</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Dismiss Recommendation</button>
        </div>
      </div>
    </div>
  );
}
