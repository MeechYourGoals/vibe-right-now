import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Live Demo", href: "/home" },
      { label: "Explore", href: "/explore" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const LandingFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a0612] py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Vibe Right Now
              </span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              The real-time way to discover, plan, and experience the world —
              one vibe at a time.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) =>
                  l.href.startsWith("#") ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Vibe Right Now. All rights reserved.
          </p>
          <p className="text-sm text-white/40">Made for explorers, everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
