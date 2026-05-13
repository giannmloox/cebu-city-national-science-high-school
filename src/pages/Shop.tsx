import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";

type Category = "T-shirt" | "Accesories";

interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
}

const PRODUCTS: Product[] = [
  { id: "p1", name: "TShirt 1", price: 350, category: "T-shirt" },
  { id: "p2", name: "TShirt 2", price: 250, category: "T-shirt" },
  { id: "p3", name: "Keychain", price: 120, category: "Accesories" },
  { id: "p4", name: "SciHi Lanyard", price: 120, category: "Accesories" },
  { id: "p5", name: "SciHi Tote Bag", price: 270, category: "Accesories" },
  { id: "p6", name: "SciHi Pin Set", price: 70, category: "Accesories" },
];

const FILTERS = ["All", "T-shirt", "Accesories"] as const;

const SECTIONS_BY_GRADE: Record<string, string[]> = {
  "Grade 7": ["Mercury", "Venus", "Earth", "Saturn", "Neptune"],
  "Grade 8": ["Averrhoa", "Hibiscus", "Ixora", "Oryza", "Zea"],
  "Grade 9": ["Argon", "Krypton", "Helium", "Xenon", "Neon"],
  "Grade 10": ["Copernicus", "Galileo", "Einstein", "Newton", "Kepler"],
  "Grade 11": ["Pioneer", "Voyager", "Spitzer", "Cassini", "Apollo"],
  "Grade 12": ["STEM", "ABM"],
};

const productImg = (name: string) =>
  `https://placehold.co/400x400/1a3a6b/f5c518?text=${encodeURIComponent(name)}`;

interface CartItem extends Product {
  qty: number;
}

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // checkout form
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [contact, setContact] = useState("");
  const [delivery, setDelivery] = useState<"Pickup at School" | "Delivery">("Pickup at School");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [payment, setPayment] = useState<"GCash" | "Cash on Pickup/Delivery" | "">("");

  const filtered = useMemo(
    () => (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const deliveryFee = delivery === "Delivery" ? 25 : 0;
  const total = subtotal + deliveryFee;

  const addToCart = (p: Product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setCart([]);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setOrderPlaced(false);
    setName(""); setGrade(""); setSection(""); setContact(""); setBuilding(""); setRoom(""); setPayment("");
    setDelivery("Pickup at School");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white">
            SSLG <span className="text-gradient-gold">Shop</span>
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto">
            Official school products by the Supreme Student Government
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === f
                  ? "bg-gold text-[#0a1628] border-gold"
                  : "border-white/20 text-white/80 hover:border-gold hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="glass-card overflow-hidden flex flex-col"
            >
              <img
                src={productImg(p.name)}
                alt={p.name}
                className="w-full aspect-square object-cover"
              />
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-[#1a3a6b] text-white/80 whitespace-nowrap">
                    {p.category}
                  </span>
                </div>
                <p className="text-gold text-2xl font-heading font-bold">
                  ₱{p.price}
                </p>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-auto w-full py-2.5 rounded-full bg-gold text-[#0a1628] font-semibold hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating cart button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gold text-[#0a1628] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open cart"
      >
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#0a1628] text-gold text-xs w-6 h-6 rounded-full flex items-center justify-center border border-gold font-bold">
            {itemCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a1628] border-l border-white/10 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-white font-heading font-bold text-xl">Your Cart</h2>
                <button onClick={() => setDrawerOpen(false)} className="text-white/70 hover:text-gold">
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 && <p className="text-white/60 text-center mt-10">Your cart is empty.</p>}
                {cart.map((i) => (
                  <div key={i.id} className="glass-card p-4 flex gap-3 items-center">
                    <img src={productImg(i.name)} alt={i.name} className="w-16 h-16 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{i.name}</p>
                      <p className="text-gold font-bold">₱{i.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(i.id, -1)} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-gold hover:text-gold flex items-center justify-center"><Minus size={14} /></button>
                        <span className="text-white w-6 text-center">{i.qty}</span>
                        <button onClick={() => updateQty(i.id, 1)} className="w-7 h-7 rounded-full border border-white/20 text-white hover:border-gold hover:text-gold flex items-center justify-center"><Plus size={14} /></button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(i.id)} className="text-white/60 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 p-5 space-y-3">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span className="text-gold font-bold text-xl">₱{subtotal}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }}
                  className="w-full py-3 rounded-full bg-gold text-[#0a1628] font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 flex items-end md:items-center justify-center md:p-4"
            onClick={closeCheckout}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full md:my-8 p-5 md:p-8 bg-[#0a1628]/95 max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl mx-0 md:mx-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                  {orderPlaced ? "Order Confirmed" : "Checkout"}
                </h2>
                <button onClick={closeCheckout} className="text-white/70 hover:text-gold"><X size={22} /></button>
              </div>

              {orderPlaced ? (
                <div className="text-center py-10">
                  <p className="text-white text-lg">
                    Your order has been placed! The <span className="text-gold font-semibold">SSLG</span> will contact you shortly.
                  </p>
                  <button onClick={closeCheckout} className="mt-6 px-6 py-2.5 rounded-full bg-gold text-[#0a1628] font-semibold">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={placeOrder} className="space-y-5">
                  {/* Order summary */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-semibold mb-2">Order Summary</h3>
                    <ul className="space-y-1 text-sm">
                      {cart.length === 0 && <li className="text-white/60">No items.</li>}
                      {cart.map((i) => (
                        <li key={i.id} className="flex justify-between text-white/80">
                          <span>{i.name} × {i.qty}</span>
                          <span>₱{i.price * i.qty}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-3 pt-3 border-t border-white/10 text-white font-bold">
                      <span className="text-white/80 font-medium">Subtotal</span>
                      <span className="text-white">₱{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-white/80 text-sm mt-1">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee > 0 ? `₱${deliveryFee}` : "Free"}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-white/10 font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-gold">₱{total}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Full Name" value={name} onChange={setName} required />
                    <Field label="Contact Number" value={contact} onChange={setContact} required type="tel" />
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Grade Level *</label>
                      <select
                        required
                        value={grade}
                        onChange={(e) => { setGrade(e.target.value); setSection(""); }}
                        style={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.08)" }}
                        className="w-full px-3 py-2 rounded-md border border-white/15 focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                      >
                        <option value="" style={{ color: "#0a1628", backgroundColor: "#ffffff" }}>Select grade...</option>
                        {Object.keys(SECTIONS_BY_GRADE).map((g) => (
                          <option key={g} value={g} style={{ color: "#0a1628", backgroundColor: "#ffffff" }}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Section *</label>
                      <select
                        required
                        disabled={!grade}
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        style={{ color: "#ffffff", backgroundColor: "rgba(255,255,255,0.08)" }}
                        className="w-full px-3 py-2 rounded-md border border-white/15 focus:border-gold focus:ring-1 focus:ring-gold outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="" style={{ color: "#0a1628", backgroundColor: "#ffffff" }}>Select section...</option>
                        {grade && SECTIONS_BY_GRADE[grade].map((s) => (
                          <option key={s} value={s} style={{ color: "#0a1628", backgroundColor: "#ffffff" }}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Delivery Option</label>
                      <select
                        value={delivery}
                        onChange={(e) => setDelivery(e.target.value as typeof delivery)}
                        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/15 text-white focus:border-gold outline-none"
                      >
                        <option className="text-black">Pickup at School</option>
                        <option className="text-black">Delivery</option>
                      </select>
                    </div>
                  </div>

                  {delivery === "Delivery" && (
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Building" value={building} onChange={setBuilding} required placeholder="e.g. Main Building" />
                        <Field label="Room Number" value={room} onChange={setRoom} required placeholder="e.g. Room 201" />
                      </div>
                      <p className="text-xs text-white/60">
                        Delivery is within school premises only — ₱25 fee applies
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["GCash", "Cash on Pickup/Delivery"] as const).map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setPayment(m)}
                          className={`px-4 py-3 rounded-md border transition-all ${
                            payment === m
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-white/15 text-white/80 hover:border-gold/60"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {payment === "GCash" && (
                    <div className="text-center bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-semibold mb-2">Scan to Pay via GCash</p>
                      <img src="https://placehold.co/200x200/ffffff/1a3a6b?text=GCash+QR" alt="GCash QR" className="mx-auto rounded" />
                      <p className="text-gold text-3xl font-heading font-bold mt-3">₱{total}</p>
                      <p className="text-white/80 text-sm mt-2">
                        Send exactly <span className="text-gold font-semibold">₱{total}</span> — screenshot your payment as proof
                      </p>
                      <p className="text-white/70 text-sm mt-1">GCash name: <span className="text-white font-semibold">SSLG CCNSHS</span></p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!payment || cart.length === 0}
                    className="w-full py-3 rounded-full bg-gold text-[#0a1628] font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    Place Order
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Field = ({
  label, value, onChange, required, type = "text", placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string;
}) => (
  <div>
    <label className="block text-sm text-white/80 mb-1">{label}{required && " *"}</label>
    <input
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-gold outline-none"
    />
  </div>
);

export default Shop;
