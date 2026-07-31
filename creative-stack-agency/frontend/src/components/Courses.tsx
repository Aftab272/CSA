import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CourseModal from './CourseModal';
import type { CourseContent } from '../types/content';
import { courses as staticCourses } from '../data/courses';

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
        if (data.success && data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        } else {
          setCourses(staticCourses as any);
        }
      } catch (error) {
        setCourses(staticCourses as any);
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
        <h2 className="text-center text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white mb-6">Courses & Training</h2>
        
        {/* Mega Scholarship Banner */}
        <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-1 shadow-[0_0_30px_rgba(37,99,235,0.3)] animate-pulse hover:animate-none transition-all duration-500">
          <div className="bg-white dark:bg-[#0B1220] rounded-[22px] p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 mix-blend-overlay"></div>
            <h3 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
              🎉 Mega Scholarship & Admission Offer
            </h3>
            <p className="relative z-10 text-xl text-gray-800 dark:text-gray-200 font-bold mb-6">
              🚀 Limited Time – <span className="text-red-500">2 Months Only</span>
            </p>
            <div className="relative z-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 sm:p-6 mb-6 inline-block">
              <p className="text-lg sm:text-xl text-gray-900 dark:text-white font-semibold">
                🎓 Only <span className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl">8 students</span> in each course will get FREE admission!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">(On a first-come, first-served basis)</p>
            </div>
            <p className="relative z-10 text-gray-700 dark:text-gray-300 font-medium">
              💥 After the free seats are filled, you can still enroll at our special discounted offer fees below!
            </p>
          </div>
        </div>

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
                  <h3 className="text-lg sm:text-xl font-bold font-display text-gray-900 dark:text-white">{course.title}</h3>
                  <span className="bg-accent/20 text-blue-600 dark:text-accent px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-2">{course.level}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{course.description}</p>
                <div className="mb-4">
                  {course.originalPrice && (
                    <div className="text-gray-400 dark:text-gray-500 text-sm line-through decoration-red-500/50 mb-1 font-medium">{course.originalPrice}</div>
                  )}
                  <div className="text-blue-600 dark:text-accent font-extrabold text-2xl">
                    {course.price} <span className="text-sm font-normal text-gray-500 ml-1">Offer</span>
                  </div>
                </div>
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
