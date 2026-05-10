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

const scholarsVoice: NewsItem[] = [
  {
    id: 1,
    date: "MAY 10, 2026",
    title: "Why the World's Greatest Magic Isn't Found in a Bottle",
    excerpt:
      "A Mother's Day feature reflecting on the quiet, unrecognized magic of mothers — and why their love surpasses any fairy tale.",
    image:
      "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/694145743_958519547067708_1235306067560949491_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFNvGBITpu6KxhUmm_Vmth4S74s6RVUt2ZLvizpFVS3ZgEG4uQGifczbx1DGqDtAU-ERJURnJ0LeqeBxHNzcfzM&_nc_ohc=QLaJo6UGiywQ7kNvwGMhmqI&_nc_oc=Adq3_COe8ibakWcDajGV6mEJb0fxHfA-Md4EEfos2HIihvD6VpHzNGe7UqHx9jI5mEM&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=yQgU9wxC2xr5yLqeVGPOKQ&_nc_ss=7b2a8&oh=00_Af4drirvACsG8U0Avg6KuRMMo3HM6Q_rCR7BnFy4hkxA9g&oe=6A05E393",
    link: "https://www.facebook.com/share/p/1Fp2ivURWu/",
  },
  {
    id: 2,
    date: "MAY 9, 2026",
    title: "Mic Check Done — We're Live on Air",
    excerpt:
      "The second Radio Broadcasting and Scriptwriting tryouts have wrapped. Qualifiers advance to the final round on May 19, 2026, from 8:00–11:00 AM. TV Broadcasting finals proceed on May 13.",
    image:
      "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/690683492_958114690441527_479226915656026369_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeH7ro_G9XSt5LDgViOhB8UkAObpljmiLrQA5umWOaIutDIFs5yZwgHHypt4ZAl4p8GHBfm4spV3NPBfHvYYqmbV&_nc_ohc=41eOcm3z5GgQ7kNvwHShWqN&_nc_oc=AdqbZlm1bxGEznqckKv16xshyQqi_BXoGGaCNpMqPAZ1J2wJUooHpwPtf1iu1WvPNFg&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=11p1tVCVeZHs6y5ppUL6Xg&_nc_ss=7b2a8&oh=00_Af6nvT2cQ3TLg_MxncU8BK1xBPTgL6tQFf8Pb0B3ImXxWg&oe=6A05E088",
    link: "https://www.facebook.com/share/p/1CKrFXR5uH/",
  },
  {
    id: 3,
    date: "MAY 8, 2026",
    title: "First Time in the Limelight",
    excerpt:
      "With the new Strengthened SHS Curriculum, the school schedule is no longer just a document — it marks a restructured, flexible, and expanded Senior High School experience for incoming Grade 11 students.",
    image:
      "https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-6/696228277_957286507191012_490680385252847936_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGa1AMYkxHW_bTEbXj0MBGAkkSF-Eab2aaSRIX4RpvZpq4CUPfRPyKCES5u7VObIgnJ-U3NqVEVBqCS3j7Dqo0u&_nc_ohc=2JcfE9OuATAQ7kNvwHZB27M&_nc_oc=AdpS2y30cUizfgDMy6uThIlbCSx_9yKgtyHgOfaCX1Ai91EfN7sV1k4rWYA-nvjcYwA&_nc_zt=23&_nc_ht=scontent.fceb3-1.fna&_nc_gid=Ckj3Tk7Fs0kMo9tg9nlIDg&_nc_ss=7b2a8&oh=00_Af7L02NlrWAdWHK0XcnAHsZSuHBdYcH0l2Vwl3ihZXrR9g&oe=6A05DF7B",
    link: "https://www.facebook.com/share/p/1F2EX3uEhE/",
  },
];

const tinigIskolar: NewsItem[] = [
  {
    id: 1,
    date: "MAY 3, 2026",
    title: "LATHALAHIN | World Press Freedom Day",
    excerpt:
      "Ang kalayaan sa pamamahayag ay hindi lamang mahalaga sa demokrasya — ito ay pagganap sa tungkulin ng tunay na pamamahayag na maghatid ng katotohanan bilang haligi ng demokrasya.",
    image:
      "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/688177573_122237611364043988_430063421778108016_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHKI2WzW4xlxHVpAyEFNE9ES4Gf1ddVmUFLgZ_V11WZQa--3hMvxik6rXQIXJO8cO8F_cCSmNv4XYBp5XLrJRte&_nc_ohc=BoYKLsOBG5gQ7kNvwHrr-Uo&_nc_oc=AdpzEe8GWKSS0bUQ10AhTgJr52WNCm9jXnT0GZXxxNP92HNW0EQB_ZG_4tfooqH8x24&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=yfZTC9Q3haHiqU7qVWDBiQ&_nc_ss=7b2a8&oh=00_Af4LbuRHJOKOcZc3kSN1B8kk7C7oCaLkZC5jhx4I4eDdSw&oe=6A0605B5",
    link: "https://www.facebook.com/share/p/18XAVKEkWS/",
  },
  {
    id: 2,
    date: "APRIL 18, 2026",
    title: "Tinig Iskolar Celebrates NSPC 2026 Wins",
    excerpt:
      "Tinig Iskolar proudly celebrates its campus journalists' achievements at the 2026 National Schools Press Conference, including 3rd Best School Publication in Region VII and 4th place in Radio Broadcasting.",
    image:
      "https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-6/672114892_122235055808043988_5659775990861552524_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHgTdBeaCchv-r9wgGGQQJ10uWDO-egMyXS5YM756AzJa5xhfcFdr_IwnTS8nr9rO_GfT1Ec-Z1rqDAuwdqCY9h&_nc_ohc=NwDqYvkfr-4Q7kNvwF78ZgH&_nc_oc=Ado9d5Phgbfu90Xjo8VF4oix81t07Sw0YAqKY5syUdEAAUtHrCLHn82fxDwwcEuXrmw&_nc_zt=23&_nc_ht=scontent.fceb3-1.fna&_nc_gid=GfIHPfX3KxXpCG0PVxYhsQ&_nc_ss=7b2a8&oh=00_Af7VZ2SNca24Qsl3DswLfLnSuzgXQ9oJnmWGvIj4hWJfmA&oe=6A05D734",
    link: "https://www.facebook.com/share/p/1CXwSbuKYP/",
  },
  {
    id: 3,
    date: "APRIL 12, 2026",
    title: "SciHi Filipino RB, Haharurot na sa NSPC 2026!",
    excerpt:
      "Pinatatag ng bawat ensayo, pagkakamali, at pagbangon — tatapak ang SciHi Filipino Radio Scriptwriting and Broadcasting sa pambansang entablado bilang kinatawan ng Rehiyon VII.",
    image:
      "https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-6/670365198_122234038868043988_2471364011346843589_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFVA1vWWz0gmw0firzJ6MxjKDmlgz4CjnsoOaWDPgKOe8MWMJoPFVHf_3MFuA9qXXZsxR6TCyFNARkHPE6EFqad&_nc_ohc=Q45QAELrrecQ7kNvwEH2q4a&_nc_oc=AdpJ7Gf4aEM0vPSNWlWJkYgZchGvyjus7InjnLSRrsxdpdL3Db_bGYJuG6mA-aiFTpI&_nc_zt=23&_nc_ht=scontent.fceb3-1.fna&_nc_gid=GfIHPfX3KxXpCG0PVxYhsQ&_nc_ss=7b2a8&oh=00_Af68aEmWF_XoZjyLqLLeyH2MpsxXgkDYDDrJLZ4QNj999A&oe=6A05D7A3",
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

        {/* Tabs */}
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
