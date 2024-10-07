import React from 'react';
import { Upload } from "@/app/types/upload";

interface HistoryProps {
  uploads: Upload[];
}

const History: React.FC<HistoryProps> = ({ uploads }) => {
  return (
    <section className="py-16 px-4 bg-gray-900 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">History</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{upload.title}</h3>
            <p className="text-sm text-gray-400">Uploaded on: {upload.timestamp}</p>
            <p className="text-gray-300 mt-2">{upload.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
