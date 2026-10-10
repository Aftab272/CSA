import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Bot, Cpu, ShieldCheck, 
  Play, Pause, ExternalLink, Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'code' | 'metrics'>('ai');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fullText = "Engineering Intelligent Digital Experiences";

  // Continuous Typewriter (Write -> Pause -> Erase -> Repeat)
  useEffect(() => {
    let isDeleting = false;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!isDeleting) {
        // Typing forward
        charIndex++;
        setText(fullText.slice(0, charIndex));

        if (charIndex === fullText.length) {
          // Pause when full sentence is typed
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        // Erasing backward
        charIndex--;
        setText(fullText.slice(0, charIndex));

        if (charIndex === 0) {
          // Pause when text is completely erased before typing again
          isDeleting = false;
          timeoutId = setTimeout(tick, 600);
          return;
        }
        timeoutId = setTimeout(tick, 30);
      }
    };

    timeoutId = setTimeout(tick, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  // Ensure video autoplay is initiated immediately
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay waiting for user interaction:', err);
        });
      }
    }
  }, []);

  // Interactive Developer Code Stream & Neural Network Simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Code snippets clearly representing software development & engineering
    const codeSnippets = [
      "const app = express();",
      "import { useState, useEffect } from 'react';",
      "await supabase.from('projects').select('*');",
      "const api = await fetch('/api/public/services');",
      "function buildAIPlatform(req, res) {",
      "interface SoftwareStack { fullstack: true; }",
      "docker run -p 3001:3001 csa-backend",
      "git commit -m 'feat: AI Agent system ready'",
      "npm run dev --host",
      "const [state, dispatch] = useReducer(neuralEngine);",
      "export default function ModernApp() {",
      "SELECT id, title, category FROM services WHERE active = true;",
      "response.status(200).json({ success: true });",
      "const engine = new GeminiFlash({ latency: '14ms' });",
      "class DigitalExperience extends Framework {",
      "return <CreativeStackAgency code='clean' />;",
      "01000011 01010011 01000001",
      "const token = jwt.sign({ role: 'admin' }, secret);",
      "export const routes = createBrowserRouter([...]);",
      "const client = createClient(SUPABASE_URL, ANON_KEY);",
      "const query = useQuery({ queryKey: ['services'] });",
      "helm upgrade --install csa-prod ./chart",
      "const model = genAI.getGenerativeModel({ model: 'gemini-1.5' });",
      "background-clip: text; -webkit-backdrop-filter: blur(12px);"
    ];

    // Create vertical code stream columns
    const columnCount = Math.floor(width / (width < 768 ? 160 : 200));
    const columns = Array.from({ length: columnCount }, (_, i) => ({
      x: i * (width / columnCount) + 20,
      y: Math.random() * -height,
      speed: Math.random() * 0.7 + 0.5,
      snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      alpha: Math.random() * 0.35 + 0.15,
      fontSize: Math.floor(Math.random() * 2) + 11
    }));

    // Floating cyber nodes
    const particleCount = Math.min(width < 768 ? 20 : 35, 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.35 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      const nodeColor = isDark ? '0, 212, 255' : '37, 99, 235';
      const textColor = isDark ? '56, 189, 248' : '30, 64, 175';

      // 1. Draw falling developer code streams
      ctx.font = `600 12px "Courier New", Courier, monospace`;
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        col.y += col.speed;
        if (col.y > height + 50) {
          col.y = -40;
          col.snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }

        ctx.fillStyle = `rgba(${textColor === '56, 189, 248' ? '56, 189, 248' : '37, 99, 235'}, ${col.alpha})`;
        ctx.fillText(col.snippet, col.x, col.y);
      }

      // 2. Draw neural interconnected nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${p.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${nodeColor}, ${(1 - dist / 110) * 0.2})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            setIsVideoLoaded(true);
            setIsPlaying(true);
          }}
          className="w-full h-full object-cover scale-105 transform opacity-15 dark:opacity-25 mix-blend-luminosity motion-safe:transition-transform duration-1000 filter contrast-125"
        >
          {/* Verified High-Performance Developer Code Streams */}
          <source 
            src="/videos/hero-bg.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://res.cloudinary.com/z6sk8xam/video/upload/v1791056985/vx0lkctql9vrahkpstys.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* 2. Dynamic Interactive Neural Matrix Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        {/* 3. Theme-Adaptive Backdrop Overlay for 100% Readability while preserving video motion */}
        <div 
          className="absolute inset-0 transition-colors duration-500 bg-white/80 dark:bg-primary/85 backdrop-blur-[4px] z-[2]"
        />

        {/* Ambient Gradient Glows (Subtle Cyber Meshes) */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[140px] pointer-events-none z-[3]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none z-[3]" />
        
        {/* Subtle Cyber Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none z-[3]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Video Control Floating Pill (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={toggleVideoPlayback}
          className="p-2.5 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-md text-xs font-semibold flex items-center gap-1.5"
          title={isPlaying ? 'Pause background video' : 'Play background video'}
          aria-label="Toggle background video"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span className="text-[11px] pr-1">{isPlaying ? 'AI Motion Live' : 'Paused'}</span>
        </button>
      </div>

      {/* 3. Main Hero Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
        
        {/* Left Column: Headlines & Call to Actions */}
        <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
          
          {/* Badge: AI / Tech Innovation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <Sparkles size={15} className="animate-pulse" />
            <span>AI-Driven Software &amp; Digital Engineering</span>
          </motion.div>

          {/* Main Headline */}
          <div className="min-h-[110px] sm:min-h-[140px] lg:min-h-[160px]">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.12] tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
              {text}
              <span className="animate-pulse text-blue-600 dark:text-accent font-light">|</span>
            </h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
          >
            We combine artificial intelligence, cutting-edge full-stack architecture, and high-conversion UI/UX strategy to turn ambitious concepts into market-defining digital products.
          </motion.p>

          {/* Tech Badges Chips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {['Generative AI Integration', 'Enterprise Cloud & DevOps', 'Full-Stack Web & Mobile', 'Autonomous Agent Solutions'].map((chip, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
          >
            <Link
              to="/contact"
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] transition-all duration-300 text-center transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              to="/projects"
              className="px-8 py-4 rounded-2xl font-bold border border-gray-300 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-all duration-300 text-center transform hover:-translate-y-0.5 text-sm sm:text-base shadow-sm backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>Explore Case Studies</span>
              <ExternalLink size={16} />
            </Link>
          </motion.div>

          {/* Quick Metrics Strip */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-6 border-t border-gray-200 dark:border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0"
          >
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-accent font-display">50+</div>
              <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Shipped Products</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">99.8%</div>
              <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Client Success</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">&lt;15ms</div>
              <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">Engineered Latency</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-Tech Interactive AI Studio Terminal */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] p-1.5 bg-gradient-to-b from-blue-500/30 via-indigo-500/20 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="bg-white/90 dark:bg-secondary/90 rounded-[2.3rem] overflow-hidden border border-gray-200 dark:border-white/10">
              
              {/* Window Header */}
              <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400">csa-ai-engine.sh</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'ai' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    AI Agent
                  </button>
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'code' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Stack
                  </button>
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'metrics' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Live Logs
                  </button>
                </div>
              </div>

              {/* Window Body Content */}
              <div className="p-6 text-sm font-sans min-h-[330px] flex flex-col justify-between">
                {activeTab === 'ai' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-3 bg-gray-100 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-200 dark:border-white/5">
                      <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
                        <Bot size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-accent mb-0.5">Client Prompt</div>
                        <p className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium">
                          "Build an ultra-fast SaaS platform with AI customer intelligence, real-time analytics, and secure Supabase backend."
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-950/30 p-3.5 rounded-2xl border border-blue-200 dark:border-blue-500/20">
                      <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                        <Cpu size={16} />
                      </div>
                      <div className="space-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">CSA Engine Output</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">100% Ready</span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-300 text-xs leading-relaxed">
                          Automated pipelines dispatched: Express API security gateway active, rate-limiting verified, responsive UI rendered with modern glassmorphism.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                          <Activity size={12} className="text-emerald-500 animate-pulse" />
                          <span>Compiled in 184ms • Zero vulnerabilities</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'code' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs space-y-2 bg-gray-950 text-emerald-400 p-4 rounded-2xl overflow-x-auto"
                  >
                    <div className="text-gray-500">// Creative Stack Agency Architecture</div>
                    <div><span className="text-blue-400">const</span> stack = &#123;</div>
                    <div className="pl-4">frontend: <span className="text-yellow-300">['React 19', 'TypeScript', 'Tailwind', 'Vite']</span>,</div>
                    <div className="pl-4">backend: <span className="text-yellow-300">['Node.js', 'Express', 'JWT Auth', 'Security Helmet']</span>,</div>
                    <div className="pl-4">database: <span className="text-yellow-300">['Supabase Postgres', 'Row Level Security']</span>,</div>
                    <div className="pl-4">aiIntelligence: <span className="text-yellow-300">['Gemini 2.5 Flash', 'Autonomous Agents']</span></div>
                    <div>&#125;;</div>
                    <div className="text-blue-400 font-semibold pt-2">export default stack;</div>
                  </motion.div>
                )}

                {activeTab === 'metrics' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center text-xs">
                      <span className="text-gray-600 dark:text-gray-400 font-mono">Core Web Vitals</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">100 / 100 Score</span>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center text-xs">
                      <span className="text-gray-600 dark:text-gray-400 font-mono">API Response Speed</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold font-mono">&lt; 14ms (P99)</span>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex justify-between items-center text-xs">
                      <span className="text-gray-600 dark:text-gray-400 font-mono">Security Grade</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">A+ Rated (Strict CSP)</span>
                    </div>
                  </motion.div>
                )}

                {/* Footer of Terminal */}
                <div className="pt-4 mt-auto border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <span>Certified Quality Delivery</span>
                  </div>
                  <Link 
                    to="/about"
                    className="text-blue-600 dark:text-accent font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Read Company Story</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
