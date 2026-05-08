import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "APRIL 28, 2026",
    title: "Education Calendar Sees Major Shift",
    excerpt:
      "Public schools are set to roll out a three-term academic system by School Year 2026–2027 under DepEd Order No. 009, s. 2026, marking a significant change in the national education calendar.",
    image: "/news-calendar.jpg",
    link: "https://www.facebook.com/share/p/1Cn9zBFX49/",
  },
  {
    id: 2,
    date: "APRIL 22, 2026",
    title: "Congratulations, SciHigh Graduates — UPCAT Passers!",
    excerpt:
      "SciHigh proudly celebrates its Grade 12 graduates who passed the UPCAT 2026, with passers from Diliman, Manila, Los Baños, and Cebu campuses. Padayon, Iskolar ng Bayan!",
    image: "/news-upcat.jpg",
    link: "https://www.facebook.com/share/p/1SDoEGmQWS/",
  },
  {
    id: 3,
    date: "APRIL 18, 2026",
    title: "Tinig Iskolar Wins 4th Place in Radio Broadcasting at NSRC Ormoc",
    excerpt:
      "The school celebrates Tinig Iskolar's remarkable achievements in Secondary Filipino Radio Broadcasting at the NSRC 2026 held in Ormoc City.",
    image: "/news-tinig.jpg",
    link: "https://www.facebook.com/share/p/1CPKQjM7xh/",
  },
];

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-heading font-semibold tracking-widest uppercase text-gold border border-gold/30 rounded-full bg-gold/5">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Latest <span className="text-gradient-gold">News</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Stay updated with the latest happenings at Cebu City National
            Science High School.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group block overflow-hidden glass-card hover-lift cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} />
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-gold font-heading font-semibold tracking-wider uppercase">
                  {item.date}
                </span>
                <h3 className="mt-2 text-lg font-heading font-bold text-foreground group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
