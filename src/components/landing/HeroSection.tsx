import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import { TICKER_PLACES } from "./landingData";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-md"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Real-time discovery, powered by AI
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          See the vibe{" "}
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            right now
          </span>
          <br className="hidden sm:block" /> wherever you go.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
        >
          From a quiet coffee shop in Paris to a World Cup night at SoFi
          Stadium — discover what places actually feel like this very moment,
          then let Vernon plan and book it for you.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="group h-14 rounded-full bg-white px-8 text-base font-semibold text-[#0a0612] shadow-2xl shadow-purple-500/20 transition-transform hover:scale-[1.03] hover:bg-white"
          >
            <Play className="mr-1 h-4 w-4 fill-current" />
            See the Demo
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
            className="h-14 rounded-full border-white/30 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-md hover:bg-white/15 hover:text-white"
          >
            Create your account
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center gap-4 text-sm text-white/70"
        >
          <div className="flex -space-x-2">
            {[
              "from-purple-400 to-pink-400",
              "from-blue-400 to-cyan-400",
              "from-amber-400 to-orange-400",
              "from-emerald-400 to-teal-400",
            ].map((g, i) => (
              <span
                key={i}
                className={`h-8 w-8 rounded-full border-2 border-[#0a0612] bg-gradient-to-br ${g}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="ml-1">Loved by 180k+ explorers</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Location ticker */}
      <div className="relative z-10 mt-auto border-t border-white/10 bg-black/20 py-4 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...TICKER_PLACES, ...TICKER_PLACES].map((p, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-white/50"
              >
                {p}
                <span className="h-1 w-1 rounded-full bg-white/30" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
