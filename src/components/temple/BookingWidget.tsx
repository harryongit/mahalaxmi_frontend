"use client";

import { useState } from "react";
import { HiCheck, HiOutlinePlus, HiMinus, HiPlus } from "react-icons/hi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { SectionEyebrow } from "./effects";

// Data Definitions
const sevas = [
  { id: "s1", title: "Kumkumarchan", price: 551 },
  { id: "s2", title: "Padya Puja", price: 551 },
  { id: "s3", title: "Panchamrut Abhishek", price: 751 },
  { id: "s4", title: "Kulachar", price: 5001 },
  { id: "s5", title: "Sahastra Namavali Puja", price: 7001 },
  { id: "s6", title: "Shreesukta Havan", price: 11001 },
  { id: "s7", title: "Navachandi Havan & Path", price: 25001 },
];

const generateDates = () => {
  const d = [];
  const occasions: Record<string, string> = {
    "22 Sep": "Ghatasthapana",
    "26 Sep": "Lalita Panchami",
    "29 Sep": "Ashtami",
    "30 Sep": "Khandi Navami",
    "2 Oct": "Dasara", 
  };
  for (let i = 22; i <= 30; i++) d.push(`${i} Sep`);
  for (let i = 1; i <= 7; i++) d.push(`${i} Oct`);
  return d.map(date => ({ date, occasion: occasions[date] || null }));
};
const allDates = generateDates();

const addOnsData = [
  { id: "a1", title: "Regular Otee", price: 351 },
  { id: "a2", title: "Saree Otee", price: 1201 },
  { id: "a3", title: "Puranpoli Naivedya", price: 300 },
  { id: "a4", title: "Puranpoli Meal", price: 300, note: "per person", hasQuantity: true },
  { id: "a5", title: "Brahman, Suwasini & Kumarika Bhojan", price: 1201 },
  { id: "a6", title: "Annadan", custom: true, min: 10 },
  { id: "a7", title: "Gou Seva", custom: true, min: 1 },
  { id: "a8", title: "Prasad Home Delivery (Courier)", price: 100, requiresAddress: true },
];

const stepVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: 20 },
  visible: { 
    opacity: 1, 
    height: "auto", 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: {
    opacity: 0,
    height: 0,
    y: 10,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export function BookingWidget() {
  const [selectedSevas, setSelectedSevas] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [addOns, setAddOns] = useState<Record<string, { total: number, qty?: number }>>({});
  
  // Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");

  const toggleAddOn = (id: string, basePrice: number, isCustom: boolean = false, hasQuantity: boolean = false) => {
    setAddOns(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { total: isCustom ? basePrice : basePrice, qty: hasQuantity ? 1 : undefined };
      }
      return next;
    });
  };

  const updateCustomAddOn = (id: string, amount: number) => {
    setAddOns(prev => ({ ...prev, [id]: { ...prev[id], total: amount } }));
  };

  const updateQuantity = (id: string, basePrice: number, delta: number) => {
    setAddOns(prev => {
      const current = prev[id];
      if (!current || current.qty === undefined) return prev;
      const newQty = Math.max(1, current.qty + delta);
      return { ...prev, [id]: { total: newQty * basePrice, qty: newQty } };
    });
  };

  const toggleSeva = (id: string) => {
    setSelectedSevas(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectedSevaObjs = sevas.filter(s => selectedSevas.includes(s.id));
  const sevasTotal = selectedSevaObjs.reduce((sum, s) => sum + s.price, 0);
  const totalAmount = sevasTotal + Object.values(addOns).reduce((a, b) => a + b.total, 0);

  const isDeliverySelected = !!addOns["a8"];
  const isValidMobile = mobile.replace(/\D/g, '').length >= 10;
  
  let btnText = "Proceed to Pay";
  if (selectedSevas.length === 0) btnText = "Select a Seva";
  else if (!selectedDate) btnText = "Select a Date";
  else if (!name.trim()) btnText = "Enter Devotee Name";
  else if (!isValidMobile) btnText = "Enter Valid Mobile Number";
  else if (isDeliverySelected && !address.trim()) btnText = "Enter Delivery Address";

  const isReadyToPay = btnText === "Proceed to Pay";

  return (
    <section id="book-puja" className="relative py-16 md:py-24 bg-[oklch(0.13_0.02_60)] text-white overflow-hidden border-t border-white/5">
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <SectionEyebrow>Fast Booking</SectionEyebrow>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] mt-4 leading-[1.05]">
            Book Your <span className="text-gradient-gold">Seva</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Steps */}
          <div className="space-y-8 md:space-y-12 min-w-0">
            
            {/* Step 1: Select Seva */}
            <div>
              <h3 className="text-lg md:text-xl font-serif text-[var(--gold)] mb-4 md:mb-5 flex items-center gap-3">
                <span className={`grid place-items-center size-7 md:size-8 rounded-full text-xs md:text-sm transition-colors ${selectedSevas.length > 0 ? "bg-[var(--gold)] text-black" : "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)]"}`}>
                  {selectedSevas.length > 0 ? <HiCheck /> : "1"}
                </span>
                Select Seva
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {sevas.map(s => {
                  const active = selectedSevas.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSeva(s.id)}
                      className={`text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                        active 
                          ? "bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] border-[var(--gold)] shadow-[0_0_15px_rgba(212,160,60,0.15)]" 
                          : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="font-serif text-lg md:text-xl">{s.title}</div>
                        <div className={`shrink-0 size-5 md:size-6 rounded-full border grid place-items-center transition-colors ${active ? "bg-[var(--gold)] border-[var(--gold)] text-black" : "border-white/30"}`}>
                          {active && <HiCheck className="size-3 md:size-4" />}
                        </div>
                      </div>
                      <div className="text-[var(--saffron)] mt-1.5 md:mt-2 font-medium text-sm md:text-base">₹{s.price}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Select Date */}
            <AnimatePresence>
              {selectedSevas.length > 0 && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="pt-2">
                    <h3 className="text-lg md:text-xl font-serif text-[var(--gold)] mb-4 md:mb-5 flex items-center gap-3">
                      <span className={`grid place-items-center size-7 md:size-8 rounded-full text-xs md:text-sm transition-colors ${selectedDate ? "bg-[var(--gold)] text-black" : "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)]"}`}>
                        {selectedDate ? <HiCheck /> : "2"}
                      </span>
                      Select Puja Date
                    </h3>
                    <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide">
                      {allDates.map(d => {
                        const active = selectedDate === d.date;
                        return (
                          <button
                            key={d.date}
                            onClick={() => setSelectedDate(d.date)}
                            className={`snap-start shrink-0 p-3 md:p-4 rounded-xl border transition-all duration-300 min-w-[110px] md:min-w-[120px] flex flex-col items-center justify-center ${
                              active 
                                ? "bg-[color-mix(in_oklab,var(--gold)_15%,transparent)] border-[var(--gold)] shadow-[0_0_15px_rgba(212,160,60,0.15)]" 
                                : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <div className="text-base md:text-lg font-medium whitespace-nowrap">{d.date}</div>
                            {d.occasion && (
                              <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-[var(--saffron)] mt-1.5 md:mt-2 text-center max-w-[100px] leading-tight">
                                {d.occasion}
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Add Seva (Add-ons) */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="pt-2">
                    <h3 className="text-lg md:text-xl font-serif text-[var(--gold)] mb-4 md:mb-5 flex items-center gap-3">
                      <span className="grid place-items-center size-7 md:size-8 rounded-full bg-[color-mix(in_oklab,var(--gold)_20%,transparent)] text-xs md:text-sm">4</span>
                      Add-On Seva <span className="text-xs md:text-sm text-white/50 font-sans tracking-normal ml-1 md:ml-2">(Optional)</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      {addOnsData.map(a => {
                        const active = !!addOns[a.id];
                        const currentAddon = addOns[a.id];
                        return (
                          <div
                            key={a.id}
                            className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                              active 
                                ? "bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] border-[var(--gold)] shadow-[0_0_15px_rgba(212,160,60,0.1)]" 
                                : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-3">
                              <div>
                                <div className="font-serif text-base md:text-lg leading-tight mb-1">{a.title}</div>
                                {!a.custom && (
                                  <div className="text-xs md:text-sm text-[var(--saffron)]">
                                    ₹{a.price} {a.note && <span className="text-[10px] md:text-xs opacity-70">({a.note})</span>}
                                  </div>
                                )}
                              </div>
                              <button 
                                onClick={() => toggleAddOn(a.id, a.custom ? (a.min || 10) : (a.price as number), a.custom, a.hasQuantity)}
                                className={`shrink-0 size-7 md:size-8 rounded-full grid place-items-center border transition-colors ${
                                  active ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "border-white/30 hover:bg-white/10 text-white/80"
                                }`}
                              >
                                {active ? <HiCheck className="size-4" /> : <HiOutlinePlus className="size-4" />}
                              </button>
                            </div>
                            
                            <AnimatePresence>
                              {active && a.custom && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  className="border-t border-white/10 overflow-hidden"
                                >
                                  <div className="pt-4">
                                    <label className="text-[10px] md:text-xs text-white/60 mb-2 block">Enter Amount (Min ₹{a.min})</label>
                                    <input 
                                      type="number"
                                      min={a.min}
                                      value={currentAddon.total || ''}
                                      onChange={(e) => updateCustomAddOn(a.id, parseInt(e.target.value) || 0)}
                                      className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 md:py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all"
                                    />
                                  </div>
                                </motion.div>
                              )}

                              {active && a.hasQuantity && currentAddon?.qty && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  className="border-t border-white/10 overflow-hidden"
                                >
                                  <div className="pt-4 flex items-center justify-between">
                                    <span className="text-xs md:text-sm text-white/70">Number of persons:</span>
                                    <div className="flex items-center gap-2 md:gap-3 bg-black/40 border border-white/20 rounded-lg p-1">
                                      <button 
                                        onClick={() => updateQuantity(a.id, a.price as number, -1)}
                                        className="size-6 md:size-7 grid place-items-center hover:bg-white/10 rounded-md transition-colors"
                                      >
                                        <HiMinus className="size-3" />
                                      </button>
                                      <span className="w-5 md:w-6 text-center text-xs md:text-sm font-medium">{currentAddon.qty}</span>
                                      <button 
                                        onClick={() => updateQuantity(a.id, a.price as number, 1)}
                                        className="size-6 md:size-7 grid place-items-center hover:bg-white/10 rounded-md transition-colors"
                                      >
                                        <HiPlus className="size-3" />
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column - Step 3 & Checkout Sticky */}
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Step 3: Devotee Details */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="glass-dark rounded-3xl p-5 md:p-8 border border-white/10 shadow-xl"
                >
                  <h3 className="text-lg md:text-xl font-serif text-[var(--gold)] mb-5 md:mb-6 flex items-center gap-3">
                    <span className={`grid place-items-center size-7 md:size-8 rounded-full text-xs md:text-sm transition-colors ${name && isValidMobile ? "bg-[var(--gold)] text-black" : "bg-[color-mix(in_oklab,var(--gold)_20%,transparent)]"}`}>
                      {name && isValidMobile ? <HiCheck /> : "3"}
                    </span>
                    Devotee Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] md:text-xs text-white/60 mb-1.5 block">Devotee Name *</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all" 
                        placeholder="Full Name" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs text-white/60 mb-1.5 block">Mobile Number *</label>
                      <input 
                        type="tel" 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none transition-all ${
                          mobile.length > 0 && !isValidMobile 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50' 
                            : 'border-white/10 focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]'
                        }`} 
                        placeholder="+91" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs text-white/60 mb-1.5 block">Email</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all" 
                        placeholder="Email Address" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] md:text-xs text-white/60 mb-1.5 block">Gotra (Optional)</label>
                      <input 
                        type="text"
                        value={gotra}
                        onChange={(e) => setGotra(e.target.value)} 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all" 
                        placeholder="Gotra" 
                      />
                    </div>
                    
                    <AnimatePresence>
                      {isDeliverySelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <label className="text-[10px] md:text-xs text-[var(--saffron)] mb-1.5 block font-medium">Delivery Address *</label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all resize-none"
                            placeholder="Complete postal address for Prasad delivery"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Order Summary */}
            <div className="glass-dark rounded-3xl p-5 md:p-8 border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--gold)_10%,transparent)] to-transparent pointer-events-none" />
              
              <h3 className="font-serif text-lg md:text-xl mb-4 md:mb-5 border-b border-white/10 pb-3 md:pb-4 relative">Booking Summary</h3>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-xs md:text-sm relative">
                {selectedSevas.length === 0 && !Object.keys(addOns).length && (
                  <div className="text-white/50 text-center py-4 md:py-6">Please select a Seva to begin.</div>
                )}
                
                <AnimatePresence initial={false}>
                  {selectedSevaObjs.map(sevaObj => (
                    <motion.div 
                      key={sevaObj.id}
                      initial={{ opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, x: 10, overflow: 'hidden' }}
                      className="flex justify-between items-start gap-4"
                    >
                      <div>
                        <div className="text-white/90 font-medium">{sevaObj.title}</div>
                        {selectedDate && <div className="text-[10px] md:text-xs text-[var(--saffron)] mt-1 tracking-wide">{selectedDate}</div>}
                      </div>
                      <div className="font-medium whitespace-nowrap">₹{sevaObj.price}</div>
                    </motion.div>
                  ))}
                  
                  {Object.entries(addOns).map(([id, addonState]) => {
                    const addon = addOnsData.find(a => a.id === id);
                    if (!addon) return null;
                    return (
                      <motion.div 
                        key={id}
                        initial={{ opacity: 0, x: -10, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, x: 10, overflow: 'hidden' }}
                        className="flex justify-between items-start gap-4"
                      >
                        <div className="text-white/70 pt-1">
                          {addon.title} {addonState.qty && addonState.qty > 1 && <span className="text-[10px] md:text-xs opacity-70 ml-1">x{addonState.qty}</span>}
                        </div>
                        <div className="font-medium text-white/90 whitespace-nowrap pt-1">₹{addonState.total}</div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-4 md:pt-5 mb-5 md:mb-6 relative">
                <div className="font-serif text-base md:text-lg opacity-80">Total</div>
                <motion.div 
                  key={totalAmount}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-serif text-2xl md:text-3xl text-[var(--gold)]"
                >
                  ₹{totalAmount}
                </motion.div>
              </div>

              <button 
                disabled={!isReadyToPay}
                className={`w-full justify-center !py-3 md:!py-3.5 !rounded-xl text-sm md:!text-base transition-all ${
                  isReadyToPay 
                    ? "btn-gold hover:scale-[1.02]" 
                    : "bg-white/5 text-white/40 border border-white/10 cursor-not-allowed"
                }`}
              >
                {btnText}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
