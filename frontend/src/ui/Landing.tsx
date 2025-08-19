// import React from 'react'
// import { Box, Button, Container, CssBaseline, Stack, Typography, Grid, Paper, Divider } from '@mui/material'
// import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'

// export default function Landing() {
//   const navigate = useNavigate()
//   return (
//     <>
//       <CssBaseline />
//   <Container maxWidth="lg" sx={{ py: 8 }}>
//         <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
//           <Box flex={1}>
//             <Typography component={motion.h1}
//               variant="h3" fontWeight={800} gutterBottom
//               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//               StatFlow AI
//             </Typography>
//             <Typography component={motion.p}
//               variant="h6" color="text.secondary" gutterBottom
//               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
//               Transform survey data into insights with intelligent cleaning, schema detection, and quality analytics.
//             </Typography>
//             <Stack direction="row" spacing={2} mt={4}
//               component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
//               <Button size="large" variant="contained" onClick={() => navigate('/visualize')}>Get Started</Button>
//               <Button size="large" variant="outlined" onClick={() => navigate('/visualize')}>Try Demo</Button>
//             </Stack>
//           </Box>
//           <Box flex={1}
//             component={motion.div}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ArrowRight, Shield, BarChart3, Sparkles } from 'lucide-react'

// export default function Landing() {
//   const navigate = useNavigate()
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
//       {/* Nav */}
//       <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//         <div className="flex items-center gap-2 font-extrabold text-xl">
//           <span className="inline-flex h-8 w-8 rounded-md bg-gradient-to-r from-violet-500 to-rose-500 items-center justify-center text-white">📊</span>
//           <span>StatFlow AI</span>
//         </div>
//         <nav className="hidden md:flex items-center gap-6 text-sm">
//           <a href="#features" className="hover:text-gray-700">Features</a>
//           <a href="#how" className="hover:text-gray-700">How It Works</a>
//           <button onClick={() => navigate('/visualize')} className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg">
//             Get Started <ArrowRight size={16} />
//           </button>
//         </nav>
//       </header>

//       {/* Hero */}
//       <section className="max-w-7xl mx-auto px-6 pt-8 pb-14 md:pt-16 md:pb-20 grid md:grid-cols-2 gap-8">
//         <div>
//           <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
//             <Sparkles size={16} /> Transform Survey Data with AI
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-4">
//             Intelligent Survey <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-rose-600">Data Processing</span>
//           </h1>
//           <p className="text-lg text-gray-600 mt-4 max-w-xl">
//             Clean, detect schema, score quality, and visualize in minutes—not hours.
//           </p>
//           <div className="mt-6 flex flex-wrap gap-3">
//             <button onClick={() => navigate('/visualize')} className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-5 py-3 rounded-lg text-base font-semibold shadow-sm">
//               Start Free Trial <ArrowRight size={18} />
//             </button>
//             <a href="#features" className="px-5 py-3 rounded-lg border text-base font-semibold hover:bg-gray-100">Explore Features</a>
//           </div>
//         </div>
//         <div className="bg-white/70 border rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold">Survey Quality Dashboard</h3>
//             <div className="flex gap-1">
//               <span className="h-2 w-2 rounded-full bg-red-400" />
//               <span className="h-2 w-2 rounded-full bg-amber-400" />
//               <span className="h-2 w-2 rounded-full bg-emerald-400" />
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-3 mt-4">
//             <div className="rounded-md bg-gray-50 p-3">
//               <div className="text-emerald-600 font-bold text-lg">98.5%</div>
//               <div className="text-xs text-gray-500">Data Quality</div>
//             </div>
//             <div className="rounded-md bg-gray-50 p-3">
//               <div className="text-blue-600 font-bold text-lg">1,247</div>
//               <div className="text-xs text-gray-500">Records Cleaned</div>
//             </div>
//             <div className="rounded-md bg-gray-50 p-3">
//               <div className="text-violet-600 font-bold text-lg">15s</div>
//               <div className="text-xs text-gray-500">Processing Time</div>
//             </div>
//           </div>
//           <div className="flex items-end gap-2 h-32 mt-5">
//             {[65, 85, 45, 90, 70, 55, 80].map((h, i) => (
//               <div key={i} className="w-6 rounded-t bg-gradient-to-t from-slate-500 to-slate-300" style={{ height: `${h}%` }} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="text-3xl font-extrabold">Why Choose StatFlow?</h2>
//         <p className="text-gray-600 mt-2">Precision, transparency, and speed for statistical teams.</p>
//         <div className="grid md:grid-cols-3 gap-4 mt-6">
//           <FeatureCard icon={<BoltIcon />} title="Intelligent Automation" desc="AI-powered cleaning and schema detection that adapts to survey structure." />
//           <FeatureCard icon={<Shield className="text-primary-700" />} title="Quality & Compliance" desc="Audit trail and quality scoring for regulatory confidence." />
//           <FeatureCard icon={<BarChart3 className="text-primary-700" />} title="Real-time Insights" desc="Live progress and metrics for instant feedback." />
//         </div>
//       </section>

