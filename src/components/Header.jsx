import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Phone, ShieldAlert, Award } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/config";
import { getCart, getWishlist } from "../utils/db";
import { MOCK_PRODUCTS } from "../data/mockData";

const ANNOUNCEMENTS = [
  "🌸 Free consultation on selected beauty services",
  "✨ Special offers on skincare combinations - Save up to 25%",
  "💬 WhatsApp support available 9 AM to 7 PM daily",
  "🍃 New organic wellness collection launched!"
];

export default function Header() {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Announcement rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Update Cart & Wishlist counters
  const updateCounters = () => {
    const cart = getCart();
    const wish = getWishlist();
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    setWishlistCount(wish.length);
  };

  useEffect(() => {
    updateCounters();
    window.addEventListener("cart_updated", updateCounters);
    window.addEventListener("wishlist_updated", updateCounters);
    return () => {
      window.removeEventListener("cart_updated", updateCounters);
      window.removeEventListener("wishlist_updated", updateCounters);
    };
  }, []);

  // Sync Search results
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = MOCK_PRODUCTS.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.category.toLowerCase().includes(query) || 
             p.brand.toLowerCase().includes(query)
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  const selectSearchResult = (slug) => {
    navigate(`/product/${slug}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Mega menu structure
  const shopCategories = [
    {
      title: "Skincare",
      items: [
        { name: "Cleansers", path: "/shop?subcategory=Cleansers" },
        { name: "Serums", path: "/shop?subcategory=Serums" },
        { name: "Moisturizers", path: "/shop?subcategory=Moisturizers" },
        { name: "Sunscreen", path: "/shop?subcategory=Sunscreen" },
        { name: "Face Masks", path: "/shop?subcategory=Face%20Masks" }
      ]
    },
    {
      title: "Haircare",
      items: [
        { name: "Shampoo", path: "/shop?subcategory=Shampoo" },
        { name: "Conditioner", path: "/shop?subcategory=Conditioner" },
        { name: "Hair Serum", path: "/shop?subcategory=Hair%20Serum" },
        { name: "Hair Oil", path: "/shop?subcategory=Hair%20Oil" },
        { name: "Hair Masks", path: "/shop?subcategory=Hair%20Masks" }
      ]
    },
    {
      title: "Beauty",
      items: [
        { name: "Makeup", path: "/shop/makeup" },
        { name: "Nail Care", path: "/shop?subcategory=Nail%20Care" },
        { name: "Fragrance", path: "/shop?subcategory=Fragrance" },
        { name: "Beauty Tools", path: "/shop?subcategory=Beauty%20Tools" }
      ]
    },
    {
      title: "Wellness",
      items: [
        { name: "Vitamins", path: "/shop/wellness?subcategory=Vitamins%20Demo" },
        { name: "Self-Care", path: "/shop/wellness?subcategory=Self-Care" },
        { name: "Aromatherapy", path: "/shop/wellness?subcategory=Aromatherapy" },
        { name: "Sleep Care", path: "/shop/wellness?subcategory=Sleep%20Care" },
        { name: "Fitness Care", path: "/shop/wellness?subcategory=Fitness%20Care" }
      ]
    },
    {
      title: "Healthcare",
      items: [
        { name: "Hygiene", path: "/shop/healthcare?subcategory=Hygiene" },
        { name: "First-Aid", path: "/shop/healthcare?subcategory=First-Aid%20Demo" },
        { name: "Personal Care", path: "/shop/personal-care" },
        { name: "Women's Care", path: "/shop/healthcare?subcategory=Women's%20Care" },
        { name: "Men's Care", path: "/shop/men" }
      ]
    }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-brand-rose via-brand-pink to-brand-purple text-white text-xs font-medium py-2 px-4 text-center overflow-hidden h-8 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute"
          >
            {ANNOUNCEMENTS[announcementIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navbar */}
      <header className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-borderLight shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-brand-textDark hover:text-brand-pink transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-rose via-brand-pink to-brand-purple flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              L
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl leading-none text-brand-textDark tracking-wide group-hover:text-brand-pink transition-colors">Lunara</span>
              <span className="text-[9px] uppercase tracking-widest text-brand-textMuted font-sans leading-none mt-0.5 font-semibold">Health & Beauty</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex space-x-2 items-center">
            {/* Shop Megamenu Trigger */}
            <div className="group/menu">
              <Link 
                to="/shop" 
                className="px-3 py-2 text-sm font-semibold text-brand-textDark hover:text-brand-pink flex items-center gap-1 transition-colors"
              >
                Shop <ChevronDown className="w-4 h-4 transition-transform group-hover/menu:rotate-180" />
              </Link>

              {/* Desktop Mega Menu */}
              <div className="absolute left-4 right-4 top-[50px] pt-[30px] hidden group-hover/menu:block transition-all duration-300">
                <div className="bg-white border border-brand-borderLight rounded-2xl shadow-xl p-8 grid grid-cols-5 gap-6 max-w-5xl mx-auto">
                  {shopCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="font-serif font-bold text-brand-pink text-sm border-b border-brand-borderLight pb-1">
                        <Link 
                          to={`/shop/${cat.title.toLowerCase()}`} 
                          className="hover:text-brand-rose transition-colors"
                        >
                          {cat.title}
                        </Link>
                      </h4>
                      <ul className="space-y-2">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link 
                              to={item.path} 
                              className="text-xs text-brand-textMuted hover:text-brand-rose transition-colors block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/services" className="px-3 py-2 text-sm font-semibold text-brand-textDark hover:text-brand-pink transition-colors">Services</Link>
            <Link to="/offers" className="px-3 py-2 text-sm font-semibold text-brand-textDark hover:text-brand-pink transition-colors">Offers</Link>
            <Link to="/blog" className="px-3 py-2 text-sm font-semibold text-brand-textDark hover:text-brand-pink transition-colors">Journal</Link>
            <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-brand-textDark hover:text-brand-pink transition-colors">Contact</Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Icon */}
            <button 
              onClick={() => setSearchOpen(prev => !prev)}
              className="p-2 text-brand-textDark hover:text-brand-pink transition-colors relative"
              aria-label="Search"
            >
              <Search className="w-5.5 h-5.5" />
            </button>

            {/* Dashboard / CRM Short Link */}
            <Link 
              to="/crm" 
              className="p-2 text-brand-textDark hover:text-brand-pink transition-colors hidden sm:block" 
              title="CRM Demo"
            >
              <Award className="w-5.5 h-5.5" />
            </Link>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="p-2 text-brand-textDark hover:text-brand-pink transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-brand-rose rounded-full transform translate-x-1 -translate-y-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="p-2 text-brand-textDark hover:text-brand-pink transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-brand-pink rounded-full transform translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Contact Header Link */}
            <a 
              href={BUSINESS_CONFIG.whatsapp.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors hidden md:block"
              title="WhatsApp Chat Support"
            >
              <Phone className="w-5.5 h-5.5" />
            </a>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 w-full bg-white border-b border-brand-borderLight shadow-md z-30"
            >
              <div className="max-w-3xl mx-auto px-4 py-4 relative">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Search premium products (e.g., Ceramide, Serum, Oil)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-brand-borderLight rounded-full text-brand-textDark focus:outline-none focus:ring-2 focus:ring-brand-pink/50 text-sm"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="absolute right-8 p-2 text-brand-pink hover:text-brand-rose"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>

                {/* Dropdown Live search results */}
                {searchResults.length > 0 && (
                  <div className="absolute left-4 right-4 bg-white border border-brand-borderLight rounded-xl mt-2 shadow-lg overflow-hidden z-50">
                    <ul className="divide-y divide-brand-borderLight">
                      {searchResults.map(prod => (
                        <li key={prod.id}>
                          <button 
                            onClick={() => selectSearchResult(prod.slug)}
                            className="w-full text-left px-4 py-3 hover:bg-brand-blush/30 flex items-center gap-3 transition-colors text-sm"
                          >
                            <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-md" />
                            <div>
                              <p className="font-semibold text-brand-textDark">{prod.name}</p>
                              <p className="text-xs text-brand-textMuted">{prod.brand} • ₹{prod.price}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-white z-50 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  {/* Logo in drawer */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-white font-serif font-bold text-sm">
                      L
                    </div>
                    <span className="font-serif font-bold text-xl text-brand-textDark">Lunara</span>
                  </div>

                  {/* Close button */}
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-brand-textDark hover:text-brand-pink transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mb-6 relative">
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-brand-borderLight rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink"
                  />
                  <button type="submit" className="absolute right-3 top-2.5 text-brand-textMuted">
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Mobile Links */}
                <div className="space-y-4">
                  {/* Shop Expandable Category */}
                  <div>
                    <button 
                      onClick={() => setActiveAccordion(prev => prev === "shop" ? null : "shop")}
                      className="w-full flex items-center justify-between font-bold text-brand-textDark py-1 hover:text-brand-pink text-left"
                    >
                      Shop Products
                      <ChevronDown className={`w-5 h-5 transition-transform ${activeAccordion === "shop" ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeAccordion === "shop" && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-4 mt-2 space-y-2 overflow-hidden"
                        >
                          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">All Collections</Link>
                          <Link to="/shop/skincare" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Skincare</Link>
                          <Link to="/shop/haircare" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Haircare</Link>
                          <Link to="/shop/makeup" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Makeup</Link>
                          <Link to="/shop/wellness" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Wellness</Link>
                          <Link to="/shop/healthcare" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Healthcare</Link>
                          <Link to="/shop/mother-baby" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Mother & Baby</Link>
                          <Link to="/shop/men" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Men's Grooming</Link>
                          <Link to="/shop/gift-sets" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-brand-textMuted hover:text-brand-pink">Gift Sets</Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/shop/skincare" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Skincare</Link>
                  <Link to="/shop/haircare" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Haircare</Link>
                  <Link to="/shop/makeup" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Makeup</Link>
                  <Link to="/shop/wellness" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Wellness</Link>
                  <Link to="/shop/healthcare" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Healthcare</Link>
                  <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Beauty & Wellness Services</Link>
                  <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Special Offers</Link>
                  <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Wellness Journal</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block font-bold text-brand-textDark py-1 hover:text-brand-pink">Contact Us</Link>
                </div>
              </div>

              {/* Bottom Quick Contacts */}
              <div className="border-t border-brand-borderLight pt-4 mt-6 text-xs text-brand-textMuted space-y-2">
                <p className="font-semibold text-brand-textDark">Lunara Health & Beauty Support</p>
                <p>📍 {BUSINESS_CONFIG.location}</p>
                <p>📞 {BUSINESS_CONFIG.phones.primary}</p>
                <a 
                  href={BUSINESS_CONFIG.whatsapp.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 font-bold hover:underline"
                >
                  💬 Chat on WhatsApp
                </a>
                <div className="pt-2 flex items-center gap-2 text-[10px]">
                  <ShieldAlert className="w-3.5 h-3.5 text-brand-rose" />
                  <span>Frontend Demo Sandbox</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
