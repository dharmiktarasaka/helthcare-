import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, Store, MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/config";
import { getCart, getWishlist } from "../utils/db";

export default function MobileBottomBar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart = getCart();
    const wish = getWishlist();
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    setWishlistCount(wish.length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("cart_updated", updateCounts);
    window.addEventListener("wishlist_updated", updateCounts);
    return () => {
      window.removeEventListener("cart_updated", updateCounts);
      window.removeEventListener("wishlist_updated", updateCounts);
    };
  }, []);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-borderLight shadow-lg z-40 py-2.5 px-4 flex justify-between items-center text-brand-textDark">
      
      {/* Shop Link */}
      <Link to="/shop" className="flex flex-col items-center gap-1 flex-1 text-center hover:text-brand-pink transition-colors">
        <Store className="w-5 h-5" />
        <span className="text-[10px] font-bold">Shop</span>
      </Link>

      {/* Search Link (links to shop with search param focus) */}
      <Link to="/shop?focusSearch=true" className="flex flex-col items-center gap-1 flex-1 text-center hover:text-brand-pink transition-colors">
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-bold">Search</span>
      </Link>

      {/* Wishlist Link with dynamic badge */}
      <Link to="/wishlist" className="flex flex-col items-center gap-1 flex-1 text-center hover:text-brand-pink transition-colors relative">
        <Heart className="w-5 h-5" />
        <span className="text-[10px] font-bold">Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-4 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-brand-rose rounded-full">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart Link with dynamic badge */}
      <Link to="/cart" className="flex flex-col items-center gap-1 flex-1 text-center hover:text-brand-pink transition-colors relative">
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] font-bold">Cart</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white bg-brand-pink rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

      {/* WhatsApp Chat link */}
      <a 
        href={BUSINESS_CONFIG.whatsapp.link}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 flex-1 text-center text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-bold">WhatsApp</span>
      </a>

    </div>
  );
}
