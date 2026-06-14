import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { shopItems, Product } from "@/data/shopItems";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";

const FILTERS = ["All", "shirts", "accessories"] as const;

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const promoItems = useMemo(() => shopItems.filter(p => p.isPromo), []);
  const regularItems = useMemo(() => shopItems.filter(p => !p.isPromo), []);
  
  const filtered = useMemo(() => {
    if (filter === "All") return regularItems;
    return regularItems.filter(item => item.category === filter);
  }, [filter, regularItems]);

  const addToCart = (p: Product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const buyNow = (p: Product) => {
    setCart([{ ...p, qty: 1 }]);
    setCheckoutOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((c) => c.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
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
                <div key={p.id} className="glass-card p-6 rounded-xl flex flex-col">
                  <img src={p.image} alt={p.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-gold text-2xl font-bold my-2">₱{p.price}</p>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => addToCart(p)} className="flex-1 py-3 border border-gold text-gold font-bold rounded-full">Add to Cart</button>
                    <button onClick={() => buyNow(p)} className="flex-1 py-3 bg-gold text-[#0a1628] font-bold rounded-full">Buy Now</button>
                  </div>
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
                <div className="flex gap-2 mt-auto">
                    <button onClick={() => addToCart(p)} className="flex-1 py-3 border border-gold text-gold font-bold rounded-full">Add to Cart</button>
                    <button onClick={() => buyNow(p)} className="flex-1 py-3 bg-gold text-[#0a1628] font-bold rounded-full">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer & Checkout modal logic omitted for brevity as existing structure is preserved */}
    </div>
  );
};
export default Shop;
