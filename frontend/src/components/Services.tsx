import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import type { ServiceContent } from '../types/content';
import { supabase } from '../lib/supabase';

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceContent | null>(null);
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const mapped = data.map(item => ({
            ...item,
            isActive: item.is_active
          }));
          setServices(mapped as unknown as ServiceContent[]);
        } else {
          setServices([]);
        }
      } catch (error) {
        setServices([]);
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
    <section id="services" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 bg-secondary font-sans text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none hidden dark:block"></div>

      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-16 sm:mb-20 tracking-tight">Our Premium Services</h2>
        {isLoading && <p className="text-center text-sm text-gray-400 mb-8">Loading services...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service) => (
            <motion.div 
              key={service._id || service.id || service.title} 
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-white/5 dark:backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:border-blue-500/30 transition-all duration-300 flex flex-col space-y-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative overflow-hidden rounded-2xl">
                <img loading="lazy" src={service.image} alt={service.title} className="w-full h-52 sm:h-60 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent hidden dark:block"></div>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 text-base leading-relaxed grow font-light">{service.description}</p>
              
              <ul className="text-blue-400 text-sm space-y-2 font-medium">
                {service.benefits.map(b => <li key={b} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span> {b}</li>)}
              </ul>
              
              <div className="text-gray-400 font-medium text-sm pt-4 border-t border-white/10">Pricing: <span className="text-white font-bold">Custom</span></div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => handleHireUs(service.title)}
                  className="relative overflow-hidden group/btn grow py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 text-center flex items-center justify-center"
                >
                  <span className="relative z-10">Start Project</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </button>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="relative overflow-hidden group/btn grow py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 text-center flex items-center justify-center"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
