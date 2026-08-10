import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, SlidersHorizontal, Star, Clock, Calendar, Check, X,
  Users, TrendingUp, Home, UserCheck, Settings, Plus, ArrowRight,
  ArrowLeft, Award, BookOpen, Globe, Trash2, Sparkles, Briefcase,
  Code, Palette, Megaphone, Landmark, Target, Cpu, Crown,
  CheckCircle2, AlertCircle, LogOut, Wallet,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/* ============================== Fonts ============================== */
const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');";
const DISPLAY_FONT = "'Space Grotesk', sans-serif";
const BODY_FONT = "'Inter', ui-sans-serif, system-ui, sans-serif";
const MONO_FONT = "'Space Mono', ui-monospace, monospace";

function Display({ as: Tag = 'h1', children, className = '' }) {
  return <Tag style={{ fontFamily: DISPLAY_FONT }} className={className}>{children}</Tag>;
}
function Mono({ children, className = '' }) {
  return <span style={{ fontFamily: MONO_FONT }} className={className}>{children}</span>;
}

/* ============================== Data ============================== */

const CATEGORIES = [
  { name: 'Technology & Engineering', icon: Code, color: 'sky' },
  { name: 'Product & Design', icon: Palette, color: 'violet' },
  { name: 'Business & Entrepreneurship', icon: Briefcase, color: 'amber' },
  { name: 'Marketing & Growth', icon: Megaphone, color: 'rose' },
  { name: 'Finance & Real Estate', icon: Landmark, color: 'emerald' },
  { name: 'Career & Leadership', icon: Target, color: 'orange' },
  { name: 'Data & AI', icon: Cpu, color: 'indigo' },
  { name: 'Chess & Strategy', icon: Crown, color: 'teal' },
];

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Punjabi', 'Malayalam', 'Urdu'];

// Backend API. Keep this URL for local development. For Vercel, set VITE_API_URL in the frontend environment.
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://meridian-backend-9rro.onrender.com";

const COLOR_MAP = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', ring: 'ring-orange-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', ring: 'ring-indigo-200' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', ring: 'ring-teal-200' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700', ring: 'ring-slate-200' },
};

function categoryColor(catName) {
  const cat = CATEGORIES.find((c) => c.name === catName);
  return COLOR_MAP[cat ? cat.color : 'slate'];
}

