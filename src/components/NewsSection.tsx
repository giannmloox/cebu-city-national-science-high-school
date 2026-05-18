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
[
  {
    "id": "1427206786098019",
    "date": "Unknown Date",
    "title": "No excerpt",
    "excerpt": "No excerpt",
    "image": "",
    "link": "https://www.facebook.com/ccnshs303141/posts/pfbid02etK1539KLzSEubDQkzbGCjftRbeSTB1no42KKk8V3jZxWiVszc43HAmjUFCtKSgol"
  },
  {
    "id": "1415042013981163",
    "date": "Unknown Date",
    "title": "\ud835\uddd8\ud835\uddd7\ud835\udde8\ud835\uddd6\ud835\uddd4\ud835\udde7\ud835\udddc\ud835\udde2\ud835\udde1 \ud835\uddd6\ud835\uddd4\ud835\udddf\ud835\uddd8\ud835\udde1\ud835\uddd7\ud835\uddd4\ud835\udde5 \ud835\udde6\ud835\uddd8\ud835\uddd8\ud835\udde6 \ud835\udde0\ud835\uddd4\ud835\udddd\ud835\udde2\ud835\udde5 \ud835\udde6\ud835\udddb\ud835\udddc\ud835\uddd9\ud835\udde7\n\ud835\udde3\ud835\ude02\ud835\uddef\ud835\uddf9\ud835\uddf6\ud835\uddf0 \ud835\ude00\ud835\uddf0\ud835\uddf5\ud835\uddfc\ud835\uddfc\ud835\uddf9\ud835\ude00...",
    "excerpt": "\ud835\uddd8\ud835\uddd7\ud835\udde8\ud835\uddd6\ud835\uddd4\ud835\udde7\ud835\udddc\ud835\udde2\ud835\udde1 \ud835\uddd6\ud835\uddd4\ud835\udddf\ud835\uddd8\ud835\udde1\ud835\uddd7\ud835\uddd4\ud835\udde5 \ud835\udde6\ud835\uddd8\ud835\uddd8\ud835\udde6 \ud835\udde0\ud835\uddd4\ud835\udddd\ud835\udde2\ud835\udde5 \ud835\udde6\ud835\udddb\ud835\udddc\ud835\uddd9\ud835\udde7\n\ud835\udde3\ud835\ude02\ud835\uddef\ud835\uddf9\ud835\uddf6\ud835\uddf0 \ud835\ude00\ud835\uddf0\ud835\uddf5\ud835\uddfc\ud835\uddfc\ud835\uddf9\ud835\ude00 \ud835\ude01\ud835\uddfc \ud835\uddff\ud835\uddfc\ud835\uddf9\ud835\uddf9 \ud835\uddfc\ud835\ude02\ud835\ude01 \ud835\ude01\ud835\uddf5\ud835\uddff\ud835\uddf2\ud835\uddf2-\ud835\ude01\ud835\uddf2\ud835\uddff\ud835\uddfa \ud835\uddee\ud835\uddf0\ud835\uddee\ud835\uddf1\ud835\uddf2\ud835\uddfa\ud835\uddf6\ud835\uddf0 \ud835\ude00\ud835\ude06\ud835\ude00\ud835\ude01\ud835\uddf2\ud835\uddfa \ud835\uddef\ud835\ude06 \ud835\udde6\ud835\uddec \ud835\udfee\ud835\udfec\ud835\udfee\ud835\udff2\u2013\ud835\udfee\ud835\udfec\ud835\udfee\ud835\udff3 \n\nThe Department of Education (DepEd) has ma",
    "image": "",
    "link": "https://www.facebook.com/ccnshs303141/posts/pfbid028m4MaZ94Mxb16JoJ4kXeQyAqBDK6vfuC1paXeL5uDFTZ5Pq6injg4sKBcvXmUKp9l"
  },
  {
    "id": "1409937951158236",
    "date": "Unknown Date",
    "title": "Congratulations, SciHigh Graduates- UPCAT PASSERS!...",
    "excerpt": "Congratulations, SciHigh Graduates- UPCAT PASSERS!\n\nYour hard work, sleepless nights, and unwavering determination have paid off\u2014you did it! \nPassing",
    "image": "",
    "link": "https://www.facebook.com/ccnshs303141/posts/pfbid02miJnZ9TDTEKwrq6Knfh3irxksLJM6cbwC2enZ63JhLygWEvb9vKYqNXvqVWBngByl"
  }
]
];

const scholarsVoice: NewsItem[] = [
[
  {
    "id": "964951329757863",
    "date": "Unknown Date",
    "title": "\ud835\uddd8\ud835\uddd7\ud835\udddc\ud835\udde7\ud835\udde2\ud835\udde5\ud835\udddc\ud835\uddd4\ud835\udddf | \ud835\udde7\ud835\uddfc \ud835\udde5\ud835\uddf2\ud835\uddfd\ud835\uddfc\ud835\uddff\ud835\ude01 \ud835\uddea\ud835\uddf6\ud835\ude01\ud835\uddf5\ud835\uddfc\ud835\ude02\ud835\ude01 \ud835\uddd9\ud835\uddf2\ud835\uddee\ud835\uddff\n\nArticle III, S...",
    "excerpt": "\ud835\uddd8\ud835\uddd7\ud835\udddc\ud835\udde7\ud835\udde2\ud835\udde5\ud835\udddc\ud835\uddd4\ud835\udddf | \ud835\udde7\ud835\uddfc \ud835\udde5\ud835\uddf2\ud835\uddfd\ud835\uddfc\ud835\uddff\ud835\ude01 \ud835\uddea\ud835\uddf6\ud835\ude01\ud835\uddf5\ud835\uddfc\ud835\ude02\ud835\ude01 \ud835\uddd9\ud835\uddf2\ud835\uddee\ud835\uddff\n\nArticle III, Section 4 of the 1987 Philippine Constitution states: \u201cNo law shall be passed abridging the freedom o",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid02JUh6EXKug9FvQVzJngSNyQu1ntxQzfYqUAy9KSJRPxmDMFgQm8dXdHr9MojW9svPl&id=100087290154105"
  },
  {
    "id": "960798013506528",
    "date": "Unknown Date",
    "title": "\ud835\udde6\ud835\uddd6\ud835\udddc\ud835\udde7\ud835\uddd8\ud835\uddd6\ud835\udddb | \ud835\uddd9\ud835\uddd4\ud835\uddd6\ud835\udde7\ud835\udde6 \ud835\udde2\ud835\udde9\ud835\uddd8\ud835\udde5 \ud835\uddd9\ud835\uddd8\ud835\uddd4\ud835\udde5\n\ud835\uddd4\ud835\uddfb\ud835\uddf1\ud835\uddf2\ud835\ude00 \ud835\ude03\ud835\uddf6\ud835\uddff\ud835\ude02\ud835\ude00 \ud835\uddf0\ud835\uddff\ud835\ude02\ud835\uddf6\ud835\ude00\ud835\uddf2 \ud835\uddf0\ud835\uddff\ud835\uddf6\ud835\ude00\ud835\uddf6...",
    "excerpt": "\ud835\udde6\ud835\uddd6\ud835\udddc\ud835\udde7\ud835\uddd8\ud835\uddd6\ud835\udddb | \ud835\uddd9\ud835\uddd4\ud835\uddd6\ud835\udde7\ud835\udde6 \ud835\udde2\ud835\udde9\ud835\uddd8\ud835\udde5 \ud835\uddd9\ud835\uddd8\ud835\uddd4\ud835\udde5\n\ud835\uddd4\ud835\uddfb\ud835\uddf1\ud835\uddf2\ud835\ude00 \ud835\ude03\ud835\uddf6\ud835\uddff\ud835\ude02\ud835\ude00 \ud835\uddf0\ud835\uddff\ud835\ude02\ud835\uddf6\ud835\ude00\ud835\uddf2 \ud835\uddf0\ud835\uddff\ud835\uddf6\ud835\ude00\ud835\uddf6\ud835\ude00 \ud835\uddf0\ud835\uddfc\ud835\uddfb\ud835\ude01\ud835\uddee\ud835\uddf6\ud835\uddfb\ud835\uddf2\ud835\uddf1\n\nAmid the Atlantic waters aboard the MV Hondius cruise ship, the Andes virus resurfaces\u2014",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid07DQ3mPQFbnFRmWSYShzQpeRL3Dsfg2W9RfYZ64UJAwyEqXch4PSYfj5W72tfcrozl&id=100087290154105"
  },
  {
    "id": "960549520198044",
    "date": "Unknown Date",
    "title": "\ud835\udddb\ud835\uddee\ud835\uddfd\ud835\uddfd\ud835\ude06 \ud835\uddef\ud835\uddf6\ud835\uddff\ud835\ude01\ud835\uddf5\ud835\uddf1\ud835\uddee\ud835\ude06, \ud835\udde0\ud835\uddee\u2019\ud835\uddee\ud835\uddfa \ud835\uddd4\ud835\uddf9\ud835\uddf9\ud835\ude06\ud835\ude00\ud835\ude00\ud835\uddee! \ud83e\udd73\n\nThank you for be...",
    "excerpt": "\ud835\udddb\ud835\uddee\ud835\uddfd\ud835\uddfd\ud835\ude06 \ud835\uddef\ud835\uddf6\ud835\uddff\ud835\ude01\ud835\uddf5\ud835\uddf1\ud835\uddee\ud835\ude06, \ud835\udde0\ud835\uddee\u2019\ud835\uddee\ud835\uddfa \ud835\uddd4\ud835\uddf9\ud835\uddf9\ud835\ude06\ud835\ude00\ud835\ude00\ud835\uddee! \ud83e\udd73\n\nThank you for being more than just our school paper adviser\u2014you guide us with patience, inspire us to always do our",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid024co9Qgisx2o1EQGvfNUwxjN1zfG8RVoVSuZSY7VfVvgMEDun9KfHSY3Mzp42GDwrl&id=100087290154105"
  }
]
];

const tinigIskolar: NewsItem[] = [
[
  {
    "id": "122239870124043988",
    "date": "Unknown Date",
    "title": "\ud835\uddde\ud835\udde2\ud835\udddf\ud835\udde8\ud835\udde0 | \ud835\udc0f\ud835\udc1a\ud835\udc20-\ud835\udc1a\ud835\udc2c\ud835\udc1a \ud835\udc1a\ud835\udc27\ud835\udc20 \ud835\udc08\ud835\udc2d\ud835\udc22\ud835\udc27\ud835\udc1a\ud835\udc27\ud835\udc22\ud835\udc26, \ud835\udc0a\ud835\udc1a\ud835\udc2d\ud835\udc1a\ud835\udc21\ud835\udc22\ud835\udc26\ud835\udc22\ud835\udc24\ud835\udc1a\ud835\udc27 \ud835\udc1a\ud835\udc27\ud835\udc20 \ud835\udc08\ud835\udc27\ud835\udc1a\ud835\udc27...",
    "excerpt": "\ud835\uddde\ud835\udde2\ud835\udddf\ud835\udde8\ud835\udde0 | \ud835\udc0f\ud835\udc1a\ud835\udc20-\ud835\udc1a\ud835\udc2c\ud835\udc1a \ud835\udc1a\ud835\udc27\ud835\udc20 \ud835\udc08\ud835\udc2d\ud835\udc22\ud835\udc27\ud835\udc1a\ud835\udc27\ud835\udc22\ud835\udc26, \ud835\udc0a\ud835\udc1a\ud835\udc2d\ud835\udc1a\ud835\udc21\ud835\udc22\ud835\udc26\ud835\udc22\ud835\udc24\ud835\udc1a\ud835\udc27 \ud835\udc1a\ud835\udc27\ud835\udc20 \ud835\udc08\ud835\udc27\ud835\udc1a\ud835\udc27\ud835\udc22\n\nDala ang pagod, pamasahe, at pag-asa, bumiyahe ang mga magsasaka patungong Maynila upang sa wakas",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid08RwxVYbmAhmkmDuSE7nAUTFtoNn9KJ1gaFN5JBCssFged3FuDiTgDBMoz7q7XiQYl&id=61551319650573"
  },
  {
    "id": "122239545608043988",
    "date": "Unknown Date",
    "title": "\ud835\uddd8\ud835\uddd7\ud835\udddc\ud835\udde7\ud835\udde2\ud835\udde5\ud835\uddec\ud835\uddd4\ud835\udddf | \ud835\udc0f\ud835\udc22\ud835\udc25\ud835\udc22\ud835\udc29\ud835\udc22\ud835\udc27\ud835\udc1a\ud835\udc2c, \ud835\udc0c\ud835\udc2e\ud835\udc25\ud835\udc22\ud835\udc27\ud835\udc20 \ud835\udc0c\ud835\udc1a\ud835\udc27\ud835\udc20\ud835\udc1a\ud835\udc27\ud835\udc20\ud835\udc1a\ud835\udc2b\ud835\udc1a\ud835\udc29 \ud835\udc27\ud835\udc20 \ud835\udc03\ud835\udc1a\ud835\udc2d\ud835\udc22\ud835\udc27...",
    "excerpt": "\ud835\uddd8\ud835\uddd7\ud835\udddc\ud835\udde7\ud835\udde2\ud835\udde5\ud835\uddec\ud835\uddd4\ud835\udddf | \ud835\udc0f\ud835\udc22\ud835\udc25\ud835\udc22\ud835\udc29\ud835\udc22\ud835\udc27\ud835\udc1a\ud835\udc2c, \ud835\udc0c\ud835\udc2e\ud835\udc25\ud835\udc22\ud835\udc27\ud835\udc20 \ud835\udc0c\ud835\udc1a\ud835\udc27\ud835\udc20\ud835\udc1a\ud835\udc27\ud835\udc20\ud835\udc1a\ud835\udc2b\ud835\udc1a\ud835\udc29 \ud835\udc27\ud835\udc20 \ud835\udc03\ud835\udc1a\ud835\udc2d\ud835\udc22\ud835\udc27\ud835\udc20 \ud835\udc0f\ud835\udc22\ud835\udc27\ud835\udc1a\ud835\udc27\ud835\udc20\ud835\udc1a\ud835\udc2b\ud835\udc1a\ud835\udc29\n\n\u201cPilipinas, hindi na ikaw ang bayang noon ay aking pinapangarap. Marahil, panahon na r",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid023q9UqCtBjHRYTC7Nn8USWuREcvfUfna4daP9F3swqBW1yYcb4nHJyDDfzvWXd7AYl&id=61551319650573"
  },
  {
    "id": "122237611406043988",
    "date": "Unknown Date",
    "title": "\ud835\udddf\ud835\uddd4\ud835\udde7\ud835\udddb\ud835\uddd4\ud835\udddf\ud835\uddd4\ud835\udddc\ud835\udde1 | \ud835\udc16\ud835\udc28\ud835\udc2b\ud835\udc25\ud835\udc1d \ud835\udc0f\ud835\udc2b\ud835\udc1e\ud835\udc2c\ud835\udc2c \ud835\udc05\ud835\udc2b\ud835\udc1e\ud835\udc1e\ud835\udc1d\ud835\udc28\ud835\udc26 \ud835\udc03\ud835\udc1a\ud835\udc32\n\nAng kalayaan ...",
    "excerpt": "\ud835\udddf\ud835\uddd4\ud835\udde7\ud835\udddb\ud835\uddd4\ud835\udddf\ud835\uddd4\ud835\udddc\ud835\udde1 | \ud835\udc16\ud835\udc28\ud835\udc2b\ud835\udc25\ud835\udc1d \ud835\udc0f\ud835\udc2b\ud835\udc1e\ud835\udc2c\ud835\udc2c \ud835\udc05\ud835\udc2b\ud835\udc1e\ud835\udc1e\ud835\udc1d\ud835\udc28\ud835\udc26 \ud835\udc03\ud835\udc1a\ud835\udc32\n\nAng kalayaan sa pamamahayag ay hindi lamang mahalaga sa demokrasya.\n\nSa kasalukuyang panahon, ang pinaka-mapangan",
    "image": "",
    "link": "https://www.facebook.com/permalink.php?story_fbid=pfbid068PFKgZPmi2LC6iEJBGUpqRrJNe54Md2yoZeiEqtA2wEKod4wAH1qAbEzYiBKGcYl&id=61551319650573"
  }
]
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
