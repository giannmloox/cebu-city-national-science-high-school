import { Monitor, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const ScihiZine = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0dc" }}>
      <header className="w-full bg-primary py-4 px-6">
        <Link to="/" className="font-heading font-bold text-lg text-primary-foreground tracking-tight">
          CCNSHS <span className="text-gold ml-2 text-sm">Sci-Hi</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] font-semibold text-primary/70 mb-3">
            WELCOME TO THE
          </p>
          <h1 className="font-heading font-bold text-6xl md:text-8xl text-primary mb-4">
            ScihiZine
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-12">
            Pick your current device
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="https://www.ccnshs.com/computer"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-10 border-2 border-transparent hover:border-gold transition-all hover-lift shadow-card"
            >
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <Monitor className="w-10 h-10 text-secondary-foreground" strokeWidth={2} />
              </div>
              <span className="font-heading font-bold text-2xl text-primary">Computer</span>
            </a>

            <a
              href="https://docs.wixstatic.com/ugd/eaa662_b4f0c6ff21b74a49996acd7da714630b.pdf#pdfjs.action=download"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-10 border-2 border-transparent hover:border-gold transition-all hover-lift shadow-card"
            >
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-10 h-10 text-secondary-foreground" strokeWidth={2} />
              </div>
              <span className="font-heading font-bold text-2xl text-primary">Mobile</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScihiZine;