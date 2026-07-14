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
    link: "https://www.facebook.com/share/p/1Cn9zBFX49/",
    date: "MARCH 25, 2026",
  },
  {
    id: 2,
    title: "𝗧𝗨𝗧𝗢𝗞 𝗡𝗚𝗔𝗬𝗢𝗡 | 𝐒𝐞𝐫𝐛𝐢𝐬𝐲𝐨𝐧𝐠 𝐒𝐜𝐢𝐡𝐢𝐲𝐢𝐬𝐭𝐚, 𝐒𝐞𝐫𝐛𝐢𝐬𝐲𝐨𝐧𝐠 𝐒𝐮𝐠𝐛𝐮𝐚𝐧𝐨𝐧",
    excerpt: "Mas pinaigting ng TagaSciHi Alumni Association Inc. ang diwa ng serbisyo at pagkakaisa sa matagumpay na pagdaraos ng Ikalawang Medical, Legal, and General Services Mission 2026 katuwang ang Cebu City Government. Muling ipinamalas ng mga alumni ang kanilang malasakit sa komunidad noong Hulyo 11, 2026 sa pamamagitan ng libreng konsultasyong medikal, legal, at iba pang serbisyong handog. Tunghayan ang mga kaganapan at makiisa sa diwa ng pagbabayanihan, dito lamang sa Tutok Sentral.",
    image: "/tinig/TN-1.jpg",
    link: "https://www.facebook.com/share/v/1FXWtpim7M/",
    date: "JULY 11, 2026",
  },
  {
    id: 3,
    title: "𝗡𝗘𝗪𝗦 | 𝗖𝗖𝗡𝗦𝗛𝗦 𝗮𝗹𝘂𝗺𝗻𝗶 𝗮𝗶𝗱 𝟬𝟬𝟬+ 𝗰𝗶𝘁𝗶𝘇𝗲𝗻𝘀 𝗶𝗻 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 𝗼𝘂𝘁𝗿𝗲𝗮𝗰𝗵 𝗽𝗿𝗼𝗴𝗿𝗮𝗺",
    excerpt: "More than 600 nearby community residents received free medical, dental, legal, and general services as the Taga-SciHi Alumni Association together with the CCNSHS administration, conducted the 2nd Medical, Dental, Legal, and General Services Mission last Saturday, July 11.",
    image: "/scholars/SV-1.jpg",
    link: "https://www.facebook.com/share/p/1BjcYma9gw/",
    date: "JULY 12, 2026",
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-20 pt-28 border-b border-white/10" style={{ background: "linear-gradient(135deg, hsl(216 72% 8%), hsl(216 65% 14%))" }}>
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
              className="group block overflow-hidden glass-card hover-lift cursor-pointer"
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
