import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Camera, Calendar, Star, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

  // Mock bookings data - replace with actual data from Supabase
  const bookings = [
    {
      id: '1',
      property: {
        title: 'Luxury Beachfront Villa',
        location: 'Malibu, California',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      checkIn: '2024-04-15',
      checkOut: '2024-04-20',
      totalPrice: 1750,
      status: 'upcoming',
      rating: null,
    },
    {
      id: '2',
      property: {
        title: 'Modern Downtown Apartment',
        location: 'New York City, NY',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      },
      checkIn: '2024-03-01',
      checkOut: '2024-03-05',
      totalPrice: 720,
      status: 'completed',
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl,
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleRateBooking = (bookingId: string, rating: number) => {
    // Implement rating functionality
    toast.success('Thank you for your rating!');
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`}
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-4">{firstName} {lastName}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'bookings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Calendar size={18} className="mr-3" />
                  My Bookings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 rounded-lg flex items-center text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Profile Settings</h2>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                    >
                      <Settings size={18} className="mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <Input
                    label="Email"
                    value={user.email}
                    disabled
                    className="mb-6"
                  />

                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button type="submit" isLoading={isLoading}>
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setFirstName(profile.first_name || '');
                          setLastName(profile.last_name || '');
                          setAvatarUrl(profile.avatar_url || '');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                          <div className="w-full md:w-48">
                            <img
                              src={booking.property.image}
                              alt={booking.property.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold mb-2">{booking.property.title}</h3>
                                <p className="text-gray-600 flex items-center mb-2">
                                  <MapPin size={16} className="mr-1" />
                                  {booking.property.location}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'upcoming'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-500">Check-in</p>
                                <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Check-out</p>
                                <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Total Price</p>
                                <p className="font-medium">${booking.totalPrice}</p>
                              </div>
                            </div>

                            {booking.status === 'completed' && (
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-2">Your Rating:</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => handleRateBooking(booking.id, star)}
                                      className={`${
                                        star <= (booking.rating || 0)
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    >
                                      <Star size={20} className="fill-current" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-500">When you book a stay, it will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;