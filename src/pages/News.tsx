import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
    image: "/52868a7f-ca68-483c-b634-d0a4b86a039f.jpg",
    link: "https://www.facebook.com/share/p/1BNoAK3bA9/",
    date: "MARCH 25, 2026",
  },
  {
    id: 2,
    title: "Tinig Iskolar Returns Stronger at RSPC 2026 with Multiple Wins",
    excerpt:
      "The Tinig Iskolar press organization of Cebu City National Science High School made a triumphant comeback at the Regional Schools Press Conference 2026",
    image: "/bfd02d01-d17a-49e6-b403-ba05201500e5.jpg",
    link: "https://www.facebook.com/share/p/1EZ2UkAZs2/",
    date: "MARCH 11, 2026",
  },
  {
    id: 3,
    title: "Scholars' Voice Named Region VII's Best School Paper for the 10th Consecutive Year",
    excerpt:
      "Cebu City National Science High School's official English publication, Scholars' Voice, has once again claimed the title of Region VII's Best School Paper at the RSPC 2026. extending a winning streak that dates bac ",
    image: "/ba62fd12-63eb-4715-af96-83385844c503.jpg",
    link: "https://www.facebook.com/share/p/18Ra7nPSgF/",
    date: "MARCH 7, 2026",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-20 pt-28">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground">
            Latest <span className="text-gradient-gold">News</span>
          </h1>
          <p className="mt-4 text-primary-foreground/60 max-w-xl">
            Stay updated with the latest happenings at Cebu City National Science High School.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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

        <p className="text-center mt-12 text-muted-foreground text-sm">
          To add or update news, edit the <code className="text-gold">newsItems</code> array in{" "}
          <code className="text-gold">src/pages/News.tsx</code> — paste your Facebook post link and image URL.
        </p>
      </div>
    </div>
  );
};

export default News;
