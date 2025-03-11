/*
  # Properties Management Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `price` (numeric)
      - `type` (text)
      - `beds` (integer)
      - `baths` (numeric)
      - `guests` (integer)
      - `host_id` (uuid, foreign key)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `property_images`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `url` (text)
      - `created_at` (timestamp)
    
    - `property_amenities`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations based on user roles
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  type text NOT NULL,
  beds integer NOT NULL CHECK (beds >= 0),
  baths numeric NOT NULL CHECK (baths >= 0),
  guests integer NOT NULL CHECK (guests >= 0),
  host_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create property_amenities table
CREATE TABLE IF NOT EXISTS property_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;

-- Create policies for properties
CREATE POLICY "Public can view active properties"
  ON properties
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Hosts can view their own properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (host_id = auth.uid());

CREATE POLICY "Hosts can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (host_id = auth.uid());

CREATE POLICY "Hosts can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

CREATE POLICY "Hosts can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (host_id = auth.uid());

-- Create policies for property_images
CREATE POLICY "Public can view property images"
  ON property_images
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their property images"
  ON property_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_images.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Create policies for property_amenities
CREATE POLICY "Public can view property amenities"
  ON property_amenities
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their property amenities"
  ON property_amenities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_amenities.property_id
      AND properties.host_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();