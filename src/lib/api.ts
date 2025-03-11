import { supabase } from './supabase';
import type { Property, PropertyImage, PropertyAmenity, PropertyWithDetails } from './types';

export const propertiesApi = {
  // List all active properties
  list: async (): Promise<PropertyWithDetails[]> => {
    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        amenities:property_amenities(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return properties || [];
  },

  // Get a single property by ID
  get: async (id: string): Promise<PropertyWithDetails | null> => {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        amenities:property_amenities(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // List properties for a specific host
  listByHost: async (hostId: string): Promise<PropertyWithDetails[]> => {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        amenities:property_amenities(*)
      `)
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create a new property
  create: async (
    property: Omit<Property, 'id' | 'host_id' | 'status' | 'created_at' | 'updated_at'>,
    images: string[],
    amenities: string[]
  ): Promise<PropertyWithDetails> => {
    // Start a transaction
    const { data: propertyData, error: propertyError } = await supabase
      .from('properties')
      .insert({
        ...property,
        host_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (propertyError) throw propertyError;

    // Add images
    if (images.length > 0) {
      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(
          images.map(url => ({
            property_id: propertyData.id,
            url,
          }))
        );

      if (imagesError) throw imagesError;
    }

    // Add amenities
    if (amenities.length > 0) {
      const { error: amenitiesError } = await supabase
        .from('property_amenities')
        .insert(
          amenities.map(name => ({
            property_id: propertyData.id,
            name,
          }))
        );

      if (amenitiesError) throw amenitiesError;
    }

    // Get the complete property with details
    return await propertiesApi.get(propertyData.id) as PropertyWithDetails;
  },

  // Update a property
  update: async (
    id: string,
    updates: Partial<Property>,
    images?: string[],
    amenities?: string[]
  ): Promise<PropertyWithDetails> => {
    // Update property details
    const { error: propertyError } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id);

    if (propertyError) throw propertyError;

    // Update images if provided
    if (images) {
      // Delete existing images
      await supabase
        .from('property_images')
        .delete()
        .eq('property_id', id);

      // Add new images
      if (images.length > 0) {
        const { error: imagesError } = await supabase
          .from('property_images')
          .insert(
            images.map(url => ({
              property_id: id,
              url,
            }))
          );

        if (imagesError) throw imagesError;
      }
    }

    // Update amenities if provided
    if (amenities) {
      // Delete existing amenities
      await supabase
        .from('property_amenities')
        .delete()
        .eq('property_id', id);

      // Add new amenities
      if (amenities.length > 0) {
        const { error: amenitiesError } = await supabase
          .from('property_amenities')
          .insert(
            amenities.map(name => ({
              property_id: id,
              name,
            }))
          );

        if (amenitiesError) throw amenitiesError;
      }
    }

    // Get the updated property with details
    return await propertiesApi.get(id) as PropertyWithDetails;
  },

  // Delete a property
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Search properties
  search: async (params: {
    location?: string;
    type?: string[];
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
  }): Promise<PropertyWithDetails[]> => {
    let query = supabase
      .from('properties')
      .select(`
        *,
        images:property_images(*),
        amenities:property_amenities(*)
      `)
      .eq('status', 'active');

    if (params.location) {
      query = query.ilike('location', `%${params.location}%`);
    }

    if (params.type && params.type.length > 0) {
      query = query.in('type', params.type);
    }

    if (params.minPrice !== undefined) {
      query = query.gte('price', params.minPrice);
    }

    if (params.maxPrice !== undefined) {
      query = query.lte('price', params.maxPrice);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Filter by amenities in memory since we can't do it in the query
    let properties = data || [];
    if (params.amenities && params.amenities.length > 0) {
      properties = properties.filter(property =>
        params.amenities!.every(amenity =>
          property.amenities.some(a => a.name === amenity)
        )
      );
    }

    return properties;
  },
};