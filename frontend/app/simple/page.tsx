'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Click the button to test!');
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setMessage('Button works! 🎉');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🕵️ Spy Cat Agency
          </h1>
          <p className="text-lg text-gray-600">
            Management Dashboard
          </p>
        </div>

        {/* Test Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Frontend Test</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-lg">{message}</p>
            </div>
            
            <button
              onClick={handleButtonClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Test Button
            </button>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Input:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type something here..."
              />
              {inputValue && (
                <p className="mt-2 text-sm text-gray-600">
                  You typed: {inputValue}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Simple Form Test */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Simple Form Test</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted!');
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cat Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter cat name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience (years)
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Breed
              </label>
              <select 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a breed</option>
                <option value="Siamese">Siamese</option>
                <option value="Persian">Persian</option>
                <option value="Maine Coon">Maine Coon</option>
                <option value="British Shorthair">British Shorthair</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="50000"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Test Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
