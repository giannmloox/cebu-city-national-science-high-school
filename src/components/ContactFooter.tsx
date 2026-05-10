import { MapPin, Phone, Mail, Facebook, Globe } from "lucide-react";

const ContactFooter = () => {
  return (
    <>
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
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.facebook.com/ccnshs303141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1628] border-2 border-gold text-gold font-medium text-sm transition-all duration-200 hover:bg-gold hover:text-[#0a1628]"
                >
                  <Facebook size={15} /> Facebook
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=ccnshs303141@deped.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1628] border-2 border-gold text-gold font-medium text-sm transition-all duration-200 hover:bg-gold hover:text-[#0a1628]"
                >
                  <Mail size={15} /> Email
                </a>
                <a
                  href="https://www.ccnshs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1628] border-2 border-gold text-gold font-medium text-sm transition-all duration-200 hover:bg-gold hover:text-[#0a1628]"
                >
                  <Globe size={15} /> Official Website
                </a>
              </div>
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
                  <a href="https://www.facebook.com/ccnshs303141" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    Facebook Page
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-background mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {["About", "Admissions", "Programs", "Why Sci-Hi", "Gallery", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s/g, "")}`}
                    className="block text-background/50 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                ))}
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
