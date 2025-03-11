export type UserRole = 'user' | 'host' | 'admin';

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  guests: number;
  host_id: string;
  status: 'pending' | 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  created_at: string;
}

export interface PropertyAmenity {
  id: string;
  property_id: string;
  name: string;
  created_at: string;
}

export interface PropertyWithDetails extends Property {
  images: PropertyImage[];
  amenities: PropertyAmenity[];
}

export interface UserWithProfile extends Profile {
  email: string;
  properties_count?: number;
}