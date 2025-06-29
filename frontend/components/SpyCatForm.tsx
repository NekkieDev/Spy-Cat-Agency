'use client';

import { useState, useEffect } from 'react';
import { SpyCatCreate } from '@/types';
import { apiService } from '@/services/api';

interface SpyCatFormProps {
  onSubmit: (cat: SpyCatCreate) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function SpyCatForm({ onSubmit, onCancel, loading = false }: SpyCatFormProps) {
  const [formData, setFormData] = useState<SpyCatCreate>({
    name: '',
    years_of_experience: 0,
    breed: '',
    salary: 0,
  });
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await apiService.getAvailableBreeds();
      setBreeds(response.breeds);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
      setErrors(['Failed to load cat breeds']);
    } finally {
      setLoadingBreeds(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // Basic validation
    const newErrors: string[] = [];
    if (!formData.name.trim()) newErrors.push('Name is required');
    if (formData.years_of_experience < 0) newErrors.push('Years of experience must be positive');
    if (!formData.breed) newErrors.push('Breed is required');
    if (formData.salary <= 0) newErrors.push('Salary must be positive');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'years_of_experience' || name === 'salary' ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Spy Cat</h2>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            placeholder="Enter spy cat name"
            required
          />
        </div>

        <div>
          <label htmlFor="years_of_experience" className="block text-sm font-semibold text-gray-900 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            id="years_of_experience"
            name="years_of_experience"
            value={formData.years_of_experience}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            placeholder="0"
            required
          />
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-semibold text-gray-900 mb-2">
            Breed
          </label>
          <select
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            required
            disabled={loadingBreeds}
          >
            <option value="">Select a breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {loadingBreeds && (
            <p className="text-sm text-gray-600 mt-2">Loading breeds...</p>
          )}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-semibold text-gray-900 mb-2">
            Salary ($)
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            placeholder="50000.00"
            required
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Spy Cat'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
