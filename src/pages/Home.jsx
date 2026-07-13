import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, CheckCircle2, Heart, ShoppingBag, ArrowRight, ShieldCheck, 
  MessageSquare, Star, ArrowUpRight, Compass, ShieldAlert, Award
} from "lucide-react";
import SEO from "../components/SEO";
import BeautyQuiz from "../components/BeautyQuiz";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_CONCERNS, MOCK_SERVICES, MOCK_CASE_STUDIES, MOCK_BLOG_POSTS } from "../data/mockData";
import { BUSINESS_CONFIG } from "../config/config";
import { addToCart } from "../utils/db";

export default function Home() {
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [newArrivalsFilter, setNewArrivalsFilter] = useState("all");
  const [glowRoutineFeedback, setGlowRoutineFeedback] = useState("");
  const navigate = useNavigate();

  // Categories list to display
  const visualCategories = MOCK_CATEGORIES.slice(0, 8); // Display first 8 categories

  // Filter Best Sellers
  const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller);

  // Filter New Arrivals based on Tab
  const newArrivals = MOCK_PRODUCTS.filter(p => {
    if (newArrivalsFilter === "all") return p.category !== "wellness" && p.category !== "healthcare" && p.category !== "gift-sets";
    return p.category === newArrivalsFilter;
  }).slice(0, 4);

  // Glow Routine Products
  const glowRoutineProducts = [
    MOCK_PRODUCTS.find(p => p.slug === "dermacare-salicylic-cleanser"),
    MOCK_PRODUCTS.find(p => p.slug === "lunara-hyaluronic-acid-serum"),
    MOCK_PRODUCTS.find(p => p.slug === "lunara-ceramide-moisturizer"),
    MOCK_PRODUCTS.find(p => p.slug === "dermacare-spf50-sunscreen")
  ].filter(Boolean);

  const handleAddGlowRoutine = () => {
    glowRoutineProducts.forEach(prod => {
      addToCart(prod, 1, prod.size);
    });
    setGlowRoutineFeedback("Glow Routine added to Cart! (4 items)");
    setTimeout(() => setGlowRoutineFeedback(""), 3000);
  };

  return (
    <>
      <SEO 
        title="Premium E-commerce Website"
        description="Shop dermatologist-tested skincare, organic haircare, pure wellness vitamins, and book expert consultations online at Lunara Ahmedabad."
        canonicalPath="/"
      />

      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-r from-brand-blush via-brand-cream to-brand-peach/30 py-20 lg:py-28 overflow-hidden font-sans">
        
        {/* Soft floating background shapes */}
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-pink/15 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-brand-lavender/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 text-brand-rose text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to Pure Harmony
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-textDark leading-tight">
              Beauty That Feels Good.<br />
              <span className="text-brand-pink">Wellness That Works.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-textMuted max-w-lg leading-relaxed">
              Discover thoughtfully selected healthcare, skincare, haircare, and beauty essentials designed for your everyday wellbeing. Clinically tested, botanical formulas, and professional support.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-brand-pink hover:bg-brand-rose text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.02]"
              >
                Shop Best Sellers
              </Link>
              <Link 
                to="/booking" 
                className="bg-white hover:bg-brand-blush/40 text-brand-rose border border-brand-pink/35 text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-[1.02]"
              >
                Book Beauty Consultation
              </Link>
            </div>

            {/* Trust points */}
            <div className="border-t border-brand-borderLight pt-6 grid grid-cols-2 gap-4">
              {[
                "Dermatologically Tested",
                "Secure Checkout Demo",
                "WhatsApp Assistance",
                "Ahmedabad Clinics HQ"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-brand-textDark font-medium">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-green" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Editorial Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop" 
                alt="Lunara Skincare Showcase" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay card */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-brand-borderLight max-w-xs hidden sm:block">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center text-brand-rose">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-textDark leading-none">100% Organic Extracts</p>
                  <p className="text-[10px] text-brand-textMuted mt-1">Made with wellness ingredients</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Shop by Category</h2>
            <p className="text-xs text-brand-textMuted max-w-md mx-auto">Explore our range of premium selections crafted for skin, hair, and body harmony.</p>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visualCategories.map((cat, idx) => {
              // Alternate sizes using tailwind spans
              const isLarge = idx === 0 || idx === 3;
              return (
                <div 
                  key={cat.id} 
                  className={`group relative overflow-hidden rounded-3xl aspect-square sm:aspect-auto sm:h-72 border border-brand-borderLight shadow-sm hover:shadow-md transition-shadow ${
                    isLarge ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/80 via-brand-textDark/20 to-transparent flex flex-col justify-end p-6" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <h3 className="font-serif font-bold text-xl">{cat.name}</h3>
                    <p className="text-[11px] text-brand-blush/80 line-clamp-1">{cat.subtitle}</p>
                    <Link 
                      to={cat.path} 
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-pink group-hover:text-brand-blush transition-colors pt-2"
                    >
                      Shop Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="py-20 bg-brand-cream/20 border-y border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="font-serif font-bold text-3xl text-brand-textDark">Loved by Our Customers</h2>
              <p className="text-xs text-brand-textMuted">Explore our top-selling formulations voted best by users.</p>
            </div>
            <Link 
              to="/bestsellers" 
              className="text-xs font-bold text-brand-pink hover:text-brand-rose flex items-center gap-1 border-b border-brand-pink/30 pb-0.5 hover:border-brand-rose"
            >
              View All Best Sellers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CONCERN */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Shop by Your Beauty Concern</h2>
            <p className="text-xs text-brand-textMuted max-w-sm mx-auto">Target specific skin or hair needs directly with curated clinical regimes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_CONCERNS.map((concern) => (
              <Link
                key={concern.id}
                to={`/shop?concern=${concern.id}`}
                className="bg-brand-blush/20 hover:bg-brand-blush/60 border border-brand-borderLight hover:border-brand-pink p-6 rounded-2xl text-center space-y-2 group transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-rose mx-auto group-hover:scale-110 transition-transform shadow-xs">
                  <Compass className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-serif font-bold text-sm text-brand-textDark">{concern.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-brand-textMuted block">{concern.type === "skin" ? "Skin Care" : "Hair Care"}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PERSONALIZED BEAUTY QUIZ */}
      <section className="py-20 bg-brand-cream/35 border-y border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Personalized Beauty Quiz</h2>
            <p className="text-xs text-brand-textMuted">Let our virtual skin assistant calculate your skin type and compile the best matching product combo.</p>
          </div>
          <BeautyQuiz />
        </div>
      </section>

      {/* 6. FEATURED COLLECTION: THE GLOW ROUTINE */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest block">Featured Ritual</span>
              <h2 className="font-serif font-bold text-3xl text-brand-textDark">The Glow Routine</h2>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                A simple 4-step routine formulated to work synergistically. Cleanse deeply, treat target areas, hydrate barriers, and protect cellular longevity daily.
              </p>
            </div>
            
            <div className="relative">
              <button 
                onClick={handleAddGlowRoutine}
                className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold py-3.5 px-8 rounded-full shadow-md transition-all hover:scale-[1.02]"
              >
                Shop the Complete Routine (₹2,946)
              </button>
              {glowRoutineFeedback && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-brand-textDark text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
                  ✨ {glowRoutineFeedback}
                </div>
              )}
            </div>
          </div>

          {/* Routine steps list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {glowRoutineProducts.map((p, idx) => {
              const steps = ["1. CLEANSE", "2. TREAT", "3. MOISTURIZE", "4. PROTECT"];
              return (
                <div key={p.id} className="relative bg-brand-cream/15 rounded-3xl p-5 border border-brand-borderLight space-y-4">
                  <span className="absolute top-4 left-4 bg-brand-pink/10 text-brand-rose text-[9px] font-bold px-2.5 py-0.5 rounded-full">{steps[idx]}</span>
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-2xl shadow-sm" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-brand-textMuted uppercase">{p.brand}</p>
                    <h3 className="font-serif font-bold text-sm text-brand-textDark leading-tight">{p.name}</h3>
                    <p className="text-[11px] text-brand-textMuted line-clamp-1">{p.shortBenefit}</p>
                  </div>
                  <div className="pt-2 border-t border-brand-borderLight flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-rose">₹{p.price}</span>
                    <Link to={`/product/${p.slug}`} className="font-bold text-brand-purple hover:underline">View details →</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HEALTHCARE AND WELLNESS SECTION */}
      <section className="py-20 bg-brand-cream/10 border-t border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Everyday Wellness Essentials</h2>
            <p className="text-xs text-brand-textMuted">Support your vitality from inside-out. Formulated with pure nutrients and pediatrician-tested gentle standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Women's Wellness", desc: "Multivitamins, sleep, and bone support formulas.", link: "/shop/wellness" },
              { title: "Personal Hygiene", desc: "Sulfate-free body hygiene wash and herbal sanitizers.", link: "/shop/personal-care" },
              { title: "Mother & Baby Care", desc: "Hypoallergenic Calendula extracts for babies' sensitive skin.", link: "/shop/mother-baby" }
            ].map((w, idx) => (
              <div key={idx} className="bg-white border border-brand-borderLight p-6 rounded-2xl shadow-xs space-y-3">
                <h3 className="font-serif font-bold text-lg text-brand-textDark">{w.title}</h3>
                <p className="text-xs text-brand-textMuted leading-relaxed">{w.desc}</p>
                <Link to={w.link} className="inline-flex items-center gap-1 text-xs text-brand-pink font-bold hover:text-brand-rose">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="bg-brand-blush/35 border border-brand-borderLight p-4 rounded-xl flex items-start gap-2.5 max-w-xl mx-auto">
            <ShieldAlert className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
            <p className="text-[10px] text-brand-textDark leading-normal">
              <strong>Demo Disclaimer:</strong> Lunara Health & Beauty website content is for informational and educational presentation purposes only. We do not provide medical diagnosis or make clinical guarantees. Consult a physician for specific healthcare needs.
            </p>
          </div>
        </div>
      </section>

      {/* 8. BEAUTY SERVICES */}
      <section className="py-20 bg-white border-t border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="font-serif font-bold text-3xl text-brand-textDark">Professional Beauty Guidance</h2>
              <p className="text-xs text-brand-textMuted">Schedule direct sessions with skin specialists and hair trichologists.</p>
            </div>
            <Link to="/services" className="text-xs font-bold text-brand-pink hover:text-brand-rose flex items-center gap-1">
              View All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_SERVICES.map((s) => (
              <div key={s.id} className="bg-brand-cream/15 border border-brand-borderLight rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <img src={s.image} alt={s.title} className="w-full h-40 object-cover" />
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-base text-brand-textDark">{s.title}</h3>
                    <p className="text-[11px] text-brand-textMuted leading-relaxed line-clamp-2">{s.shortDescription}</p>
                    <div className="flex justify-between items-center text-[10px] text-brand-textDark font-semibold pt-1">
                      <span>⏱️ {s.duration}</span>
                      <span className="text-brand-rose">{s.isFree ? "Free Consultation" : `₹${s.price}`}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link 
                    to="/booking" 
                    className="block text-center w-full bg-brand-pink hover:bg-brand-rose text-white text-[11px] font-bold py-2 rounded-lg shadow-xs transition-colors"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. LIMITED OFFERS */}
      <section className="py-20 bg-brand-cream/20 border-y border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="bg-gradient-to-r from-brand-rose via-brand-pink to-brand-purple rounded-3xl p-8 sm:p-12 text-white relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <span className="bg-white/20 text-white text-[9px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-white/20">Combo Bundle Offer</span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl">The Radiant Skin Glow Routine Kit</h2>
              <p className="text-xs text-brand-blush/80 leading-relaxed max-w-lg">
                Get our flagship 3-product kit containing Hyaluronic Serum, Ceramide moisturizer, and SPF 50 Gel, packaged in a premium embossed gift box. Save 24% compared to separate purchases.
              </p>
              <div className="flex gap-4 pt-1 text-[11px] font-semibold text-brand-blush">
                <span>✓ Premium Gifting Box</span>
                <span>✓ Dermatologist Approved</span>
                <span>✓ Local Delivery</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center space-y-4">
              <div className="space-y-1">
                <span className="text-xs text-brand-blush uppercase tracking-widest font-bold">Special Promo Price</span>
                <p className="text-4xl font-bold">₹1,899</p>
                <span className="text-xs line-through text-brand-blush/60">Original: ₹2,499</span>
              </div>
              <button 
                onClick={() => {
                  const kit = MOCK_PRODUCTS.find(p => p.slug === "lunara-skincare-glow-kit");
                  if (kit) {
                    addToCart(kit, 1, kit.size);
                    navigate("/cart");
                  }
                }}
                className="w-full bg-white hover:bg-brand-blush text-brand-rose text-xs font-bold py-3 rounded-xl transition-all shadow-md transform hover:scale-[1.01]"
              >
                Add & Go to Cart
              </button>
              <p className="text-[9px] text-white/70 italic">*Demo seasonal deal. No real countdown pressure applied.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 10. NEW ARRIVALS */}
      <section className="py-20 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">New Arrivals</h2>
            <p className="text-xs text-brand-textMuted max-w-sm mx-auto">Explore our fresh botanical creations newly added to the apothecary.</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center flex-wrap gap-2 border-b border-brand-borderLight pb-4">
            {[
              { id: "all", label: "All Collections" },
              { id: "skincare", label: "Skincare" },
              { id: "haircare", label: "Haircare" },
              { id: "makeup", label: "Makeup" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setNewArrivalsFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  newArrivalsFilter === tab.id
                    ? "bg-brand-pink text-white"
                    : "text-brand-textMuted hover:text-brand-pink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* New Arrivals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedQuickView} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS */}
      <section className="py-20 bg-brand-cream/10 border-t border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Loved by Real People</h2>
            <p className="text-xs text-brand-textMuted">Read what our clients say about our products and consultations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya S.", product: "Ceramide Moisturizer", text: "It completely saved my sensitive skin. I had red dry patches that burned, and after 4 days of this cream, they were gone! Absolutely love it.", rating: 5 },
              { name: "Anjali M.", product: "Rosemary Hair Oil", text: "My hair shedding reduced by more than half after using this oil for a month. The rosemary herbal scent is also very therapeutic.", rating: 5 },
              { name: "Vikram R.", product: "Charcoal Face Wash", text: "Excellent cooling effect. Cleans oil without stripping my face. Will buy again.", rating: 4.5 }
            ].map((rev, idx) => (
              <div key={idx} className="bg-white border border-brand-borderLight p-6 rounded-2xl shadow-xs space-y-3 text-left relative">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? "fill-current" : ""}`} />
                  ))}
                </div>
                <p className="text-xs text-brand-textDark italic">"{rev.text}"</p>
                <div className="flex items-center justify-between pt-2 border-t border-brand-borderLight text-[10px]">
                  <div>
                    <span className="font-bold text-brand-textDark">{rev.name}</span>
                    <span className="text-brand-textMuted block">Purchased: {rev.product}</span>
                  </div>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">✓ Verified Demo Buyer</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. BEAUTY TRANSFORMATION STORIES */}
      <section className="py-20 bg-white border-t border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif font-bold text-3xl text-brand-textDark">Before & After Journeys</h2>
            <p className="text-xs text-brand-textMuted max-w-sm mx-auto">Read case studies detailing customer routines and skin outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {MOCK_CASE_STUDIES.map(caseStudy => (
              <div key={caseStudy.id} className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={caseStudy.image} alt={caseStudy.customerName} className="w-14 h-14 object-cover rounded-full shadow-sm" />
                    <div>
                      <h3 className="font-serif font-bold text-base text-brand-textDark">{caseStudy.title}</h3>
                      <p className="text-[10px] text-brand-textMuted">{caseStudy.customerName}, {caseStudy.age} • {caseStudy.city}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3.5 rounded-xl border border-brand-borderLight">
                    <div>
                      <span className="font-bold text-brand-textDark block">Concern:</span>
                      <span className="text-brand-rose font-medium">{caseStudy.concern}</span>
                    </div>
                    <div>
                      <span className="font-bold text-brand-textDark block">Timeline:</span>
                      <span className="text-brand-purple font-medium">{caseStudy.timeline}</span>
                    </div>
                  </div>
                  <p className="text-xs text-brand-textMuted leading-relaxed">
                    <strong>Routine:</strong> {caseStudy.recommendedRoutine}
                  </p>
                  <p className="text-xs text-brand-textDark font-medium bg-white/40 p-3 rounded-lg border border-brand-borderLight/30">
                    <strong>Outcome:</strong> {caseStudy.outcome}
                  </p>
                </div>
                <div className="pt-6 flex justify-between items-center text-[10px]">
                  <Link 
                    to={`/case-studies/${caseStudy.slug}`} 
                    className="font-bold text-brand-pink hover:text-brand-rose hover:underline"
                  >
                    Read Full Case Study →
                  </Link>
                  <span className="text-brand-textMuted italic">*Fictional demo data</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. BLOG AND EDUCATION */}
      <section className="py-20 bg-brand-cream/10 border-t border-brand-borderLight font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="font-serif font-bold text-3xl text-brand-textDark">Beauty & Wellness Journal</h2>
              <p className="text-xs text-brand-textMuted">Read helpful tips, ingredient breakdowns, and skin diagnostics guides.</p>
            </div>
            <Link to="/blog" className="text-xs font-bold text-brand-pink hover:text-brand-rose flex items-center gap-1">
              View All Guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {MOCK_BLOG_POSTS.map(blog => (
              <div key={blog.id} className="bg-white border border-brand-borderLight rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <img src={blog.image} alt={blog.title} className="w-full h-44 object-cover" />
                  <div className="p-5 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-pink bg-brand-blush/50 px-2 py-0.5 rounded">{blog.category}</span>
                    <h3 className="font-serif font-bold text-base text-brand-textDark leading-tight hover:text-brand-pink transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-[11px] text-brand-textMuted leading-relaxed">{blog.excerpt}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex justify-between items-center text-[10px] text-brand-textMuted">
                  <span>{blog.date}</span>
                  <Link to={`/blog/${blog.slug}`} className="font-bold text-brand-pink hover:underline flex items-center">
                    Read Guide <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. NEWSLETTER & CTAs */}
      <section className="py-20 bg-[#2F2430] text-white font-sans text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-pink/5 blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl">Not Sure What Your Skin or Hair Needs?</h2>
          <p className="text-xs sm:text-sm text-brand-blush/80 max-w-md mx-auto leading-relaxed">
            Speak directly with our Ahmedabad skin consultants. Book a physical or visual online assessment and discover your custom routine blueprint.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 justify-center">
            <Link 
              to="/booking" 
              className="bg-brand-pink hover:bg-brand-rose text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-[1.02]"
            >
              Book Consultation
            </Link>
            <a 
              href={BUSINESS_CONFIG.whatsapp.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-[1.02] flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-brand-blush/70">
            <span>📞 Primary: {BUSINESS_CONFIG.phones.primary}</span>
            <span>📞 Alternate: {BUSINESS_CONFIG.phones.alternate}</span>
            <span>✉️ Email: {BUSINESS_CONFIG.email}</span>
          </div>
        </div>
      </section>

      {/* Quick View Modal Overlay */}
      {selectedQuickView && (
        <QuickViewModal 
          product={selectedQuickView} 
          onClose={() => setSelectedQuickView(null)} 
        />
      )}
    </>
  );
}
