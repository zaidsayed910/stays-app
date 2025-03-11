import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import PopularDestinations from '../components/home/PopularDestinations';
import PropertyTypes from '../components/home/PropertyTypes';
import Testimonials from '../components/home/Testimonials';
import BecomeHost from '../components/home/BecomeHost';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <PropertyTypes />
      <FeaturedProperties />
      <PopularDestinations />
      <Testimonials />
      <BecomeHost />
    </div>
  );
};

export default HomePage;