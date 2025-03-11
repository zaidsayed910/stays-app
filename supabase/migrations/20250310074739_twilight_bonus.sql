/*
  # User Roles and Management Schema Update

  1. Changes
    - Add role column to profiles table
    - Add policies for admin access
    - Add functions for role management

  2. Security
    - Enable RLS
    - Add admin-specific policies
*/

-- Add role type
CREATE TYPE user_role AS ENUM ('user', 'host', 'admin');

-- Update profiles table
ALTER TABLE IF EXISTS profiles 
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Create admin policies for properties
CREATE POLICY "Admins can view all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete all properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Function to update user role
CREATE OR REPLACE FUNCTION update_user_role(user_id UUID, new_role user_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can update user roles';
  END IF;

  UPDATE profiles
  SET role = new_role
  WHERE id = user_id;
END;
$$;