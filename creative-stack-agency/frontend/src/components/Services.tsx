import React, { useState } from 'react';
import { motion } from 'motion/react';
import { services, Service } from '../data/services';
import ServiceModal from './ServiceModal';

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleHireUs = (serviceTitle: string) => {
    window.dispatchEvent(new CustomEvent('select-service', { 
      detail: { service: serviceTitle } 
    }));
    window.location.hash = 'contact';
  };

  return (
    <section id="services" className="px-8 py-24 bg-secondary font-sans text-white">
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

      <h2 className="text-center text-4xl font-bold font-display text-white mb-16">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <motion.div 
            key={service.id} 
            whileHover={{ y: -10 }}
            className="bg-primary p-6 rounded-3xl border border-white/10 shadow-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition flex flex-col space-y-4"
          >
            <img loading="lazy" src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-2xl" />
            <h3 className="text-2xl font-bold font-display text-white">{service.title}</h3>
            <p className="text-gray-400 text-sm flex-grow">{service.description}</p>
            <ul className="text-accent text-xs space-y-1">
              {service.benefits.map(b => <li key={b}>✓ {b}</li>)}
            </ul>
            <div className="text-gray-500 font-bold text-lg pt-2">Pricing: Custom</div>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => handleHireUs(service.title)}
                className="flex-grow py-3 bg-accent text-primary font-bold rounded-full hover:bg-white hover:text-primary transition cursor-pointer"
              >
                Hire Us
              </button>
              <button 
                onClick={() => setSelectedService(service)}
                className="flex-grow py-3 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition cursor-pointer"
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
