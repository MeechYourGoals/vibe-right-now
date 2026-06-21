import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SCENES } from "./landingData";

/**
 * Full-bleed rotating backdrop. Each "scene" is a mood gradient (always
 * present, always gorgeous) with a real photograph layered on top that
 * fades in once it loads and slowly Ken-Burns zooms. A small live-location
 * pill in the corner tells you where you're looking.
 */
const HeroBackground = () => {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SCENES.length);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  // Preload the next photograph so transitions feel instant.
  useEffect(() => {
    const next = SCENES[(index + 1) % SCENES.length];
    const img = new Image();
    img.src = next.image;
  }, [index]);

  const scene = SCENES[index];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0612]">
      <AnimatePresence mode="sync">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Mood gradient — the guaranteed-beautiful base layer */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: scene.gradient }}
          />
          {/* Real photograph, fades in over the gradient + slow zoom */}
          <img
            src={scene.image}
            alt={`${scene.place}, ${scene.city}`}
            loading="eager"
            onLoad={() =>
              setLoaded((l) => ({ ...l, [scene.id]: true }))
            }
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] animate-ken-burns ${
              loaded[scene.id] ? "opacity-80" : "opacity-0"
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Readability scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a0612]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      {/* Subtle grain/vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      {/* Live location pill */}
      <div className="pointer-events-none absolute bottom-28 right-6 z-10 hidden sm:block md:bottom-12 md:right-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-red-500" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <MapPin className={`h-3.5 w-3.5 ${scene.accent}`} />
                {scene.place}
              </div>
              <div className="text-xs text-white/70">
                {scene.city} · {scene.vibe}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroBackground;
