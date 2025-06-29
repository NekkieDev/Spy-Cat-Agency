'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    setMessage('Frontend is working!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🕵️ Spy Cat Agency - TEST
          </h1>
          <p className="text-lg text-gray-700">
            {message}
          </p>
          <button 
            onClick={() => setMessage('Button clicked!')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}
