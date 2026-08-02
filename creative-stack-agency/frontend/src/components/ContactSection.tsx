import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { useLocation } from 'react-router-dom';

export default function ContactSection() {
  const apiBaseUrl = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Stack Web Development',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string; message?: string }>;
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          service: customEvent.detail.service,
          message: customEvent.detail.message || prev.message || `Hi, I am interested in your ${customEvent.detail.service} service. Please share details.`
        }));
      }
    };

    window.addEventListener('select-service', handleSelectService);
    return () => {
      window.removeEventListener('select-service', handleSelectService);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedService = params.get('service');
    const selectedMessage = params.get('message');

    if (!selectedService && !selectedMessage) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      service: selectedService || prev.service,
      message:
        selectedMessage ||
        prev.message ||
        (selectedService
          ? `Hi, I am interested in your ${selectedService} service. Please share details.`
          : prev.message),
    }));
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const endpoint = apiBaseUrl ? `${apiBaseUrl.replace(/\/$/, '')}/api/inquiries` : '/api/inquiries';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          honeypot: '',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(data.message || 'Unable to submit form right now.');
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError('Network error. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Full Stack Web Development',
      message: ''
    });
    setIsSubmitted(false);
    setSubmitError('');
  };

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 md:px-8 md:py-32 bg-primary text-white font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen hidden dark:block"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-16 sm:mb-20 tracking-tight">Let's Build Something Amazing Together</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white">Contact Information</h3>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p className="flex items-center gap-4 text-lg"><MapPin className="text-blue-500 dark:text-blue-400 shrink-0" size={24} /> Pakistan & Global Remote</p>
                <div className="flex items-start gap-4 text-lg">
                  <Mail className="text-blue-500 dark:text-blue-400 shrink-0 mt-1" size={24} /> 
                  <div className="flex flex-col">
                    <a href="mailto:creativestackagency513@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">creativestackagency513@gmail.com</a>
                    <a href="mailto:maryannawazdev7780@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">maryannawazdev7780@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-lg">
                  <Phone className="text-blue-500 dark:text-blue-400 shrink-0 mt-1" size={24} /> 
                  <div className="flex flex-col">
                    <a href="tel:+923027434569" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+92 302 7434569</a>
                    <a href="tel:+923047556084" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+92 304 7556084</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-lg">
                  <SiWhatsapp className="text-[#25D366] shrink-0 mt-1" size={24} /> 
                  <div className="flex flex-col gap-1">
                    <a href="https://wa.me/923027434569" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium border-b border-transparent hover:border-[#25D366] w-fit">
                      Chat with Aftab
                    </a>
                    <a href="https://wa.me/923047556084" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium border-b border-transparent hover:border-[#25D366] w-fit">
                      Chat with Maryam
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3 font-display text-gray-900 dark:text-white"><Clock className="text-blue-500 dark:text-blue-400" size={24} /> Business Hours</h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300 text-lg">
                <p className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2"><span>Mon - Fri</span> <span className="font-medium text-gray-900 dark:text-white">9:00 AM – 6:00 PM</span></p>
                <p className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2"><span>Sat</span> <span className="font-medium text-gray-900 dark:text-white">10:00 AM – 4:00 PM</span></p>
                <p className="flex justify-between pb-2"><span>Sun</span> <span className="font-medium text-red-500 dark:text-gray-500">Closed</span></p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form with AnimatePresence Success State */}
          <div className="relative min-h-125">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-white/5 dark:backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] space-y-6 h-full flex flex-col justify-between relative overflow-hidden"
                  onSubmit={handleSubmit}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                  <div className="space-y-6 relative z-10">
                    {/* Honeypot Spam Protection */}
                    <div className="hidden">
                      <label>Leave this field blank</label>
                      <input type="text" name="honeypot" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Muhammad Ali" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-4 bg-gray-50 dark:bg-primary/50 dark:backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="e.g. ali@example.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-4 bg-gray-50 dark:bg-primary/50 dark:backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Select Service *</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full p-4 bg-gray-50 dark:bg-primary/50 dark:backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 appearance-none"
                      >
                        <optgroup label="Development Services">
                          <option>Full Stack Web Development</option>
                          <option>WordPress Development</option>
                          <option>Shopify Store Development</option>
                        </optgroup>
                        <optgroup label="Creative Design Services">
                          <option>Graphic Designing</option>
                          <option>UI/UX Design</option>
                        </optgroup>
                        <optgroup label="Marketing & Growth">
                          <option>Digital Marketing</option>
                          <option>SEO Optimization</option>
                          <option>Content Writing</option>
                        </optgroup>
                        <optgroup label="Office & Training">
                          <option>MS Office & Documentation</option>
                          <option>Web Development Course</option>
                          <option>Shopify Masterclass Course</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Your Message *</label>
                      <textarea 
                        placeholder="Tell us about your project requirements..." 
                        rows={4} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full p-4 bg-gray-50 dark:bg-primary/50 dark:backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* reCAPTCHA Placeholder */}
                  <div className="text-[10px] text-gray-500 text-center relative z-10 pt-2">
                    Protected by reCAPTCHA. Google 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition mx-1">Privacy Policy</a> &
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition mx-1">Terms</a> apply.
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 relative z-10">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden group/btn w-full p-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 z-10"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Send size={20} />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-white/5 dark:backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.15)] flex flex-col items-center justify-center text-center space-y-6 h-full absolute inset-0"
                >
                  <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400 animate-pulse">
                    <CheckCircle2 size={56} />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white">Message Received!</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md text-lg font-light leading-relaxed">
                    Thank you, <strong className="text-gray-900 dark:text-white font-semibold">{formData.name}</strong>! Your request regarding <span className="text-blue-600 dark:text-blue-400">"{formData.service}"</span> has been transmitted successfully.
                  </p>
                  <p className="text-sm text-gray-400 max-w-sm">
                    Our team will reach out to you at <strong className="text-white">{formData.email}</strong> or via WhatsApp shortly.
                  </p>
                  <button 
                    onClick={handleReset}
                    className="relative overflow-hidden group/btn px-8 py-3.5 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center"
                  >
                    <span className="relative z-10">Submit Another Message</span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
