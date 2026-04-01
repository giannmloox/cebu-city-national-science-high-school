import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-science.jpg";
import roboticsImg from "@/assets/robotics.jpg";
import campusImg from "@/assets/campus.jpg";
import labImg from "@/assets/lab-microscope.jpg";
import studentLifeImg from "@/assets/student-life.jpg";
import achievementsImg from "@/assets/achievements.jpg";

const images = [
  { src: heroImg, alt: "Science laboratory experiments", span: "md:col-span-2 md:row-span-2" },
  { src: roboticsImg, alt: "Robotics program", span: "" },
  { src: labImg, alt: "Microscope research", span: "" },
  { src: studentLifeImg, alt: "Student life on campus", span: "md:col-span-2" },
  { src: campusImg, alt: "CCNSHS campus building", span: "" },
  { src: achievementsImg, alt: "Student achievements", span: "" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-heading font-semibold text-gold tracking-widest uppercase">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold text-foreground">
            Campus <span className="text-gradient-gold">Life</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.05 * i }}
              className={`rounded-xl overflow-hidden group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