const AVATAR_COLORS = ['bg-slate-700', 'bg-sky-600', 'bg-violet-600', 'bg-amber-700', 'bg-rose-600', 'bg-indigo-600', 'bg-teal-600', 'bg-orange-600'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

let idCounter = 1000;
function nextId(prefix) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

const SEED_MENTORS = [
  {
    id: 'm-1', name: 'Priya Sharma', title: 'Senior Product Designer, Razorpay',
    category: 'Product & Design', experience: 7,
    bio: "Priya has spent seven years crafting user-first products for fintech and consumer apps. She helps early-career designers build strong portfolios and think in systems rather than screens.",
    expertise: ['Product Design', 'Design Systems', 'Portfolio Reviews', 'Figma'],
    price: 1500, languages: ['English', 'Hindi'], rating: 4.9, sessions: 184,
    avatarColor: 'bg-violet-600', status: 'active',
    slots: [
      { id: 's1', day: 'Mon', date: 'Aug 11', time: '6:00 PM', booked: false },
      { id: 's2', day: 'Wed', date: 'Aug 13', time: '7:30 PM', booked: false },
      { id: 's3', day: 'Fri', date: 'Aug 15', time: '5:00 PM', booked: false },
    ],
  },
  {
    id: 'm-2', name: 'Arjun Mehta', title: 'Staff Engineer, Flipkart',
    category: 'Technology & Engineering', experience: 9,
    bio: "Arjun builds large-scale distributed systems and mentors engineers preparing for staff-level interviews. He's big on first-principles thinking and code that ages well.",
    expertise: ['System Design', 'Backend Engineering', 'Interview Prep', 'Career Growth'],
    price: 2000, languages: ['English', 'Hindi'], rating: 4.8, sessions: 231,
    avatarColor: 'bg-sky-600', status: 'active',
    slots: [
      { id: 's4', day: 'Tue', date: 'Aug 12', time: '8:00 PM', booked: false },
      { id: 's5', day: 'Thu', date: 'Aug 14', time: '9:00 PM', booked: false },
      { id: 's6', day: 'Sat', date: 'Aug 16', time: '11:00 AM', booked: false },
      { id: 's7', day: 'Sun', date: 'Aug 17', time: '4:00 PM', booked: false },
    ],
  },
  {
    id: 'm-3', name: 'Kavya Reddy', title: 'Growth Lead, Swiggy',
    category: 'Marketing & Growth', experience: 6,
    bio: "Kavya has driven growth loops for two unicorns and one D2C exit. She mentors founders and marketers on acquisition, retention, and turning data into decisions.",
    expertise: ['Growth Strategy', 'Performance Marketing', 'Analytics', 'A/B Testing'],
    price: 1200, languages: ['English', 'Telugu'], rating: 4.7, sessions: 98,
    avatarColor: 'bg-rose-600', status: 'active',
    slots: [
      { id: 's8', day: 'Mon', date: 'Aug 11', time: '7:00 PM', booked: false },
      { id: 's9', day: 'Thu', date: 'Aug 14', time: '6:30 PM', booked: false },
    ],
  },
  {
    id: 'm-4', name: 'Rohan Kapoor', title: 'Founder & CEO (2x exits)',
    category: 'Business & Entrepreneurship', experience: 12,
    bio: "Rohan has built and sold two startups and now advises early-stage founders on fundraising, GTM, and the hard people decisions nobody warns you about.",
    expertise: ['Fundraising', 'GTM Strategy', 'Startup Advisory', 'Leadership'],
    price: 3000, languages: ['English', 'Hindi', 'Punjabi'], rating: 5.0, sessions: 76,
    avatarColor: 'bg-amber-700', status: 'active',
    slots: [
      { id: 's10', day: 'Wed', date: 'Aug 13', time: '9:00 AM', booked: false },
      { id: 's11', day: 'Fri', date: 'Aug 15', time: '10:00 AM', booked: false },
    ],
  },
  {
    id: 'm-5', name: 'Ananya Iyer', title: 'ML Scientist, Google',
    category: 'Data & AI', experience: 8,
    bio: "Ananya works on large-scale ranking models and mentors career-switchers breaking into machine learning, from math foundations to shipped models.",
    expertise: ['Machine Learning', 'Python', 'Career Switch', 'Research Guidance'],
    price: 2500, languages: ['English', 'Tamil'], rating: 4.9, sessions: 143,
    avatarColor: 'bg-indigo-600', status: 'active',
    slots: [
      { id: 's12', day: 'Tue', date: 'Aug 12', time: '7:00 PM', booked: false },
      { id: 's13', day: 'Sat', date: 'Aug 16', time: '3:00 PM', booked: false },
    ],
  },
  {
    id: 'm-6', name: 'Vikram Singh', title: 'Real Estate Investment Advisor',
    category: 'Finance & Real Estate', experience: 15,
    bio: "Vikram has advised on property transactions worth hundreds of crores across NCR. He mentors aspiring property dealers and first-time investors on the fundamentals of the business.",
    expertise: ['Real Estate Investing', 'Deal Structuring', 'Market Analysis', 'Client Relations'],
    price: 1800, languages: ['Hindi', 'English'], rating: 4.8, sessions: 112,
    avatarColor: 'bg-emerald-600', status: 'active',
    slots: [
      { id: 's14', day: 'Mon', date: 'Aug 11', time: '11:00 AM', booked: false },
      { id: 's15', day: 'Wed', date: 'Aug 13', time: '4:00 PM', booked: false },
      { id: 's16', day: 'Sat', date: 'Aug 16', time: '1:00 PM', booked: false },
    ],
  },
  {
    id: 'm-7', name: 'Neha Gupta', title: 'Executive Coach, Ex-HR Director',
    category: 'Career & Leadership', experience: 10,
    bio: "Neha spent a decade leading HR for a Fortune 500 before becoming a full-time executive coach. She helps mid-career professionals navigate promotions, pivots, and burnout.",
    expertise: ['Executive Coaching', 'Career Pivots', 'Interview Prep', 'Public Speaking'],
    price: 2200, languages: ['English', 'Hindi'], rating: 4.9, sessions: 167,
    avatarColor: 'bg-orange-600', status: 'active',
    slots: [
      { id: 's17', day: 'Thu', date: 'Aug 14', time: '5:00 PM', booked: false },
      { id: 's18', day: 'Sun', date: 'Aug 17', time: '10:00 AM', booked: false },
    ],
  },
  {
    id: 'm-8', name: 'Sameer Khan', title: 'FIDE-Rated Chess Coach',
    category: 'Chess & Strategy', experience: 11,
    bio: "Sameer has coached over 40 state and national-level junior players. He mentors adult improvers and competitive players on openings, calculation, and tournament psychology.",
    expertise: ['Opening Theory', 'Calculation Training', 'Tournament Prep', 'Endgames'],
    price: 800, languages: ['English', 'Hindi', 'Urdu'], rating: 4.9, sessions: 209,
    avatarColor: 'bg-teal-600', status: 'active',
    slots: [
      { id: 's19', day: 'Tue', date: 'Aug 12', time: '6:00 PM', booked: false },
      { id: 's20', day: 'Fri', date: 'Aug 15', time: '7:00 PM', booked: false },
      { id: 's21', day: 'Sun', date: 'Aug 17', time: '9:00 AM', booked: false },
    ],
  },
  {
    id: 'm-9', name: 'Divya Nair', title: 'Engineering Manager, Microsoft',
    category: 'Technology & Engineering', experience: 10,
    bio: "Divya leads a 20-engineer team building cloud infrastructure. She mentors engineers moving into management and speaks often about building inclusive teams.",
    expertise: ['Engineering Management', 'Team Building', '1:1 Coaching', 'Cloud Architecture'],
    price: 2800, languages: ['English', 'Malayalam'], rating: 4.8, sessions: 88,
    avatarColor: 'bg-sky-700', status: 'active',
    slots: [{ id: 's22', day: 'Mon', date: 'Aug 11', time: '9:00 PM', booked: false }],
  },
  {
    id: 'm-10', name: 'Karan Malhotra', title: 'Head of Product, CRED',
    category: 'Product & Design', experience: 8,
    bio: "Karan leads product for one of India's fastest-growing fintech apps. He mentors aspiring PMs on frameworks, stakeholder management, and cracking PM interviews.",
    expertise: ['Product Strategy', 'PM Interviews', 'Stakeholder Management', 'Roadmapping'],
    price: 2400, languages: ['English', 'Hindi'], rating: 4.7, sessions: 121,
    avatarColor: 'bg-violet-700', status: 'active',
    slots: [
      { id: 's23', day: 'Wed', date: 'Aug 13', time: '8:00 PM', booked: false },
      { id: 's24', day: 'Sat', date: 'Aug 16', time: '5:00 PM', booked: false },
    ],
  },
];

const SEED_MENTEES = [
  { id: 'mt-1', name: 'Rahul Verma', email: 'rahul.verma@email.com', joined: 'Jul 2026' },
  { id: 'mt-2', name: 'Sneha Patel', email: 'sneha.patel@email.com', joined: 'Jul 2026' },
  { id: 'mt-3', name: 'Aditya Rao', email: 'aditya.rao@email.com', joined: 'Aug 2026' },
];

const SEED_BOOKINGS = [
  { id: 'b-1', mentorId: 'm-2', menteeId: 'mt-1', slotLabel: 'Tue, Aug 12 · 8:00 PM', message: "I'm prepping for staff engineer interviews and would love guidance on system design rounds.", status: 'pending', createdAt: 'Aug 6' },
  { id: 'b-2', mentorId: 'm-2', menteeId: 'mt-2', slotLabel: 'Thu, Aug 14 · 9:00 PM', message: 'Would love your take on my current backend architecture before we scale up.', status: 'pending', createdAt: 'Aug 7' },
  { id: 'b-3', mentorId: 'm-2', menteeId: 'mt-3', slotLabel: 'Sat, Aug 16 · 11:00 AM', message: 'Looking for career advice on moving from a startup to a bigger company.', status: 'accepted', createdAt: 'Aug 4' },
  { id: 'b-4', mentorId: 'm-2', menteeId: 'mt-2', slotLabel: 'Sun, Aug 17 · 4:00 PM', message: "Hoping to get feedback on my resume before I start applying.", status: 'declined', createdAt: 'Aug 3' },
];

/* ============================== Signature graphics ============================== */

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="6" y1="17" x2="12" y2="7" stroke="#D9A441" strokeWidth="1.6" />
      <line x1="12" y1="7" x2="18" y2="14" stroke="#D9A441" strokeWidth="1.6" />
      <circle cx="6" cy="17" r="2.1" fill="#D9A441" />
      <circle cx="12" cy="7" r="2.1" fill="#D9A441" />
      <circle cx="18" cy="14" r="2.1" fill="#D9A441" />
    </svg>
  );
}

