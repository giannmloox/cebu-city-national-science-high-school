import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, FileText, PenTool, Users, Phone, Mail, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: CheckCircle,
    title: "Check Academic Eligibility",
    desc: "At least 85% in English, Math & Science; 83% in all other subjects (or 80% overall for Special Science Elementary graduates). Must be in the upper 10% of your class.",
  },
  {
    icon: FileText,
    title: "Prepare & Submit Documents",
    desc: "Latest report card, PSA birth certificate, 2×2 ID photos, and accomplished application form.",
  },
  {
    icon: PenTool,
    title: "Take the Qualifying Exam",
    desc: "Covers verbal aptitude, abstract reasoning, quantitative ability, and scientific aptitude. Only the top 175 students are accepted.",
  },
  {
    icon: Users,
    title: "Attend School Orientation",
    desc: "Required for all accepted students and their parents/guardians.",
  },
];

const AdmissionsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="admissions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
            Admissions
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            4 Simple Steps to Becoming a{" "}
            <span className="text-gradient-gold">Scihiyista</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ready to join the best? Here's everything you need to know about joining
            Cebu City National Science High School.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15 }}
              className="relative card-elevated rounded-2xl p-6 hover-lift group"
            >
              <div className="absolute top-4 right-4 text-5xl font-heading font-bold text-muted/60">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <step.icon size={22} className="text-secondary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg pr-8">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">Have questions about admissions?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="tel:0322612802" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-foreground hover:bg-primary/20 transition-colors">
              <Phone size={14} /> (032) 261-2802
            </a>
            <a href="mailto:sciencehighschoolcebucity@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-foreground hover:bg-primary/20 transition-colors">
              <Mail size={14} /> Email Us
            </a>
            <a href="https://m.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-foreground hover:bg-primary/20 transition-colors">
              <MessageCircle size={14} /> Messenger
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
