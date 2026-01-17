
import React, { useState, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RoomType, StagingStyle, StagingJob, AppView, Listing, User } from './types';
import { enhancePropertyImage } from './services/geminiService';
import ComparisonSlider from './components/ComparisonSlider';
import { 
  ChevronRight, Building2, LogOut, Star, ArrowRight, ShieldCheck, Layers, CheckCircle,
  Lock, Mail, BarChart3, Users, ShieldAlert, Download, Camera, RefreshCw, Eye, EyeOff, Sparkles, Wand2, Menu, X
} from 'lucide-react';

// --- Premium Assets ---
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=1200", // Living Room 1
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", // Modern Kitchen
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200", // Minimal Bedroom
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", // Exterior Luxury
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200", // Bathroom
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200"  // Dining Room
];

const HERO_ORIGINAL = "input_file_1.png"; 
const HERO_ENHANCED = "input_file_0.png"; 

// --- Mock Data ---
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'founder@snapstaged.com',
    name: 'Alexander Knight',
    role: 'admin',
    signupDate: Date.now() - 90000000,
    lastActivity: Date.now(),
    processedCount: 142
  },
  {
    id: '2',
    email: 'sarah.j@remax.com',
    name: 'Sarah Jenkins',
    role: 'user',
    signupDate: Date.now() - 40000000,
    lastActivity: Date.now() - 1000000,
    processedCount: 28
  }
];

const Logo = ({ className = "h-8", light = false }: { className?: string; light?: boolean }) => (
  <div className={`flex items-center gap-3 ${className} transition-transform hover:scale-105 duration-300`}>
    <div className={`relative w-10 h-10 border-2 rounded flex items-center justify-center ${light ? 'border-white' : 'border-snap-navy'}`}>
      <div className={`absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 ${light ? 'border-white' : 'border-snap-navy'}`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 ${light ? 'border-white' : 'border-snap-navy'}`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 ${light ? 'border-white' : 'border-snap-navy'}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 ${light ? 'border-white' : 'border-snap-navy'}`}></div>
      <Building2 className={`w-5 h-5 ${light ? 'text-white' : 'text-snap-navy'}`} />
    </div>
    <div className="flex flex-col leading-none">
      <span className={`text-xl font-extrabold tracking-tighter ${light ? 'text-white' : 'text-snap-navy'}`}>
        Snap<span className={light ? 'text-white/90' : 'text-snap-gold'}>Staged</span>
      </span>
      <span className={`text-[7px] uppercase tracking-[0.2em] font-bold mt-0.5 ${light ? 'text-white/60' : 'text-snap-slate'}`}>
        Transforming Listings. Preserving Reality.
      </span>
    </div>
  </div>
);

