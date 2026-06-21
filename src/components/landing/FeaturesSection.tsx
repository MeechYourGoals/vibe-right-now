import { motion } from "framer-motion";
import { FEATURES, STATS } from "./landingData";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-[#0a0612] py-24 sm:py-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Stats strip */}
        <div className="mb-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-white/60">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-300">
            Everything you need
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Discovery that feels like magic
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Live signal from the real world, an AI concierge that actually does
            things, and tools to turn a spark of an idea into a night out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:border-white/20 ${
                  f.span === "wide" ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-white/60">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
