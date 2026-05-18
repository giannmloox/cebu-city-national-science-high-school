import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Facebook } from "lucide-react";

type NewsItem = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
};

const schoolNews: NewsItem[] = [
  {
    id: 1,
    date: "APRIL 28, 2026",
    title: "Education Calendar Sees Major Shift",
    excerpt:
      "Public schools are set to roll out a three-term academic system by School Year 2026-2027 under DepEd Order No. 009, s. 2026, marking a significant change in the national education calendar.",
    image: "/news-calendar.jpg",
    link: "https://www.facebook.com/share/p/1Cn9zBFX49/",
  },
  {
    id: 2,
    date: "APRIL 22, 2026",
    title: "Congratulations, SciHigh Graduates - UPCAT Passers!",
    excerpt:
      "SciHigh proudly celebrates its Grade 12 graduates who passed the UPCAT 2026, with passers from Diliman, Manila, Los Banos, and Cebu campuses. Padayon, Iskolar ng Bayan!",
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

const scholarsVoice: NewsItem[] = [
{
    id: "1",
    date: "MAY 17, 2026",
    title: "EDITORIAL | To Report Without Fear",
    excerpt: "Article III, Section 4 of the 1987 Philippine Constitution affirms that no law shall be passed abridging the freedom of speech, expression, or the press.",
    image: "/sv-editorial.jpg",
    link: "https://www.facebook.com/share/p/17v831DtxM/",
  },
{
    id: 2,
    date: "MAY 12, 2026",
    title: "SCITECH | Facts Over Fear: Andes Virus Cruise Crisis Contained",
    excerpt:
      "Amid fears of a next COVID, health officials emphasize the Andes virus outbreak aboard MV Hondius does not pose a widespread global threat. Eight cases confirmed as of May 8-9, 2026.",
    image: "/sv-andes.jpg",
    link: "https://www.facebook.com/share/p/18cHQcYBqQ/",
  },
{
    id: 3,
    date: "MAY 11, 2026",
    title: "Take a Step Forward - Final Broadcasting Tryouts Announced",
    excerpt:
      "Aspiring broadcasters advance to finals! TV Broadcasting tryouts on May 13, Radio Broadcasting on May 19, 2026, both from 8:00-11:00 AM at the Globe Room.",
    image: "/sv-broadcasting.jpg",
    link: "https://www.facebook.com/share/p/18Pq7Yj5xZ/",
  },
];

const tinigIskolar: NewsItem[] = [
  {
    id: 1,
    date: "MAY 3, 2026",
    title: "LATHALAHIN | World Press Freedom Day",
    excerpt:
      "Ang kalayaan sa pamamahayag ay hindi lamang mahalaga sa demokrasya - ito ay pagganap sa tungkulin ng tunay na pamamahayag na maghatid ng katotohanan bilang haligi ng demokrasya.",
    image: "/Tinig-5326.jpg",
    link: "https://www.facebook.com/share/p/18XAVKEkWS/",
  },
  {
    id: 2,
    date: "APRIL 18, 2026",
    title: "Tinig Iskolar Celebrates NSPC 2026 Wins",
    excerpt:
      "Tinig Iskolar proudly celebrates its campus journalists achievements at the 2026 National Schools Press Conference, including 3rd Best School Publication in Region VII and 4th place in Radio Broadcasting.",
    image: "/Tinig-41826.jpg",
    link: "https://www.facebook.com/share/p/1CXwSbuKYP/",
  },
  {
    id: 3,
    date: "APRIL 12, 2026",
    title: "SciHi Filipino RB, Haharurot na sa NSPC 2026!",
    excerpt:
      "Pinatatag ng bawat ensayo, pagkakamali, at pagbangon - tatapak ang SciHi Filipino Radio Scriptwriting and Broadcasting sa pambansang entablado bilang kinatawan ng Rehiyon VII.",
    image: "/Tinig-41226.jpg",
    link: "https://www.facebook.com/share/p/18VDaU92zj/",
  },
];

type TabKey = "school" | "scholars" | "tinig";

const tabs: { key: TabKey; label: string }[] = [
  { key: "school", label: "School News" },
  { key: "scholars", label: "Scholars' Voice" },
  { key: "tinig", label: "Tinig Iskolar" },
];

const tabMeta: Record<
  Exclude<TabKey, "school">,
  { tagline: string; fb: string }
> = {
  scholars: {
    tagline: "In Reverie, We Write to Be Heard",
    fb: "https://www.facebook.com/profile.php?id=100087290154105",
  },
  tinig: {
    tagline:
      "Sama-sama, tayo ay titindig para sa boses ng katarungan, katotohanan, at sangkatauhan.",
    fb: "https://www.facebook.com/profile.php?id=61551319650573",
  },
};

const NewsCard = ({ item, i }: { item: NewsItem; i: number }) => (
  <motion.a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.08 * i }}
    className="group block overflow-hidden glass-card hover-lift cursor-pointer"
  >
    <div className="relative h-52 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
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
);

const NewsSection = () => {
  const [active, setActive] = useState<TabKey>("school");

  const items =
    active === "school"
      ? schoolNews
      : active === "scholars"
      ? scholarsVoice
      : tinigIskolar;

  const meta = active !== "school" ? tabMeta[active] : null;

  return (
    <section id="news" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-heading font-semibold tracking-widest uppercase text-gold border border-gold/30 rounded-full bg-gold/5">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Latest <span className="text-gradient-gold">News</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "px-5 py-2 rounded-full text-sm font-heading font-semibold tracking-wide transition-all border " +
                  (isActive
                    ? "bg-gold text-[#0a1628] border-gold shadow-[0_4px_20px_-4px_hsl(46_91%_53%/0.5)]"
                    : "bg-transparent text-gold border-gold/60 hover:border-gold hover:bg-gold/10")
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {meta && (
              <div className="flex flex-col items-center text-center mb-8 gap-3">
                <p className="italic text-gold max-w-2xl">{meta.tagline}</p>
                <a
                  href={meta.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/60 text-gold text-sm font-heading font-semibold hover:bg-gold/10 transition-colors"
                >
                  <Facebook size={16} />
                  Follow on Facebook
                </a>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => (
                <NewsCard key={item.id} item={item} i={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NewsSection;
