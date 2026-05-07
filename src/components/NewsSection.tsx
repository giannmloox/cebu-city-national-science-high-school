import { motion } from "framer-motion";

const NewsSection = () => {
  return (
    <section id="news" className="py-20" style={{ backgroundColor: "#f5f0dc" }}>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center w-full"
        >
          <div className="w-full max-w-[500px]">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fccnshs303141&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
              width="500"
              height="600"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full"
              title="CCNSHS Facebook Page"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
