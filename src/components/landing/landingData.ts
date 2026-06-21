import {
  Sparkles,
  MapPin,
  MessageSquareHeart,
  Compass,
  CalendarHeart,
  ShieldCheck,
  Ticket,
  Camera,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Hero background "scenes" — real-world places that rotate behind the hero.
 * Each scene ships a hand-tuned gradient so the page looks gorgeous even
 * before (or if) the photograph loads. The photo fades in on top once ready.
 */
export interface Scene {
  id: string;
  place: string;
  city: string;
  vibe: string;
  /** Remote photograph, layered above the gradient when it loads. */
  image: string;
  /** Mood gradient — the guaranteed-beautiful fallback. */
  gradient: string;
  accent: string; // tailwind text color for the live pill
}

export const SCENES: Scene[] = [
  {
    id: "paris-cafe",
    place: "Le Petit Café",
    city: "Paris, France",
    vibe: "Morning espresso & warm croissants",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #2b1a12 0%, #6b4226 38%, #c98a4b 70%, #f2c79b 100%)",
    accent: "text-amber-300",
  },
  {
    id: "sofi-worldcup",
    place: "SoFi Stadium",
    city: "Inglewood, CA",
    vibe: "World Cup night — 70,000 strong",
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #04111f 0%, #0a2a43 40%, #0e7490 72%, #34d399 100%)",
    accent: "text-emerald-300",
  },
  {
    id: "dubai-rooftop",
    place: "Sky Lounge",
    city: "Dubai, UAE",
    vibe: "Sunset rooftop, skyline on fire",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #2a0a3a 0%, #7a1f5c 38%, #d6336c 68%, #ff9e5e 100%)",
    accent: "text-pink-300",
  },
  {
    id: "tulum-beach",
    place: "Nómada Beach Club",
    city: "Tulum, Mexico",
    vibe: "Turquoise water & house music",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #042f33 0%, #0e7490 40%, #22d3ee 72%, #fde68a 100%)",
    accent: "text-cyan-200",
  },
  {
    id: "coachella",
    place: "Coachella Main Stage",
    city: "Indio, CA",
    vibe: "Headliner just dropped the beat",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #1a0533 0%, #4c1d95 38%, #9333ea 68%, #f472b6 100%)",
    accent: "text-fuchsia-300",
  },
  {
    id: "tokyo-night",
    place: "Omoide Yokocho",
    city: "Tokyo, Japan",
    vibe: "Neon alleys & late-night ramen",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&q=80",
    gradient:
      "linear-gradient(135deg, #0b0224 0%, #3b0764 36%, #be123c 70%, #fb7185 100%)",
    accent: "text-rose-300",
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: "wide" | "tall";
  gradient: string;
}

export const FEATURES: Feature[] = [
  {
    icon: MapPin,
    title: "See the vibe right now",
    description:
      "Live, geo-tagged posts from the places around you — so you know what a spot actually feels like tonight, not last spring.",
    span: "wide",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Sparkles,
    title: "Meet Vernon, your AI concierge",
    description:
      "Ask for a rooftop with a DJ near you and Vernon plans, books, and remembers what you love.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Compass,
    title: "Explore any city",
    description:
      "Drop into Paris, Tokyo, or your own block and surface what's trending in real time.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: MessageSquareHeart,
    title: "AI review summaries",
    description:
      "Paste any Yelp, Google, or TripAdvisor link and get the honest signal in seconds — no scrolling 400 reviews.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: CalendarHeart,
    title: "Plan trips together",
    description:
      "Build group trips, pin places, split the itinerary, and link tickets & transport in one place.",
    span: "wide",
    gradient: "from-fuchsia-500/20 to-violet-500/20",
  },
  {
    icon: Ticket,
    title: "Book in one tap",
    description:
      "Tables, tickets, and rides — Vernon's agentic booking handles it with your secure Wallet Vault.",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: "180K+", label: "Live vibes shared" },
  { value: "4,200", label: "Cities covered" },
  { value: "98%", label: "Would vibe again" },
  { value: "24/7", label: "Real-time updates" },
];

/** Locations that scroll across the trust marquee. */
export const TICKER_PLACES = [
  "Paris",
  "SoFi Stadium",
  "Tokyo",
  "Tulum",
  "Coachella",
  "Dubai",
  "Miami",
  "Ibiza",
  "New York",
  "Marrakech",
  "Cape Town",
  "São Paulo",
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What exactly is Vibe Right Now?",
    a: "Vibe Right Now (VRN) is a real-time discovery app. Instead of stale photos and old reviews, you see what a place looks and feels like at this very moment through live, geo-tagged posts — then plan and book it with the help of Vernon, our AI concierge.",
  },
  {
    q: "Is this the live app or a demo?",
    a: "The demo you can launch from this page is populated with rich, realistic sample content so you can explore every feature instantly — no sign-up required. Create an account to save places, plan real trips, and unlock Vernon.",
  },
  {
    q: "Who is Vernon?",
    a: "Vernon is your built-in AI concierge. Ask in plain language — \"find me a lively rooftop with a DJ near me\" — and Vernon searches live vibes, summarizes reviews, plans the night, and (on Pro) books it for you with your secure Wallet Vault.",
  },
  {
    q: "How much does it cost?",
    a: "VRN is free to explore. Plus ($9.99/mo) adds AI recommendations and review summaries, Premium ($14.99/mo) unlocks Vernon Concierge and trip linking, and Pro ($19.99/mo) adds agentic booking, the influencer marketplace, and early AR/XR access.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Every paid plan is month-to-month with no commitment — upgrade, downgrade, or cancel whenever you like, right from Settings.",
  },
  {
    q: "Where does VRN work?",
    a: "Everywhere. We surface live vibes across 4,200+ cities worldwide, from your neighborhood coffee shop to a World Cup match across the planet.",
  },
];

export const FEATURE_ICONS = { Camera, Users, ShieldCheck };
