import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Calendar,
  Check,
  X,
  Users,
  Home,
  UserCheck,
  Settings,
  BookOpen,
  LogOut,
  Wallet,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Globe,
  Trash2,
  Sparkles,
  Briefcase,
  Code,
  Palette,
  Megaphone,
  Landmark,
  Target,
  Cpu,
  Crown,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* =====================================================
   CONFIG
===================================================== */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://meridian-backend-9rro.onrender.com";

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
`;

const DISPLAY_FONT = "'Space Grotesk', sans-serif";
const BODY_FONT = "'Inter', sans-serif";
const MONO_FONT = "'Space Mono', monospace";

/* =====================================================
   CONSTANTS
===================================================== */

const CATEGORIES = [
  { name: "Technology & Engineering", icon: Code, color: "sky" },
  { name: "Product & Design", icon: Palette, color: "violet" },
  { name: "Business & Entrepreneurship", icon: Briefcase, color: "amber" },
  { name: "Marketing & Growth", icon: Megaphone, color: "rose" },
  { name: "Finance & Real Estate", icon: Landmark, color: "emerald" },
  { name: "Career & Leadership", icon: Target, color: "orange" },
  { name: "Data & AI", icon: Cpu, color: "indigo" },
  { name: "Chess & Strategy", icon: Crown, color: "teal" },
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Punjabi",
  "Malayalam",
  "Urdu",
];

const COLORS = {
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-200",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    ring: "ring-violet-200",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-orange-200",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    ring: "ring-indigo-200",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    ring: "ring-teal-200",
  },
  slate: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    ring: "ring-slate-200",
  },
};

const AVATAR_COLORS = [
  "bg-slate-700",
  "bg-sky-600",
  "bg-violet-600",
  "bg-amber-700",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-orange-600",
];

let idCounter = 1000;

function nextId(prefix) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function initials(name = "") {
  return name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function categoryColor(category) {
  const found = CATEGORIES.find((x) => x.name === category);
  return COLORS[found?.color || "slate"];
}

/* =====================================================
   COMMON UI
===================================================== */

function Display({ as: Tag = "h1", children, className = "" }) {
  return (
    <Tag
      style={{ fontFamily: DISPLAY_FONT }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function Mono({ children, className = "" }) {
  return (
    <span style={{ fontFamily: MONO_FONT }} className={className}>
      {children}
    </span>
  );
}

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line
        x1="6"
        y1="17"
        x2="12"
        y2="7"
        stroke="#D9A441"
        strokeWidth="1.6"
      />
      <line
        x1="12"
        y1="7"
        x2="18"
        y2="14"
        stroke="#D9A441"
        strokeWidth="1.6"
      />
      <circle cx="6" cy="17" r="2.1" fill="#D9A441" />
      <circle cx="12" cy="7" r="2.1" fill="#D9A441" />
      <circle cx="18" cy="14" r="2.1" fill="#D9A441" />
    </svg>
  );
}

function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
        <LogoMark />
      </div>

      <Display
        as="span"
        className={`text-lg font-semibold ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        Meridian
      </Display>
    </div>
  );
}

function Avatar({ name, color = "bg-slate-700", size = "md" }) {
  const sizes = {
    sm: "w-9 h-9 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
  };

  return (
    <div
      className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
      style={{ fontFamily: DISPLAY_FONT }}
    >
      {initials(name)}
    </div>
  );
}

