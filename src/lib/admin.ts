import { supabase } from './supabase';
import type { UserWithProfile, UserRole } from './types';

export const adminApi = {
  // List all users with their profiles
  listUsers: async (): Promise<UserWithProfile[]> => {
    const { data: users, error } = await supabase
      .from('profiles')
      .select(`
        *,
        properties_count:properties(count)
      `);

    if (error) throw error;
    return users || [];
  },

  // Update user role
  updateUserRole: async (userId: string, role: UserRole): Promise<void> => {
    const { error } = await supabase
      .rpc('update_user_role', {
        user_id: userId,
        new_role: role
      });

    if (error) throw error;
  },

  // Get admin dashboard stats
  getStats: async () => {
    const { data: stats, error } = await supabase
      .rpc('get_admin_stats');

    if (error) throw error;
    return stats;
  },

  // List all properties for admin
  listAllProperties: async () => {
    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        amenities:property_amenities(*),
        host:profiles!properties_host_id_fkey(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return properties || [];
  },

  // Update property status
  updatePropertyStatus: async (propertyId: string, status: 'pending' | 'active' | 'inactive') => {
    const { error } = await supabase
      .from('properties')
      .update({ status })
      .eq('id', propertyId);

    if (error) throw error;
  },
};