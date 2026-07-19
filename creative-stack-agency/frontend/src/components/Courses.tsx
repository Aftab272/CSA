import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { courses, Course } from '../data/courses';
import CourseModal from './CourseModal';

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section id="courses" className="px-8 py-24 bg-primary text-white font-sans">
      <AnimatePresence>
        {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold font-display text-white mb-16">Courses & Training</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -10 }}
              className="bg-secondary rounded-3xl overflow-hidden border border-white/10 shadow-xl"
            >
              <img loading="lazy" src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold font-display text-white">{course.title}</h3>
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
