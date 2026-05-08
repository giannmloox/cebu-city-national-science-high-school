import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-science.jpg";
import roboticsImg from "@/assets/robotics-new.jpg";
import campusImg from "@/assets/campus.jpg";
import labImg from "@/assets/lab-microscope-new.jpg";
import studentLifeImg from "@/assets/student-life-new.jpg";
import achievementsImg from "@/assets/achievements-new.jpg";

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    []
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

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
              onClick={() => setActiveIndex(i)}
              className={`rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
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

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.85)" }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-2 md:left-6 text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="object-contain rounded-lg"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-2 md:right-6 text-white p-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
