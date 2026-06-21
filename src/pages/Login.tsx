import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { SCENES } from "@/components/landing/landingData";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Wand2,
  Loader2,
  MapPin,
  Quote,
} from "lucide-react";

type Mode = "signin" | "signup";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    signIn,
    signUp,
    signInWithGoogle,
    signInWithMagicLink,
    isLoading,
  } = useSupabaseAuth();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const busy = isLoading || submitting;
  const scene = SCENES[sceneIdx];

  // Force dark + rotate the showcase imagery.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLoaded(false);
      setSceneIdx((i) => (i + 1) % SCENES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (!email.trim() || !password) {
        throw new Error("Email and password are required");
      }
      if (mode === "signup" && password !== confirm) {
        throw new Error("Passwords do not match");
      }
      if (mode === "signup") {
        await signUp(email.trim(), password);
        toast({
          title: "Check your inbox",
          description:
            "We sent you a confirmation link to finish creating your account.",
        });
      } else {
        await signIn(email.trim(), password);
        toast({ title: "Welcome back!", description: "You're now signed in." });
        navigate("/home");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await signInWithGoogle();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google sign-in error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    try {
      setSubmitting(true);
      if (!email.trim()) throw new Error("Enter your email first");
      await signInWithMagicLink(email.trim());
      toast({
        title: "Magic link sent",
        description: "Check your email for a link to sign in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Magic link error",
        description:
          error instanceof Error ? error.message : "Could not send the link",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0612] text-white antialiased">
      {/* ───────────────── Showcase panel ───────────────── */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <AnimatePresence mode="sync">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: scene.gradient }}
            />
            <img
              src={scene.image}
              alt={`${scene.place}, ${scene.city}`}
              onLoad={() => setLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] animate-ken-burns ${
                loaded ? "opacity-75" : "opacity-0"
              }`}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-[#0a0612]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0612]/40 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div>
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium backdrop-blur-md w-fit">
              <MapPin className={`h-3.5 w-3.5 ${scene.accent}`} />
              {scene.place} · {scene.city}
            </div>
            <Quote className="mb-3 h-8 w-8 text-white/30" />
            <p className="max-w-md text-2xl font-semibold leading-snug text-white">
              The whole world, live. From a Paris café at dawn to a stadium
              roaring at midnight — Vibe Right Now puts it all in your pocket.
            </p>
          </div>
        </div>
      </div>

      {/* ───────────────── Form panel ───────────────── */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-10 inline-block text-xl font-bold lg:hidden">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Vibe Right Now
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-extrabold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {mode === "signin"
                ? "Sign in to pick up where you left off."
                : "Join 180k+ explorers discovering the world in real time."}
            </p>
          </motion.div>

          {/* Tab switch */}
          <div className="mt-7 inline-flex w-full rounded-full border border-white/10 bg-white/5 p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === m ? "text-[#0a0612]" : "text-white/60"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {m === "signin" ? "Sign in" : "Sign up"}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-purple-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                {mode === "signin" && (
                  <button
                    type="button"
                    onClick={handleMagicLink}
                    className="text-xs text-purple-300 hover:text-purple-200"
                  >
                    Forgot? Use a magic link
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 border-white/15 bg-white/5 pr-10 text-white placeholder:text-white/40 focus-visible:ring-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  <Label htmlFor="confirm" className="text-white/80">
                    Confirm password
                  </Label>
                  <Input
                    id="confirm"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-purple-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={busy}
              className="group h-11 w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_auto] font-semibold text-white transition-all hover:bg-[position:right_center] disabled:opacity-70"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a0612] px-3 text-white/40">
                or continue with
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={busy}
              className="h-11 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" /> Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleMagicLink}
              disabled={busy}
              className="h-11 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Wand2 className="mr-2 h-4 w-4" /> Email me a magic link
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            Just want to look around?{" "}
            <Link
              to="/home"
              className="font-medium text-purple-300 hover:text-purple-200"
            >
              Explore the demo →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
