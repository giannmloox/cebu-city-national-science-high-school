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
    date: "JUNE 12, 2026",
    title: "CCNSHS Faculty and Staff Ready to Serve for School Year 2026–2027",
    excerpt: "United in purpose and passion, the CCNSHS community embarks on a new academic year dedicated to nurturing excellence and meaningful learning experiences.",
    image: "/news-1.jpg",
    link: "https://www.facebook.com/share/p/1BrsyRqjvn/",
  },
    id: 2,
    date: "JUNE 11, 2026",
    title: "𝗝𝗨𝗦𝗧 𝗜𝗡 | 𝗖𝗖𝗡𝗦𝗛𝗦 𝗰𝗼𝗻𝗱𝘂𝗰𝘁𝘀 𝗲𝗮𝗿𝘁𝗵𝗾𝘂𝗮𝗸𝗲 𝗱𝗿𝗶𝗹𝗹 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴 𝟳.𝟴-𝗺𝗮𝗴𝗻𝗶𝘁𝘂𝗱𝗲 𝗠𝗶𝗻𝗱𝗮𝗻𝗮𝗼 𝗾𝘂𝗮𝗸𝗲",
    excerpt: "Students, teachers, and school personnel of Cebu City National Science High School (CCNSHS) participated in an earthquake drill on June 11, reinforcing the school's commitment to disaster preparedness and campus safety. ",
    image: "/news-2.jpg",
    link: "https://www.facebook.com/share/p/18WWW7rXa8/",
  },
    id: 3,
    date: "JUNE 9, 2026",
    title: "𝗡𝗘𝗪𝗦 | 𝗦𝗰𝗶𝗛𝗶 𝗺𝗮𝗿𝗸𝘀 𝘀𝘁𝗮𝗿𝘁 𝗼𝗳 𝗻𝗲𝘄 𝘀𝗰𝗵𝗼𝗼𝗹 𝘆𝗲𝗮𝗿 𝘄𝗶𝘁𝗵 𝗳𝗶𝗿𝘀𝘁 𝗳𝗹𝗮𝗴 𝗰𝗲𝗿𝗲𝗺𝗼𝗻𝘆",
    excerpt: "Cebu City National Science High School (CCNSHS) officially began school year 2026-2027 on June 8, marking the return of students to campus and the start of new opportunities for growth and learning.",
    image: "news-3.jpg",
    link: "https://www.facebook.com/share/p/1PPFmaXxzN/",
  },            
];

const scholarsVoice: NewsItem[] =  [  {
    id: 1,
    date: "MAY 18, 2026",
    title: "Proper School Uniform Guide for SciHiyistas",
    excerpt: "Proper School Uniform Guide for SciHiyistas 
 
A new school year at Cebu City National Science High School is fast approaching, so get ready to step i",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0xrqKy6waCBAEdXuzLswif1P92eYRrCXWQqrC7HFfxkNeiG7nrVpEMp2f4rgBcDDrl&id=100087290154105",
  },
    id: 2,
    date: "MAY 18, 2026",
    title: "EDITORIAL | To Report Without Fear",
    excerpt: "EDITORIAL | To Report Without Fear

Article III, Section 4 of the 1987 Philippine Constitution states: No law shall be passed abridging the freedom of",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02JcLcCtMdrsvfQ9ktZakB2X2iKwbvShcinXqyQuq6tnXWppEoHzvnJQPANnvN77xEl&id=100087290154105",
  },
    id: 3,
    date: "MAY 18, 2026",
    title: "SCITECH | FACTS OVER FEAR",
    excerpt: "SCITECH | FACTS OVER FEAR
Andes virus cruise crisis contained

Amid the Atlantic waters aboard the MV Hondius cruise ship, the Andes virus resurfacesk",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02Atgkev4LdmmQsPX14EAUYe8KuC9oFGShVSWCXB1McYuwAnqFPfqdArmFpuCJYF1Cl&id=100087290154105",
  },
];

const tinigIskolar: NewsItem[] =  [  {
    id: 1,
    date: "MAY 18, 2026",
    title: "AGHAM-TEK | Advance Studying: Susi sa Pag-unawa",
    excerpt: "AGHAM-TEK | Advance Studying: Susi sa Pag-unawa

Hindi maikakaila na karamihan sa mga estudyante ngayon ay nagsisimula lamang mag-aral kapag malapit n",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid0bBPUvMHR72i9JyygvdYn1sK2w9oxVCfUCytZ9rWBj91zJ2C1GGQCAHS5PiK4Quenl&id=61551319650573",
  },
    id: 2,
    date: "MAY 18, 2026",
    title: "KOLUM | Pag-asa ang Itinanim, Katahimikan ang Inan",
    excerpt: "KOLUM | Pag-asa ang Itinanim, Katahimikan ang Inani

Dala ang pagod, pamasahe, at pag-asa, bumiyahe ang mga magsasaka patungong Maynila upang sa wakas",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid02C7EfP5FrCe4tRZMz4HBvwXSUWLuhTYgU2CWrw7BYMqdnyaf5chgYCxkQWxjDbrpcl&id=61551319650573",
  },
    id: 3,
    date: "MAY 18, 2026",
    title: "EDITORYAL | Pilipinas, Muling Mangangarap ng Datin",
    excerpt: "EDITORYAL | Pilipinas, Muling Mangangarap ng Dating Pinangarap

Pilipinas, hindi na ikaw ang bayang noon ay aking pinapangarap. Marahil, panahon na ri",
    image: "/news-placeholder.jpg",
    link: "https://www.facebook.com/permalink.php?story_fbid=pfbid037WSBijYGmCh9ssJzZTqwMGdWLZWkTSgmt4FHa1DcaJZFwKozpMDFyVwMkcL5FeYdl&id=61551319650573",
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
    href={item.link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.08 * i }}
    className="group block overflow-hidden glass-card hover-lift cursor-pointer"
  >
    <div className="relative h-52 overflow-hidden bg-muted">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
          Add Image Here
        </div>
      )}

      {item.link && (
        <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={16} />
        </div>
      )}
    </div>

    <div className="p-5">
      <span className="text-xs text-gold font-heading font-semibold tracking-wider uppercase">
        {item.date || "DATE"}
      </span>

      <h3 className="mt-2 text-lg font-heading font-bold text-foreground group-hover:text-gold transition-colors">
        {item.title || "Your Title Here"}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
        {item.excerpt || "Your excerpt/description here."}
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
                <p className="italic text-gold max-w-2xl">
                  {meta.tagline}
                </p>

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
