import React, { createContext, useContext, useState, useEffect } from 'react';
import { propertiesApi } from '../lib/api';
import type { PropertyWithDetails } from '../lib/types';
import toast from 'react-hot-toast';

interface PropertiesContextType {
  properties: PropertyWithDetails[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<PropertyWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertiesApi.list();
      setProperties(data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch properties'));
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        loading,
        error,
        refetch: fetchProperties,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};