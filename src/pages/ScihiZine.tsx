import { Monitor, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const ScihiZine = () => {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ background: "#f5c518", animationDuration: "7s" }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 animate-pulse"
          style={{ background: "#1a3a6b", animationDuration: "9s" }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ background: "#f5c518", animationDuration: "11s" }}
        />
        {/* Subtle diagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #f5c518 0 1px, transparent 1px 24px), repeating-linear-gradient(-45deg, #1a3a6b 0 1px, transparent 1px 24px)",
          }}
        />
      </div>

      <header className="relative z-10 w-full py-4 px-6 border-b border-white/10 backdrop-blur-sm">
        <Link to="/" className="font-heading font-bold text-lg text-white tracking-tight">
          CCNSHS <span className="ml-2 text-sm" style={{ color: "#f5c518" }}>Sci-Hi</span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div
          className="max-w-3xl w-full text-center rounded-3xl p-10 md:p-16 animate-fade-in"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)",
          }}
        >
          <p
            className="text-xs md:text-sm tracking-[0.4em] font-semibold mb-4"
            style={{ color: "#f5c518" }}
          >
            WELCOME TO THE
          </p>
          <h1
            className="font-heading font-bold text-6xl md:text-8xl mb-5"
            style={{
              background: "linear-gradient(135deg, #ffffff 30%, #f5c518 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(245,197,24,0.15)",
            }}
          >
            ScihiZine
          </h1>
          <p className="text-lg md:text-xl mb-12" style={{ color: "#a8b8d0" }}>
            Pick your current device
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="https://www.ccnshs.com/computer"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(245, 197, 24, 0.12)",
                border: "1px solid rgba(245, 197, 24, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 197, 24, 0.9)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(245, 197, 24, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 197, 24, 0.4)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Monitor
                className="w-14 h-14 transition-transform group-hover:scale-110"
                style={{ color: "#f5c518" }}
                strokeWidth={1.75}
              />
              <div className="flex flex-col gap-1">
                <span className="font-heading font-bold text-2xl text-white">Computer</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "#a8b8d0" }}>
                  Desktop experience
                </span>
              </div>
            </a>

            <a
              href="https://docs.wixstatic.com/ugd/eaa662_b4f0c6ff21b74a49996acd7da714630b.pdf#pdfjs.action=download"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(245, 197, 24, 0.12)",
                border: "1px solid rgba(245, 197, 24, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 197, 24, 0.9)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(245, 197, 24, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 197, 24, 0.4)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Smartphone
                className="w-14 h-14 transition-transform group-hover:scale-110"
                style={{ color: "#f5c518" }}
                strokeWidth={1.75}
              />
              <div className="flex flex-col gap-1">
                <span className="font-heading font-bold text-2xl text-white">Mobile</span>
                <span className="text-xs uppercase tracking-wider" style={{ color: "#a8b8d0" }}>
                  Download PDF
                </span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScihiZine;