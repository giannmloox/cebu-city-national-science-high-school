import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { shopItems, ShopItem } from "../data/shopData";

const FILTERS = ["All", "shirts", "accessories"] as const;

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const promoItems = useMemo(() => shopItems.filter(item => item.category === "promo"), []);
  const regularItems = useMemo(() => shopItems.filter(item => item.category !== "promo"), []);

  const filteredItems = useMemo(
    () => (filter === "All" ? regularItems : regularItems.filter((p) => p.category === filter)),
    [filter, regularItems]
  );

  const addToCart = (p: ShopItem) => {
    setCart((c) => {
      const found = c.find((i: any) => i.id === p.id);
      if (found) return c.map((i: any) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white">SSLG Shop</h1>
        </header>

        {promoItems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Promos & Bundles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoItems.map((p) => (
                <div key={p.id} className="glass-card p-5 flex flex-col">
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-4 rounded" />
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-gold text-xl font-bold my-2">P{p.price}</p>
                  <p className="text-white/70 text-sm mb-4">{p.description}</p>
                  <p className="text-white/50 text-xs mt-auto italic">After checkout, send your selected items via message or order notes.</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium border ${filter === f ? "bg-gold text-[#0a1628] border-gold" : "border-white/20 text-white hover:border-gold"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((p) => (
              <div key={p.id} className="glass-card overflow-hidden flex flex-col p-5">
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-4" />
                <h3 className="text-white font-bold text-lg">{p.name}</h3>
                <p className="text-gold text-xl font-bold my-2">P{p.price}</p>
                <button onClick={() => addToCart(p)} className="mt-auto w-full py-2.5 bg-gold text-[#0a1628] font-semibold rounded-full">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
export default Shop;
