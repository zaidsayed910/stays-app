import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: "Our stay was absolutely perfect! The apartment was exactly as described, clean, and in a great location. The host was very responsive and helpful. We will definitely book again!",
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: "This was one of the best vacation rentals we have ever stayed in. The villa was stunning with amazing views. The host went above and beyond to make our stay special. Highly recommend!",
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 4,
    text: 'We had a wonderful time at this property. It was comfortable, well-equipped, and in a perfect location for exploring the city. The only small issue was the WiFi being a bit slow.',
  },
  {
    id: '4',
    name: 'David Kim',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Exceptional experience from start to finish. The booking process was easy, the property was immaculate, and the host recommendations for local restaurants were spot on. Will definitely return!',
  },
];

const TestimonialCard: React.FC<{
  testimonial: typeof testimonials[0];
}> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-custom h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < testimonial.rating ? 'text-amber-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <div className="relative flex-grow">
        <Quote size={24} className="absolute -top-2 -left-2 text-blue-100" />
        <p className="text-gray-700 italic relative z-10 pt-2">{testimonial.text}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read reviews from guests who have experienced our properties
          </p>
        </div>
        
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;