function ConstellationBg() {
  return (
    <svg viewBox="0 0 900 420" className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} preserveAspectRatio="xMidYMid slice">
      <g stroke="#D9A441" strokeWidth="1" fill="none" opacity="0.6">
        <line x1="90" y1="100" x2="230" y2="65" />
        <line x1="230" y1="65" x2="350" y2="150" />
        <line x1="350" y1="150" x2="510" y2="90" />
        <line x1="510" y1="90" x2="660" y2="160" />
        <line x1="230" y1="65" x2="190" y2="210" />
        <line x1="350" y1="150" x2="430" y2="270" />
        <line x1="660" y1="160" x2="740" y2="290" />
        <line x1="510" y1="90" x2="600" y2="25" />
        <line x1="660" y1="160" x2="810" y2="120" />
      </g>
      <g fill="#0f172a">
        <circle cx="90" cy="100" r="4" />
        <circle cx="230" cy="65" r="5.5" />
        <circle cx="350" cy="150" r="4" />
        <circle cx="510" cy="90" r="6.5" />
        <circle cx="660" cy="160" r="4.5" />
        <circle cx="190" cy="210" r="3" />
        <circle cx="430" cy="270" r="3.5" />
        <circle cx="740" cy="290" r="4" />
        <circle cx="600" cy="25" r="3" />
        <circle cx="810" cy="120" r="3.5" />
      </g>
    </svg>
  );
}

/* ============================== Small UI components ============================== */

function Avatar({ name, color, size = 'md' }) {
  const sizes = { sm: 'w-9 h-9 text-xs', md: 'w-12 h-12 text-sm', lg: 'w-20 h-20 text-xl' };
  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`} style={{ fontFamily: DISPLAY_FONT }}>
      {initials(name)}
    </div>
  );
}

function CategoryBadge({ category, size = 'sm' }) {
  const c = categoryColor(category);
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${c.bg} ${c.text} ${padding} font-medium ring-1 ring-inset ${c.ring}`}>
      {category}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200', label: 'Pending' },
    accepted: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', label: 'Accepted' },
    declined: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200', label: 'Declined' },
    active: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', label: 'Active' },
    suspended: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200', label: 'Suspended' },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center rounded-full ${s.bg} ${s.text} ring-1 ring-inset ${s.ring} px-2.5 py-1 text-xs font-medium shrink-0`}>
      {s.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, tint = 'amber' }) {
  const c = COLOR_MAP[tint];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center shrink-0`}>
        <Icon size={20} />
      </div>
      <div>
        <Mono className="text-2xl font-bold text-slate-900 leading-tight">{value}</Mono>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed top-5 right-5 z-[100] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

/* ============================== Layout pieces ============================== */

function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
        <LogoMark />
      </div>
      <Display as="span" className={`text-lg font-semibold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>Meridian</Display>
    </div>
  );
}

function PublicNav({ navigateTo, role, setRole }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigateTo('landing')} className="shrink-0">
          <Logo />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          <button onClick={() => navigateTo('browse')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">Browse Mentors</button>
          <button onClick={() => navigateTo('becomeMentor')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors">Become a Mentor</button>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 text-xs font-medium">
            {['mentee', 'mentor', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); navigateTo(r === 'mentee' ? 'browse' : r === 'mentor' ? 'mentorDashboard' : 'adminDashboard'); }}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors ${role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {r}
              </button>
            ))}
          </div>
          <button onClick={() => navigateTo('signup')} className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-slate-400">© 2026 Meridian. All rights reserved.</p>
      </div>
    </footer>
  );
}

