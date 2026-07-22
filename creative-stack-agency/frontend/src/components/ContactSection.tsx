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
    <section id="contact" className="px-4 py-16 sm:px-6 md:px-8 md:py-24 bg-primary text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-10 sm:mb-16">Let's Build Something Amazing Together</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <div className="space-y-8">
            <div className="bg-secondary p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-display">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3"><MapPin className="text-accent" /> Pakistan & Global Remote</p>
                <p className="flex items-center gap-3"><Mail className="text-accent" /> contact@creativestackagency.com</p>
                <p className="flex items-center gap-3"><Phone className="text-accent" /> +92 (302) 743-4569</p>
                <p className="flex items-center gap-3">
                  <SiWhatsapp className="text-[#25D366]" size={20} /> 
                  <a href="https://wa.me/923027434569" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-secondary p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-4">
              <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 font-display"><Clock className="text-accent" /> Business Hours</h3>
              <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
              <p>Sat: 10:00 AM – 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>

            <div className="h-64 bg-secondary rounded-3xl flex flex-col items-center justify-center border border-white/10 shadow-xl p-6 text-center space-y-3">
              <MapPin className="text-accent w-10 h-10 animate-bounce" />
              <h4 className="font-bold text-lg font-display">Global Digital Agency</h4>
              <p className="text-gray-400 text-sm max-w-sm">Serving clients worldwide with advanced web development, customized software, and digital marketing.</p>
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
                  className="bg-secondary p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl space-y-6 h-full flex flex-col justify-between"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-6">
                    {/* Honeypot Spam Protection */}
                    <div className="hidden">
                      <label>Leave this field blank</label>
                      <input type="text" name="honeypot" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Muhammad Ali" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="e.g. ali@example.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Service or Course *</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition"
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
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Message *</label>
                      <textarea 
                        placeholder="Tell us about your project requirements..." 
                        rows={4} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* reCAPTCHA Placeholder */}
                  <div className="text-[10px] text-gray-500 text-center">
                    This site is protected by reCAPTCHA and the Google 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Privacy Policy</a> and
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline mx-1">Terms of Service</a> apply.
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-4 mt-6 bg-accent text-primary font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-secondary p-8 md:p-12 rounded-3xl border border-accent/30 shadow-[0_0_30px_rgba(0,212,255,0.1)] flex flex-col items-center justify-center text-center space-y-6 h-full absolute inset-0"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent animate-bounce">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold font-display text-white">Message Received!</h3>
                  <p className="text-gray-300 max-w-md">
                    Thank you, <strong className="text-accent">{formData.name}</strong>! Your request regarding <span className="text-accent">"{formData.service}"</span> has been transmitted successfully.
                  </p>
                  <p className="text-sm text-gray-400 max-w-sm">
                    Our team will reach out to you at <strong className="text-white">{formData.email}</strong> or via WhatsApp shortly.
                  </p>
                  <button 
                    onClick={handleReset}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition mt-4"
                  >
                    Submit Another Message
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
