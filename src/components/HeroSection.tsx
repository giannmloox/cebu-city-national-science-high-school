import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-science.jpg";
import logoImg from "@/assets/ccnshs-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Science laboratory at CCNSHS"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
        <div className="absolute inset-0 particle-bg" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gold rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-gold-light rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-heading font-semibold tracking-widest uppercase text-gold border border-gold/30 rounded-full bg-gold/5">
            The Cream of the Crop
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-primary-foreground leading-tight max-w-5xl mx-auto"
        >
          Cebu City National
          <br />
          <span className="text-gradient-gold">Science High School</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 text-lg md:text-xl text-primary-foreground/70 font-heading font-medium tracking-wide"
        >
          Aim High! Soar High! Science High.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#admissions"
            className="inline-flex items-center justify-center px-8 py-4 gold-gradient text-secondary-foreground font-heading font-bold text-lg rounded-full animate-pulse-glow hover:scale-105 transition-transform"
          >
            🎓 Be a Scihiyista! Apply Now
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-heading font-semibold rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            Explore Sci-Hi
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-primary-foreground/40 text-sm italic"
        >
          "Quality is never an accident. It is always the result of intelligent effort." — John Ruskin
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-primary-foreground/50 hover:text-gold transition-colors">
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
