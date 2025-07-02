import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-4">Something went wrong. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}