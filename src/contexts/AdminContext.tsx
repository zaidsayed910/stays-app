import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi } from '../lib/admin';
import type { UserWithProfile, PropertyWithDetails } from '../lib/types';
import toast from 'react-hot-toast';

interface AdminContextType {
  users: UserWithProfile[];
  properties: PropertyWithDetails[];
  loading: boolean;
  error: Error | null;
  refetchUsers: () => Promise<void>;
  refetchProperties: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [properties, setProperties] = useState<PropertyWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.listUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.listAllProperties();
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
    fetchUsers();
    fetchProperties();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        users,
        properties,
        loading,
        error,
        refetchUsers: fetchUsers,
        refetchProperties: fetchProperties,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};