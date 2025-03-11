import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (checkIn) searchParams.set('checkIn', checkIn.toISOString());
    if (checkOut) searchParams.set('checkOut', checkOut.toISOString());
    if (guests) searchParams.set('guests', guests.toString());
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative container-custom h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
          Find Your Perfect Stay Anywhere in the World
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Discover unique accommodations from trusted hosts
        </p>
        
        {/* Search Form */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSearch} className="p-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
              {/* Location */}
              <div className="relative p-3 md:border-r border-gray-200">
                <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-400 mr-2" />
                  <input
                    id="location"
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Check-in */}
              <div className="relative p-3 md:border-r border-gray-200">
                <label htmlFor="check-in" className="block text-xs font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <DatePicker
                    id="check-in"
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    placeholderText="Add date"
                    className="w-full border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
              
              {/* Check-out */}
              <div className="relative p-3 md:border-r border-gray-200">
                <label htmlFor="check-out" className="block text-xs font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <DatePicker
                    id="check-out"
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    placeholderText="Add date"
                    className="w-full border-none focus:ring-0 text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
              
              {/* Guests */}
              <div className="relative p-3 flex items-center">
                <div className="flex-grow">
                  <label htmlFor="guests" className="block text-xs font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <div className="flex items-center">
                    <Users size={18} className="text-gray-400 mr-2" />
                    <select
                      id="guests"
                      className="w-full border-none focus:ring-0 text-gray-900 text-sm"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;