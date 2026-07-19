import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/Team';
import Mission from '../components/Mission';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Award, Target, Eye, Users, ShieldCheck, Zap, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-primary text-white font-sans">
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

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold font-display leading-tight"
            >
              Our Story of <span className="text-accent italic">Innovation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Creative Stack Agency was born from a simple idea: that technology and creativity shouldn't just coexist—they should amplify each other.
            </motion.p>
          </section>

          {/* Company History */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold font-display">Company History</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2025, Creative Stack Agency started as a small team of passionate developers and designers in a shared workspace. Our goal was to provide high-quality digital solutions that were often out of reach for small to mid-sized businesses.
                </p>
                <p>
                  Within just a few years, we've grown into a full-service agency, serving clients across the globe and delivering hundreds of successful projects ranging from simple portfolios to complex enterprise-level applications.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Our History" 
                className="relative z-10 rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid md:grid-cols-2 gap-12">
            <div className="bg-secondary p-12 rounded-3xl border border-white/5 space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-accent" size={32} />
              </div>
              <h3 className="text-3xl font-bold font-display">Our Vision</h3>
              <p className="text-gray-400 text-lg">
                To be the global leader in creative technology solutions, empowering every business to thrive in the digital age through unparalleled innovation and design excellence.
              </p>
            </div>
            <div className="bg-secondary p-12 rounded-3xl border border-white/5 space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-accent" size={32} />
              </div>
              <h3 className="text-3xl font-bold font-display">Our Mission</h3>
              <p className="text-gray-400 text-lg">
                Our mission is to bridge the gap between human creativity and technological capability, providing end-to-end digital strategies that drive measurable growth and lasting impact.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="space-y-16">
            <h2 className="text-4xl font-bold font-display text-center">Our Company Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group hover:bg-accent transition duration-300">
                    <v.icon className="text-accent group-hover:text-primary transition duration-300" size={36} />
                  </div>
                  <h4 className="text-xl font-bold">{v.title}</h4>
                  <p className="text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-secondary border border-white/10 rounded-3xl p-12 text-center space-y-12">
            <h2 className="text-3xl font-bold font-display flex items-center justify-center gap-4">
              <Award className="text-accent" /> Our Certifications
            </h2>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-500">
              {certifications.map((cert, i) => (
                <div key={i} className="px-8 py-4 bg-primary rounded-xl font-bold border border-white/5 shadow-lg">
                  {cert}
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="Why Choose Us" 
                className="rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl font-bold font-display">Why Choose Us?</h2>
              <ul className="space-y-6">
                {[
                  { title: 'Result Driven', desc: 'We focus on KPIs and outcomes that matter to your business.' },
                  { title: 'Expert Team', desc: 'Certified professionals with years of industry experience.' },
                  { title: 'Modern Stack', desc: 'We use the latest technologies like React, Node, and AI.' },
                  { title: 'Support', desc: '24/7 support and dedicated account managers for every project.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Team Section Integration */}
          <Team />

        </div>
      </main>

      <Footer />
    </div>
  );
}
