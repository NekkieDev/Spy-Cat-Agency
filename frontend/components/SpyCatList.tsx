'use client';

import { useState } from 'react';
import { SpyCat, SpyCatUpdate } from '@/types';

interface SpyCatListProps {
  cats: SpyCat[];
  onEdit: (id: number, update: SpyCatUpdate) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function SpyCatList({ cats, onEdit, onDelete, loading = false }: SpyCatListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSalary, setEditSalary] = useState<number>(0);

  const handleEditStart = (cat: SpyCat) => {
    setEditingId(cat.id);
    setEditSalary(cat.salary);
  };

  const handleEditSave = () => {
    if (editingId !== null) {
      onEdit(editingId, { salary: editSalary });
      setEditingId(null);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditSalary(0);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Spy Cats ({cats.length})</h2>
      </div>
      
      {cats.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-600 text-lg">No spy cats found.</p>
          <p className="text-gray-500 mt-2">Add your first spy cat to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Breed
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cats.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{cat.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{cat.years_of_experience} years</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{cat.breed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === cat.id ? (
                      <input
                        type="number"
                        value={editSalary}
                        onChange={(e) => setEditSalary(Number(e.target.value))}
                        className="w-32 px-3 py-2 text-sm border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">${cat.salary.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === cat.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleEditSave}
                          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStart(cat)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 font-medium"
                        >
                          Edit Salary
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${cat.name}?`)) {
                              onDelete(cat.id);
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
