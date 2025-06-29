'use client';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🕵️ Spy Cat Agency - Test Page
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Form Test</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter cat name"
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
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Breed
              </label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a breed</option>
                <option value="Siamese">Siamese</option>
                <option value="Persian">Persian</option>
                <option value="Maine Coon">Maine Coon</option>
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
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Spy Cat
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Interactive Test</h2>
          <button
            onClick={() => alert('Button clicked!')}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 mr-4"
          >
            Test Click
          </button>
          
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Test typing here"
          />
        </div>
      </div>
    </div>
  );
}
