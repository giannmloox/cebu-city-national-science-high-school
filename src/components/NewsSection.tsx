import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  date: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "SciHi Hosts the Philippines' First Desktop Quantum Computer Demo",
    excerpt:
      "Cebu City National Science High School made history on March 25, 2026, when the SpinQ Gemini, the country's first desktop quantum computer, was demonstrated before students, educators, and industry leader",
    image:
      "/52868a7f-ca68-483c-b634-d0a4b86a039f.jpg",
    link: "https://www.facebook.com/share/p/14ZKhLjR3nz/",
    date: "MARCH 25, 2026",
  },
  {
    id: 2,
    title: "New Robotics Lab Grand Opening",
    excerpt:
      "CCNSHS inaugurated a state-of-the-art robotics laboratory to further empower future innovators and tech leaders.",
    image:
      "/bfd02d01-d17a-49e6-b403-ba05201500e5.jpg",
    link: "https://www.facebook.com/ccnshs",
    date: "MARCH 11, 2026",
  },
  {
    id: 3,
    title: "Math Team Qualifies for Nationals",
    excerpt:
      "The CCNSHS Math Team has qualified for the National Mathematics Competition after a stellar performance at the regional level.",
    image:
      "/ba62fd12-63eb-4715-af96-83385844c503.jpg",
    link: "https://www.facebook.com/ccnshs",
    date: "March 5, 2026",
  },
];

const NewsSection = () => {
  return (
    <section id="news" className="py-20 bg-secondary/30">
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
              transition={{ delay: 0.1 * i }}
              className="group block rounded-2xl overflow-hidden card-elevated hover-lift cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
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
