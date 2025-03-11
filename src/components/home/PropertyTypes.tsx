import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Warehouse, Tent, Castle, Hotel } from 'lucide-react';

const propertyTypes = [
  {
    id: 'houses',
    name: 'Houses',
    count: 1243,
    icon: <Home size={24} className="text-blue-600" />,
  },
  {
    id: 'apartments',
    name: 'Apartments',
    count: 865,
    icon: <Building size={24} className="text-blue-600" />,
  },
  {
    id: 'villas',
    name: 'Villas',
    count: 427,
    icon: <Warehouse size={24} className="text-blue-600" />,
  },
  {
    id: 'cabins',
    name: 'Cabins',
    count: 315,
    icon: <Tent size={24} className="text-blue-600" />,
  },
  {
    id: 'luxury',
    name: 'Luxury',
    count: 268,
    icon: <Castle size={24} className="text-blue-600" />,
  },
  {
    id: 'hotels',
    name: 'Hotels',
    count: 189,
    icon: <Hotel size={24} className="text-blue-600" />,
  },
];

const PropertyTypeCard: React.FC<{
  type: typeof propertyTypes[0];
}> = ({ type }) => {
  return (
    <Link 
      to={`/search?type=${encodeURIComponent(type.id)}`}
      className="block group"
    >
      <div className="bg-white rounded-xl p-6 shadow-custom transition-all duration-300 hover:shadow-lg hover:bg-blue-50 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
          {type.icon}
        </div>
        <h3 className="text-lg font-semibold mb-1">{type.name}</h3>
        <p className="text-gray-500 text-sm">{type.count} properties</p>
      </div>
    </Link>
  );
};

const PropertyTypes: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Browse by Property Type</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect accommodation based on your preferences
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {propertyTypes.map((type) => (
            <PropertyTypeCard key={type.id} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;