import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import emailjs from "@emailjs/browser";
import { shopItems, Product } from "@/data/shopItems";

const FILTERS = ["All", "shirts", "accessories"] as const;

const SECTIONS_BY_GRADE: Record<string, string[]> = {
  "Grade 7": ["Mercury", "Venus", "Earth", "Saturn", "Neptune"],
  "Grade 8": ["Averrhoa", "Hibiscus", "Ixora", "Oryza", "Zea"],
  "Grade 9": ["Argon", "Krypton", "Helium", "Xenon", "Neon"],
  "Grade 10": ["Copernicus", "Galileo", "Einstein", "Newton", "Kepler"],
  "Grade 11": ["Pioneer", "Voyager", "Spitzer", "Cassini", "Apollo"],
  "Grade 12": ["STEM", "ABM"],
};

const EMAILJS_SERVICE_ID = "service_bni5zql";
const EMAILJS_TEMPLATE_ID = "template_e6j3smf";
const EMAILJS_PUBLIC_KEY = "AeJN83U2A_THgdEyt";

const Shop = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [contact, setContact] = useState("");
  const [delivery, setDelivery] = useState<"Pickup at School" | "Delivery">("Pickup at School");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [payment, setPayment] = useState<"GCash" | "Cash on Pickup/Delivery" | "">("");

  const promoItems = useMemo(() => shopItems.filter(p => p.isPromo), []);
  const regularItems = useMemo(() => shopItems.filter(p => !p.isPromo), []);
  const filtered = useMemo(() => {
    if (filter === "All") return regularItems;
    return regularItems.filter(item => item.category === filter);
  }, [filter, regularItems]);

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const total = subtotal;

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
    setDrawerOpen(false);
    setCheckoutOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((c) => c.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeItem = (id: number) => setCart((c) => c.filter((i) => i.id !== id));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);

    const orderItems = cart.map((i) => `${i.name} x${i.qty} = ₱${i.price * i.qty}`).join("\n");
    const templateParams = {
      customer_name: name,
      grade_section: `${grade} - ${section}`,
      contact_number: contact,
      delivery_option: delivery,
      location: delivery === "Delivery" ? `${building}, ${room}` : "Pickup",
      payment_method: payment,
      order_items: orderItems,
      total: `₱${total}`,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setOrderPlaced(true);
      setCart([]);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    setOrderPlaced(false);
    setSendError(false);
    setName(""); setGrade(""); setSection(""); setContact("");
    setDelivery("Pickup at School");
    setPayment("");
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

      <button onClick={() => setDrawerOpen(true)} className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gold text-[#0a1628] shadow-lg flex items-center justify-center">
        <ShoppingCart size={22} />
        {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-[#0a1628] text-gold text-xs w-6 h-6 rounded-full flex items-center justify-center border border-gold font-bold">{itemCount}</span>}
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a1628] border-l border-white/10 z-50 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold">Your Cart</h2><button onClick={() => setDrawerOpen(false)}><X size={22} /></button></div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map(i => (
                <div key={i.id} className="flex gap-3 items-center border-b border-white/10 pb-4">
                  <img src={i.image} alt={i.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1 font-semibold">{i.name}<div className="text-gold">₱{i.price}</div></div>
                  <div className="flex items-center gap-2"><button onClick={() => updateQty(i.id, -1)}><Minus size={14}/></button><span>{i.qty}</span><button onClick={() => updateQty(i.id, 1)}><Plus size={14}/></button></div>
                  <button onClick={() => removeItem(i.id)} className="text-white/60"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <button onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }} disabled={cart.length === 0} className="w-full py-3 bg-gold text-[#0a1628] font-bold rounded-full mt-4">Checkout</button>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-card max-w-2xl w-full p-8 bg-[#0a1628]/95 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{orderPlaced ? "Order Confirmed" : "Checkout"}</h2>
                {orderPlaced ? (
                  <div className="text-center py-10">
                      <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                      <p>Your order has been placed. SSLG will contact you shortly.</p>
                      <button onClick={closeCheckout} className="mt-6 w-full py-2 bg-gold text-[#0a1628] font-bold rounded">Close</button>
                  </div>
                ) : (
                  <form onSubmit={placeOrder} className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm">
                        <h4 className="font-bold mb-2">Order Summary</h4>
                        {cart.map(i => <div key={i.id} className="flex justify-between"><span>{i.name} x{i.qty}</span><span>₱{i.price * i.qty}</span></div>)}
                        <div className="border-t mt-2 pt-2 font-bold flex justify-between"><span>Total</span><span>₱{total}</span></div>
                    </div>
                    <input type="text" placeholder="Full Name" required className="w-full p-2 bg-white/5 rounded border border-white/10" onChange={(e) => setName(e.target.value)} />
                    <input type="tel" placeholder="Contact Number" required className="w-full p-2 bg-white/5 rounded border border-white/10" onChange={(e) => setContact(e.target.value)} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <select required value={grade} onChange={(e) => { setGrade(e.target.value); setSection(""); }} className="w-full p-2 bg-white/5 rounded border border-white/10">
                            <option value="">Select Grade</option>
                            {Object.keys(SECTIONS_BY_GRADE).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                        <select required disabled={!grade} value={section} onChange={(e) => setSection(e.target.value)} className="w-full p-2 bg-white/5 rounded border border-white/10 disabled:opacity-50">
                            <option value="">Select Section</option>
                            {grade && SECTIONS_BY_GRADE[grade].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <select value={delivery} onChange={(e) => setDelivery(e.target.value as any)} className="w-full p-2 bg-white/5 rounded border border-white/10">
                        <option>Pickup at School</option>
                        <option>Delivery</option>
                    </select>

                    {delivery === "Delivery" && (
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Building (e.g. SB2)" required className="w-full p-2 bg-white/5 rounded border border-white/10" onChange={(e) => setBuilding(e.target.value)} />
                            <input type="text" placeholder="Room (e.g. 201)" required className="w-full p-2 bg-white/5 rounded border border-white/10" onChange={(e) => setRoom(e.target.value)} />
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="block font-semibold">Payment Method</label>
                        <div className="grid grid-cols-2 gap-4">
                            {["GCash", "Cash on Pickup/Delivery"].map(m => (
                                <button 
                                  key={m} 
                                  type="button" 
                                  onClick={() => setPayment(m as any)} 
                                  className={`py-3 px-2 rounded border transition-colors ${payment === m ? "bg-gold text-[#0a1628] border-gold" : "border-white/20 hover:border-white/40 bg-white/5"}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        
                        {payment === "GCash" && (
                            <div className="p-4 bg-[#0e1f38] border border-white/10 rounded-lg text-center animate-in fade-in duration-300">
                                <p className="text-white mb-3 font-medium">Scan to Pay via GCash</p>
                                <img src="/sslg-items/gcash.jpg" alt="GCash QR" className="mx-auto w-32 h-32 rounded border-2 border-gold" />
                                <p className="text-white/80 text-xs mt-3">Please upload your payment screenshot to the SSLG Facebook page.</p>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={!payment || sending || cart.length === 0} className="w-full py-3 bg-gold text-[#0a1628] font-bold rounded">
                        {sending ? "Sending..." : "Place Order"}
                    </button>
                    <button type="button" onClick={closeCheckout} className="w-full py-2 border border-white/20 rounded">Cancel</button>
                  </form>
                )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Shop;
