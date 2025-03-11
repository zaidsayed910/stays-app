import React from 'react';
import { Users, Award, Shield, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="About LeeStays" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container-custom py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About LeeStays</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make travel more accessible, authentic, and memorable for everyone.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                LeeStays was founded in 2020 with a simple idea: to create a platform where travelers could find unique accommodations and connect with local hosts around the world.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small project has grown into a global community of travelers and hosts who share a passion for authentic experiences and meaningful connections.
              </p>
              <p className="text-gray-700">
                Today, LeeStays offers thousands of properties across hundreds of destinations, but our mission remains the same: to help people experience the world in a more personal and authentic way.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="LeeStays team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              These core principles guide everything we do at LeeStays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-700">
                We believe in the power of human connection and building a global community of hosts and travelers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Experience</h3>
              <p className="text-gray-700">
                We're committed to providing exceptional experiences through carefully vetted properties and hosts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
              <p className="text-gray-700">
                We prioritize the safety of our community through secure payments, verified profiles, and 24/7 support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
              <p className="text-gray-700">
                We embrace diversity and believe travel should be accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The passionate people behind LeeStays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="James Wilson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">James Wilson</h3>
              <p className="text-blue-600">CEO & Co-founder</p>
            </div>

            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Chen</h3>
              <p className="text-blue-600">COO & Co-founder</p>
            </div>

            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Michael Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
              <p className="text-blue-600">CTO</p>
            </div>

            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Emily Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Emily Johnson</h3>
              <p className="text-blue-600">Head of Customer Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're looking for a place to stay or want to share your space with travelers, LeeStays is the perfect platform for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/search" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
              Find a Stay
            </a>
            <a href="/vendor/dashboard" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold">
              Become a Host
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;