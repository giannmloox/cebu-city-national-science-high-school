import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

const ContactFooter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* Google Form Application */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 particle-bg opacity-40" />
        <div className="container mx-auto px-4 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
              Apply to <span className="text-gradient-gold">Sci-Hi</span>
            </h2>
            <div className="mt-8 w-full">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScmKyKNHC48dEWMdkcrIYyDiVsJCs7Po-DMb5wmXBFBtEEiUA/viewform?embedded=true"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Apply to Sci-Hi"
                className="w-full h-[700px] md:h-[900px] bg-transparent"
                style={{ border: "none" }}
              >
                Loading…
              </iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* School Info */}
            <div>
              <h3 className="font-heading font-bold text-xl text-background">CCNSHS</h3>
              <p className="text-background/40 text-sm mt-1 font-heading">
                Cebu City National Science High School
              </p>
              <p className="mt-4 text-background/50 text-sm leading-relaxed">
                "Quality is never an accident. It is always the result of intelligent effort." — John Ruskin
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-background mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-background/60">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-gold" />
                  <span>Salvador Street, Labangon, Cebu City, Philippines 6000</span>
                </div>
                <div className="flex items-center gap-3 text-background/60">
                  <Phone size={16} className="shrink-0 text-gold" />
                  <span>(032) 261-2802 — Principal's Office</span>
                </div>
                <div className="flex items-center gap-3 text-background/60">
                  <Mail size={16} className="shrink-0 text-gold" />
                  <a href="mailto:sciencehighschoolcebucity@gmail.com" className="hover:text-gold transition-colors">
                    sciencehighschoolcebucity@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-background/60">
                  <Facebook size={16} className="shrink-0 text-gold" />
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    Facebook Page
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-background mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {["About", "Admissions", "Programs", "Why Sci-Hi", "Gallery", "Contact"].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s/g, "")}`}
                      className="block text-background/50 hover:text-gold transition-colors"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
              <p className="mt-6 text-background/40 text-xs">
                Principal: <strong>Mme. Marilou Tabal Dela Cuesta</strong>
                <br />
                (2024–present)
              </p>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/30 text-xs">
              © {new Date().getFullYear()} Cebu City National Science High School. All rights reserved.
            </p>
            <p className="text-background/30 text-xs font-heading">
              Aim High! Soar High! Science High. 🚀
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;