//       {/* How it works */}
//       <section id="how" className="bg-white border-t">
//         <div className="max-w-7xl mx-auto px-6 py-12">
//           <h2 className="text-3xl font-extrabold">How It Works</h2>
//           <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 text-center">
//             {['Upload', 'Clean', 'Process', 'Schema', 'Validate', 'Report'].map((s, i) => (
//               <div key={s} className="rounded-lg border bg-gray-50 p-4">
//                 <div className="text-sm text-gray-600">Step {i + 1}</div>
//                 <div className="font-semibold">{s}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="rounded-2xl border bg-gradient-to-r from-primary-700 to-primary-800 text-white p-8 flex items-center justify-between">
//             <div>
//               <h3 className="text-2xl font-extrabold">Ready to accelerate your surveys?</h3>
//               <p className="opacity-90">Get started in seconds—no setup required.</p>
//             </div>
//             <button onClick={() => navigate('/visualize')} className="bg-white text-primary-800 font-semibold px-5 py-3 rounded-lg">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </section>

//       <footer className="border-t py-6">
//         <div className="max-w-7xl mx-auto px-6 text-sm text-gray-500">© {new Date().getFullYear()} StatFlow AI · Prototype</div>
//       </footer>
//     </div>
//   )
// }

// function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
//   return (
//     <div className="rounded-lg border bg-white p-5 hover:shadow-md transition">
//     <div className="mb-3 text-primary-700">{icon}</div>
//       <div className="font-semibold">{title}</div>
//       <div className="text-sm text-gray-600 mt-1">{desc}</div>
//     </div>
//   )
// }

