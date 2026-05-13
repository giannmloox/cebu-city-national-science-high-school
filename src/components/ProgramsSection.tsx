import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Atom, FlaskConical, Calculator, Code, Microscope, BookOpen } from "lucide-react";

const juniorHigh = [
  { icon: Atom, label: "Advanced Physics" },
  { icon: FlaskConical, label: "Chemistry" },
  { icon: Calculator, label: "Mathematics" },
  { icon: Microscope, label: "Biology & Life Sciences" },
];

const seniorHigh = [
  { icon: Code, label: "STEM Strand Focus" },
  { icon: BookOpen, label: "Research & Capstone" },
  { icon: Atom, label: "Advanced Sciences" },
  { icon: Calculator, label: "Calculus & Statistics" },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
            Academic Programs
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            Grades 7–12{" "}
            <span className="text-gradient-gold">STEM Excellence</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our curriculum is designed to cultivate scientific thinking, analytical skills,
            and innovation from Junior High through Senior High School.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Junior High */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="card-elevated rounded-2xl p-8 hover-lift"
          >
            <div className="inline-block px-3 py-1 gold-gradient rounded-full text-xs font-heading font-semibold text-secondary-foreground mb-4">
              Grades 7–10
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Junior High School
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              A strong foundation in science, technology, engineering, and mathematics
              with enriched laboratory experiences.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {juniorHigh.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <item.icon size={18} className="text-gold" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Senior High */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="card-elevated rounded-2xl p-8 hover-lift"
          >
            <div className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-heading font-semibold text-primary-foreground mb-4">
              Grades 11–12
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Senior High School
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Specialized STEM strand preparing students for top universities
              and careers in science and technology.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {seniorHigh.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <item.icon size={18} className="text-gold" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
