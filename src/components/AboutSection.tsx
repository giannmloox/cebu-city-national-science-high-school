import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import campusImg from "@/assets/campus.jpg";

const stats = [
  { value: "1970", label: "Established" },
  { value: "175", label: "Students Accepted Yearly" },
  { value: "7–12", label: "Grade Levels" },
  { value: "55+", label: "Years of Excellence" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
              Welcome to Sci-Hi
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Where Future Scientists
              <br />
              <span className="text-gradient-gold">Begin Their Journey</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded on <strong>July 17, 1970</strong>, and nationalized in SY 1974–1975, 
              Cebu City National Science High School (CCNSHS) — fondly called <strong>Sci-Hi</strong> or <strong>Science High</strong> — 
              is a premier public science-oriented high school located in the heart of Cebu City, Philippines.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Under the leadership of <strong>Mme. Marilou Tabal Dela Cuesta</strong> (2024–present), 
              Sci-Hi continues its legacy of nurturing the brightest minds through rigorous STEM education, 
              serving Grades 7 through 12. Every Scihiyista embodies the school's motto: 
              <em className="text-gold font-medium"> "Aim High! Soar High! Science High."</em>
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-muted/50"
                >
                  <div className="counter-value text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={campusImg}
                alt="CCNSHS Campus"
                className="w-full h-80 lg:h-[450px] object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 px-6 py-3 gold-gradient rounded-xl shadow-lg">
              <span className="font-heading font-bold text-secondary-foreground text-sm">
                🏆 The Cream of the Crop
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
