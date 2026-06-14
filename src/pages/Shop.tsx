import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { shopItems, ShopItem } from "../data/shopData";

const FILTERS = ["All", "shirts", "accessories"] as const;

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [promoSelection, setPromoSelection] = useState<string[]>([]);

  const promoItems = useMemo(() => shopItems.filter(item => item.category === "promo" || item.category === "bundle"), []);
  const regularItems = useMemo(() => shopItems.filter(item => item.category !== "promo" && item.category !== "bundle"), []);

  const filteredItems = useMemo(
    () => (filter === "All" ? regularItems : regularItems.filter((p) => p.category === filter)),
    [filter, regularItems]
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (p: any, details?: string) => {
    setCart((c) => {
      const existingItemIndex = c.findIndex(
        (i) => i.id === p.id && i.details === details
      );
      if (existingItemIndex > -1) {
        const newCart = [...c];
        newCart[existingItemIndex].qty = (newCart[existingItemIndex].qty || 1) + 1;
        return newCart;
      }
      return [...c, { ...p, qty: 1, details }];
    });
    setDrawerOpen(true);
  };

  const handlePromoConfig = (item: any) => {
    if (item.id === "b1") {
      setShowConfig(true);
    } else {
      addToCart(item);
    }
  };

  const confirmPromo = () => {
    if (promoSelection.length === 2) {
      addToCart(promoItems.find(p => p.id === "b1"), `Shirt 1: ${promoSelection[0]}, Shirt 2: ${promoSelection[1]}`);
      setPromoSelection([]);
      setShowConfig(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white">SSLG Shop</h1>
        </header>

        {showConfig && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="glass-card p-8 max-w-md w-full text-white">
              <h2 className="text-2xl font-bold mb-4">Configure Mix & Match Promo</h2>
              <p className="mb-4">Select 2 shirts:</p>
              <div className="grid gap-2 mb-6">
                {[
                  "Stranger Things Shirt", "Day in a Life Shirt", "SciHi Band Shirt",
                  "Beige 1970 Shirt", "Good Morning SciHi Shirt", "Y2K Shirt"
                ].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setPromoSelection(s => s.includes(opt) ? s.filter(i => i !== opt) : s.length < 2 ? [...s, opt] : s)}
                    className={`p-2 rounded border ${promoSelection.includes(opt) ? "bg-gold text-[#0a1628]" : "border-white/20"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowConfig(false)} className="flex-1 py-2 border border-white/20 rounded">Cancel</button>
                <button onClick={confirmPromo} disabled={promoSelection.length < 2} className="flex-1 py-2 bg-gold text-[#0a1628] rounded font-bold disabled:opacity-50">Add to Cart</button>
              </div>
            </div>
          </div>
        )}

        {promoItems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Promos & Bundles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoItems.map((p) => (
                <div key={p.id} className="glass-card p-5 flex flex-col items-center text-center">
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-4 rounded-lg" />
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-gold text-xl font-bold my-2">P{p.price}</p>
                  <p className="text-white/70 text-sm mb-4">{p.description}</p>
                  <button onClick={() => handlePromoConfig(p)} className="mt-auto w-full py-2.5 bg-gold text-[#0a1628] font-semibold rounded-full">Add to Cart</button>
                </div>
              ))}
            </div>
          </section>
        )}
...
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
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover mb-4 rounded-lg" />
                <h3 className="text-white font-bold text-lg">{p.name}</h3>
                <p className="text-gold text-xl font-bold my-2">P{p.price}</p>
                <button onClick={() => addToCart(p)} className="mt-auto w-full py-2.5 bg-gold text-[#0a1628] font-semibold rounded-full">Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {drawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end" onClick={() => setDrawerOpen(false)}>
          <div className="w-full max-w-sm bg-[#0a1628] p-6 text-white border-l border-white/10" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} {item.details && `(${item.details})`} x {item.qty}</span>
                    <span>P{item.price * item.qty}</span>
                  </div>
                ))}
                <div className="border-t pt-4 font-bold">
                  Total: P{cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0)}
                </div>
              </div>
            )}
            <button onClick={() => setDrawerOpen(false)} className="mt-6 w-full py-2 bg-gold text-[#0a1628] font-bold rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Shop;