const LandingPage = ({ onStart, isLoggedIn }: { onStart: (signup: boolean) => void, isLoggedIn: boolean }) => (
  <div className="flex-1 bg-white animate-in fade-in slide-in-from-bottom-4 duration-1000 overflow-y-auto">
    <section className="relative py-24 lg:py-32 px-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-snap-navy/5 skew-x-[-12deg] translate-x-1/2 -z-10 animate-pulse"></div>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center space-y-10">
          <div className="inline-flex items-center gap-3 bg-snap-gold/10 px-4 py-2 rounded-full text-snap-gold font-extrabold text-[10px] uppercase tracking-[0.2em] mb-4">
            <ShieldCheck className="w-4 h-4" />
            Certified Compliance Engine
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-snap-navy leading-[1.05]">
            Elite <span className="italic text-snap-gold">Staging</span> <br/>for Real Estate.
          </h1>
          <p className="text-lg md:text-xl text-snap-slate max-w-2xl mx-auto leading-relaxed font-medium">
            SnapStaged creates market-leading property imagery without compromising architectural truth. Designed for agencies that demand visual integrity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-lg">
            <button 
              onClick={() => onStart(true)}
              className="bg-snap-navy text-white px-10 py-5 rounded-2xl font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              {isLoggedIn ? 'Access My Portfolio' : 'Start Your First Listing'} <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="https://www.linkedin.com/in/bisma-razzaq786/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-snap-navy/10 text-snap-navy px-10 py-5 rounded-2xl font-extrabold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-8 bg-snap-parchment">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        <div className="space-y-6 text-center md:text-left">
          <div className="w-12 h-12 bg-snap-navy text-snap-gold rounded-2xl flex items-center justify-center shadow-xl mx-auto md:mx-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif italic text-snap-navy">Architectural Lock</h3>
          <p className="text-sm text-snap-slate leading-relaxed font-medium uppercase tracking-wide opacity-70">Our engine identifies structural boundaries to ensure zero dimensional deviation from the original property plate.</p>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <div className="w-12 h-12 bg-snap-navy text-snap-gold rounded-2xl flex items-center justify-center shadow-xl mx-auto md:mx-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif italic text-snap-navy">Photorealistic Synthesis</h3>
          <p className="text-sm text-snap-slate leading-relaxed font-medium uppercase tracking-wide opacity-70">Leveraging neural texture mapping to render furniture with physics-accurate lighting, shadows, and reflections.</p>
        </div>
        <div className="space-y-6 text-center md:text-left">
          <div className="w-12 h-12 bg-snap-navy text-snap-gold rounded-2xl flex items-center justify-center shadow-xl mx-auto md:mx-0">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif italic text-snap-navy">Agency-Grade Output</h3>
          <p className="text-sm text-snap-slate leading-relaxed font-medium uppercase tracking-wide opacity-70">Every export is processed at 4K resolution, ready for premium print brochures or high-traffic online listing portals.</p>
        </div>
      </div>
    </section>
  </div>
);

