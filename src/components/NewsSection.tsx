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

const schoolNews: NewsItem[] =  [  {
    id: 1,
    date: "MAY 18, 2026",
    title: "No excerpt",
    excerpt: "No excerpt",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/ccnshs303141/posts/pfbid0ariHbDwkg8oDYiT4P41wvgPzVfbd7qgL4cab4gipCziFChqQAwmAfFzZqCCp8Rkul",
  },
    id: 2,
    date: "MAY 18, 2026",
    title: "EDUCATION CALENDAR SEES MAJOR SHIFT",
    excerpt: "EDUCATION CALENDAR SEES MAJOR SHIFT
Public schools to roll out three-term academic system by SY 20262027 

The Department of Education (DepEd) has man",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/ccnshs303141/posts/pfbid028auMHQsKYK3B9m9k26isyxZfdVJSzovwZ4sg4U8mAwosWgSe6epMRTHdT3aGEaL8l",
  },
    id: 3,
    date: "MAY 18, 2026",
    title: "Congratulations, SciHigh Graduates- UPCAT PASSERS!",
    excerpt: "Congratulations, SciHigh Graduates- UPCAT PASSERS!

Your hard work, sleepless nights, and unwavering determination have paid offyou did it! 
Passing t",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/ccnshs303141/posts/pfbid0iAfbdyprc7g277dDW5C6oWTHAmguWQDBGzkErArVyqL5dVNpFmA8TTYeL7od21LUl",
  },
];

const scholarsVoice: NewsItem[] =  [  {
    id: 1,
    date: "MAY 18, 2026",
    title: "EDITORIAL | To Report Without Fear",
    excerpt: "EDITORIAL | To Report Without Fear

Article III, Section 4 of the 1987 Philippine Constitution states: No law shall be passed abridging the freedom of",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02JJY5wP4AretZsSYSd5UA7iiEsPwF4AboLeSUNYKuZgctnDNfiRhBetaxzEgsHDDul&id=100087290154105",
  },
    id: 2,
    date: "MAY 18, 2026",
    title: "SCITECH | FACTS OVER FEAR",
    excerpt: "SCITECH | FACTS OVER FEAR
Andes virus cruise crisis contained

Amid the Atlantic waters aboard the MV Hondius cruise ship, the Andes virus resurfacesk",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02AatEPQksdRtHD9t2edGWuaHd8Zv9L5LTKvmp2uvM2YaMmHvTB6Eh2Jq5en7XFcrrl&id=100087290154105",
  },
    id: 3,
    date: "MAY 18, 2026",
    title: "Happy birthday, Maam Allyssa!",
    excerpt: "Happy birthday, Maam Allyssa! 

Thank you for being more than just our school paper adviseryou guide us with patience, inspire us to always do our bes",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid037zHL2i5VydU8Br4A2Jwr9ycsrpMYc6U2hjEFNGLmjPvyFXVWVMyBTwu7ribUMT7Ul&id=100087290154105",
  },
];

const tinigIskolar: NewsItem[] =  [  {
    id: 1,
    date: "MAY 18, 2026",
    title: "KOLUM | Pag-asa ang Itinanim, Katahimikan ang Inan",
    excerpt: "KOLUM | Pag-asa ang Itinanim, Katahimikan ang Inani

Dala ang pagod, pamasahe, at pag-asa, bumiyahe ang mga magsasaka patungong Maynila upang sa wakas",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02CHPfgDXb23YRztu5L2gcGvosXh2iibBptwSqnZpqNVFMjoKhaeafJge35nUoMndPl&id=61551319650573",
  },
    id: 2,
    date: "MAY 18, 2026",
    title: "EDITORYAL | Pilipinas, Muling Mangangarap ng Datin",
    excerpt: "EDITORYAL | Pilipinas, Muling Mangangarap ng Dating Pinangarap

Pilipinas, hindi na ikaw ang bayang noon ay aking pinapangarap. Marahil, panahon na ri",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid037gbC1sp1aieauZGQwakju7M2924n4EydDHwBJMApDqezSRQw91HhGFAG2Ah5eZeMl&id=61551319650573",
  },
    id: 3,
    date: "MAY 18, 2026",
    title: "LATHALAIN | World Press Freedom Day",
    excerpt: "LATHALAIN | World Press Freedom Day

Ang kalayaan sa pamamahayag ay hindi lamang mahalaga sa demokrasya.

Sa kasalukuyang panahon, ang pinaka-mapangan",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid029ypxWMVDdFNEun3sh75zyRF3Q7G4cepcBuEgf5zEE8LUnbQYGwo9N8MGoxMP6hERl&id=61551319650573",
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
