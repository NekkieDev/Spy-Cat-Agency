'use client';

import { useState } from 'react';

export default function TestInputs() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Type something in the input below');

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-black mb-4">Test Interface</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Test Input:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setMessage(`You typed: ${e.target.value}`);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            placeholder="Type here..."
          />
        </div>

        <div className="mb-4">
          <button
            onClick={() => {
              alert('Button works!');
              setMessage('Button clicked!');
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Test Button
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-black">{message}</p>
          <p className="text-black mt-2">Current input value: "{name}"</p>
        </div>
      </div>
    </div>
  );
}
