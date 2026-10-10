import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Award, Target, Eye, Users, ShieldCheck, Zap, Heart, ArrowRight } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Passion', desc: 'We are passionate about creating digital excellence.' },
  { icon: ShieldCheck, title: 'Integrity', desc: 'Transparency and honesty in everything we do.' },
  { icon: Zap, title: 'Innovation', desc: 'Always pushing boundaries with modern technology.' },
  { icon: Users, title: 'Collaboration', desc: 'Your vision, our expertise, working as one.' },
];

const certifications = [
  'Google Cloud Partner',
  'Meta Certified Company',
  'HubSpot Agency Partner',
  'AWS Certified Solutions Architect',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-primary text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Helmet>
        <title>About Us | Creative Stack Agency</title>
        <meta name="description" content="Learn about Creative Stack Agency's history, vision, mission, and the team behind our digital success." />
        <link rel="canonical" href={window.location.href} />
        {/* Open Graph Tags */}
        <meta property="og:title" content="About Us | Creative Stack Agency" />
        <meta property="og:description" content="Discover our journey and values." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      <main className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 lg:space-y-32">
          
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-display leading-tight text-gray-900 dark:text-white"
            >
              Our Story of <span className="text-blue-600 dark:text-accent italic">Innovation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Creative Stack Agency was born from a simple idea: that technology and creativity shouldn't just coexist—they should amplify each other.
            </motion.p>
          </section>

          {/* Company History */}
          <section className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white">Company History</h2>
              <div className="space-y-5 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  Founded in 2025, Creative Stack Agency started as a small team of passionate developers and designers in a shared workspace. Our goal was to provide high-quality digital solutions that were often out of reach for small to mid-sized businesses.
                </p>
                <p>
                  Within just a few years, we've grown into a full-service agency, serving clients across the globe and delivering hundreds of successful projects ranging from simple portfolios to complex enterprise-level applications.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Our History" 
                className="relative z-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10"
              />
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gray-50 dark:bg-secondary p-6 sm:p-10 lg:p-12 rounded-3xl border border-gray-200 dark:border-white/10 space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 dark:bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-blue-600 dark:text-accent" size={32} />
              </div>
              <h3 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To be the global leader in creative technology solutions, empowering every business to thrive in the digital age through unparalleled innovation and design excellence.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-secondary p-6 sm:p-10 lg:p-12 rounded-3xl border border-gray-200 dark:border-white/10 space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 dark:bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-blue-600 dark:text-accent" size={32} />
              </div>
              <h3 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Our mission is to bridge the gap between human creativity and technological capability, providing end-to-end digital strategies that drive measurable growth and lasting impact.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-center text-gray-900 dark:text-white">Our Company Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((v, i) => (
                <div key={i} className="text-center space-y-4 bg-gray-50/60 dark:bg-secondary/40 p-6 rounded-2xl border border-gray-200/80 dark:border-white/5">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:bg-blue-600 dark:hover:bg-accent transition duration-300">
                    <v.icon className="text-blue-600 dark:text-accent group-hover:text-white dark:group-hover:text-primary transition duration-300" size={30} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{v.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-gray-50 dark:bg-secondary border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 text-center space-y-8 sm:space-y-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold font-display flex items-center justify-center gap-3 text-gray-900 dark:text-white">
              <Award className="text-blue-600 dark:text-accent" /> Our Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              {certifications.map((cert, i) => (
                <div key={i} className="px-6 py-3.5 bg-white dark:bg-primary rounded-xl font-bold border border-gray-200 dark:border-white/10 shadow-sm text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  {cert}
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="Why Choose Us" 
                className="rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10"
              />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white">Why Choose Us?</h2>
              <ul className="space-y-6">
                {[
                  { title: 'Result Driven', desc: 'We focus on KPIs and outcomes that matter to your business.' },
                  { title: 'Expert Team', desc: 'Certified professionals with years of industry experience.' },
                  { title: 'Modern Stack', desc: 'We use the latest technologies like React, Node, and AI.' },
                  { title: 'Support', desc: '24/7 support and dedicated account managers for every project.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-5 h-5 bg-blue-600 dark:bg-accent rounded-full flex-shrink-0 mt-1.5" />
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Dedicated Team Callout Banner */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-display">Meet The Experts Behind CSA</h2>
              <p className="text-blue-100 text-base sm:text-lg">
                Discover the engineers, UI/UX strategists, and visionaries powering Creative Stack Agency.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Link 
                  to="/team" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-0.5"
                >
                  <span>View Our Dedicated Team</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
