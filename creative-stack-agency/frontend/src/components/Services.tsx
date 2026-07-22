import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import type { ServiceContent } from '../types/content';

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceContent | null>(null);
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(api('/api/services'));
        const data = await response.json();
        if (data.success) {
          setServices(data.services || []);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchServices();
  }, []);

  const handleHireUs = (serviceTitle: string) => {
    const query = new URLSearchParams({ service: serviceTitle });
    navigate(`/?${query.toString()}#contact`);
  };

  return (
    <section id="services" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-secondary font-sans text-white">
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

      <h2 className="text-center text-3xl sm:text-4xl font-bold font-display text-white mb-12 sm:mb-16">Our Services</h2>
      {isLoading && <p className="text-center text-sm text-gray-400 mb-8">Loading services...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <motion.div 
            key={service._id || service.title} 
            whileHover={{ y: -10 }}
            className="bg-primary p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition flex flex-col space-y-4"
          >
            <img loading="lazy" src={service.image} alt={service.title} className="w-full h-44 sm:h-48 object-cover rounded-2xl" />
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">{service.title}</h3>
            <p className="text-gray-400 text-sm grow">{service.description}</p>
            <ul className="text-accent text-xs space-y-1">
              {service.benefits.map(b => <li key={b}>✓ {b}</li>)}
            </ul>
            <div className="text-gray-500 font-bold text-lg pt-2">Pricing: Custom</div>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button 
                onClick={() => handleHireUs(service.title)}
                className="grow py-3 bg-accent text-primary font-bold rounded-full hover:bg-white hover:text-primary transition cursor-pointer"
              >
                Hire Us
              </button>
              <button 
                onClick={() => setSelectedService(service)}
                className="grow py-3 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
