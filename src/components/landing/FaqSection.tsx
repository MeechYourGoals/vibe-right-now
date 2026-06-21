import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FAQS } from "./landingData";

const FaqSection = () => {
  const navigate = useNavigate();

  return (
    <section id="faq" className="relative bg-[#0a0612] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple-300">
            FAQ
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Questions, answered
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 backdrop-blur-sm data-[state=open]:border-white/20"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-white hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-white/65">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30 p-10 text-center sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0 animate-gradient-shift bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.25),transparent_50%)] bg-[length:200%_200%]" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to feel the vibe?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Jump straight into a live demo — no sign-up, no friction. Just the
              world, right now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/home")}
                className="group h-auto rounded-full bg-white px-8 py-6 text-base font-semibold text-[#0a0612] hover:bg-white/90"
              >
                See the Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="h-auto rounded-full border-white/30 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/15 hover:text-white"
              >
                Create account
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
