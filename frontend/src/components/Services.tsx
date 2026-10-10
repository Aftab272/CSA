import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import type { ServiceContent } from '../types/content';
import { fetchPublicServices } from '../lib/api';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface ServicesProps {
  limit?: number;
  showExploreLink?: boolean;
}

export default function Services({ limit, showExploreLink }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceContent | null>(null);
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchPublicServices();
        setServices(data as ServiceContent[]);
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
    navigate(`/contact?${query.toString()}`);
  };

  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="relative px-3.5 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-secondary/40 font-sans text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none hidden dark:block"></div>

      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[11px] sm:text-xs font-semibold mb-2.5">
              <Sparkles size={13} />
              <span>What We Excel At</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
              Our Premium Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base mt-2 max-w-xl">
              Scalable, high-performance digital engineering engineered with precision and modern design standards.
            </p>
          </div>

          {showExploreLink && (
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group shrink-0"
            >
              <span>Explore All Services</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {displayedServices.map((service) => (
            <motion.div 
              key={service._id || service.id || service.title} 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group bg-white dark:bg-secondary/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/10 hover:border-blue-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-xl hover:shadow-[0_14px_35px_rgba(37,99,235,0.18)] transition-all flex flex-col h-full relative overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl h-44 sm:h-56 mb-4 sm:mb-5 shrink-0 bg-gray-100 dark:bg-primary/40">
                <img 
                  loading="lazy" 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                {service.category && (
                  <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 px-2.5 sm:px-3 py-1 bg-blue-600/95 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {service.category}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg sm:text-2xl font-bold font-display text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-3 font-light">
                {service.description}
              </p>
              
              {service.benefits && service.benefits.length > 0 && (
                <ul className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="line-clamp-1">{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-auto pt-3.5 sm:pt-4 border-t border-gray-200 dark:border-white/10 flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => handleHireUs(service.title)}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5 text-center cursor-pointer"
                >
                  Start Project
                </button>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/15 text-gray-800 dark:text-white font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
