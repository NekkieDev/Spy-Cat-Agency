import { SpyCat, SpyCatCreate, SpyCatUpdate } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    console.log(`Making request to: ${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, response.headers);

    if (!response.ok) {
      let errorMessage = 'API request failed';
      try {
        const error = await response.json();
        errorMessage = error.detail || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // Check if response has content
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
      return null as T;
    }

    const responseText = await response.text();
    console.log(`Response text: ${responseText}`);
    
    if (!responseText) {
      return null as T;
    }

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', responseText);
      throw new Error('Invalid JSON response from server');
    }
  }

  // Spy Cats endpoints
  async getSpyCats(): Promise<SpyCat[]> {
    return this.request<SpyCat[]>('/cats/');
  }

  async getSpyCat(id: number): Promise<SpyCat> {
    return this.request<SpyCat>(`/cats/${id}`);
  }

  async createSpyCat(cat: SpyCatCreate): Promise<SpyCat> {
    return this.request<SpyCat>('/cats/', {
      method: 'POST',
      body: JSON.stringify(cat),
    });
  }

  async updateSpyCat(id: number, update: SpyCatUpdate): Promise<SpyCat> {
    return this.request<SpyCat>(`/cats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(update),
    });
  }

  async deleteSpyCat(id: number): Promise<void> {
    console.log(`API Service: Deleting cat with ID ${id}`);
    
    const response = await fetch(`${API_BASE_URL}/cats/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Delete response status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = 'Failed to delete cat';
      try {
        const error = await response.json();
        errorMessage = error.detail || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    console.log(`API Service: Successfully deleted cat with ID ${id}`);
  }

  async getAvailableBreeds(): Promise<{ breeds: string[] }> {
    return this.request<{ breeds: string[] }>('/cats/breeds/available');
  }
}

export const apiService = new ApiService();
