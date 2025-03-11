import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Mock data for featured properties
const featuredProperties = [
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
  },
];

const PropertyCard: React.FC<{
  property: typeof featuredProperties[0];
}> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-custom transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium">
            {property.type}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={14} className="mr-1" />
            {property.location}
          </div>
          
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center text-amber-500 mr-2">
              <Star size={16} className="fill-current" />
              <span className="ml-1 font-medium">{property.rating}</span>
            </div>
            <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
          </div>
          
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
    </Link>
  );
};

const FeaturedProperties: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-gray-600">Handpicked properties from our trusted hosts</p>
          </div>
          <Link to="/search" className="hidden md:block btn btn-outline px-4 py-2">
            View All
          </Link>
        </div>
        
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {featuredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/search" className="btn btn-outline px-6 py-2">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;