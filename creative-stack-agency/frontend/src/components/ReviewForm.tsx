import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Upload, Send, CheckCircle } from 'lucide-react';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [service, setService] = useState('Web Development');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'); // Default avatar
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview = {
      id: Date.now(),
      name,
      company: 'Verified Client',
      image: imageUrl,
      service,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    // Dispatch custom event so Testimonials component can update in real-time!
    window.dispatchEvent(new CustomEvent('new-review', { detail: newReview }));
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setService('Web Development');
    setComment('');
    setRating(5);
    setImage(null);
    setImageUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-secondary p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative min-h-[450px]">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-3xl font-bold font-display mb-8 text-center text-white">Share Your Experience</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Muhammad Ali" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Service Used *</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition"
                >
                  <option>Web Development</option>
                  <option>WordPress Development</option>
                  <option>Shopify Store Development</option>
                  <option>Graphic Designing</option>
                  <option>UI/UX Design</option>
                  <option>Digital Marketing</option>
                  <option>SEO</option>
                  <option>Content Writing</option>
                  <option>MS Office & Documentation</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-b border-white/5 py-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`cursor-pointer transition-all duration-200 ${star <= rating ? 'text-yellow-400 fill-current scale-110' : 'text-gray-600 hover:text-yellow-400/60'}`} 
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Feedback *</label>
                <textarea 
                  placeholder="Tell us what you liked about our agency..." 
                  rows={4} 
                  required 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 bg-primary border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent transition"
                ></textarea>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
              
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center space-x-2 p-4 bg-primary border border-dashed border-white/20 rounded-xl hover:bg-white/5 transition"
              >
                <Upload size={20} className="text-accent" />
                <span className="text-sm font-semibold">{image ? image.name : 'Upload Avatar (Optional)'}</span>
              </button>

              <button type="submit" className="w-full p-4 bg-accent text-primary font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition flex items-center justify-center space-x-2 cursor-pointer">
                <Send size={20} />
                <span>Submit Review</span>
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center space-y-6 py-12 absolute inset-0 p-8"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold font-display text-white">Review Submitted!</h3>
            <p className="text-gray-300 text-sm max-w-sm">
              Thank you, <strong className="text-accent">{name}</strong>! Your review has been submitted and added to the testimonial carousel. We highly value your feedback.
            </p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition mt-4"
            >
              Write Another Review
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