function DashboardShell({ role, active, navigateTo, setRole, children, personaName }) {
  const mentorNav = [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'bookings', label: 'Bookings', icon: BookOpen },
    { key: 'profile', label: 'My Profile', icon: Settings },
  ];
  const adminNav = [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'mentors', label: 'Mentors', icon: Users },
    { key: 'mentees', label: 'Mentees', icon: UserCheck },
    { key: 'bookings', label: 'Bookings', icon: BookOpen },
  ];
  const navItems = role === 'admin' ? adminNav : mentorNav;

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6">
          <Logo dark />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => navigateTo(role === 'admin' ? 'adminDashboard' : 'mentorDashboard', { tab: item.key })}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${active === item.key ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              <item.icon size={17} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button onClick={() => { setRole('mentee'); navigateTo('landing'); }} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
            <LogOut size={17} /> Exit to marketplace
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <Display as="p" className="font-semibold text-slate-900 capitalize">{role} dashboard</Display>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
              {role === 'admin' ? 'AD' : initials(personaName || 'M')}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900 leading-tight">{role === 'admin' ? 'Admin' : personaName}</p>
              <p className="text-xs text-slate-400 leading-tight capitalize">{role}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

/* ============================== Mentor card ============================== */

function MentorCard({ mentor, onClick }) {
  return (
    <button onClick={onClick} className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 transition-all flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <Avatar name={mentor.name} color={mentor.avatarColor} />
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <Mono className="font-bold text-slate-900">{mentor.rating.toFixed(1)}</Mono>
        </div>
      </div>
      <p className="font-semibold text-slate-900">{mentor.name}</p>
      <p className="text-sm text-slate-500 mb-3 line-clamp-1">{mentor.title}</p>
      <div className="mb-3"><CategoryBadge category={mentor.category} /></div>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{mentor.bio}</p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-slate-900 font-semibold text-sm">
          <Mono>₹{mentor.price}</Mono><span className="text-slate-400 font-normal">/session</span>
        </div>
        <span className="text-xs text-slate-400">{mentor.experience}+ yrs exp</span>
      </div>
    </button>
  );
}

/* ============================== Landing ============================== */

function LandingPage({ navigateTo, mentors }) {
  const featured = mentors.filter((m) => m.status === 'active').sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-white">
        <ConstellationBg />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white text-amber-700 ring-1 ring-inset ring-amber-200 rounded-full px-3 py-1 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles size={13} /> 500+ vetted mentors across 8 categories
          </span>
          <Display className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Find the mentor who's already walked your path
          </Display>
          <p className="mt-5 text-lg text-slate-600 max-w-xl mx-auto">
            Book 1:1 sessions with vetted industry experts — from system design to startup fundraising to your next chess tournament.
          </p>
          <div className="mt-8 max-w-xl mx-auto flex items-center bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 p-2">
            <Search size={18} className="text-slate-400 ml-3" />
            <input
              placeholder="Try 'system design' or 'fundraising'..."
              className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
              onKeyDown={(e) => { if (e.key === 'Enter') navigateTo('browse'); }}
            />
            <button onClick={() => navigateTo('browse')} className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Search
            </button>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div><Mono className="text-xl font-bold text-slate-900">500+</Mono> Mentors</div>
            <div className="w-px h-8 bg-slate-200" />
            <div><Mono className="text-xl font-bold text-slate-900">12k+</Mono> Sessions</div>
            <div className="w-px h-8 bg-slate-200" />
            <div><Mono className="text-xl font-bold text-slate-900">4.8</Mono> Avg. rating</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Display as="h2" className="text-2xl font-bold text-slate-900 mb-1">Explore by category</Display>
        <p className="text-slate-500 mb-8">Find mentors across every domain that matters to your growth.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const c = COLOR_MAP[cat.color];
            const count = mentors.filter((m) => m.category === cat.name && m.status === 'active').length;
            return (
              <button key={cat.name} onClick={() => navigateTo('browse', { category: cat.name })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all group">
                <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <cat.icon size={20} />
                </div>
                <p className="font-semibold text-slate-900 text-sm leading-snug">{cat.name}</p>
                <p className="text-xs text-slate-500 mt-1">{count} mentors</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Display as="h2" className="text-2xl font-bold text-slate-900 mb-1">Top-rated mentors</Display>
              <p className="text-slate-500">Loved by mentees across the platform.</p>
            </div>
            <button onClick={() => navigateTo('browse')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-800">
              View all <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((m) => <MentorCard key={m.id} mentor={m} onClick={() => navigateTo('profile', { mentorId: m.id })} />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Display as="h2" className="text-2xl font-bold text-slate-900 mb-10 text-center">How Meridian works</Display>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: 'Find your mentor', desc: 'Search and filter by category, language, price, and experience to find the right fit.' },
            { icon: Calendar, title: 'Request a session', desc: 'Pick an open slot, share what you want to discuss, and send a booking request.' },
            { icon: TrendingUp, title: 'Grow, one session at a time', desc: 'Get accepted, hop on the call, and keep coming back as your goals evolve.' },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-4">
                <step.icon size={24} />
              </div>
              <p className="font-semibold text-slate-900 mb-2">{step.title}</p>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 rounded-3xl px-8 py-14 text-center">
          <Display as="h2" className="text-2xl sm:text-3xl font-bold text-white mb-3">Have expertise worth sharing?</Display>
          <p className="text-slate-400 max-w-md mx-auto mb-7">Join as a mentor, set your own price and hours, and start getting booked by mentees who need exactly what you know.</p>
          <button onClick={() => navigateTo('becomeMentor')} className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-flex items-center gap-2">
            Become a mentor <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ============================== Browse ============================== */

function BrowsePage({ mentors, navigateTo, initialCategory }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory || 'All');
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [minExp, setMinExp] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let list = mentors.filter((m) => m.status === 'active');
    if (category !== 'All') list = list.filter((m) => m.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.expertise.some((e) => e.toLowerCase().includes(q))
      );
    }
    if (selectedLangs.length) list = list.filter((m) => m.languages.some((l) => selectedLangs.includes(l)));
    list = list.filter((m) => m.price <= maxPrice && m.experience >= minExp);
    const sorters = {
      rating: (a, b) => b.rating - a.rating,
      priceLow: (a, b) => a.price - b.price,
      priceHigh: (a, b) => b.price - a.price,
      experience: (a, b) => b.experience - a.experience,
      sessions: (a, b) => b.sessions - a.sessions,
    };
    return [...list].sort(sorters[sortBy]);
  }, [mentors, category, query, selectedLangs, maxPrice, minExp, sortBy]);

  const toggleLang = (lang) => setSelectedLangs((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Display as="h1" className="text-2xl font-bold text-slate-900 mb-1">Browse mentors</Display>
        <p className="text-slate-500 text-sm">{results.length} mentor{results.length !== 1 ? 's' : ''} available</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2.5">
          <Search size={17} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, skill, or keyword..." className="flex-1 px-3 text-sm outline-none bg-transparent" />
        </div>
        <button onClick={() => setShowFilters((s) => !s)} className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700">
          <SlidersHorizontal size={16} /> Filters
        </button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="hidden lg:block bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 outline-none">
          <option value="rating">Highest rated</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="experience">Most experienced</option>
          <option value="sessions">Most sessions</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-3">Category</p>
              <div className="space-y-1">
                <button onClick={() => setCategory('All')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === 'All' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>All categories</button>
                {CATEGORIES.map((cat) => (
                  <button key={cat.name} onClick={() => setCategory(cat.name)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat.name ? 'bg-amber-50 text-amber-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900 mb-3">Language</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button key={lang} onClick={() => toggleLang(lang)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedLangs.includes(lang) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900">Max price</p>
                <Mono className="text-sm text-slate-500">₹{maxPrice}</Mono>
              </div>
              <input type="range" min="500" max="3500" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-amber-600" />
            </div>
            <div className="pt-5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900 mb-3">Minimum experience</p>
              <select value={minExp} onChange={(e) => setMinExp(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
                <option value={0}>Any</option>
                <option value={3}>3+ years</option>
                <option value={5}>5+ years</option>
                <option value={10}>10+ years</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <Search size={32} className="mx-auto mb-3 text-slate-300" />
              <p className="font-medium text-slate-700">No mentors match your filters</p>
              <p className="text-sm text-slate-400 mt-1">Try widening your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((m) => <MentorCard key={m.id} mentor={m} onClick={() => navigateTo('profile', { mentorId: m.id })} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================== Mentor profile ============================== */

function MentorProfilePage({ mentor, navigateTo, onRequestBooking }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!mentor) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-slate-400 mb-4">Mentor not found.</p>
        <button onClick={() => navigateTo('browse')} className="text-amber-700 font-medium text-sm">← Back to mentors</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button onClick={() => navigateTo('browse')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6">
        <ArrowLeft size={15} /> Back to mentors
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-5 mb-6">
            <Avatar name={mentor.name} color={mentor.avatarColor} size="lg" />
            <div>
              <Display as="h1" className="text-2xl font-bold text-slate-900">{mentor.name}</Display>
              <p className="text-slate-500 mt-0.5">{mentor.title}</p>
              <div className="flex items-center flex-wrap gap-3 mt-3">
                <CategoryBadge category={mentor.category} />
                <div className="flex items-center gap-1 text-sm">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  <Mono className="font-bold text-slate-900">{mentor.rating.toFixed(1)}</Mono>
                  <span className="text-slate-400">({mentor.sessions} sessions)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
            <h2 className="font-semibold text-slate-900 mb-3">About</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{mentor.bio}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
            <h2 className="font-semibold text-slate-900 mb-3">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((e) => (
                <span key={e} className="bg-slate-50 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200">{e}</span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-900 mb-1">Experience & languages</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"><Award size={17} className="text-slate-500" /></div>
                <div><p className="text-sm font-semibold text-slate-900">{mentor.experience} years</p><p className="text-xs text-slate-400">Experience</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"><Globe size={17} className="text-slate-500" /></div>
                <div><p className="text-sm font-semibold text-slate-900">{mentor.languages.join(', ')}</p><p className="text-xs text-slate-400">Languages</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline gap-1 mb-1">
              <Mono className="text-3xl font-bold text-slate-900">₹{mentor.price}</Mono>
              <span className="text-slate-400 text-sm">/ session</span>
            </div>
            <p className="text-xs text-slate-400 mb-5">60-minute 1:1 video session</p>

            <p className="text-sm font-semibold text-slate-900 mb-3">Available slots</p>
            <div className="space-y-2 mb-5">
              {mentor.slots.filter((s) => !s.booked).length === 0 && (
                <p className="text-sm text-slate-400">No open slots right now — check back soon.</p>
              )}
              {mentor.slots.filter((s) => !s.booked).map((slot) => (
                <button key={slot.id} onClick={() => setSelectedSlot(slot)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm transition-colors ${selectedSlot?.id === slot.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="flex items-center gap-2 text-slate-700 font-medium"><Calendar size={14} className="text-slate-400" />{slot.day}, {slot.date}</span>
                  <span className="text-slate-500">{slot.time}</span>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedSlot}
              onClick={() => onRequestBooking(mentor, selectedSlot)}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {selectedSlot ? 'Request booking' : 'Select a slot'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== Booking modal ============================== */

function BookingModal({ mentor, slot, onClose, onConfirm }) {
  const [message, setMessage] = useState('');
  if (!mentor || !slot) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900">Request a session</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3.5 mb-5">
          <Avatar name={mentor.name} color={mentor.avatarColor} size="sm" />
          <div>
            <p className="text-sm font-semibold text-slate-900">{mentor.name}</p>
            <p className="text-xs text-slate-500">{slot.day}, {slot.date} · {slot.time}</p>
          </div>
        </div>
        <label className="text-sm font-medium text-slate-700 mb-1.5 block">What would you like to discuss?</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Share some context so your mentor can prepare..."
          className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500 resize-none mb-5"
        />
        <div className="flex items-center justify-between mb-5 text-sm">
          <span className="text-slate-500">Session fee</span>
          <Mono className="font-semibold text-slate-900">₹{mentor.price}</Mono>
        </div>
        <button onClick={() => onConfirm(message)} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Send booking request
        </button>
      </div>
    </div>
  );
}

/* ============================== Become a mentor ============================== */

function BecomeMentorPage({ onSubmit, navigateTo }) {
  const [form, setForm] = useState({
    name: '', title: '', category: CATEGORIES[0].name, bio: '',
    experience: '', expertise: '', price: '', languages: [],
    slotDay: '', slotDate: '', slotTime: '',
  });
  const [slots, setSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const toggleLang = (lang) => setForm((prev) => ({ ...prev, languages: prev.languages.includes(lang) ? prev.languages.filter((l) => l !== lang) : [...prev.languages, lang] }));

  const addSlot = () => {
    if (!form.slotDay || !form.slotDate || !form.slotTime) return;
    setSlots((prev) => [...prev, { id: nextId('slot'), day: form.slotDay, date: form.slotDate, time: form.slotTime, booked: false }]);
    setForm((prev) => ({ ...prev, slotDay: '', slotDate: '', slotTime: '' }));
  };
  const removeSlot = (id) => setSlots((prev) => prev.filter((s) => s.id !== id));

  const canSubmit = form.name && form.title && form.bio && form.experience && form.price && form.languages.length > 0 && slots.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      id: nextId('m'), name: form.name, title: form.title, category: form.category, bio: form.bio,
      experience: Number(form.experience),
      expertise: form.expertise.split(',').map((s) => s.trim()).filter(Boolean),
      price: Number(form.price), languages: form.languages,
      rating: 5.0, sessions: 0, avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      status: 'active', slots,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={30} className="text-emerald-600" />
        </div>
        <Display as="h2" className="text-xl font-bold text-slate-900 mb-2">Application submitted</Display>
        <p className="text-sm text-slate-500 mb-8">Your mentor profile is pending review. Our team typically approves applications within 24 hours.</p>
        <button onClick={() => navigateTo('landing')} className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl">Back to home</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Display as="h1" className="text-2xl font-bold text-slate-900 mb-1">Become a mentor</Display>
      <p className="text-slate-500 mb-8 text-sm">Set your own price, share your expertise, and start mentoring on your schedule.</p>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
        <h2 className="font-semibold text-slate-900 mb-4">Basic information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Full name</label>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Aditi Rao" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Professional title</label>
            <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Product Manager, Zomato" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Category</label>
          <select value={form.category} onChange={(e) => update('category', e.target.value)} className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none bg-white">
            {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
        <h2 className="font-semibold text-slate-900 mb-4">Bio & expertise</h2>
        <div className="mb-4">
          <label className="text-xs font-medium text-slate-500 mb-1 block">Bio</label>
          <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={4} placeholder="Tell mentees about your background and how you can help them..." className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500 resize-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Years of experience</label>
            <input type="number" min="0" value={form.experience} onChange={(e) => update('experience', e.target.value)} placeholder="e.g. 6" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Expertise (comma-separated)</label>
            <input value={form.expertise} onChange={(e) => update('expertise', e.target.value)} placeholder="e.g. SQL, A/B Testing, Roadmaps" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
        <h2 className="font-semibold text-slate-900 mb-4">Pricing & languages</h2>
        <div className="mb-4">
          <label className="text-xs font-medium text-slate-500 mb-1 block">Price per session (₹)</label>
          <input type="number" min="0" value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="e.g. 1500" className="w-full sm:w-48 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-2 block">Languages you mentor in</label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button type="button" key={lang} onClick={() => toggleLang(lang)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${form.languages.includes(lang) ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-slate-900 mb-4">Availability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
          <input value={form.slotDay} onChange={(e) => update('slotDay', e.target.value)} placeholder="Day (e.g. Mon)" className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          <input value={form.slotDate} onChange={(e) => update('slotDate', e.target.value)} placeholder="Date (e.g. Aug 18)" className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          <input value={form.slotTime} onChange={(e) => update('slotTime', e.target.value)} placeholder="Time (e.g. 6:00 PM)" className="border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
          <button type="button" onClick={addSlot} className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors">
            <Plus size={15} /> Add slot
          </button>
        </div>
        {slots.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {slots.map((s) => (
              <span key={s.id} className="flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full">
                {s.day}, {s.date} · {s.time}
                <button onClick={() => removeSlot(s.id)}><X size={12} /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button disabled={!canSubmit} onClick={handleSubmit} className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors">
        Submit application
      </button>
    </div>
  );
}

/* ============================== Sign up ============================== */

function SignUpPage({ onSubmit, navigateTo }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const canSubmit = form.name && form.email && form.password.length >= 4;
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <Display as="h1" className="text-2xl font-bold text-slate-900 mb-1 text-center">Create your account</Display>
      <p className="text-slate-500 text-sm mb-8 text-center">Join as a mentee and start booking sessions with mentors.</p>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Full name</label>
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@email.com" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-amber-500" />
        </div>
        <button disabled={!canSubmit} onClick={() => onSubmit(form)} className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors mt-2">
          Create account
        </button>
      </div>
      <p className="text-center text-sm text-slate-400 mt-5">
        Want to mentor instead? <button onClick={() => navigateTo('becomeMentor')} className="text-amber-700 font-medium">Apply here</button>
      </p>
    </div>
  );
}

/* ============================== Mentor dashboard ============================== */

function MentorDashboardContent({ tab, mentor, bookings, mentees, onUpdateBookingStatus }) {
  if (!mentor) return <p className="text-slate-500">No mentor profile found.</p>;
  const myBookings = bookings.filter((b) => b.mentorId === mentor.id);
  const pending = myBookings.filter((b) => b.status === 'pending');
  const accepted = myBookings.filter((b) => b.status === 'accepted');
  const earnings = accepted.length * mentor.price;

  if (tab === 'bookings') {
    return (
      <div>
        <Display as="h1" className="text-xl font-bold text-slate-900 mb-6">Incoming bookings</Display>
        {myBookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400">No booking requests yet.</div>
        ) : (
          <div className="space-y-3">
            {myBookings.slice().reverse().map((b) => {
              const mentee = mentees.find((mt) => mt.id === b.menteeId);
              return (
                <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Avatar name={mentee?.name || 'Mentee'} color="bg-slate-400" size="sm" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{mentee?.name || 'Unknown mentee'}</p>
                        <p className="text-xs text-slate-400 mb-2">{b.slotLabel} · requested {b.createdAt}</p>
                        <p className="text-sm text-slate-600">{b.message}</p>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  {b.status === 'pending' && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                      <button onClick={() => onUpdateBookingStatus(b.id, 'accepted')} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                        <Check size={15} /> Accept
                      </button>
                      <button onClick={() => onUpdateBookingStatus(b.id, 'declined')} className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 transition-colors">
                        <X size={15} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (tab === 'profile') {
    return (
      <div>
        <Display as="h1" className="text-xl font-bold text-slate-900 mb-6">My profile</Display>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={mentor.name} color={mentor.avatarColor} size="lg" />
            <div>
              <p className="text-lg font-bold text-slate-900">{mentor.name}</p>
              <p className="text-slate-500 text-sm">{mentor.title}</p>
              <div className="mt-2"><CategoryBadge category={mentor.category} /></div>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">{mentor.bio}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
            <div><p className="text-xs text-slate-400 mb-1">Price</p><Mono className="font-semibold text-slate-900">₹{mentor.price}</Mono></div>
            <div><p className="text-xs text-slate-400 mb-1">Experience</p><p className="font-semibold text-slate-900">{mentor.experience} yrs</p></div>
            <div><p className="text-xs text-slate-400 mb-1">Rating</p><p className="font-semibold text-slate-900">{mentor.rating.toFixed(1)} ★</p></div>
            <div><p className="text-xs text-slate-400 mb-1">Languages</p><p className="font-semibold text-slate-900">{mentor.languages.join(', ')}</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Display as="h1" className="text-xl font-bold text-slate-900 mb-6">Welcome back, {mentor.name.split(' ')[0]}</Display>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Clock} label="Pending requests" value={pending.length} tint="amber" />
        <StatCard icon={CheckCircle2} label="Accepted sessions" value={accepted.length} tint="emerald" />
        <StatCard icon={Wallet} label="Est. earnings" value={`₹${earnings}`} tint="sky" />
        <StatCard icon={Star} label="Rating" value={mentor.rating.toFixed(1)} tint="violet" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Recent requests</h2>
        {pending.length === 0 ? <p className="text-sm text-slate-400">You're all caught up — no pending requests.</p> : (
          <div className="space-y-3">
            {pending.slice(0, 3).map((b) => {
              const mentee = mentees.find((mt) => mt.id === b.menteeId);
              return (
                <div key={b.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={mentee?.name || 'M'} color="bg-slate-400" size="sm" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{mentee?.name}</p>
                      <p className="text-xs text-slate-400">{b.slotLabel}</p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================== Admin dashboard ============================== */

function AdminDashboardContent({ tab, mentors, mentees, bookings, onUpdateMentorStatus, onRemoveBooking }) {
  if (tab === 'mentors') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Display as="h1" className="text-xl font-bold text-slate-900">Manage mentors</Display>
          <span className="text-sm text-slate-400">{mentors.length} total</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">Mentor</th>
                <th className="text-left font-medium px-5 py-3">Category</th>
                <th className="text-left font-medium px-5 py-3">Rating</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentors.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={m.name} color={m.avatarColor} size="sm" />
                      <div><p className="font-medium text-slate-900">{m.name}</p><p className="text-xs text-slate-400">{m.title}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{m.category}</td>
                  <td className="px-5 py-3.5 text-slate-600">{m.rating.toFixed(1)} ★</td>
                  <td className="px-5 py-3.5"><StatusBadge status={m.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      {m.status === 'pending' && (
                        <>
                          <button onClick={() => onUpdateMentorStatus(m.id, 'active')} className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">Approve</button>
                          <button onClick={() => onUpdateMentorStatus(m.id, 'suspended')} className="text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors">Reject</button>
                        </>
                      )}
                      {m.status === 'active' && (
                        <button onClick={() => onUpdateMentorStatus(m.id, 'suspended')} className="text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors">Suspend</button>
                      )}
                      {m.status === 'suspended' && (
                        <button onClick={() => onUpdateMentorStatus(m.id, 'active')} className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">Reactivate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === 'mentees') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Display as="h1" className="text-xl font-bold text-slate-900">Manage mentees</Display>
          <span className="text-sm text-slate-400">{mentees.length} total</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">Mentee</th>
                <th className="text-left font-medium px-5 py-3">Email</th>
                <th className="text-left font-medium px-5 py-3">Joined</th>
                <th className="text-left font-medium px-5 py-3">Bookings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentees.map((mt) => (
                <tr key={mt.id}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3"><Avatar name={mt.name} color="bg-slate-400" size="sm" /><p className="font-medium text-slate-900">{mt.name}</p></div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{mt.email}</td>
                  <td className="px-5 py-3.5 text-slate-600">{mt.joined}</td>
                  <td className="px-5 py-3.5 text-slate-600">{bookings.filter((b) => b.menteeId === mt.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === 'bookings') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <Display as="h1" className="text-xl font-bold text-slate-900">All bookings</Display>
          <span className="text-sm text-slate-400">{bookings.length} total</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-5 py-3">Mentor</th>
                <th className="text-left font-medium px-5 py-3">Mentee</th>
                <th className="text-left font-medium px-5 py-3">Slot</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.slice().reverse().map((b) => {
                const mentor = mentors.find((m) => m.id === b.mentorId);
                const mentee = mentees.find((mt) => mt.id === b.menteeId);
                return (
                  <tr key={b.id}>
                    <td className="px-5 py-3.5 font-medium text-slate-900">{mentor?.name || '—'}</td>
                    <td className="px-5 py-3.5 text-slate-600">{mentee?.name || '—'}</td>
                    <td className="px-5 py-3.5 text-slate-600">{b.slotLabel}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => onRemoveBooking(b.id)} className="text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const pendingApprovals = mentors.filter((m) => m.status === 'pending').length;
  const activeMentors = mentors.filter((m) => m.status === 'active').length;
  const statusData = ['pending', 'accepted', 'declined'].map((s) => ({ name: s.charAt(0).toUpperCase() + s.slice(1), value: bookings.filter((b) => b.status === s).length }));
  const categoryData = CATEGORIES.map((c) => ({ name: c.name.split(' ')[0], value: mentors.filter((m) => m.category === c.name && m.status === 'active').length }));

  return (
    <div>
      <Display as="h1" className="text-xl font-bold text-slate-900 mb-6">Platform overview</Display>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Active mentors" value={activeMentors} tint="emerald" />
        <StatCard icon={UserCheck} label="Total mentees" value={mentees.length} tint="sky" />
        <StatCard icon={BookOpen} label="Total bookings" value={bookings.length} tint="violet" />
        <StatCard icon={AlertCircle} label="Pending approvals" value={pendingApprovals} tint="amber" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Bookings by status</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, i) => <Cell key={i} fill={['#d97706', '#059669', '#e11d48'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Mentors by category</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#334155" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== App ============================== */

export default function App() {
  const [view, setView] = useState('landing');
  const [navParams, setNavParams] = useState({});
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [role, setRole] = useState('mentee');
  const [currentMentorId, setCurrentMentorId] = useState(null);
  const [bookingTarget, setBookingTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const normalizeMentor = (m) => ({
    ...m,
    id: m.id || m._id,
    experience: Number(m.experience || 0),
    price: Number(m.price || 0),
    rating: Number(m.rating ?? 0),
    sessions: Number(m.sessions || 0),
    expertise: Array.isArray(m.expertise) ? m.expertise : [],
    languages: Array.isArray(m.languages) ? m.languages : [],
    slots: Array.isArray(m.slots) ? m.slots : [],
    status: m.status || 'active',
  });

  const normalizeMentee = (m) => ({
    ...m,
    id: m.id || m._id,
  });

  const normalizeBooking = (b) => ({
    ...b,
    id: b.id || b._id,
  });

  const loadBackendData = async () => {
    setApiError('');
    try {
      const [mentorsRes, menteesRes, bookingsRes] = await Promise.all([
        fetch(`${API_BASE}/api/mentors`),
        fetch(`${API_BASE}/api/mentees`),
        fetch(`${API_BASE}/api/bookings`),
      ]);

      if (!mentorsRes.ok || !menteesRes.ok || !bookingsRes.ok) {
        throw new Error('Backend API request failed. Please check the backend server.');
      }

      const [mentorsData, menteesData, bookingsData] = await Promise.all([
        mentorsRes.json(),
        menteesRes.json(),
        bookingsRes.json(),
      ]);

      const loadedMentors = mentorsData.map(normalizeMentor);
      const loadedMentees = menteesData.map(normalizeMentee);
      const loadedBookings = bookingsData.map(normalizeBooking);

      setMentors(loadedMentors);
      setMentees(loadedMentees);
      setBookings(loadedBookings);

      const savedMentorId = localStorage.getItem('meridianMentorId');
      const matchingMentor = loadedMentors.find((m) => m.id === savedMentorId);
      setCurrentMentorId(matchingMentor?.id || loadedMentors[0]?.id || null);
    } catch (error) {
      console.error('❌ Failed to load backend data:', error);
      setApiError(error.message || 'Could not connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  const navigateTo = (v, params = {}) => {
    setView(v);
    setNavParams(params);
    if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0);
  };

  const handleRequestBooking = (mentor, slot) => setBookingTarget({ mentor, slot });

  const confirmBooking = async (message) => {
    if (!bookingTarget) return;

    try {
      const { mentor, slot } = bookingTarget;
      const mentee = mentees[0];

      if (!mentee) {
        setToast('Please create a mentee account before booking.');
        return;
      }

      const bookingData = {
        id: nextId('b'),
        mentorId: mentor.id,
        menteeId: mentee.id,
        slotId: slot.id,
        slotLabel: `${slot.day}, ${slot.date} · ${slot.time}`,
        message: message || 'Looking forward to the session!',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Booking creation failed.');
      }

      const savedBooking = normalizeBooking(await response.json());
      setBookings((prev) => [...prev, savedBooking]);
      setMentors((prev) => prev.map((m) => (
        m.id === mentor.id
          ? { ...m, slots: m.slots.map((s) => s.id === slot.id ? { ...s, booked: true } : s) }
          : m
      )));
      setBookingTarget(null);
      setToast('Booking request sent!');
    } catch (error) {
      console.error('❌ Booking failed:', error);
      setToast(error.message || 'Booking failed.');
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to update booking.');
      }

      const updatedBooking = normalizeBooking(await response.json());
      setBookings((prev) => prev.map((b) => b.id === id ? updatedBooking : b));
      setToast(status === 'accepted' ? 'Booking accepted' : 'Booking declined');
    } catch (error) {
      console.error('❌ Booking update failed:', error);
      setToast(error.message || 'Failed to update booking.');
    }
  };

  const handleRemoveBooking = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/bookings/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to delete booking.');
      }
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setToast('Booking deleted');
    } catch (error) {
      console.error('❌ Booking delete failed:', error);
      setToast(error.message || 'Failed to delete booking.');
    }
  };

  const handleUpdateMentorStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/api/mentors/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Mentor status API is not available yet.');
      }

      const updatedMentor = normalizeMentor(await response.json());
      setMentors((prev) => prev.map((m) => m.id === id ? updatedMentor : m));
      setToast(status === 'active' ? 'Mentor approved' : 'Mentor suspended');
    } catch (error) {
      console.error('❌ Mentor status update failed:', error);
      setToast(error.message || 'Failed to update mentor.');
    }
  };

  const handleNewMentor = async (mentor) => {
    try {
      const response = await fetch(`${API_BASE}/api/mentors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mentor, status: 'pending' }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Mentor signup failed.');
      }

      const savedMentor = normalizeMentor(await response.json());
      setMentors((prev) => [...prev, savedMentor]);
      setCurrentMentorId(savedMentor.id);
      localStorage.setItem('meridianMentorId', savedMentor.id);
      setRole('mentor');
      setToast('Mentor application submitted for review!');
      navigateTo('mentorDashboard');
    } catch (error) {
      console.error('❌ Mentor signup failed:', error);
      setToast(error.message || 'Mentor signup failed.');
    }
  };

  const handleNewMentee = async (form) => {
    try {
      const menteeData = {
        id: nextId('mt'),
        name: form.name,
        email: form.email,
        joined: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      };

      const response = await fetch(`${API_BASE}/api/mentees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menteeData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Mentee signup failed.');
      }

      const savedMentee = normalizeMentee(await response.json());
      setMentees((prev) => [...prev, savedMentee]);
      setToast('Welcome to Meridian!');
      navigateTo('browse');
    } catch (error) {
      console.error('❌ Mentee signup failed:', error);
      setToast(error.message || 'Mentee signup failed.');
    }
  };

  const currentMentor = mentors.find((m) => m.id === currentMentorId);

  if (loading) {
    return (
      <div style={{ fontFamily: BODY_FONT }} className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-semibold text-slate-900">Connecting to Meridian backend...</p>
          <p className="text-sm text-slate-500 mt-1">Loading mentors, mentees and bookings from MongoDB.</p>
        </div>
      </div>
    );
  }

  let content;
  if (view === 'mentorDashboard') {
    content = (
      <DashboardShell role="mentor" active={navParams.tab || 'overview'} navigateTo={navigateTo} setRole={setRole} personaName={currentMentor?.name}>
        <MentorDashboardContent tab={navParams.tab || 'overview'} mentor={currentMentor} bookings={bookings} mentees={mentees} onUpdateBookingStatus={handleUpdateBookingStatus} />
      </DashboardShell>
    );
  } else if (view === 'adminDashboard') {
    content = (
      <DashboardShell role="admin" active={navParams.tab || 'overview'} navigateTo={navigateTo} setRole={setRole}>
        <AdminDashboardContent tab={navParams.tab || 'overview'} mentors={mentors} mentees={mentees} bookings={bookings} onUpdateMentorStatus={handleUpdateMentorStatus} onRemoveBooking={handleRemoveBooking} />
      </DashboardShell>
    );
  } else {
    content = (
      <>
        <PublicNav navigateTo={navigateTo} role={role} setRole={setRole} />
        {view === 'landing' && <LandingPage navigateTo={navigateTo} mentors={mentors} />}
        {view === 'browse' && <BrowsePage mentors={mentors} navigateTo={navigateTo} initialCategory={navParams.category} />}
        {view === 'profile' && <MentorProfilePage mentor={mentors.find((m) => m.id === navParams.mentorId)} navigateTo={navigateTo} onRequestBooking={handleRequestBooking} />}
        {view === 'becomeMentor' && <BecomeMentorPage onSubmit={handleNewMentor} navigateTo={navigateTo} />}
        {view === 'signup' && <SignUpPage onSubmit={handleNewMentee} navigateTo={navigateTo} />}
      </>
    );
  }

  return (
    <div style={{ fontFamily: BODY_FONT }} className="min-h-screen bg-white">
      <style>{FONT_IMPORT}</style>
      {apiError && (
        <div className="bg-rose-50 border-b border-rose-200 px-6 py-3 text-center text-sm text-rose-700">
          {apiError} <button onClick={loadBackendData} className="font-semibold underline ml-2">Retry</button>
        </div>
      )}
      {content}
      {bookingTarget && <BookingModal mentor={bookingTarget.mentor} slot={bookingTarget.slot} onClose={() => setBookingTarget(null)} onConfirm={confirmBooking} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}