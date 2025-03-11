import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Filter, Grid, List, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    price: 350,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Villa',
    beds: 4,
    baths: 3,
    amenities: ['Pool', 'Wifi', 'Kitchen', 'Air conditioning', 'Beach access'],
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    location: 'New York City, NY',
    price: 180,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Apartment',
    beds: 2,
    baths: 1,
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Gym', 'Doorman'],
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    price: 220,
    rating: 4.8,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Cabin',
    beds: 3,
    baths: 2,
    amenities: ['Fireplace', 'Wifi', 'Kitchen', 'Heating', 'Mountain view'],
  },
  {
    id: '4',
    title: 'Seaside Cottage',
    location: 'Cape Cod, Massachusetts',
    price: 195,
    rating: 4.6,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Cottage',
    beds: 2,
    baths: 1,
    amenities: ['Beach access', 'Wifi', 'Kitchen', 'Patio', 'BBQ grill'],
  },
  {
    id: '5',
    title: 'Luxury Penthouse with City View',
    location: 'Miami, Florida',
    price: 420,
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Penthouse',
    beds: 3,
    baths: 2,
    amenities: ['Pool', 'Wifi', 'Kitchen', 'Air conditioning', 'City view', 'Gym'],
  },
  {
    id: '6',
    title: 'Historic Townhouse',
    location: 'Boston, Massachusetts',
    price: 275,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Townhouse',
    beds: 3,
    baths: 2.5,
    amenities: ['Wifi', 'Kitchen', 'Heating', 'Historic', 'Washer/Dryer'],
  },
  {
    id: '7',
    title: 'Lakefront Retreat',
    location: 'Lake Tahoe, California',
    price: 310,
    rating: 4.8,
    reviews: 72,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'House',
    beds: 4,
    baths: 3,
    amenities: ['Lake view', 'Wifi', 'Kitchen', 'Fireplace', 'Deck'],
  },
  {
    id: '8',
    title: 'Urban Loft',
    location: 'Chicago, Illinois',
    price: 165,
    rating: 4.6,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'Loft',
    beds: 1,
    baths: 1,
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'City view', 'Exposed brick'],
  },
];

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [checkIn, setCheckIn] = useState<Date | null>(
    searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : null
  );
  const [checkOut, setCheckOut] = useState<Date | null>(
    searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : null
  );
  const [guests, setGuests] = useState(
    searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : 1
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [properties, setProperties] = useState(mockProperties);

  const amenitiesList = [
    'Wifi', 'Pool', 'Kitchen', 'Air conditioning', 'Heating', 
    'Washer/Dryer', 'Free parking', 'Gym', 'Hot tub', 'Beach access'
  ];
  
  const propertyTypes = [
    'House', 'Apartment', 'Villa', 'Cabin', 'Cottage', 
    'Penthouse', 'Loft', 'Townhouse', 'Hotel'
  ];

  useEffect(() => {
    // Filter properties based on search criteria
    let filtered = [...mockProperties];
    
    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(property => 
        selectedTypes.includes(property.type)
      );
    }
    
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property => 
        selectedAmenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    filtered = filtered.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    setProperties(filtered);
  }, [location, selectedTypes, selectedAmenities, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    if (guests) params.set('guests', guests.toString());
    
    setSearchParams(params);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const togglePropertyType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Search Bar */}
      <div className="bg-white shadow-md py-4 sticky top-16 z-40">
        <div className="container-custom">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
            <div className="flex-grow min-w-[200px]">
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={new Date()}
                  placeholderText="Check-in"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn || new Date()}
                  placeholderText="Check-out"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center transition-colors"
            >
              <Search size={18} className="mr-2" />
              Search
            </button>
          </form>
        </div>
      </div>
      
      <div className="container-custom mt-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              {location && ` in ${location}`}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-full">
                    <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              {/* Property Type */}
              <div>
                <h3 className="font-semibold mb-3">Property Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.slice(0, 6).map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => togglePropertyType(type)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.slice(0, 6).map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Property Listings */}
        {properties.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {properties.map((property) => (
              <div 
                key={property.id}
                className={`bg-white rounded-xl overflow-hidden shadow-custom transition-all duration-300 hover:shadow-lg ${
                  viewMode === 'list' ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div className={`${viewMode === 'list' ? "md:w-1/3" : ""} relative`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium">
                    {property.type}
                  </div>
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? "md:w-2/3" : ""}`}>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={14} className="mr-1" />
                    {property.location}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-amber-500 mr-2">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 font-medium">{property.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {property.amenities.slice(0, 4).map((amenity) => (
                          <span key={amenity} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 4 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            +{property.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {property.beds} beds · {property.baths} baths
                    </div>
                    <div>
                      <span className="font-bold text-lg">${property.price}</span>
                      <span className="text-gray-500 text-sm"> / night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-custom">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more options.
            </p>
            <button
              onClick={() => {
                setLocation('');
                setSelectedTypes([]);
                setSelectedAmenities([]);
                setPriceRange([0, 1000]);
                setSearchParams({});
              }}
              className="btn btn-primary px-6 py-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;