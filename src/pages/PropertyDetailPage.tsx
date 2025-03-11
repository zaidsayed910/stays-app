import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Calendar, Wifi, Coffee, Tv, Car, Snowflake, Utensils, Heart, Share, ArrowLeft, ArrowRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Mock property data
const property = {
  id: '1',
  title: 'Luxury Beachfront Villa with Ocean Views',
  description: 'Experience the ultimate beachfront getaway in this stunning villa overlooking the Pacific Ocean. This spacious property features floor-to-ceiling windows with panoramic ocean views, a private infinity pool, and direct beach access. The modern interior includes high-end furnishings, a gourmet kitchen, and luxurious bedrooms with ensuite bathrooms. Perfect for family vacations, romantic getaways, or small gatherings with friends.',
  location: 'Malibu, California',
  price: 350,
  rating: 4.9,
  // reviews: 128,
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613977257592-4a9a32f9141b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ],
  type: 'Villa',
  beds: 4,
  baths: 3,
  guests: 8,
  amenities: [
    { name: 'Wifi', icon: <Wifi size={20} /> },
    { name: 'Kitchen', icon: <Utensils size={20} /> },
    { name: 'Air conditioning', icon: <Snowflake size={20} /> },
    { name: 'Free parking', icon: <Car size={20} /> },
    { name: 'TV', icon: <Tv size={20} /> },
    { name: 'Coffee maker', icon: <Coffee size={20} /> },
  ],
  host: {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviews: 48,
    responseRate: 99,
    responseTime: 'within an hour',
    joined: 'January 2018',
  },
  reviews: [
    {
      id: '1',
      user: {
        name: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      },
      rating: 5,
      date: 'August 2023',
      text: "This was one of the best vacation rentals we have ever stayed in. The villa was stunning with amazing views. The host went above and beyond to make our stay special. Highly recommend!",
    },
    {
      id: '2',
      user: {
        name: 'Emma Rodriguez',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      },
      rating: 4,
      date: 'July 2023',
      text: 'We had a wonderful time at this property. It was comfortable, well-equipped, and in a perfect location for exploring the area. The only small issue was the WiFi being a bit slow at times.',
    },
    {
      id: '3',
      user: {
        name: 'David Kim',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      },
      rating: 5,
      date: 'June 2023',
      text: 'Exceptional experience from start to finish. The booking process was easy, the property was immaculate, and the host recommendations for local restaurants were spot on. Will definitely return!',
    },
  ],
};

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return property.price * nights;
  };

  const totalPrice = calculateTotalPrice();
  const serviceFee = Math.round(totalPrice * 0.12);
  const cleaningFee = 75;
  const grandTotal = totalPrice + serviceFee + cleaningFee;

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Property Images */}
      <div className="relative">
        {showAllImages ? (
          <div className="container-custom py-8">
            <button 
              onClick={() => setShowAllImages(false)}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={20} className="mr-1" /> Back to property
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-[300px] md:h-[500px]">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button
                onClick={prevImage}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </div>
            
            <button
              onClick={() => setShowAllImages(true)}
              className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100"
            >
              View all photos
            </button>
          </div>
        )}
      </div>
      
      {!showAllImages && (
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Save property">
                    <Heart size={24} className="text-gray-700" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Share property">
                    <Share size={24} className="text-gray-700" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center text-amber-500 mr-3">
                  <Star size={20} className="fill-current" />
                  <span className="ml-1 font-medium">{property.rating}</span>
                </div>
                <span className="text-gray-700">({property.reviews.length} reviews)</span>
                <span className="mx-2">•</span>
                <span className="text-gray-700">{property.type}</span>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-semibold">{property.guests}</p>
                    <p className="text-gray-600">Guests</p>
                  </div>
                  <div>
                    <p className="font-semibold">{property.beds}</p>
                    <p className="text-gray-600">Beds</p>
                  </div>
                  <div>
                    <p className="font-semibold">{property.baths}</p>
                    <p className="text-gray-600">Baths</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {property.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-gray-700 mr-3">
                        {amenity.icon}
                      </div>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Host</h2>
                <div className="flex items-start">
                  <img
                    src={property.host.image}
                    alt={property.host.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{property.host.name}</h3>
                    <p className="text-gray-600 mb-2">Host since {property.host.joined}</p>
                    <div className="flex items-center mb-2">
                      <Star size={16} className="text-amber-500 fill-current mr-1" />
                      <span>{property.host.rating} · {property.host.reviews} reviews</span>
                    </div>
                    <p className="text-gray-700">
                      Response rate: {property.host.responseRate}%<br />
                      Response time: {property.host.responseTime}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="flex items-center mb-6">
                  <div className="flex items-center text-amber-500 mr-3">
                    <Star size={20} className="fill-current" />
                    <span className="ml-1 font-medium">{property.rating}</span>
                  </div>
                  <span className="text-gray-700">({property.reviews.length} reviews)</span>
                </div>
                
                <div className="space-y-6">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-3">
                        <img
                          src={review.user.image}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-custom p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-bold text-2xl">${property.price}</span>
                    <span className="text-gray-500"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-amber-500 fill-current" />
                    <span className="ml-1">{property.rating}</span>
                    <span className="mx-1">·</span>
                    <span className="text-gray-500">{property.reviews.length} reviews</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-in
                      </label>
                      <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={new Date()}
                        placeholderText="Add date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Check-out
                      </label>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date)}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={checkIn || new Date()}
                        placeholderText="Add date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Array.from({ length: property.guests }).map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} {i === 0 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Link
                  to={`/booking/${property.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
                >
                  Reserve
                </Link>
                
                {checkIn && checkOut && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">
                        ${property.price} x {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights
                      </span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Cleaning fee</span>
                      <span>${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;