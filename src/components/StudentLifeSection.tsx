import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Newspaper, Trophy, Heart } from "lucide-react";
import achievementsImg from "@/assets/achievements.jpg";

const highlights = [
  {
    icon: Trophy,
    title: "National Competition Winners",
    desc: "Scihiyistas consistently place in regional and national science olympiads, math competitions, and quiz bees.",
  },
  {
    icon: Newspaper,
    title: "Student Publications",
    desc: "Scholar's Voice (English) and Tinig Iskolar (Filipino) — student-led newspapers fostering journalistic talent.",
  },
  {
    icon: Heart,
    title: "Vibrant Campus Life",
    desc: "From science clubs to sports teams, cultural events, and community outreach — there's something for every Scihiyista.",
  },
];

const StudentLifeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="life" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={achievementsImg}
                alt="CCNSHS students celebrating achievements"
                className="w-full h-80 lg:h-[400px] object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
              Student Life & Achievements
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Life as a{" "}
              <span className="text-gradient-gold">Scihiyista</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              At Sci-Hi, education goes beyond the classroom. Our students excel in academics,
              leadership, and extracurricular activities that shape well-rounded individuals.
            </p>

            <div className="mt-8 space-y-5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg gold-gradient flex items-center justify-center">
                    <item.icon size={18} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentLifeSection;