function CategoryBadge({ category }) {
  const c = categoryColor(category);

  return (
    <span
      className={`inline-flex rounded-full ${c.bg} ${c.text} px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${c.ring}`}
    >
      {category}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: COLORS.amber,
    active: COLORS.emerald,
    accepted: COLORS.emerald,
    suspended: COLORS.rose,
    declined: COLORS.rose,
    rejected: COLORS.rose,
  };

  const c = map[status] || COLORS.slate;

  return (
    <span
      className={`inline-flex rounded-full ${c.bg} ${c.text} px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${c.ring}`}
    >
      {status}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tint = "amber",
}) {
  const c = COLORS[tint];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center`}
      >
        <Icon size={20} />
      </div>

      <div>
        <Mono className="text-2xl font-bold text-slate-900">
          {value}
        </Mono>

        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[100] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2">
      <CheckCircle2
        size={18}
        className="text-emerald-400"
      />
      <span className="text-sm">{message}</span>
    </div>
  );
}

/* =====================================================
   PUBLIC NAVIGATION
===================================================== */

function PublicNav({ navigateTo, user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <button onClick={() => navigateTo("landing")}>
          <Logo />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => navigateTo("browse")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
          >
            Browse Mentors
          </button>

          <button
            onClick={() => navigateTo("becomeMentor")}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
          >
            Become a Mentor
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.role === "admin" && (
                <button
                  onClick={() => navigateTo("adminDashboard")}
                  className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl"
                >
                  Admin
                </button>
              )}

              {user.role === "mentor" && (
                <button
                  onClick={() => navigateTo("mentorDashboard")}
                  className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl"
                >
                  Dashboard
                </button>
              )}

              {user.role === "mentee" && (
                <button
                  onClick={() => navigateTo("browse")}
                  className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl"
                >
                  Browse
                </button>
              )}

              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-semibold bg-slate-900 text-white rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigateTo("login")}
                className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl"
              >
                Login
              </button>

              <button
                onClick={() => navigateTo("signup")}
                className="px-4 py-2 text-sm font-semibold bg-slate-900 text-white rounded-xl"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* =====================================================
   LOGIN
===================================================== */

function LoginPage({
  navigateTo,
  onLogin,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      localStorage.setItem(
        "meridianToken",
        data.token
      );

      localStorage.setItem(
        "meridianUser",
        JSON.stringify(data.user)
      );

      onLogin(data.user);

      if (data.user.role === "admin") {
        navigateTo("adminDashboard");
      } else if (data.user.role === "mentor") {
        navigateTo("mentorDashboard");
      } else {
        navigateTo("browse");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Display className="text-3xl font-bold text-slate-900">
            Welcome back
          </Display>

          <p className="text-slate-500 mt-2">
            Login to your Meridian account
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm"
        >
          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="you@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 mb-5 outline-none focus:border-amber-500"
          />

          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Your password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 mb-6 outline-none focus:border-amber-500"
          />

          <button
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?

            <button
              type="button"
              onClick={() => navigateTo("signup")}
              className="ml-1 text-amber-700 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

/* =====================================================
   SIGN UP
===================================================== */

function SignupPage({
  navigateTo,
  onSignup,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentee",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setError(
        "Name, email and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      await onSignup(form);

      navigateTo("browse");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Display className="text-3xl font-bold text-slate-900">
            Create your account
          </Display>

          <p className="text-slate-500 mt-2">
            Join Meridian and start growing
          </p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white border border-slate-200 rounded-2xl p-7"
        >
          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <label className="text-sm font-medium text-slate-700">
            Full name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Your name"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-2 mb-5 outline-none"
          />

          <label className="text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            placeholder="you@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-2 mb-5 outline-none"
          />

          <label className="text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="Create password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-2 mb-5 outline-none"
          />

          <label className="text-sm font-medium text-slate-700">
            Account type
          </label>

          <div className="grid grid-cols-2 gap-3 mt-2 mb-6">
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "mentee",
                })
              }
              className={`p-3 rounded-xl border text-sm font-semibold ${
                form.role === "mentee"
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : "border-slate-200"
              }`}
            >
              Mentee
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "mentor",
                })
              }
              className={`p-3 rounded-xl border text-sm font-semibold ${
                form.role === "mentor"
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : "border-slate-200"
              }`}
            >
              Mentor
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-5">
            Admin accounts cannot be created from this
            public signup page.
          </p>

          <button
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?

            <button
              type="button"
              onClick={() => navigateTo("login")}
              className="ml-1 text-amber-700 font-semibold"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

/* =====================================================
   LANDING
===================================================== */

function LandingPage({
  mentors,
  navigateTo,
}) {
  const featured = mentors
    .filter((m) => m.status === "active")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div>

      <section className="bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <span className="inline-flex items-center gap-2 bg-white border border-amber-200 text-amber-700 rounded-full px-4 py-2 text-sm font-semibold">
            <Sparkles size={15} />
            Learn from people ahead of you
          </span>

          <Display className="text-4xl md:text-6xl font-bold text-slate-900 max-w-4xl mx-auto mt-7">
            Find the mentor who's already walked your path
          </Display>

          <p className="max-w-2xl mx-auto text-lg text-slate-600 mt-6">
            Book one-to-one sessions with experienced mentors
            across technology, business, design, career and more.
          </p>

          <div className="max-w-xl mx-auto mt-8 flex bg-white border border-slate-200 rounded-2xl p-2 shadow-lg">
            <Search className="text-slate-400 m-3" size={19} />

            <input
              placeholder="Search mentors or skills..."
              className="flex-1 outline-none px-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigateTo("browse");
                }
              }}
            />

            <button
              onClick={() => navigateTo("browse")}
              className="bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Display className="text-2xl font-bold">
          Explore by category
        </Display>

        <p className="text-slate-500 mt-1 mb-8">
          Find mentors across multiple domains.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const c = COLORS[category.color];
            const Icon = category.icon;

            const count = mentors.filter(
              (m) =>
                m.category === category.name &&
                m.status === "active"
            ).length;

            return (
              <button
                key={category.name}
                onClick={() =>
                  navigateTo("browse", {
                    category: category.name,
                  })
                }
                className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div
                  className={`w-11 h-11 ${c.bg} ${c.text} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon size={20} />
                </div>

                <p className="font-semibold text-sm">
                  {category.name}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {count} mentors
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex justify-between items-end mb-8">
            <div>
              <Display className="text-2xl font-bold">
                Top-rated mentors
              </Display>

              <p className="text-slate-500">
                Choose the right expert for your goal.
              </p>
            </div>

            <button
              onClick={() => navigateTo("browse")}
              className="text-amber-700 font-semibold flex items-center gap-1"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onClick={() =>
                  navigateTo("profile", {
                    mentorId: mentor.id,
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   MENTOR CARD
===================================================== */

function MentorCard({ mentor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">

        <Avatar
          name={mentor.name}
          color={mentor.avatarColor || "bg-slate-700"}
        />

        <div className="flex items-center gap-1">
          <Star
            size={14}
            className="fill-amber-400 text-amber-400"
          />

          <Mono className="font-bold">
            {Number(mentor.rating || 0).toFixed(1)}
          </Mono>
        </div>
      </div>

      <p className="font-semibold text-slate-900">
        {mentor.name}
      </p>

      <p className="text-sm text-slate-500 mb-3">
        {mentor.title}
      </p>

      <CategoryBadge category={mentor.category} />

      <p className="text-sm text-slate-500 mt-4 line-clamp-3">
        {mentor.bio}
      </p>

      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between">
        <Mono className="font-semibold">
          ₹{mentor.price}
        </Mono>

        <span className="text-xs text-slate-400">
          {mentor.experience}+ yrs
        </span>
      </div>
    </button>
  );
}

/* =====================================================
   BROWSE
===================================================== */

function BrowsePage({
  mentors,
  navigateTo,
  initialCategory,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    initialCategory || "All"
  );
  const [language, setLanguage] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sort, setSort] = useState("rating");

  const results = useMemo(() => {
    let list = mentors.filter(
      (m) => m.status === "active"
    );

    if (category !== "All") {
      list = list.filter(
        (m) => m.category === category
      );
    }

    if (language !== "All") {
      list = list.filter((m) =>
        Array.isArray(m.languages)
          ? m.languages.includes(language)
          : false
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();

      list = list.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.title?.toLowerCase().includes(q) ||
          m.bio?.toLowerCase().includes(q) ||
          m.expertise?.some((x) =>
            x.toLowerCase().includes(q)
          )
      );
    }

    list = list.filter(
      (m) => Number(m.price || 0) <= maxPrice
    );

    if (sort === "rating") {
      list.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    if (sort === "priceLow") {
      list.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "priceHigh") {
      list.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "experience") {
      list.sort(
        (a, b) =>
          Number(b.experience || 0) -
          Number(a.experience || 0)
      );
    }

    return list;
  }, [
    mentors,
    query,
    category,
    language,
    maxPrice,
    sort,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <Display className="text-3xl font-bold">
        Browse mentors
      </Display>

      <p className="text-slate-500 mt-1 mb-7">
        {results.length} mentors available
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

        <aside className="bg-white border border-slate-200 rounded-2xl p-5 h-fit lg:sticky lg:top-24">

          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={17} />
            <p className="font-semibold">
              Filters
            </p>
          </div>

          <label className="text-sm font-medium">
            Search
          </label>

          <div className="flex items-center border border-slate-200 rounded-xl mt-2 mb-5 px-3">
            <Search size={16} className="text-slate-400" />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Name or skill"
              className="w-full px-2 py-2.5 outline-none text-sm"
            />
          </div>

          <label className="text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 mt-2 mb-5"
          >
            <option value="All">
              All categories
            </option>

            {CATEGORIES.map((c) => (
              <option key={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="text-sm font-medium">
            Language
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 mt-2 mb-5"
          >
            <option value="All">All languages</option>

            {LANGUAGES.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>

          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">
                Maximum price
              </label>

              <Mono className="text-sm text-slate-500">
                ₹{maxPrice}
              </Mono>
            </div>

            <input
              type="range"
              min="500"
              max="3500"
              step="100"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full accent-amber-600"
            />
          </div>

          <label className="text-sm font-medium">
            Sort
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 mt-2"
          >
            <option value="rating">
              Highest rated
            </option>

            <option value="priceLow">
              Price: Low to High
            </option>

            <option value="priceHigh">
              Price: High to Low
            </option>

            <option value="experience">
              Most experienced
            </option>
          </select>
        </aside>

        <main className="lg:col-span-3">

          {results.length === 0 ? (
            <div className="text-center py-24">
              <Search
                size={35}
                className="mx-auto text-slate-300 mb-3"
              />

              <p className="font-semibold">
                No mentors found
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onClick={() =>
                    navigateTo("profile", {
                      mentorId: mentor.id,
                    })
                  }
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* =====================================================
   MENTOR PROFILE
===================================================== */

function MentorProfilePage({
  mentor,
  navigateTo,
  onRequestBooking,
}) {
  const [slot, setSlot] = useState(null);

  if (!mentor) {
    return (
      <div className="text-center py-24">
        <p className="text-slate-500">
          Mentor not found.
        </p>

        <button
          onClick={() => navigateTo("browse")}
          className="text-amber-700 mt-4"
        >
          Back to mentors
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <button
        onClick={() => navigateTo("browse")}
        className="flex items-center gap-2 text-sm text-slate-500 mb-7"
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <div className="flex items-start gap-5 mb-7">

            <Avatar
              name={mentor.name}
              color={mentor.avatarColor || "bg-slate-700"}
              size="lg"
            />

            <div>
              <Display className="text-3xl font-bold">
                {mentor.name}
              </Display>

              <p className="text-slate-500 mt-1">
                {mentor.title}
              </p>

              <div className="flex flex-wrap gap-3 mt-3">
                <CategoryBadge
                  category={mentor.category}
                />

                <span className="flex items-center gap-1 text-sm">
                  <Star
                    size={15}
                    className="fill-amber-400 text-amber-400"
                  />

                  <b>
                    {Number(mentor.rating || 0).toFixed(
                      1
                    )}
                  </b>

                  <span className="text-slate-400">
                    ({mentor.sessions || 0} sessions)
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
            <h2 className="font-semibold mb-3">
              About
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {mentor.bio}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-5">
            <h2 className="font-semibold mb-4">
              Expertise
            </h2>

            <div className="flex flex-wrap gap-2">
              {mentor.expertise?.map((skill) => (
                <span
                  key={skill}
                  className="bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="font-semibold mb-4">
              Experience & Languages
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div className="flex gap-3">
                <Award className="text-slate-500" />

                <div>
                  <p className="font-semibold">
                    {mentor.experience} years
                  </p>

                  <p className="text-xs text-slate-400">
                    Experience
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Globe className="text-slate-500" />

                <div>
                  <p className="font-semibold">
                    {mentor.languages?.join(", ")}
                  </p>

                  <p className="text-xs text-slate-400">
                    Languages
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:sticky lg:top-24">

            <div className="flex items-baseline gap-1 mb-1">
              <Mono className="text-3xl font-bold">
                ₹{mentor.price}
              </Mono>

              <span className="text-sm text-slate-400">
                / session
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              60-minute one-to-one session
            </p>

            <p className="font-semibold text-sm mb-3">
              Available slots
            </p>

            <div className="space-y-2 mb-5">

              {mentor.slots
                ?.filter((x) => !x.booked)
                .map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSlot(s)}
                    className={`w-full flex justify-between border rounded-xl px-3 py-3 text-sm ${
                      slot?.id === s.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200"
                    }`}
                  >
                    <span>
                      {s.day}, {s.date}
                    </span>

                    <span className="text-slate-500">
                      {s.time}
                    </span>
                  </button>
                ))}

              {(!mentor.slots ||
                mentor.slots.filter(
                  (x) => !x.booked
                ).length === 0) && (
                <p className="text-sm text-slate-400">
                  No available slots.
                </p>
              )}
            </div>

            <button
              disabled={!slot}
              onClick={() =>
                onRequestBooking(mentor, slot)
              }
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 text-white font-semibold py-3 rounded-xl"
            >
              {slot
                ? "Request booking"
                : "Select a slot"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   BOOKING MODAL
===================================================== */

function BookingModal({
  mentor,
  slot,
  onClose,
  onConfirm,
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl w-full max-w-md p-6">

        <div className="flex justify-between mb-5">
          <h2 className="font-bold text-lg">
            Request a session
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-5">
          <p className="font-semibold">
            {mentor.name}
          </p>

          <p className="text-sm text-slate-500">
            {slot.day}, {slot.date} · {slot.time}
          </p>
        </div>

        <label className="text-sm font-medium">
          What would you like to discuss?
        </label>

        <textarea
          rows={4}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Tell your mentor what you need help with..."
          className="w-full border border-slate-200 rounded-xl px-3 py-3 mt-2 mb-5 outline-none resize-none"
        />

        <div className="flex justify-between mb-5">
          <span className="text-slate-500">
            Session fee
          </span>

          <Mono className="font-semibold">
            ₹{mentor.price}
          </Mono>
        </div>

        <button
          onClick={() => onConfirm(message)}
          className="w-full bg-amber-600 text-white font-semibold py-3 rounded-xl"
        >
          Send booking request
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   DASHBOARD SHELL
===================================================== */

function DashboardShell({
  role,
  tab,
  navigateTo,
  children,
  user,
  onLogout,
}) {
  const adminItems = [
    ["overview", "Overview", Home],
    ["mentors", "Mentors", Users],
    ["mentees", "Mentees", UserCheck],
    ["bookings", "Bookings", BookOpen],
  ];

  const mentorItems = [
    ["overview", "Overview", Home],
    ["bookings", "Bookings", BookOpen],
    ["profile", "My Profile", Settings],
  ];

  const items =
    role === "admin"
      ? adminItems
      : mentorItems;

  return (
    <div className="min-h-screen flex bg-slate-50">

      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">

        <div className="h-16 flex items-center px-6">
          <Logo dark />
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {items.map(
            ([key, label, Icon]) => (
              <button
                key={key}
                onClick={() =>
                  navigateTo(
                    role === "admin"
                      ? "adminDashboard"
                      : "mentorDashboard",
                    { tab: key }
                  )
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
                  tab === key
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            )
          )}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">

        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8">

          <Display className="font-semibold capitalize">
            {role} dashboard
          </Display>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
              {role === "admin"
                ? "AD"
                : initials(user?.name)}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-slate-400 capitalize">
                {role}
              </p>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* =====================================================
   MENTOR DASHBOARD
===================================================== */

function MentorDashboard({
  mentor,
  bookings,
  mentees,
  tab,
  onBookingStatus,
}) {
  if (!mentor) {
    return (
      <div className="bg-white p-8 rounded-2xl border">
        <h2 className="font-bold">
          Mentor profile not found
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Your login account exists, but no mentor
          profile is connected to it yet.
        </p>
      </div>
    );
  }

  const myBookings = bookings.filter(
    (b) => b.mentorId === mentor.id
  );

  const pending = myBookings.filter(
    (b) => b.status === "pending"
  );

  const accepted = myBookings.filter(
    (b) => b.status === "accepted"
  );

  const earnings =
    accepted.length * Number(mentor.price || 0);

  if (tab === "bookings") {
    return (
      <div>
        <Display className="text-2xl font-bold mb-6">
          Incoming bookings
        </Display>

        {myBookings.length === 0 ? (
          <Empty text="No booking requests yet." />
        ) : (
          <div className="space-y-4">
            {myBookings.map((booking) => {
              const mentee = mentees.find(
                (m) => m.id === booking.menteeId
              );

              return (
                <div
                  key={booking.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5"
                >
                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">
                      <Avatar
                        name={
                          mentee?.name ||
                          "Mentee"
                        }
                        color="bg-slate-400"
                        size="sm"
                      />

                      <div>
                        <p className="font-semibold">
                          {mentee?.name ||
                            "Unknown mentee"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {booking.slotLabel}
                        </p>

                        <p className="text-sm text-slate-600 mt-3">
                          {booking.message}
                        </p>
                      </div>
                    </div>

                    <StatusBadge
                      status={booking.status}
                    />
                  </div>

                  {booking.status === "pending" && (
                    <div className="flex gap-2 mt-5 pt-4 border-t">

                      <button
                        onClick={() =>
                          onBookingStatus(
                            booking.id,
                            "accepted"
                          )
                        }
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        <Check
                          size={14}
                          className="inline mr-1"
                        />
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          onBookingStatus(
                            booking.id,
                            "declined"
                          )
                        }
                        className="border px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        <X
                          size={14}
                          className="inline mr-1"
                        />
                        Decline
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

  if (tab === "profile") {
    return (
      <div>
        <Display className="text-2xl font-bold mb-6">
          My Profile
        </Display>

        <div className="bg-white border rounded-2xl p-6 max-w-2xl">

          <div className="flex gap-4 mb-6">
            <Avatar
              name={mentor.name}
              color={
                mentor.avatarColor ||
                "bg-slate-700"
              }
              size="lg"
            />

            <div>
              <p className="text-xl font-bold">
                {mentor.name}
              </p>

              <p className="text-slate-500">
                {mentor.title}
              </p>

              <div className="mt-2">
                <CategoryBadge
                  category={mentor.category}
                />
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {mentor.bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t">
            <div>
              <p className="text-xs text-slate-400">
                Price
              </p>

              <Mono className="font-semibold">
                ₹{mentor.price}
              </Mono>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Experience
              </p>

              <p className="font-semibold">
                {mentor.experience} yrs
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Rating
              </p>

              <p className="font-semibold">
                {Number(
                  mentor.rating || 0
                ).toFixed(1)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Status
              </p>

              <StatusBadge
                status={mentor.status}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Display className="text-2xl font-bold mb-6">
        Welcome back,{" "}
        {mentor.name?.split(" ")[0]}
      </Display>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          icon={Clock}
          label="Pending requests"
          value={pending.length}
          tint="amber"
        />

        <StatCard
          icon={CheckCircle2}
          label="Accepted sessions"
          value={accepted.length}
          tint="emerald"
        />

        <StatCard
          icon={Wallet}
          label="Est. earnings"
          value={`₹${earnings}`}
          tint="sky"
        />

        <StatCard
          icon={Star}
          label="Rating"
          value={Number(
            mentor.rating || 0
          ).toFixed(1)}
          tint="violet"
        />
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">
          Recent requests
        </h2>

        {pending.length === 0 ? (
          <p className="text-sm text-slate-400">
            No pending requests.
          </p>
        ) : (
          pending.slice(0, 5).map((booking) => (
            <div
              key={booking.id}
              className="flex justify-between py-3 border-b last:border-0"
            >
              <span className="text-sm">
                {booking.slotLabel}
              </span>

              <StatusBadge status="pending" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function AdminDashboard({
  tab,
  mentors,
  mentees,
  bookings,
  onMentorStatus,
  onDeleteBooking,
}) {
  if (tab === "mentors") {
    return (
      <div>
        <Display className="text-2xl font-bold mb-6">
          Manage Mentors
        </Display>

        <div className="bg-white border rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4">
                  Mentor
                </th>
                <th className="text-left p-4">
                  Category
                </th>
                <th className="text-left p-4">
                  Rating
                </th>
                <th className="text-left p-4">
                  Status
                </th>
                <th className="text-right p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {mentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="flex gap-3 items-center">
                      <Avatar
                        name={mentor.name}
                        color={
                          mentor.avatarColor ||
                          "bg-slate-700"
                        }
                        size="sm"
                      />

                      <div>
                        <p className="font-semibold">
                          {mentor.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {mentor.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    {mentor.category}
                  </td>

                  <td className="p-4">
                    {Number(
                      mentor.rating || 0
                    ).toFixed(1)}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={mentor.status}
                    />
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">

                      {mentor.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              onMentorStatus(
                                mentor.id,
                                "active"
                              )
                            }
                            className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-xs font-semibold"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              onMentorStatus(
                                mentor.id,
                                "suspended"
                              )
                            }
                            className="bg-rose-50 text-rose-700 px-3 py-2 rounded-lg text-xs font-semibold"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {mentor.status === "active" && (
                        <button
                          onClick={() =>
                            onMentorStatus(
                              mentor.id,
                              "suspended"
                            )
                          }
                          className="bg-rose-50 text-rose-700 px-3 py-2 rounded-lg text-xs font-semibold"
                        >
                          Suspend
                        </button>
                      )}

                      {mentor.status === "suspended" && (
                        <button
                          onClick={() =>
                            onMentorStatus(
                              mentor.id,
                              "active"
                            )
                          }
                          className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-xs font-semibold"
                        >
                          Reactivate
                        </button>
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

  if (tab === "mentees") {
    return (
      <div>
        <Display className="text-2xl font-bold mb-6">
          Manage Mentees
        </Display>

        <div className="bg-white border rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4">
                  Name
                </th>
                <th className="text-left p-4">
                  Email
                </th>
                <th className="text-left p-4">
                  Joined
                </th>
                <th className="text-left p-4">
                  Bookings
                </th>
              </tr>
            </thead>

            <tbody>
              {mentees.map((mentee) => (
                <tr
                  key={mentee.id}
                  className="border-t"
                >
                  <td className="p-4 font-semibold">
                    {mentee.name}
                  </td>

                  <td className="p-4">
                    {mentee.email}
                  </td>

                  <td className="p-4">
                    {mentee.joined || "-"}
                  </td>

                  <td className="p-4">
                    {
                      bookings.filter(
                        (b) =>
                          b.menteeId === mentee.id
                      ).length
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === "bookings") {
    return (
      <div>
        <Display className="text-2xl font-bold mb-6">
          All Bookings
        </Display>

        <div className="bg-white border rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4">
                  Mentor
                </th>
                <th className="text-left p-4">
                  Mentee
                </th>
                <th className="text-left p-4">
                  Slot
                </th>
                <th className="text-left p-4">
                  Status
                </th>
                <th className="text-right p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => {
                const mentor = mentors.find(
                  (m) =>
                    m.id === booking.mentorId
                );

                const mentee = mentees.find(
                  (m) =>
                    m.id === booking.menteeId
                );

                return (
                  <tr
                    key={booking.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {mentor?.name || "-"}
                    </td>

                    <td className="p-4">
                      {mentee?.name || "-"}
                    </td>

                    <td className="p-4">
                      {booking.slotLabel}
                    </td>

                    <td className="p-4">
                      <StatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() =>
                          onDeleteBooking(
                            booking.id
                          )
                        }
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 size={17} />
                      </button>
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

  const activeMentors = mentors.filter(
    (m) => m.status === "active"
  ).length;

  const pendingMentors = mentors.filter(
    (m) => m.status === "pending"
  ).length;

  const statusData = [
    {
      name: "Pending",
      value: bookings.filter(
        (b) => b.status === "pending"
      ).length,
    },
    {
      name: "Accepted",
      value: bookings.filter(
        (b) => b.status === "accepted"
      ).length,
    },
    {
      name: "Declined",
      value: bookings.filter(
        (b) => b.status === "declined"
      ).length,
    },
  ];

  return (
    <div>
      <Display className="text-2xl font-bold mb-6">
        Platform Overview
      </Display>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          icon={Users}
          label="Active mentors"
          value={activeMentors}
          tint="emerald"
        />

        <StatCard
          icon={UserCheck}
          label="Total mentees"
          value={mentees.length}
          tint="sky"
        />

        <StatCard
          icon={BookOpen}
          label="Total bookings"
          value={bookings.length}
          tint="violet"
        />

        <StatCard
          icon={AlertCircle}
          label="Pending approvals"
          value={pendingMentors}
          tint="amber"
        />
      </div>

      <div className="bg-white border rounded-2xl p-6">

        <h2 className="font-semibold mb-5">
          Bookings by status
        </h2>

        <div className="h-64">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={statusData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar dataKey="value">
                {statusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      [
                        "#d97706",
                        "#059669",
                        "#e11d48",
                      ][index]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   EMPTY
===================================================== */

function Empty({ text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
      {text}
    </div>
  );
}

/* =====================================================
   BECOME MENTOR
===================================================== */

function BecomeMentorPage({
  onSubmit,
  navigateTo,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
    category: CATEGORIES[0].name,
    bio: "",
    experience: "",
    expertise: "",
    price: "",
    languages: [],
    slotDay: "",
    slotDate: "",
    slotTime: "",
  });

  const [slots, setSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function toggleLanguage(language) {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(
        language
      )
        ? prev.languages.filter(
            (x) => x !== language
          )
        : [...prev.languages, language],
    }));
  }

  function addSlot() {
    if (
      !form.slotDay ||
      !form.slotDate ||
      !form.slotTime
    ) {
      return;
    }

    setSlots((prev) => [
      ...prev,
      {
        id: nextId("slot"),
        day: form.slotDay,
        date: form.slotDate,
        time: form.slotTime,
        booked: false,
      },
    ]);

    setForm((prev) => ({
      ...prev,
      slotDay: "",
      slotDate: "",
      slotTime: "",
    }));
  }

  async function submit() {
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.title ||
      !form.bio ||
      !form.experience ||
      !form.price ||
      form.languages.length === 0 ||
      slots.length === 0
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    try {
      await onSubmit({
        ...form,
        experience: Number(form.experience),
        price: Number(form.price),
        expertise: form.expertise
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        languages: form.languages,
        slots,
      });

      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-6">

        <CheckCircle2
          size={55}
          className="mx-auto text-emerald-600 mb-5"
        />

        <Display className="text-2xl font-bold">
          Application submitted
        </Display>

        <p className="text-slate-500 mt-3 mb-7">
          Your mentor profile has been submitted
          for review.
        </p>

        <button
          onClick={() => navigateTo("landing")}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <Display className="text-3xl font-bold">
        Become a mentor
      </Display>

      <p className="text-slate-500 mt-2 mb-8">
        Create your mentor account and profile.
      </p>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 mb-5">
          {error}
        </div>
      )}

      <div className="space-y-5">

        <div className="bg-white border rounded-2xl p-6">

          <h2 className="font-semibold mb-4">
            Account
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">

            <input
              value={form.name}
              onChange={(e) =>
                update("name", e.target.value)
              }
              placeholder="Full name"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                update("email", e.target.value)
              }
              placeholder="Email"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                update(
                  "password",
                  e.target.value
                )
              }
              placeholder="Password"
              className="border rounded-xl px-4 py-3"
            />

            <input
              value={form.title}
              onChange={(e) =>
                update("title", e.target.value)
              }
              placeholder="Professional title"
              className="border rounded-xl px-4 py-3"
            />

          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">

          <h2 className="font-semibold mb-4">
            Professional information
          </h2>

          <select
            value={form.category}
            onChange={(e) =>
              update("category", e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 mb-4"
          >
            {CATEGORIES.map((c) => (
              <option key={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <textarea
            value={form.bio}
            onChange={(e) =>
              update("bio", e.target.value)
            }
            rows={4}
            placeholder="Tell mentees about yourself..."
            className="w-full border rounded-xl px-4 py-3 mb-4 resize-none"
          />

          <div className="grid sm:grid-cols-2 gap-4">

            <input
              type="number"
              value={form.experience}
              onChange={(e) =>
                update(
                  "experience",
                  e.target.value
                )
              }
              placeholder="Years of experience"
              className="border rounded-xl px-4 py-3"
            />

            <input
              value={form.expertise}
              onChange={(e) =>
                update(
                  "expertise",
                  e.target.value
                )
              }
              placeholder="Skills, comma separated"
              className="border rounded-xl px-4 py-3"
            />

          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">

          <h2 className="font-semibold mb-4">
            Pricing & languages
          </h2>

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              update("price", e.target.value)
            }
            placeholder="Price per session ₹"
            className="border rounded-xl px-4 py-3 w-full mb-4"
          />

          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((language) => (
              <button
                type="button"
                key={language}
                onClick={() =>
                  toggleLanguage(language)
                }
                className={`px-3 py-2 rounded-full text-xs border ${
                  form.languages.includes(
                    language
                  )
                    ? "bg-slate-900 text-white"
                    : "bg-white"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">

          <h2 className="font-semibold mb-4">
            Availability
          </h2>

          <div className="grid sm:grid-cols-4 gap-3">

            <input
              value={form.slotDay}
              onChange={(e) =>
                update("slotDay", e.target.value)
              }
              placeholder="Day"
              className="border rounded-xl px-3 py-3"
            />

            <input
              value={form.slotDate}
              onChange={(e) =>
                update(
                  "slotDate",
                  e.target.value
                )
              }
              placeholder="Date"
              className="border rounded-xl px-3 py-3"
            />

            <input
              value={form.slotTime}
              onChange={(e) =>
                update(
                  "slotTime",
                  e.target.value
                )
              }
              placeholder="Time"
              className="border rounded-xl px-3 py-3"
            />

            <button
              type="button"
              onClick={addSlot}
              className="bg-slate-100 rounded-xl font-semibold"
            >
              Add slot
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {slots.map((slot) => (
              <span
                key={slot.id}
                className="bg-amber-50 text-amber-800 rounded-full px-3 py-2 text-xs"
              >
                {slot.day}, {slot.date} ·{" "}
                {slot.time}

                <button
                  className="ml-2"
                  onClick={() =>
                    setSlots((prev) =>
                      prev.filter(
                        (x) => x.id !== slot.id
                      )
                    )
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={submit}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl"
        >
          Create mentor account & submit
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   APP
===================================================== */

export default function App() {
  const [view, setView] = useState("landing");
  const [params, setParams] = useState({});

  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          "meridianUser"
        ) || "null"
      );
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [toast, setToast] = useState(null);

  const [bookingTarget, setBookingTarget] =
    useState(null);

  function normalizeMentor(m) {
    return {
      ...m,
      id: m.id || m._id,
      experience: Number(m.experience || 0),
      price: Number(m.price || 0),
      rating: Number(m.rating || 0),
      sessions: Number(m.sessions || 0),
      expertise: Array.isArray(m.expertise)
        ? m.expertise
        : [],
      languages: Array.isArray(m.languages)
        ? m.languages
        : [],
      slots: Array.isArray(m.slots)
        ? m.slots
        : [],
      status: m.status || "active",
    };
  }

  function normalizeMentee(m) {
    return {
      ...m,
      id: m.id || m._id,
    };
  }

  function normalizeBooking(b) {
    return {
      ...b,
      id: b.id || b._id,
    };
  }

  async function loadData() {
    try {
      setApiError("");

      const [
        mentorsResponse,
        menteesResponse,
        bookingsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE}/api/mentors`),
        fetch(`${API_BASE}/api/mentees`),
        fetch(`${API_BASE}/api/bookings`),
      ]);

      if (
        !mentorsResponse.ok ||
        !menteesResponse.ok ||
        !bookingsResponse.ok
      ) {
        throw new Error(
          "Failed to load Meridian data."
        );
      }

      const [
        mentorsData,
        menteesData,
        bookingsData,
      ] = await Promise.all([
        mentorsResponse.json(),
        menteesResponse.json(),
        bookingsResponse.json(),
      ]);

      setMentors(
        mentorsData.map(normalizeMentor)
      );

      setMentees(
        menteesData.map(normalizeMentee)
      );

      setBookings(
        bookingsData.map(normalizeBooking)
      );
    } catch (error) {
      console.error(
        "Backend loading failed:",
        error
      );

      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function navigateTo(nextView, nextParams = {}) {
    /*
      IMPORTANT:
      Admin and mentor dashboards are never
      publicly accessible.
    */

    if (
      nextView === "adminDashboard" &&
      user?.role !== "admin"
    ) {
      setView("login");
      setParams({});
      return;
    }

    if (
      nextView === "mentorDashboard" &&
      user?.role !== "mentor"
    ) {
      setView("login");
      setParams({});
      return;
    }

    setView(nextView);
    setParams(nextParams);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function logout() {
    localStorage.removeItem(
      "meridianToken"
    );

    localStorage.removeItem(
      "meridianUser"
    );

    localStorage.removeItem(
      "meridianMentorId"
    );

    localStorage.removeItem(
      "meridianMenteeId"
    );

    localStorage.removeItem(
      "meridianMenteeEmail"
    );

    setUser(null);
    setView("landing");
    setParams({});
  }

  /* ===================================================
     SIGNUP
  =================================================== */

  async function handleSignup(form) {
    const role =
      form.role === "mentor"
        ? "mentor"
        : "mentee";

    const response = await fetch(
      `${API_BASE}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email
            .trim()
            .toLowerCase(),
          password: form.password,
          role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Registration failed."
      );
    }

    /*
      Backend register does not return JWT.
      So login immediately after registration.
    */

    const loginResponse = await fetch(
      `${API_BASE}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email
            .trim()
            .toLowerCase(),
          password: form.password,
        }),
      }
    );

    const loginData =
      await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(
        loginData.message ||
          "Account created but login failed."
      );
    }

    localStorage.setItem(
      "meridianToken",
      loginData.token
    );

    localStorage.setItem(
      "meridianUser",
      JSON.stringify(loginData.user)
    );

    setUser(loginData.user);

    /*
      Create marketplace mentee profile
      when role = mentee.
    */

    if (role === "mentee") {
      const menteeData = {
        id: `MNT-${Date.now()}`,
        name: form.name.trim(),
        email: form.email
          .trim()
          .toLowerCase(),
        joined: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        ),
      };

      const menteeResponse = await fetch(
        `${API_BASE}/api/mentees`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            menteeData
          ),
        }
      );

      if (!menteeResponse.ok) {
        const error =
          await menteeResponse.json();

        throw new Error(
          error.message ||
            "Mentee profile creation failed."
        );
      }

      const savedMentee =
        normalizeMentee(
          await menteeResponse.json()
        );

      setMentees((prev) => [
        ...prev,
        savedMentee,
      ]);

      localStorage.setItem(
        "meridianMenteeId",
        savedMentee.id
      );

      localStorage.setItem(
        "meridianMenteeEmail",
        savedMentee.email
      );
    }

    setToast(
      "Account created successfully!"
    );
  }

  /* ===================================================
     MENTOR APPLICATION
  =================================================== */

  async function handleMentorApplication(form) {
    /*
      Mentor user account is created first.
      Then mentor marketplace profile is created.
    */

    const registerResponse = await fetch(
      `${API_BASE}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email
            .trim()
            .toLowerCase(),
          password: form.password,
          role: "mentor",
        }),
      }
    );

    const registerData =
      await registerResponse.json();

    if (!registerResponse.ok) {
      throw new Error(
        registerData.message ||
          "Mentor account creation failed."
      );
    }

    const mentorData = {
      id: nextId("m"),
      name: form.name.trim(),
      title: form.title,
      category: form.category,
      experience: Number(
        form.experience
      ),
      bio: form.bio,
      expertise: form.expertise,
      price: Number(form.price),
      languages: form.languages,
      rating: 5,
      sessions: 0,
      avatarColor:
        AVATAR_COLORS[
          Math.floor(
            Math.random() *
              AVATAR_COLORS.length
          )
        ],
      status: "pending",
      slots: form.slots,
    };

    const mentorResponse = await fetch(
      `${API_BASE}/api/mentors`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          mentorData
        ),
      }
    );

    const mentorBody =
      await mentorResponse.json();

    if (!mentorResponse.ok) {
      throw new Error(
        mentorBody.message ||
          "Mentor profile creation failed."
      );
    }

    const savedMentor =
      normalizeMentor(mentorBody);

    setMentors((prev) => [
      ...prev,
      savedMentor,
    ]);

    /*
      Login after mentor registration.
    */

    const loginResponse = await fetch(
      `${API_BASE}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: form.email
            .trim()
            .toLowerCase(),
          password: form.password,
        }),
      }
    );

    const loginData =
      await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(
        loginData.message ||
          "Mentor created but login failed."
      );
    }

    localStorage.setItem(
      "meridianToken",
      loginData.token
    );

    localStorage.setItem(
      "meridianUser",
      JSON.stringify(loginData.user)
    );

    localStorage.setItem(
      "meridianMentorId",
      savedMentor.id
    );

    setUser(loginData.user);

    setToast(
      "Mentor application submitted."
    );
  }

  /* ===================================================
     BOOKING
  =================================================== */

  function requestBooking(
    mentor,
    slot
  ) {
    if (!user) {
      navigateTo("login");
      setToast(
        "Please login before booking."
      );
      return;
    }

    if (user.role !== "mentee") {
      setToast(
        "Only mentees can book mentor sessions."
      );
      return;
    }

    setBookingTarget({
      mentor,
      slot,
    });
  }

  async function confirmBooking(message) {
    if (!bookingTarget) return;

    try {
      const mentee =
        mentees.find(
          (m) =>
            m.id ===
            localStorage.getItem(
              "meridianMenteeId"
            )
        ) ||
        mentees.find(
          (m) =>
            m.email === user?.email
        );

      if (!mentee) {
        throw new Error(
          "Mentee profile not found."
        );
      }

      const {
        mentor,
        slot,
      } = bookingTarget;

      const bookingData = {
        id: nextId("b"),
        mentorId: mentor.id,
        menteeId: mentee.id,
        slotId: slot.id,
        slotLabel: `${slot.day}, ${slot.date} · ${slot.time}`,
        message:
          message ||
          "Looking forward to the session!",
        status: "pending",
        createdAt:
          new Date().toISOString(),
      };

      const response = await fetch(
        `${API_BASE}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Booking creation failed."
        );
      }

      const savedBooking =
        normalizeBooking(data);

      setBookings((prev) => [
        ...prev,
        savedBooking,
      ]);

      setMentors((prev) =>
        prev.map((m) =>
          m.id === mentor.id
            ? {
                ...m,
                slots: m.slots.map(
                  (s) =>
                    s.id === slot.id
                      ? {
                          ...s,
                          booked: true,
                        }
                      : s
                ),
              }
            : m
        )
      );

      setBookingTarget(null);

      setToast(
        "Booking request sent!"
      );
    } catch (error) {
      console.error(
        "Booking failed:",
        error
      );

      setToast(error.message);
    }
  }

  /* ===================================================
     BOOKING STATUS
  =================================================== */

  async function updateBookingStatus(
    id,
    status
  ) {
    try {
      const response = await fetch(
        `${API_BASE}/api/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Booking update failed."
        );
      }

      const updated =
        normalizeBooking(data);

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? updated : b
        )
      );

      setToast(
        status === "accepted"
          ? "Booking accepted."
          : "Booking declined."
      );
    } catch (error) {
      setToast(error.message);
    }
  }

  /* ===================================================
     MENTOR STATUS
  =================================================== */

  async function updateMentorStatus(
    id,
    status
  ) {
    try {
      const response = await fetch(
        `${API_BASE}/api/mentors/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Mentor status update failed."
        );
      }

      const updated =
        normalizeMentor(
          data.mentor || data
        );

      setMentors((prev) =>
        prev.map((m) =>
          m.id === id ? updated : m
        )
      );

      setToast(
        status === "active"
          ? "Mentor approved."
          : "Mentor status updated."
      );
    } catch (error) {
      console.error(
        "Mentor status failed:",
        error
      );

      setToast(error.message);
    }
  }

  /* ===================================================
     DELETE BOOKING
  =================================================== */

  async function deleteBooking(id) {
    try {
      const response = await fetch(
        `${API_BASE}/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Booking delete failed."
        );
      }

      setBookings((prev) =>
        prev.filter(
          (b) => b.id !== id
        )
      );

      setToast(
        "Booking deleted."
      );
    } catch (error) {
      setToast(error.message);
    }
  }

  /* ===================================================
     CURRENT MENTOR
  =================================================== */

  const currentMentor = mentors.find(
    (m) =>
      m.id ===
      localStorage.getItem(
        "meridianMentorId"
      )
  );

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <style>{FONT_IMPORT}</style>

        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />

          <p className="font-semibold">
            Connecting to Meridian...
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Loading data from MongoDB.
          </p>
        </div>
      </div>
    );
  }

  /* ===================================================
     CONTENT
  =================================================== */

  let content = null;

  if (view === "mentorDashboard") {
    if (user?.role !== "mentor") {
      content = (
        <LoginPage
          navigateTo={navigateTo}
          onLogin={setUser}
        />
      );
    } else {
      content = (
        <DashboardShell
          role="mentor"
          tab={params.tab || "overview"}
          navigateTo={navigateTo}
          user={user}
          onLogout={logout}
        >
          <MentorDashboard
            mentor={currentMentor}
            bookings={bookings}
            mentees={mentees}
            tab={params.tab || "overview"}
            onBookingStatus={
              updateBookingStatus
            }
          />
        </DashboardShell>
      );
    }
  } else if (view === "adminDashboard") {
    if (user?.role !== "admin") {
      content = (
        <LoginPage
          navigateTo={navigateTo}
          onLogin={setUser}
        />
      );
    } else {
      content = (
        <DashboardShell
          role="admin"
          tab={params.tab || "overview"}
          navigateTo={navigateTo}
          user={user}
          onLogout={logout}
        >
          <AdminDashboard
            tab={params.tab || "overview"}
            mentors={mentors}
            mentees={mentees}
            bookings={bookings}
            onMentorStatus={
              updateMentorStatus
            }
            onDeleteBooking={
              deleteBooking
            }
          />
        </DashboardShell>
      );
    }
  } else {
    content = (
      <>
        <PublicNav
          navigateTo={navigateTo}
          user={user}
          onLogout={logout}
        />

        {view === "landing" && (
          <LandingPage
            mentors={mentors}
            navigateTo={navigateTo}
          />
        )}

        {view === "browse" && (
          <BrowsePage
            mentors={mentors}
            navigateTo={navigateTo}
            initialCategory={
              params.category
            }
          />
        )}

        {view === "profile" && (
          <MentorProfilePage
            mentor={mentors.find(
              (m) =>
                m.id ===
                params.mentorId
            )}
            navigateTo={navigateTo}
            onRequestBooking={
              requestBooking
            }
          />
        )}

        {view === "login" && (
          <LoginPage
            navigateTo={navigateTo}
            onLogin={setUser}
          />
        )}

        {view === "signup" && (
          <SignupPage
            navigateTo={navigateTo}
            onSignup={handleSignup}
          />
        )}

        {view === "becomeMentor" && (
          <BecomeMentorPage
            navigateTo={navigateTo}
            onSubmit={
              handleMentorApplication
            }
          />
        )}
      </>
    );
  }

  return (
    <div
      style={{
        fontFamily: BODY_FONT,
      }}
      className="min-h-screen bg-white"
    >
      <style>{FONT_IMPORT}</style>

      {apiError && (
        <div className="bg-rose-50 border-b border-rose-200 text-rose-700 text-sm text-center px-5 py-3">
          {apiError}

          <button
            onClick={loadData}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {content}

      {bookingTarget && (
        <BookingModal
          mentor={bookingTarget.mentor}
          slot={bookingTarget.slot}
          onClose={() =>
            setBookingTarget(null)
          }
          onConfirm={confirmBooking}
        />
      )}

      {toast && (
        <Toast
          message={toast}
          onClose={() =>
            setToast(null)
          }
        />
      )}
    </div>
  );
}