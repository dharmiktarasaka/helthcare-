import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, CreditCard } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/config";
import { addSubscriber } from "../utils/db";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const saved = addSubscriber({ name, email });
    if (saved) {
      setSuccess(true);
      setError("");
      setEmail("");
      setName("");
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError("This email is already subscribed!");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#2F2430] to-[#1E161F] text-brand-blush/90 pt-16 pb-8 border-t border-brand-rose/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-rose via-brand-pink to-brand-purple flex items-center justify-center text-white font-serif font-bold text-lg">
              L
            </div>
            <span className="font-serif font-bold text-2xl tracking-wider text-white">Lunara</span>
          </div>
          <p className="text-xs italic text-brand-lavender font-medium">"{BUSINESS_CONFIG.tagline}"</p>
          <p className="text-xs text-brand-blush/70 leading-relaxed">
            A premium sanctuary combining expert skin diagnostics, clean beauty solutions, personal care formulations, and holistic wellness products for your ultimate daily rejuvenation.
          </p>
          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
              <span>{BUSINESS_CONFIG.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-pink shrink-0" />
              <a href={BUSINESS_CONFIG.callLinks.primary} className="hover:text-brand-pink transition-colors">
                {BUSINESS_CONFIG.phones.primary} (Primary)
              </a>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <a href={BUSINESS_CONFIG.callLinks.alternate} className="hover:text-brand-pink transition-colors">
                {BUSINESS_CONFIG.phones.alternate} (Alternate)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-pink shrink-0" />
              <a href={BUSINESS_CONFIG.emailLink} className="hover:text-brand-pink transition-colors">
                {BUSINESS_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-pink shrink-0" />
              <span>{BUSINESS_CONFIG.businessHours}</span>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-serif font-bold text-white text-sm tracking-wide mb-4 uppercase text-brand-pink">Shop</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/shop" className="hover:text-brand-pink transition-colors">All Products</Link></li>
              <li><Link to="/shop/skincare" className="hover:text-brand-pink transition-colors">Skincare</Link></li>
              <li><Link to="/shop/haircare" className="hover:text-brand-pink transition-colors">Haircare</Link></li>
              <li><Link to="/shop/makeup" className="hover:text-brand-pink transition-colors">Makeup</Link></li>
              <li><Link to="/shop/wellness" className="hover:text-brand-pink transition-colors">Wellness</Link></li>
              <li><Link to="/shop/healthcare" className="hover:text-brand-pink transition-colors">Healthcare</Link></li>
              <li><Link to="/offers" className="hover:text-brand-pink transition-colors">Special Offers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-white text-sm tracking-wide mb-4 uppercase text-brand-pink">Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-pink transition-colors">Consultations</Link></li>
              <li><Link to="/blog" className="hover:text-brand-pink transition-colors">Beauty Journal</Link></li>
              <li><Link to="/case-studies" className="hover:text-brand-pink transition-colors">Transformations</Link></li>
              <li><Link to="/faq" className="hover:text-brand-pink transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition-colors">Contact Us</Link></li>
              <li><Link to="/crm" className="hover:text-brand-pink transition-colors text-brand-lavender font-bold">CRM Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Beauty consultations / locations */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-white text-sm tracking-wide uppercase text-brand-pink">Locations</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/locations/ahmedabad" className="hover:text-brand-pink transition-colors block">📍 Ahmedabad (HQ)</Link></li>
            <li><Link to="/locations/surat" className="hover:text-brand-pink transition-colors block">📍 Surat Studio</Link></li>
            <li><Link to="/locations/vadodara" className="hover:text-brand-pink transition-colors block">📍 Vadodara Center</Link></li>
            <li><Link to="/locations/mumbai" className="hover:text-brand-pink transition-colors block">📍 Mumbai Boutique</Link></li>
          </ul>
          <div className="pt-2">
            <h4 className="font-serif font-bold text-white text-sm tracking-wide mb-2 uppercase text-brand-pink">Instant Connect</h4>
            <a 
              href={BUSINESS_CONFIG.whatsapp.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full text-xs shadow-md transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat Support</span>
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-white text-sm tracking-wide uppercase text-brand-pink">Newsletter</h4>
          <p className="text-xs text-brand-blush/70 leading-relaxed">
            Subscribe to receive premium weekly guides, dermatologist advice, and early access notifications on skincare combinations.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input 
              type="text" 
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-brand-blush/40 text-xs px-3.5 py-2.5 rounded-lg border border-brand-rose/20 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:bg-white/20 transition-all"
            />
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-brand-blush/40 text-xs px-3.5 py-2.5 rounded-lg border border-brand-rose/20 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:bg-white/20 transition-all"
              />
              <button 
                type="submit" 
                className="bg-brand-pink hover:bg-brand-rose text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {success && <p className="text-xs text-emerald-400 font-semibold mt-1">✨ Subscribed! Added to CRM demo.</p>}
            {error && <p className="text-xs text-rose-400 font-semibold mt-1">⚠️ {error}</p>}
          </form>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Mock Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-rose/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-brand-blush/55 gap-4">
        <div className="text-center md:text-left space-y-1">
          <p className="font-semibold text-white">
            © 2026 All Rights Reserved by Tarasaka Digital Solutions.
          </p>
          <p>
            Developed by Tarasaka Digital Solutions.
          </p>
        </div>

        {/* Demo badges */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 opacity-70">
            <CreditCard className="w-4 h-4 text-brand-pink" />
            <span className="text-[10px]">Frontend Checkout Demo (COD/UPI/Card)</span>
          </div>
          <div className="flex gap-1">
            <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px]">GPay</span>
            <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px]">UPI</span>
            <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-[9px]">Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
