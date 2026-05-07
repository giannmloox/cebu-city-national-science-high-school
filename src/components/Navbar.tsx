import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Admissions", href: "#admissions" },
  { label: "Programs", href: "#programs" },
  { label: "Why Sci-Hi", href: "#why" },
  { label: "Student Life", href: "#life" },
  { label: "Gallery", href: "#gallery" },
  { label: "News", href: "#news" },
  { label: "ScihiZine", href: "/scihizine" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-heading font-bold text-lg text-primary-foreground tracking-tight">
            CCNSHS
          </span>
          <span className="hidden sm:inline text-gold text-sm font-heading">
            Sci-Hi
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-primary-foreground/80 hover:text-gold transition-colors font-medium rounded-md"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admissions"
            className="ml-3 px-5 py-2 gold-gradient text-secondary-foreground font-heading font-semibold text-sm rounded-full hover:opacity-90 transition-opacity glow-gold"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-primary-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-primary-foreground/80 hover:text-gold transition-colors font-medium rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#admissions"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 gold-gradient text-secondary-foreground font-heading font-semibold text-center rounded-full"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