// function BoltIcon() {
//   return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary-700"><path d="M13 3l-8 10h6l-2 8 8-10h-6l2-8z"/></svg>
// }

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, BarChart3, Sparkles, Check, Zap, Users, Clock } from 'lucide-react'

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [statsCount, setStatsCount] = useState({ quality: 0, records: 0, time: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    
    // Animate stats counter
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setStatsCount(prev => ({
          quality: Math.min(prev.quality + 2, 98.5),
          records: Math.min(prev.records + 50, 1247),
          time: Math.min(prev.time + 1, 15)
        }))
      }, 50)
      
      setTimeout(() => clearInterval(interval), 2000)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // useNavigate handles SPA navigation to /visualize on all CTA buttons

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 text-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-rose-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-violet-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-100/20 to-rose-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-300/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <header className={`relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3 font-extrabold text-xl group cursor-pointer">
          <div className="relative">
            <span className="inline-flex h-10 w-10 rounded-xl bg-gradient-to-r from-violet-500 to-rose-500 items-center justify-center text-white text-lg shadow-lg group-hover:shadow-violet-200 transition-all duration-300 group-hover:scale-110">
              📊
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-rose-500 blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          </div>
          <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">StatFlow AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-violet-600 transition-colors duration-200 relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-200 group-hover:w-full" />
          </a>
          <a href="#how" className="hover:text-violet-600 transition-colors duration-200 relative group">
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-200 group-hover:w-full" />
          </a>
          <button 
            onClick={() => navigate('/visualize')} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-violet-200 transition-all duration-300 group transform hover:scale-105"
          >
            Get Started 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-14 md:pt-16 md:pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-rose-50 text-violet-700 border border-violet-100 shadow-sm animate-bounce-subtle">
            <Sparkles size={16} className="animate-spin-slow" /> 
            <span className="font-medium">Transform Survey Data with AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-6 mb-6">
            Intelligent Survey{' '}
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 animate-gradient">
                Data Processing
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-rose-600/20 blur-lg -z-10" />
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-xl leading-relaxed mb-8">
            Clean, detect schema, score quality, and visualize in minutes—not hours. 
            <span className="text-violet-600 font-semibold">Experience the future of data processing.</span>
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => navigate('/visualize')} 
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 text-white px-7 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-violet-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Start Free Trial 
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-200" />
            </button>
            <a 
              href="#features" 
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl border-2 border-gray-200 text-lg font-semibold hover:bg-gray-50 hover:border-violet-200 transition-all duration-300 transform hover:scale-105"
            >
              Explore Features
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              <span>No Setup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-violet-500" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-rose-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Preview */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-rose-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-800">Survey Quality Dashboard</h3>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="group/stat rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border border-emerald-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-emerald-600 font-bold text-2xl">
                    {statsCount.quality.toFixed(1)}%
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">Data Quality</div>
                  <div className="w-full bg-emerald-200 rounded-full h-1 mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${statsCount.quality}%` }} />
                  </div>
                </div>
                
                <div className="group/stat rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-blue-600 font-bold text-2xl">
                    {Math.floor(statsCount.records).toLocaleString()}
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Records Cleaned</div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
                
                <div className="group/stat rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 p-4 border border-violet-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-violet-600 font-bold text-2xl">
                    {Math.floor(statsCount.time)}s
                  </div>
                  <div className="text-xs text-violet-600 font-medium">Processing Time</div>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock size={12} className="text-violet-400 animate-spin-slow" />
                    <span className="text-xs text-violet-500">Lightning Fast</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Chart */}
              <div className="relative">
                <div className="flex items-end gap-2 h-32 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-3">
                  {[65, 85, 45, 90, 70, 55, 80, 75, 60].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-violet-500 to-violet-300 transition-all duration-1000 hover:from-rose-500 hover:to-rose-300 cursor-pointer" 
                      style={{ 
                        height: `${h}%`,
                        transitionDelay: `${i * 100}ms`
                      }} 
                    />
                  ))}
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs font-medium text-gray-600">Live Analytics</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full inline-block ml-2 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
              StatFlow?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Precision, transparency, and speed for statistical teams who demand excellence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-violet-600" />} 
            title="Intelligent Automation" 
            desc="AI-powered cleaning and schema detection that adapts to your survey structure with machine learning precision."
            index={0}
            isActive={activeFeature === 0}
            delay="0"
          />
          <FeatureCard 
            icon={<Shield className="text-rose-600" />} 
            title="Quality & Compliance" 
            desc="Complete audit trail and quality scoring for regulatory confidence and enterprise-grade reliability."
            index={1}
            isActive={activeFeature === 1}
            delay="200"
          />
          <FeatureCard 
            icon={<BarChart3 className="text-blue-600" />} 
            title="Real-time Insights" 
            desc="Live progress monitoring and instant metrics for immediate feedback and data-driven decisions."
            index={2}
            isActive={activeFeature === 2}
            delay="400"
          />
        </div>
      </section>

      {/* Enhanced Process Flow */}
      <section id="how" className="relative bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Six simple steps to data perfection</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { step: 'Upload', icon: '📤', desc: 'Drop your CSV files' },
              { step: 'Clean', icon: '🧹', desc: 'AI removes inconsistencies' },
              { step: 'Process', icon: '⚡', desc: 'Smart data transformation' },
              { step: 'Schema', icon: '🔍', desc: 'Auto-detect structure' },
              { step: 'Validate', icon: '✅', desc: 'Quality verification' },
              { step: 'Report', icon: '📊', desc: 'Generate insights' }
            ].map((item, i) => (
              <div 
                key={item.step} 
                className="group relative text-center transition-all duration-500 hover:scale-105"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-100 to-rose-100 border-2 border-white shadow-lg flex items-center justify-center text-2xl group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-200/30 to-rose-200/30 blur group-hover:blur-lg transition-all duration-300 -z-10" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 group-hover:border-violet-200 transition-all duration-300">
                  <div className="text-xs text-violet-600 font-semibold mb-1">Step {i + 1}</div>
                  <div className="font-bold text-gray-800 mb-2">{item.step}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
                
                {/* Connecting line */}
                {i < 5 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-violet-200 to-rose-200 transform translate-y-0.5 -translate-x-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Trusted by Data Teams Worldwide</h2>
          <div className="flex justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="font-semibold">10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={20} />
              <span className="font-semibold">1M+ Surveys Processed</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span className="font-semibold">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-rose-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-500" />
            <div className="relative rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 text-white p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-float" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
              </div>
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                  Ready to accelerate your surveys?
                </h3>
                <p className="text-xl opacity-90 max-w-lg">
                  Join thousands of researchers who've transformed their workflow. Get started in seconds—no setup required.
                </p>
              </div>
              
              <div className="relative z-10 flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/visualize')} 
                  className="group bg-white text-violet-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </button>
                <div className="text-center text-sm opacity-75">
                  <span>✨ No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-200 py-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} StatFlow AI</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="text-violet-600 font-medium">Prototype</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  desc, 
  index, 
  isActive, 
  delay 
}: { 
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  isActive: boolean;
  delay: string;
}) {
  return (
    <div 
      className={`group relative rounded-2xl bg-white/80 backdrop-blur-sm border-2 p-8 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-violet-100 cursor-pointer ${
        isActive 
          ? 'border-violet-300 shadow-xl shadow-violet-100 scale-105' 
          : 'border-gray-200 shadow-lg hover:border-violet-200'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-rose-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-rose-500/20 blur opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
      
      <div className="relative z-10">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-3 group-hover:text-violet-700 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {desc}
        </p>
        
        {/* Hover indicator */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="inline-flex items-center gap-2 text-sm text-violet-600 font-medium">
            Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-violet-500 rounded-full animate-pulse" />
      )}
    </div>
  )
}