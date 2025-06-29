'use client';

import { useState, useEffect } from 'react';
import { SpyCat, SpyCatCreate, SpyCatUpdate } from '@/types';
import { apiService } from '@/services/api';
import SpyCatForm from '@/components/SpyCatForm';
import SpyCatList from '@/components/SpyCatList';

export default function Home() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching cats from API...');
      const catsData = await apiService.getSpyCats();
      console.log('Cats data received:', catsData);
      setCats(catsData);
    } catch (error) {
      console.error('Error fetching cats:', error);
      setError('Failed to fetch spy cats. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCat = async (catData: SpyCatCreate) => {
    try {
      setSubmitting(true);
      setError(null);
      const newCat = await apiService.createSpyCat(catData);
      setCats(prev => [...prev, newCat]);
      setShowForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create spy cat');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCat = async (id: number, update: SpyCatUpdate) => {
    try {
      setError(null);
      const updatedCat = await apiService.updateSpyCat(id, update);
      setCats(prev => prev.map(cat => cat.id === id ? updatedCat : cat));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update spy cat');
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      setError(null);
      console.log(`Attempting to delete cat with ID: ${id}`);
      await apiService.deleteSpyCat(id);
      console.log(`Successfully deleted cat with ID: ${id}`);
      setCats(prev => prev.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting cat:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete spy cat');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🕵️ Spy Cat Agency
          </h1>
          <p className="text-lg text-gray-700">
            Manage your elite spy cats and their missions
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold text-red-800 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        {/* Add Cat Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-lg"
          >
            {showForm ? 'Cancel' : 'Add New Spy Cat'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8">
            <SpyCatForm
              onSubmit={handleCreateCat}
              onCancel={() => setShowForm(false)}
              loading={submitting}
            />
          </div>
        )}

        {/* Cat List */}
        <SpyCatList
          cats={cats}
          onEdit={handleUpdateCat}
          onDelete={handleDeleteCat}
          loading={loading}
        />
      </div>
    </div>
  );
}
