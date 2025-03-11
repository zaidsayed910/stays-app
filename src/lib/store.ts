import { create } from 'zustand';
import { propertiesApi } from './api';
import type { PropertyWithDetails } from './types';

interface PropertiesStore {
  properties: PropertyWithDetails[];
  loading: boolean;
  error: Error | null;
  fetchProperties: () => Promise<void>;
  searchProperties: (params: {
    location?: string;
    type?: string[];
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
  }) => Promise<void>;
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
  properties: [],
  loading: false,
  error: null,
  fetchProperties: async () => {
    try {
      set({ loading: true, error: null });
      const properties = await propertiesApi.list();
      set({ properties, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  searchProperties: async (params) => {
    try {
      set({ loading: true, error: null });
      const properties = await propertiesApi.search(params);
      set({ properties, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
}));