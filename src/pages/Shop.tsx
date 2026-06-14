import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { shopItems, Product } from "../data/shopData";

const FILTERS = ["All", "T-shirt", "Accesories", "Bundle"] as const;

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Product | null>(null);

  const promoItems = useMemo(() => shopItems.filter(p => p.isPromo), []);
  const filtered = useMemo(() => {
    if (filter === "All") return shopItems.filter(p => !p.isPromo);
    if (filter === "Bundle") return shopItems.filter(p => p.category === "Bundle");
    return shopItems.filter(p => p.category === filter && !p.isPromo);
  }, [filter]);

  const addToCart = (p: Product, details?: string) => {
    setCart((c) => {
      const found = c.find((i: any) => i.id === p.id && i.details === details);
      if (found) return c.map((i: any) => (i.id === p.id && i.details === details ? { ...i, qty: (i.qty || 1) + 1 } : i));
      return [...c, { ...p, qty: 1, details }];
    });
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">SSLG Shop</h1>

        {promoItems.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">Promos & Bundles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promoItems.map((p) => (
                <div key={p.id} className="glass-card p-6 rounded-xl flex flex-col items-center">
                  <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-gold text-2xl font-bold my-2">₱{p.price}</p>
                  <button 
                    onClick={() => { setSelectedPromo(p); setShowConfig(true); }}
                    className="w-full py-3 bg-gold text-[#0a1628] font-bold rounded-full mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex justify-center gap-4 mb-12">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2 rounded-full border ${filter === f ? "bg-gold text-[#0a1628]" : "border-white/20"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <div key={p.id} className="glass-card p-6 rounded-xl flex flex-col">
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-gold text-2xl font-bold my-2">₱{p.price}</p>
                <button onClick={() => addToCart(p)} className="w-full py-3 bg-gold text-[#0a1628] font-bold rounded-full mt-auto">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showConfig && selectedPromo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-8 rounded-xl max-w-md w-full text-white">
            <h2 className="text-2xl font-bold mb-4">{selectedPromo.name}</h2>
            {selectedPromo.options ? (
              <div className="space-y-4 mb-6">
                <p>Configuration required (not implemented in this mock).</p>
                <button onClick={() => { addToCart(selectedPromo, "Configured"); setShowConfig(false); }} className="w-full py-2 bg-gold text-[#0a1628] font-bold rounded">Confirm</button>
              </div>
            ) : (
              <button onClick={() => { addToCart(selectedPromo); setShowConfig(false); }} className="w-full py-2 bg-gold text-[#0a1628] font-bold rounded">Add to Cart</button>
            )}
            <button onClick={() => setShowConfig(false)} className="w-full py-2 mt-2 border border-white/20 rounded">Cancel</button>
          </div>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-sm bg-[#0a1628] p-6 text-white border-l border-white/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.map((i, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-white/10">
                <span>{i.name} {i.qty > 1 && `x${i.qty}`}</span>
                <span>₱{i.price * i.qty}</span>
              </div>
            ))}
            <div className="mt-6 font-bold text-xl">Total: ₱{cart.reduce((s, i) => s + i.price * i.qty, 0)}</div>
            <button onClick={() => setDrawerOpen(false)} className="mt-6 w-full py-2 bg-gold text-[#0a1628] font-bold rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Shop;
