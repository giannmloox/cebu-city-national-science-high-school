import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Atom, Users, Lightbulb, Calendar } from "lucide-react";

const cards = [
  {
    icon: Atom,
    title: "STEM Excellence",
    desc: "Rigorous science-oriented curriculum with advanced laboratory facilities and expert teachers.",
  },
  {
    icon: Users,
    title: "Small Class Size",
    desc: "Only ~35 students per class ensures personalized attention and deeper learning experiences.",
  },
  {
    icon: Lightbulb,
    title: "Research & Innovation",
    desc: "Students conduct original research, join national science fairs, and develop real-world solutions.",
  },
  {
    icon: Calendar,
    title: "Since 1970",
    desc: "Over 55 years of producing the brightest minds in Cebu — a legacy of excellence and pride.",
  },
];

const WhyChooseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-50" />
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
            Why Sci-Hi?
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
            Why Choose{" "}
            <span className="text-gradient-gold">Science High</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12 }}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 text-center hover-lift group"
            >
              <div className="w-14 h-14 mx-auto rounded-xl gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <card.icon size={26} className="text-secondary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-primary-foreground text-lg">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/60 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