const AuthPage = ({ 
  isSignup, 
  setIsSignup, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  showPassword, 
  setShowPassword, 
  onLogin 
}: any) => (
  <div className="flex-1 flex items-center justify-center p-8 bg-snap-parchment animate-in fade-in duration-700 overflow-y-auto">
    <div className="max-w-md w-full glass-card rounded-[2.5rem] shadow-2xl overflow-hidden my-8">
      <div className="auth-gradient p-12 text-center text-white relative">
        <Logo className="h-10 mx-auto mb-8" light />
        <h2 className="text-3xl font-serif italic mb-2 tracking-tight">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-white/60 text-xs font-medium uppercase tracking-widest">Secure Agency Login</p>
      </div>
      <form onSubmit={onLogin} className="p-12 space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold text-snap-navy uppercase tracking-[0.2em] ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-snap-gold transition-colors" />
            <input 
              type="email" required 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-semibold text-sm transition-all focus:bg-white focus:ring-2 focus:ring-snap-gold/20"
              placeholder="name@agency.com"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold text-snap-navy uppercase tracking-[0.2em] ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-snap-gold transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} required 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-semibold text-sm transition-all focus:bg-white focus:ring-2 focus:ring-snap-gold/20"
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-snap-navy transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button className="w-full bg-snap-navy text-white py-5 rounded-2xl font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-95">
          {isSignup ? 'Create Professional Account' : 'Secure Login'}
        </button>
        <div className="text-center pt-2">
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-xs font-bold text-snap-gold hover:underline underline-offset-4 tracking-widest uppercase">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const DashboardPage = ({ currentUser, listings, onEnterStudio }: any) => (
  <div className="p-8 lg:p-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 overflow-y-auto">
    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
      <div>
        <h2 className="text-4xl lg:text-5xl font-serif text-snap-navy mb-4 tracking-tight">Agency Portfolio</h2>
        <p className="text-snap-slate font-medium text-sm tracking-wide">Welcome back, <span className="text-snap-gold font-bold">{currentUser?.name}</span>.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
         <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
           <div className="w-14 h-14 bg-snap-gold/10 rounded-2xl flex items-center justify-center text-snap-gold">
             <BarChart3 className="w-7 h-7" />
           </div>
           <div>
             <p className="text-[10px] font-extrabold text-snap-slate uppercase tracking-[0.2em]">Total Staged</p>
             <p className="text-2xl font-extrabold text-snap-navy">{currentUser?.processedCount || 0}</p>
           </div>
         </div>
         <button 
           onClick={onEnterStudio}
           className="bg-snap-navy text-white px-10 py-6 rounded-[2rem] font-extrabold text-xs uppercase tracking-widest shadow-2xl shadow-snap-navy/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
         >
           <Building2 className="w-5 h-5" /> New Listing
         </button>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {listings.map((l: any) => (
        <div key={l.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer">
          <div className="relative h-64 lg:h-80 overflow-hidden">
            <img src={l.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={l.address} />
            <div className="absolute inset-0 bg-gradient-to-t from-snap-navy/90 via-snap-navy/20 to-transparent flex items-end p-8">
              <button onClick={onEnterStudio} className="bg-white text-snap-navy px-8 py-3 rounded-2xl font-extrabold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                Open Listing <ChevronRight className="w-4 h-4 text-snap-gold" />
              </button>
            </div>
          </div>
          <div className="p-8">
            <h4 className="text-xl font-bold text-snap-navy mb-3 truncate group-hover:text-snap-gold transition-colors">{l.address}</h4>
            <div className="flex items-center gap-6 text-[10px] font-extrabold text-snap-slate uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-snap-gold" /> {l.jobCount} Assets</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Professional Grade</span>
            </div>
          </div>
        </div>
      ))}
      <button onClick={onEnterStudio} className="border-4 border-dashed border-slate-100 rounded-[2.5rem] h-[400px] lg:h-[480px] flex flex-col items-center justify-center p-12 hover:border-snap-gold hover:bg-snap-gold/5 transition-all group relative overflow-hidden">
           <div className="absolute inset-0 bg-slate-50 -z-10 group-hover:bg-white transition-colors"></div>
           <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:bg-snap-navy group-hover:text-white transition-all mb-8 shadow-inner">
             <Building2 className="w-10 h-10" />
           </div>
           <p className="text-2xl font-serif text-snap-navy italic">Stage New Property</p>
           <p className="text-xs text-snap-slate text-center mt-4 leading-relaxed font-medium uppercase tracking-widest opacity-60">Upload interiors and exteriors to start the transformation</p>
      </button>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="p-8 lg:p-12 max-w-7xl mx-auto animate-in fade-in duration-700 overflow-y-auto">
    <div className="flex items-center gap-6 mb-16">
      <div className="w-16 h-16 bg-snap-navy rounded-[1.5rem] flex items-center justify-center text-snap-gold shadow-2xl">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-4xl lg:text-5xl font-serif text-snap-navy italic tracking-tight">Founder Console</h2>
        <p className="text-snap-slate font-extrabold uppercase text-[10px] tracking-[0.3em] mt-2 opacity-60">Agency Management & Analytics</p>
      </div>
    </div>
    <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr className="text-left">
            <th className="px-10 py-6 text-[10px] font-extrabold text-snap-slate uppercase tracking-[0.2em]">Professional</th>
            <th className="px-10 py-6 text-[10px] font-extrabold text-snap-slate uppercase tracking-[0.2em]">Tier</th>
            <th className="px-10 py-6 text-[10px] font-extrabold text-snap-slate uppercase tracking-[0.2em]">Activity Level</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {MOCK_USERS.map(user => (
            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-10 py-8">
                <p className="text-sm font-extrabold text-snap-navy">{user.name}</p>
                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
              </td>
              <td className="px-10 py-8">
                <span className="px-4 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-snap-navy/10 text-snap-navy">
                  {user.role} Access
                </span>
              </td>
              <td className="px-10 py-8 text-lg font-serif text-snap-navy font-bold">{user.processedCount} Staged</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StudioPage = ({ 
  jobs, 
  setJobs, 
  selectedJobId, 
  setSelectedJobId, 
  isProcessing, 
  processJob, 
  updateJobDetail, 
  downloadImage, 
  onFilesInput 
}: any) => {
  const [isDragging, setIsDragging] = useState(false);
  const selectedJob = jobs.find((j: any) => j.id === selectedJobId);

  const QUICK_ACTIONS = [
    { label: "Conceal Wall Cracks", prompt: "Carefully conceal and repair any visible wall cracks or paint imperfections." },
    { label: "Optimize Brightness", prompt: "Significantly improve the overall brightness and exposure of the room as if using professional lighting." },
    { label: "Remove Person", prompt: "Identify and cleanly remove any people or human shadows from the frame." },
    { label: "Wide Angle Look", prompt: "Digitally adjust the perspective to provide a slightly wider, more spacious professional real estate angle." },
    { label: "Clear Countertops", prompt: "Remove all small appliances, clutter, and personal items from kitchen or bathroom countertops." }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesInput(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="flex-1 grid lg:grid-cols-12 overflow-hidden bg-snap-parchment animate-in fade-in duration-700 h-full">
      <aside className="lg:col-span-3 border-r-2 border-slate-100 bg-white flex flex-col h-[50vh] lg:h-full lg:max-h-[calc(100vh-80px)]">
        <div className="p-6 lg:p-10 border-b-2 border-slate-50">
          <label 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full h-32 lg:h-44 border-2 border-dashed rounded-[2.5rem] transition-all cursor-pointer group shadow-inner ${isDragging ? 'border-snap-gold bg-snap-gold/5 scale-[0.98]' : 'border-slate-100 hover:border-snap-gold hover:bg-snap-gold/5'}`}
          >
            <Camera className={`w-8 lg:w-10 h-8 lg:h-10 mb-2 lg:mb-4 transition-all ${isDragging ? 'text-snap-gold scale-110' : 'text-slate-300 group-hover:text-snap-gold'}`} />
            <p className={`text-[10px] font-extrabold uppercase tracking-[0.2em] transition-colors ${isDragging ? 'text-snap-gold' : 'text-snap-navy group-hover:text-snap-gold'}`}>
              {isDragging ? 'Release to Import' : 'Import Plate'}
            </p>
            <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => onFilesInput(Array.from(e.target.files || []))} />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
          {jobs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-10">
              <Layers className="w-12 lg:w-16 h-12 lg:h-16 mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-center">No Assets Imported</p>
            </div>
          )}
          {jobs.map((job: any) => (
            <div key={job.id} onClick={() => setSelectedJobId(job.id)} className={`p-4 lg:p-5 rounded-[2.5rem] border-2 transition-all cursor-pointer group ${selectedJobId === job.id ? 'border-snap-gold bg-white shadow-xl ring-4 ring-snap-gold/10' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}>
              <div className="flex gap-4 lg:gap-5">
                <img src={job.originalImage} className="w-16 lg:w-20 h-16 lg:h-20 rounded-2xl object-cover border border-slate-200" alt="Thumb" />
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-[10px] font-extrabold text-snap-navy uppercase tracking-widest truncate">{job.roomType}</p>
                  <p className="text-[9px] text-snap-slate font-bold truncate italic opacity-60">{job.style}</p>
                  <div className="mt-2 lg:mt-3">
                    {job.status === 'completed' ? (
                       <span className="text-[8px] font-extrabold text-green-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Ready</span>
                    ) : job.status === 'processing' ? (
                       <span className="text-[8px] font-extrabold text-snap-gold uppercase tracking-widest flex items-center gap-1 animate-pulse"><RefreshCw className="w-3 h-3 animate-spin" /> Staging</span>
                    ) : (
                       <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 lg:p-8 bg-slate-50 border-t-2 border-slate-100">
          <button disabled={jobs.length === 0 || isProcessing} onClick={() => jobs.forEach((j: any) => j.status === 'pending' && processJob(j.id))} className="w-full bg-snap-navy text-white py-4 lg:py-5 rounded-[2rem] font-extrabold text-[10px] uppercase tracking-widest disabled:opacity-50 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl">
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4 text-snap-gold" />}
            Enhance Batch
          </button>
        </div>
      </aside>
      <section className="lg:col-span-9 bg-white overflow-y-auto h-[50vh] lg:h-full lg:max-h-[calc(100vh-80px)]">
        {!selectedJob ? (
          <div className="h-full flex flex-col items-center justify-center p-12 lg:p-24 text-center">
            <Logo className="h-16 lg:h-24 opacity-5 mb-8 lg:mb-12 grayscale" />
            <h2 className="text-3xl lg:text-5xl font-serif text-snap-navy italic mb-4 lg:mb-6 tracking-tight">Visual Intelligence Workshop</h2>
            <p className="text-[10px] font-extrabold text-snap-slate uppercase tracking-widest opacity-60 max-w-sm mx-auto leading-relaxed">Select an asset from your studio workshop to initiate architectural enhancement and virtual staging.</p>
          </div>
        ) : (
          <div className="p-8 lg:p-16 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 lg:mb-16 gap-6">
              <div>
                <h3 className="text-3xl lg:text-4xl font-serif text-snap-navy italic tracking-tight">Asset: {selectedJob.roomType}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Precision Editing Module</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => processJob(selectedJob.id)} disabled={isProcessing} className="flex-1 md:flex-none bg-snap-navy text-white px-8 lg:px-10 py-3 lg:py-4 rounded-2xl font-extrabold text-[10px] lg:text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl active:scale-95 transition-all">
                  {selectedJob.status === 'completed' ? 'Refine Logic' : 'Execute Staging'}
                </button>
                {selectedJob.enhancedImage && (
                  <button onClick={() => downloadImage(selectedJob.enhancedImage!, selectedJob.roomType)} className="flex-1 md:flex-none bg-snap-gold text-white px-8 lg:px-10 py-3 lg:py-4 rounded-2xl font-extrabold text-[10px] lg:text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-snap-gold/90 transition-all active:scale-95">
                    <Download className="w-5 h-5" /> Export HD
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
              <div className="xl:col-span-8">
                {selectedJob.status === 'completed' && selectedJob.enhancedImage ? (
                  <ComparisonSlider before={selectedJob.originalImage} after={selectedJob.enhancedImage} />
                ) : (
                  <div className="relative aspect-video bg-slate-50 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border-4 border-slate-100 shadow-2xl group">
                    <img src={selectedJob.originalImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Editor" />
                    {isProcessing && selectedJob.status === 'processing' && (
                       <div className="absolute inset-0 bg-snap-navy/80 backdrop-blur-lg flex flex-col items-center justify-center text-white p-6 lg:p-12 text-center animate-in zoom-in duration-500">
                          <RefreshCw className="w-12 lg:w-16 h-12 lg:h-16 animate-spin mb-6 lg:mb-8 text-snap-gold" />
                          <h4 className="text-3xl lg:text-4xl font-serif italic mb-4 tracking-tight">Synthesizing Excellence</h4>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Recalculating light vectors and applying neural staging assets</p>
                       </div>
                    )}
                  </div>
                )}

                <div className="mt-12 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-8 lg:mb-10">
                    <Sparkles className="w-6 lg:w-7 h-6 lg:h-7 text-snap-gold animate-pulse" />
                    <h4 className="text-xl lg:text-2xl font-serif italic text-snap-navy">Pro Assistant</h4>
                  </div>
                  <div className="space-y-8 lg:space-y-10">
                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      {QUICK_ACTIONS.map(action => (
                        <button 
                          key={action.label}
                          onClick={() => updateJobDetail(selectedJob.id, { customInstructions: (selectedJob.customInstructions || '') + ' ' + action.prompt })}
                          className="px-4 lg:px-6 py-2 lg:py-3 bg-white border-2 border-slate-200 rounded-2xl text-[9px] lg:text-[10px] font-extrabold uppercase tracking-widest hover:border-snap-gold hover:text-snap-gold hover:shadow-lg transition-all active:scale-95"
                        >
                          + {action.label}
                        </button>
                      ))}
                    </div>
                    <textarea 
                      value={selectedJob.customInstructions || ''}
                      onChange={e => updateJobDetail(selectedJob.id, { customInstructions: e.target.value })}
                      className="w-full h-32 lg:h-40 bg-white border-2 border-slate-100 rounded-[1.5rem] p-4 lg:p-6 text-sm font-semibold text-snap-navy focus:ring-4 focus:ring-snap-gold/10 outline-none transition-all resize-none shadow-inner"
                      placeholder="Custom instructions (e.g., 'Conceal wall cracks', 'Improve brightness'...)"
                    />
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="w-8 h-8 rounded-full bg-snap-gold/10 flex items-center justify-center text-snap-gold">
                         <Wand2 className="w-4 h-4" />
                      </div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Real-time prompt engineering active</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-4 space-y-10">
                <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-10 shadow-xl lg:sticky lg:top-8">
                   <div className="space-y-10 lg:space-y-12">
                     <div className="space-y-4">
                       <label className="text-[10px] font-extrabold text-snap-navy uppercase tracking-[0.2em] ml-1">Asset Category</label>
                       <select value={selectedJob.roomType} onChange={e => updateJobDetail(selectedJob.id, { roomType: e.target.value as RoomType })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 lg:p-5 text-xs font-extrabold text-snap-navy uppercase tracking-widest shadow-sm">
                         {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-extrabold text-snap-navy uppercase tracking-[0.2em] ml-1">Target Aesthetic</label>
                        <div className="grid grid-cols-1 gap-3">
                          {Object.values(StagingStyle).map(s => (
                            <button key={s} onClick={() => updateJobDetail(selectedJob.id, { style: s })} className={`text-left p-5 lg:p-6 rounded-[1.5rem] border-2 text-[9px] font-extrabold uppercase tracking-widest transition-all ${selectedJob.style === s ? 'bg-snap-navy text-snap-gold border-snap-navy shadow-xl scale-[1.02]' : 'bg-slate-50 text-snap-slate border-slate-100 hover:border-snap-gold hover:shadow-md'}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                     </div>
                     <div className="pt-8 lg:pt-10 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-snap-gold" />
                           <span className="text-[10px] font-extrabold uppercase tracking-widest text-snap-navy">Architectural Lock</span>
                        </div>
                        <div className="w-12 h-6 bg-snap-navy rounded-full relative p-1 shadow-inner">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-snap-gold rounded-full shadow-lg"></div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// --- Main App Controller ---

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('snapstaged_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState<StagingJob[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [listings, setListings] = useState<Listing[]>([
    { id: '1', address: '1240 Oakwood Ave, Los Angeles', thumbnail: PROPERTY_IMAGES[0], jobCount: 8, status: 'active' },
    { id: '2', address: '88 Skyline Dr, San Francisco', thumbnail: PROPERTY_IMAGES[1], jobCount: 14, status: 'active' },
    { id: '3', address: '42 Harbor View, Newport Beach', thumbnail: PROPERTY_IMAGES[3], jobCount: 22, status: 'active' }
  ]);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('snapstaged_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('snapstaged_session');
    }
  }, [currentUser]);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.email === authEmail) || {
      id: uuidv4(),
      email: authEmail,
      name: authEmail.split('@')[0],
      role: authEmail.includes('admin') ? 'admin' : 'user',
      signupDate: Date.now(),
      lastActivity: Date.now(),
      processedCount: 0
    } as User;
    setCurrentUser(user);
    navigateTo(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo(AppView.LANDING);
    setAuthEmail('');
    setAuthPassword('');
  };

  const processJob = async (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job || isProcessing) return;
    setIsProcessing(true);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'processing', error: undefined } : j));
    try {
      const result = await enhancePropertyImage(
        job.originalImage, 
        job.roomType, 
        job.style, 
        job.preserveFurniture,
        job.customInstructions
      );
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'completed', enhancedImage: result } : j));
      if (currentUser) {
        const updatedUser = { ...currentUser, processedCount: (currentUser.processedCount || 0) + 1 };
        setCurrentUser(updatedUser);
      }
    } catch (err: any) {
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'failed', error: err.message } : j));
    } finally {
      setIsProcessing(false);
    }
  };

  const updateJobDetail = (jobId: string, updates: Partial<StagingJob>) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updates } : j));
  };

  const downloadImage = (base64: string, roomType: string) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `snapstaged-${roomType.toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processFiles = (files: File[]) => {
    if (!currentUser) return navigateTo(AppView.AUTH);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const newJob: StagingJob = {
          id: uuidv4(),
          originalImage: base64,
          roomType: RoomType.LIVING_ROOM,
          style: StagingStyle.HIGH_END_REALTOR,
          preserveFurniture: false,
          status: 'pending',
          createdAt: Date.now()
        };
        setJobs(prev => [...prev, newJob]);
        if (!selectedJobId) setSelectedJobId(newJob.id);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLandingStart = () => {
    if (currentUser) {
      navigateTo(AppView.DASHBOARD);
    } else {
      setIsSignup(true);
      navigateTo(AppView.AUTH);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500">
      <header className="bg-white/95 backdrop-blur-2xl border-b border-slate-100 px-8 py-5 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <div onClick={() => navigateTo(AppView.LANDING)} className="cursor-pointer transition-opacity hover:opacity-80">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {currentUser ? (
            <>
              <button onClick={() => navigateTo(AppView.DASHBOARD)} className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-snap-gold ${currentView === AppView.DASHBOARD ? 'text-snap-gold underline underline-offset-8' : 'text-snap-navy'}`}>Portfolio</button>
              <button onClick={() => navigateTo(AppView.STUDIO)} className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-snap-gold ${currentView === AppView.STUDIO ? 'text-snap-gold underline underline-offset-8' : 'text-snap-navy'}`}>Studio</button>
              {currentUser.role === 'admin' && <button onClick={() => navigateTo(AppView.ADMIN)} className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-snap-gold ${currentView === AppView.ADMIN ? 'text-snap-gold underline underline-offset-8' : 'text-snap-navy'}`}>Founder</button>}
              <div className="h-6 w-px bg-slate-100 mx-2"></div>
              <button onClick={handleLogout} className="text-snap-slate hover:text-red-600 flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-colors"><LogOut className="w-4 h-4" /> Exit Session</button>
            </>
          ) : (
            <>
              <button onClick={() => navigateTo(AppView.PRICING)} className="text-snap-navy font-bold text-xs uppercase tracking-widest hover:text-snap-gold transition-colors">Pricing</button>
              <button onClick={() => navigateTo(AppView.AUTH)} className="text-snap-navy font-bold text-xs uppercase tracking-widest hover:text-snap-gold transition-colors">Log In</button>
              <button onClick={() => { setIsSignup(true); navigateTo(AppView.AUTH); }} className="bg-snap-navy text-white px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl">Start Staging</button>
            </>
          )}
        </nav>

        <button className="md:hidden p-2 text-snap-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-white pt-24 px-8 md:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8 text-center">
            {currentUser ? (
              <>
                <button onClick={() => navigateTo(AppView.DASHBOARD)} className="text-2xl font-serif text-snap-navy italic">My Portfolio</button>
                <button onClick={() => navigateTo(AppView.STUDIO)} className="text-2xl font-serif text-snap-navy italic">Staging Studio</button>
                {currentUser.role === 'admin' && <button onClick={() => navigateTo(AppView.ADMIN)} className="text-2xl font-serif text-snap-navy italic">Founder Console</button>}
                <div className="h-px bg-slate-100 w-full my-4"></div>
                <button onClick={handleLogout} className="text-red-600 font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => navigateTo(AppView.PRICING)} className="text-2xl font-serif text-snap-navy italic">Agency Tiers</button>
                <button onClick={() => navigateTo(AppView.AUTH)} className="text-2xl font-serif text-snap-navy italic">Login</button>
                <button onClick={() => { setIsSignup(true); navigateTo(AppView.AUTH); }} className="bg-snap-navy text-white py-5 rounded-2xl font-extrabold uppercase tracking-widest text-xs shadow-xl">Start Staging Now</button>
              </>
            )}
          </div>
        </div>
      )}
      
      <main className="flex-1 flex flex-col overflow-hidden bg-snap-parchment h-full">
        {currentView === AppView.LANDING && <LandingPage isLoggedIn={!!currentUser} onStart={handleLandingStart} />}
        
        {currentView === AppView.AUTH && (
          currentUser ? (
            <div className="flex-1 flex items-center justify-center"><RefreshCw className="w-8 h-8 animate-spin text-snap-navy" /></div>
          ) : (
            <AuthPage 
              isSignup={isSignup} 
              setIsSignup={setIsSignup} 
              email={authEmail} 
              setEmail={setAuthEmail} 
              password={authPassword} 
              setPassword={setAuthPassword} 
              showPassword={showPassword} 
              setShowPassword={setShowPassword} 
              onLogin={handleLogin} 
            />
          )
        )}

        {currentView === AppView.DASHBOARD && (currentUser ? <DashboardPage currentUser={currentUser} listings={listings} onEnterStudio={() => navigateTo(AppView.STUDIO)} /> : <AuthPage onLogin={handleLogin} />)}
        
        {currentView === AppView.STUDIO && (currentUser ? (
          <StudioPage 
            jobs={jobs} 
            setJobs={setJobs} 
            selectedJobId={selectedJobId} 
            setSelectedJobId={setSelectedJobId} 
            isProcessing={isProcessing} 
            processJob={processJob} 
            updateJobDetail={updateJobDetail} 
            downloadImage={downloadImage} 
            onFilesInput={processFiles} 
          />
        ) : <AuthPage onLogin={handleLogin} />)}
        
        {currentView === AppView.ADMIN && (currentUser?.role === 'admin' ? <AdminDashboard /> : <LandingPage isLoggedIn={!!currentUser} onStart={handleLandingStart} />)}
        
        {currentView === AppView.PRICING && (
           <div className="p-12 lg:p-24 text-center animate-in fade-in duration-700 overflow-y-auto">
             <h2 className="text-5xl lg:text-7xl font-serif italic text-snap-navy mb-8 tracking-tight">Agency Tiers</h2>
             <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400 mb-16 lg:mb-20">Scalable Staging Intelligence</p>
             <div className="max-w-md mx-auto bg-white border-2 border-slate-100 p-10 lg:p-16 rounded-[3rem] lg:rounded-[3.5rem] shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <h3 className="text-3xl font-serif italic mb-10 text-snap-navy">Studio Pro</h3>
                <p className="text-5xl lg:text-6xl font-serif text-snap-navy font-bold mb-10">$149<span className="text-sm opacity-40 uppercase tracking-widest">/mo</span></p>
                <ul className="text-left space-y-6 text-[10px] font-extrabold uppercase tracking-widest text-snap-slate mb-12">
                   <li className="flex items-center gap-4"><CheckCircle className="w-4 h-4 text-snap-gold" /> 50 AI Transfomations</li>
                   <li className="flex items-center gap-4"><CheckCircle className="w-4 h-4 text-snap-gold" /> Ultra-HD (4K) Export</li>
                   <li className="flex items-center gap-4"><CheckCircle className="w-4 h-4 text-snap-gold" /> Pro Assistant Logic</li>
                   <li className="flex items-center gap-4"><CheckCircle className="w-4 h-4 text-snap-gold" /> Dedicated Founder Support</li>
                </ul>
                <button onClick={() => navigateTo(AppView.AUTH)} className="w-full bg-snap-navy text-white py-5 rounded-[1.5rem] font-extrabold uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all">Select Plan</button>
             </div>
           </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 p-12 lg:p-16 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <Logo className="h-6 mx-auto opacity-30 grayscale hover:grayscale-0 transition-all" />
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-[0.4em] leading-loose">Precision Property Compliance Engine • Gemini 2.5 Integrated • Secure Cloud Staging</p>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-[9px] font-extrabold text-snap-navy uppercase tracking-[0.3em] lg:tracking-[0.4em]">
            <a href="#" className="hover:text-snap-gold transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-snap-gold transition-colors">Compliance Audit</a>
            <a href="https://www.linkedin.com/in/bisma-razzaq786/" target="_blank" className="hover:text-snap-gold transition-colors">Founder Relations</a>
          </div>
          <p className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-8">© All Copyrights reserved 2026 BuiltByHer.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
