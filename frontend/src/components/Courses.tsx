import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CourseModal from './CourseModal';
import EtsyCourseModal from './EtsyCourseModal';
import { etsyCourseData } from '../data/etsyCourseData';
import type { CourseContent } from '../types/content';
import { fetchPublicCourses } from '../lib/api';
import { 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ExternalLink,
  Calendar,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CoursesProps {
  limit?: number;
  showExploreLink?: boolean;
}

export default function Courses({ limit, showExploreLink }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseContent | null>(null);
  const [isEtsyModalOpen, setIsEtsyModalOpen] = useState(false);
  const [courses, setCourses] = useState<CourseContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchPublicCourses();
        const rawList = Array.isArray(data) ? data : [];
        
        // Ensure Etsy Course is always included as the top Signature track
        const hasEtsy = rawList.some((c: any) => 
          c.title && c.title.toLowerCase().includes('etsy')
        );

        if (!hasEtsy) {
          const etsyCardItem: CourseContent = {
            _id: 'crs-etsy',
            id: 101,
            title: etsyCourseData.title,
            image: etsyCourseData.image,
            duration: etsyCourseData.duration,
            level: 'Beginner' as const,
            instructor: {
              name: 'Creative Stack Agency Faculty',
              designation: 'Etsy & Digital Products Mentors',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200',
            },
            syllabus: etsyCourseData.modules.map(m => `MODULE ${m.number}: ${m.title}`),
            seats: 25,
            hasCertificate: true,
            features: [
              '10 Hands-on Practical Projects',
              '100% Online Classes',
              'Etsy Shop & Payoneer Setup Guidance',
            ],
            price: etsyCourseData.price,
            description: 'Master Etsy shop creation, payment setup, Canva, AI product generation, SEO, and professional mockups in a 1-month intensive live training.',
            isActive: true,
          };
          setCourses([etsyCardItem, ...rawList]);
        } else {
          setCourses(rawList as CourseContent[]);
        }
      } catch (error) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchCourses();
  }, []);

  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  const handleOpenDetail = (course: CourseContent) => {
    if (course.title.toLowerCase().includes('etsy')) {
      setIsEtsyModalOpen(true);
    } else {
      setSelectedCourse(course);
    }
  };

  return (
    <section id="courses" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-slate-50/60 dark:bg-secondary/40 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <AnimatePresence>
        {isEtsyModalOpen && (
          <EtsyCourseModal onClose={() => setIsEtsyModalOpen(false)} />
        )}
        {selectedCourse && (
          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
              <GraduationCap size={14} />
              <span>Industry-Grade Tech Mentorship</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-gray-900 dark:text-white">
              Accelerate Your Tech Career
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              Learn practical full-stack engineering, digital products mastery, mobile app development, and UI/UX design directly from industry professionals.
            </p>
          </div>

          {showExploreLink && (
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group shrink-0"
            >
              <span>View All Courses</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mega Scholarship Banner */}
        {!limit && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-purple-600/20 border border-blue-500/30 p-6 sm:p-10 mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} /> Mega Scholarship Offer
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white mb-3">
              First 8 Enrollees Receive Full Free Admission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Hands-on projects, real digital portfolios, and job-readiness mentorship included with every track.
            </p>
          </div>
        )}

        {/* SIGNATURE COURSE SPOTLIGHT CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/15 via-indigo-900/10 to-purple-900/20 dark:from-blue-950/70 dark:via-secondary/90 dark:to-purple-950/50 border-2 border-blue-500/40 dark:border-blue-500/30 shadow-2xl p-6 sm:p-8 lg:p-10 mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 flex items-center gap-1.5">
                  <Sparkles size={12} />
                  Signature Masterclass
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/30">
                  {etsyCourseData.institute}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  {etsyCourseData.duration} Intensive
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-gray-900 dark:text-white leading-tight">
                {etsyCourseData.title}
              </h3>

              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400">
                {etsyCourseData.tagline}
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {etsyCourseData.description}
              </p>

              {/* Highlight tags: Online Classes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/4 border border-gray-200 dark:border-white/10 text-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">Training Mode</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">Online Classes</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/4 border border-gray-200 dark:border-white/10 text-xs">
                  <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">Course Duration</span>
                  <span className="font-bold text-gray-900 dark:text-white mt-0.5 block">{etsyCourseData.duration}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/4 border border-gray-200 dark:border-white/10 text-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">Course Fee</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[10px] text-gray-400 line-through">{etsyCourseData.originalPrice}</span>
                    <span className="font-black text-blue-600 dark:text-cyan-400 text-sm sm:text-base">{etsyCourseData.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsEtsyModalOpen(true)}
                  className="py-3 px-6 rounded-xl bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/15 text-gray-900 dark:text-white font-bold text-xs sm:text-sm border border-gray-300 dark:border-white/20 transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                  <BookOpen size={16} className="text-blue-500 dark:text-cyan-400" />
                  <span>View 12 Modules &amp; Details</span>
                </button>

                <a
                  href={etsyCourseData.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Enroll Track</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl group">
                <img
                  loading="lazy"
                  src={etsyCourseData.image}
                  alt="Etsy Digital Products Mastery"
                  className="w-full h-64 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-cyan-400">12 Live Online Modules</span>
                    <span className="font-semibold text-gray-300">10 Practical Projects</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug">
                    Canva · AI Image Generation · Etsy SEO · Payoneer Setup · Mockups · Live Listings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* All Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedCourses.map((course) => {
            const isEtsy = course.title.toLowerCase().includes('etsy');
            return (
              <motion.div 
                key={course._id || course.id || course.title}
                whileHover={{ y: -6 }}
                className={`group bg-white dark:bg-secondary/80 backdrop-blur-xl rounded-3xl overflow-hidden border transition-all flex flex-col h-full ${
                  isEtsy 
                    ? 'border-blue-500/60 shadow-[0_4px_30px_rgba(37,99,235,0.18)] dark:shadow-[0_4px_30px_rgba(37,99,235,0.25)]' 
                    : 'border-gray-200/90 dark:border-white/10 hover:border-blue-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-xl hover:shadow-[0_14px_35px_rgba(37,99,235,0.18)]'
                }`}
              >
                <div className="relative overflow-hidden h-48 sm:h-52 bg-gray-100 dark:bg-primary/40 shrink-0">
                  <img 
                    loading="lazy" 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    {isEtsy ? (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={11} /> Signature
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-600/95 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {course.level || 'All Levels'}
                      </span>
                    )}
                  </div>

                  {course.duration && (
                    <span className="absolute bottom-3.5 right-3.5 px-2.5 py-1 bg-black/60 backdrop-blur-md text-gray-200 text-xs font-medium rounded-lg flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                    {course.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-3">
                    <div>
                      {course.originalPrice && (
                        <span className="text-gray-400 text-xs line-through block">{course.originalPrice}</span>
                      )}
                      <span className="text-lg sm:text-xl font-black text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-indigo-400 font-display">
                        {course.price || 'Free'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Detail Button */}
                      <button
                        onClick={() => handleOpenDetail(course)}
                        className="py-2.5 px-3.5 rounded-xl border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <BookOpen size={13} />
                        <span>Detail</span>
                      </button>

                      {/* Enroll Track Button */}
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLScn0oHrhzZAZZnSLqY35NS6TfiqzJA1ZMMCGSQQNsQDJXh4aA/viewform?usp=dialog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center text-center cursor-pointer"
                      >
                        Enroll Track
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
