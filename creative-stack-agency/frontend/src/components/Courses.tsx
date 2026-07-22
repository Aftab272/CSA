import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CourseModal from './CourseModal';
import type { CourseContent } from '../types/content';

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<CourseContent | null>(null);
  const [courses, setCourses] = useState<CourseContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiBase =
    (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL?.trim() || '';
  const api = (path: string) => (apiBase ? `${apiBase.replace(/\/$/, '')}${path}` : path);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(api('/api/courses'));
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses || []);
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchCourses();
  }, []);

  return (
    <section id="courses" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-primary text-white font-sans">
      <AnimatePresence>
        {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold font-display text-white mb-10 sm:mb-16">Courses & Training</h2>
        {isLoading && <p className="text-center text-sm text-gray-400 mb-8">Loading courses...</p>}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {courses.map(course => (
            <motion.div 
              key={course._id || course.title}
              whileHover={{ y: -10 }}
              className="bg-secondary rounded-3xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img loading="lazy" src={course.image} alt={course.title} className="w-full h-44 sm:h-48 object-cover" />
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">{course.title}</h3>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-bold">{course.level}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="text-accent font-bold text-lg mb-4">Fee: {course.price}</div>
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-3 bg-accent text-primary font-bold rounded-full hover:shadow-lg transition"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
