import React from 'react';
import { Link } from 'react-router-dom';
import { Home, DollarSign, Clock, Shield } from 'lucide-react';

const BecomeHost: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="bg-blue-600 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Become a Host Today
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                List your property on our platform and start earning. Join thousands of successful hosts who have found financial freedom through LeeStays.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <Home size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">List Any Property</h3>
                    <p className="text-blue-100 text-sm">
                      Houses, apartments, villas, or unique stays
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <DollarSign size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Earn More</h3>
                    <p className="text-blue-100 text-sm">
                      Set your own prices and maximize earnings
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <Clock size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Flexible Schedule</h3>
                    <p className="text-blue-100 text-sm">
                      Choose when your property is available
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Secure Platform</h3>
                    <p className="text-blue-100 text-sm">
                      Verified guests and secure payments
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/vendor/dashboard" 
                className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors self-start"
              >
                Start Hosting
              </Link>
            </div>
            
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Become a host" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeHost;