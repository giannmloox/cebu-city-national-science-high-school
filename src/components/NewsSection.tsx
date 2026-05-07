import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "APRIL 28, 2026",
    title: "Education Calendar Sees Major Shift",
    excerpt:
      "Public schools are set to roll out a three-term academic system by School Year 2026–2027, marking a significant change in the national education calendar.",
    image: "https://scontent.fceb3-1.fna.fbcdn.net/v/t39.30808-6/684271984_949136818005981_6009933188965294653_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHMaGbcxJ0FE8GrGPrIndESt6fzU4gVVpu3p_NTiBVWm_0AoRdH-NPRRvr_3Hw2B-G3sOyBJEBvwCN_0j_AO2AC&_nc_ohc=DXzy5FaIUbwQ7kNvwGTBesz&_nc_oc=Adq9kITQYpGy5oZOKM8EQZCtNYqTp-WqPLxsTjzVnrjpvoI-OSRIw1_dn7RhUP-o3Eg&_nc_zt=23&_nc_ht=scontent.fceb3-1.fna&_nc_gid=qder6khJGATHZwwif0Iq3w&_nc_ss=7a2a8&oh=00_Af7E2GbxudUL4XabQgzay_8KSTLTwKUVgNqyPLHGf2gFlw&oe=6A01E2E2",
    link: "https://www.facebook.com/share/p/1Cn9zBFX49/",
  },
  {
    id: 2,
    date: "APRIL 22, 2026",
    title: "Congratulations, SciHigh Graduates — UPCAT Passers!",
    excerpt:
      "SciHigh celebrates its graduates who passed the UPCAT, proving that the school nurtures world-class minds. Padayon, Iskolar ng Bayan!",
    image: "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/678435978_944431651809831_2868352732478494904_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG5Je-9rUnJWa-Roxm20El30DAOwArfgafQMA7ACt-Bp08K41OtkGIwaPo1jKHOJuyoAj48NoIQa4AfVqy6OJ72&_nc_ohc=QF_xdAUubUcQ7kNvwEchKRi&_nc_oc=AdrvGkNcOY-AMwav0bJVDMk2mvUf7cpC8viIDNuP_SYvAEsFxTm9fKEdB_y4SgSNSvM&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=tBA2NXg3iIiKVBDGI7o85Q&_nc_ss=7a2a8&oh=00_Af5DBLawFIjvoDj4SxkyFht2cY4HljgJTy9VkIpNHAe6JQ&oe=6A020BFB",
    link: "https://www.facebook.com/share/p/1SDoEGmQWS/",
  },
  {
    id: 3,
    date: "APRIL 18, 2026",
    title: "SciHi NSEF Champs Present Award-Winning Antifungal Study at UP Manila Health Summit",
    excerpt:
      "Three Scihiyistas presented their NSEF Grand Champion research on the antifungal properties of the endemic Mana plant at the Health Exploration Summit 2026 in UP Manila.",
    image: "https://scontent.fceb9-1.fna.fbcdn.net/v/t39.30808-6/673503260_941296918789971_8496263782888122753_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFZrN2usQHL0NKDiFhCVNZHNSb1JblO0FA1JvUluU7QUJBwZxyQyUin7OoT4WwiojwZtyHGwoo_rz8gp9KR9a1Q&_nc_ohc=POmO6-ii6EUQ7kNvwFIyVyh&_nc_oc=AdogOsTnvSRgIPAHNhtxwwppQcRzx-YNgIW4EbBS6Q6FytNJFdz4KTbo42li1QVQ8OU&_nc_zt=23&_nc_ht=scontent.fceb9-1.fna&_nc_gid=xNeKJX6WNJ2JlpSQqhnQZA&_nc_ss=7b2a8&oh=00_Af4cJypYSRGs7gYe1HATzm2rYPHasUVz3SK8y6DOmAQo_g&oe=6A01F1D1",
    link: "https://www.facebook.com/share/p/1GaNGrn2Fn/",
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
