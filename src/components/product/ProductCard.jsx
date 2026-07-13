import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, GitCompare, Star } from "lucide-react";
import { toggleWishlist, isInWishlist, addToCart, addToCompare, isInCompare, removeFromCompare } from "../../utils/db";

export default function ProductCard({ product, onQuickView }) {
  const [inWish, setInWish] = useState(false);
  const [inComp, setInComp] = useState(false);
  const [feedback, setFeedback] = useState("");

  const updateStates = () => {
    setInWish(isInWishlist(product.id));
    setInComp(isInCompare(product.id));
  };

  useEffect(() => {
    updateStates();
    window.addEventListener("wishlist_updated", updateStates);
    window.addEventListener("compare_updated", updateStates);
    return () => {
      window.removeEventListener("wishlist_updated", updateStates);
      window.removeEventListener("compare_updated", updateStates);
    };
  }, [product.id]);

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    setFeedback(inWish ? "Removed from Wishlist" : "Added to Wishlist!");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (inComp) {
      removeFromCompare(product.id);
      setFeedback("Removed from Compare");
    } else {
      const res = addToCompare(product);
      if (res.success) {
        setFeedback("Added to Compare!");
      } else {
        setFeedback(res.message);
      }
    }
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, product.size);
    setFeedback("Added to Cart!");
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="group relative bg-white border border-brand-borderLight rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full font-sans">
      
      {/* Product Images & Badge Overlay */}
      <div className="relative aspect-square overflow-hidden bg-brand-cream/10 shrink-0">
        
        {/* Main Product Link */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 ease-in-out absolute inset-0"
            loading="lazy"
          />
          <img 
            src={product.hoverImage || product.image} 
            alt={`${product.name} alternate`} 
            className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out absolute inset-0 scale-105 group-hover:scale-100 transform transition-transform"
            loading="lazy"
          />
        </Link>

        {/* Badge Indicator */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-brand-rose/95 text-white font-sans font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
            {product.badge.replace(" Demo", "")}
          </span>
        )}

        {/* Hover Action Overlay Panel */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-lg border border-brand-borderLight flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 translate-y-2 group-hover:translate-y-0 transform transition-transform">
          
          {/* Quick View Button */}
          <button 
            onClick={() => onQuickView(product)}
            className="p-2 hover:bg-brand-blush hover:text-brand-pink text-brand-textDark rounded-full transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Compare Button */}
          <button 
            onClick={handleCompare}
            className={`p-2 rounded-full transition-colors ${inComp ? "bg-brand-purple text-white hover:bg-brand-purple/90" : "hover:bg-brand-blush hover:text-brand-pink text-brand-textDark"}`}
            title="Compare Products"
          >
            <GitCompare className="w-4 h-4" />
          </button>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="p-2 hover:bg-brand-blush hover:text-brand-pink text-brand-textDark rounded-full transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Favorite Wishlist Icon Button */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md border border-brand-borderLight/40 transition-all ${
            inWish ? "bg-brand-pink text-white" : "bg-white/80 backdrop-blur-sm text-brand-textDark hover:text-brand-rose"
          }`}
          title="Add to Wishlist"
        >
          <Heart className="w-4.5 h-4.5" fill={inWish ? "currentColor" : "none"} />
        </button>

        {/* Interactive action feedback banner */}
        {feedback && (
          <div className="absolute inset-0 bg-brand-textDark/85 backdrop-blur-xs flex items-center justify-center p-4 text-center z-25">
            <span className="text-white text-xs font-semibold tracking-wide uppercase">{feedback}</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wider">{product.brand}</span>
            <span className="text-[10px] text-brand-textMuted">{product.size}</span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-sm text-brand-textDark group-hover:text-brand-rose transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-brand-textMuted line-clamp-1">{product.shortBenefit}</p>
        </div>

        <div className="mt-3.5 pt-3 border-t border-brand-borderLight flex items-center justify-between">
          {/* Price layout */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-brand-pink text-sm">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[10.5px] text-brand-textMuted line-through">₹{product.originalPrice}</span>
                <span className="text-[10px] text-emerald-600 font-bold">({product.discount}% Off)</span>
              </>
            )}
          </div>

          {/* Rating layout */}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-brand-textDark">{product.rating}</span>
            <span className="text-[9.5px] text-brand-textMuted">({product.reviewCount})</span>
          </div>
        </div>
      </div>

    </div>
  );
}
