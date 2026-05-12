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
    date: "MAY 12, 2026",
    title: "𝗦𝗖𝗜𝗧𝗘𝗖𝗛 | 𝗙𝗔𝗖𝗧𝗦 𝗢𝗩𝗘𝗥 𝗙𝗘𝗔𝗥 𝗔𝗻𝗱𝗲𝘀 𝘃𝗶𝗿𝘂𝘀 𝗰𝗿𝘂𝗶𝘀𝗲 𝗰𝗿𝗶𝘀𝗶𝘀 𝗰𝗼𝗻𝘁𝗮𝗶𝗻𝗲𝗱",
    excerpt:
      "Amid the Atlantic waters aboard the MV Hondius cruise ship, the Andes virus resurfaces—known for claiming nearly half of the severe cases it infects—sparking public fears of a “next COVID.” However, health officials emphasize that the outbreak does not pose a widespread global threat.",
    image:
      "https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-6/698389767_960868790166117_4860146697349121883_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFATuxvsPb_01L2ZNOYTzBbmPB8K3tN5lyY8Hwre03mXFz6r7FzStkYqjcViVW2iNFc8oVwip9Io6pan-4k9Gu2&_nc_ohc=DQMhc5EzaPMQ7kNvwFPWwM9&_nc_oc=Adr011O5Th5LrC4CEludaWDEK_Bnc1w1TjZ1rySVi-EZsSkejUIbfN3idUAzQcalr-Q&_nc_zt=23&_nc_ht=scontent.fceb3-1.fna&_nc_gid=eoAkf-8yiO8xAbnA5WeGFA&_nc_ss=7b2a8&oh=00_Af4LFbTmXNhXWNSDmcjXOsPC_PNUNWEGPGWWi-MwMNJhtg&oe=6A09301C",
    link: "https://www.facebook.com/share/p/1BUFqVzRYL/",
  },
  {
    id: 2,
    date: "MAY 12, 2026",
    title: "𝗛𝗮𝗽𝗽𝘆 𝗯𝗶𝗿𝘁𝗵𝗱𝗮𝘆, 𝗠𝗮’𝗮𝗺 𝗔𝗹𝗹𝘆𝘀𝘀𝗮!",
    excerpt:
      "Thank you for being more than just our school paper adviser—you guide us with patience, inspire us to always do our best, and remind us that our words can make a difference. Through every correction, reminder, and deadline, you continue to help us grow not only as journalists, but also as individuals.",
    image:
      "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/699214960_960549243531405_4958089874500311990_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeECj-HA9tmkcPAQUmqPdl11M2cJbA-j_80zZwlsD6P_zVgS2KKxrRLo1OdOHgFgkrY0WwncDKaxZVEhnZeukJ_j&_nc_ohc=SbznwLbXODkQ7kNvwGxRa4L&_nc_oc=AdqkIYHylfFxYA__nrq_FBqY1igB9ycPQrQ0zhKjGBn_1YVNHEAymRF5czl9DRy7IMc&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=73l4T9081qPvvzofpRr-9g&_nc_ss=7b2a8&oh=00_Af7T7nFYrxmgKO9enbh8L4qJR07oisLpxmChvdaUu6tqWA&oe=6A090EBA",
  },
  {
    id: 3,
    date: "MAY 11, 2026",
    title: "𝗧𝗮𝗸𝗲 𝗮 𝘀𝘁𝗲𝗽 𝗳𝗼𝗿𝘄𝗮𝗿𝗱 𝗮𝗻𝗱 𝘀𝗵𝗼𝘄 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲 𝘄𝗵𝘆 𝘆𝗼𝘂 𝗯𝗲𝗹𝗼𝗻𝗴 𝗶𝗻 𝘁𝗵𝗲 𝘀𝗽𝗼𝘁𝗹𝗶𝗴𝗵𝘁!",
    excerpt:
      "Aspiring broadcasters have finally made it to the final tryouts. Your voice has been recognized, and it’s time for the final audition that decides it all.",
    image:
      "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/697197943_960039956915667_5732052605412242850_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeF-UKzgFu6P8PLX90kaAR56gXm0B5gswkOBebQHmCzCQxttPT5ymHnfft3dB78mWzObVXAzTmQ0mBKhau4dF6mQ&_nc_ohc=xn8ehw21ADIQ7kNvwFSbfZb&_nc_oc=AdpdARn2nMfhsR69vt0Hq17Qhfhuz7Rb34E8OKbW5tMKsvDvNmO0mkrhPyCKX6qlvVA&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=73l4T9081qPvvzofpRr-9g&_nc_ss=7b2a8&oh=00_Af4aFPiGI2zAngHtOPVRn8HWS0bdHchI2H0mJVSMyjbqhA&oe=6A09199A",
    link: "https://www.facebook.com/share/p/188qt7zDSP/",
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
