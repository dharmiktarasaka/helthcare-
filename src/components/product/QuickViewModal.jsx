import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Star, ShoppingBag, Heart, Check, HelpCircle } from "lucide-react";
import { addToCart, toggleWishlist, isInWishlist } from "../../utils/db";

export default function QuickViewModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size || "Standard");
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(isInWishlist(product.id));

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setWish(prev => !prev);
  };

  // Mock sizes list
  const sizes = product.category === "skincare" || product.category === "haircare" 
    ? ["30 ml", "50 ml", "100 ml"] 
    : [product.size || "Standard"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black"
      />

      {/* Modal Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl z-10 border border-brand-borderLight"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-brand-blush hover:text-brand-pink text-brand-textDark rounded-full shadow-md z-20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative w-full h-64 md:h-auto min-h-[350px] md:min-h-full bg-brand-cream/20">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-brand-rose text-white text-[10px] font-sans font-bold uppercase px-3 py-1 rounded-full z-10">
                {product.badge.replace(" Demo", "")}
              </span>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-[10px] font-bold text-brand-textMuted uppercase tracking-widest leading-none">{product.brand}</p>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-textDark mt-1 leading-tight">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-brand-textDark">{product.rating}</span>
                <span className="text-xs text-brand-textMuted">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-3">
                <span className="text-2xl font-sans font-bold text-brand-pink">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-brand-textMuted line-through">₹{product.originalPrice}</span>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">({product.discount}% OFF)</span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-xs text-brand-textMuted leading-relaxed mt-4 border-t border-brand-borderLight pt-4">
                {product.description.slice(0, 160)}...
              </p>

              {/* Size variant selector */}
              <div className="mt-4">
                <span className="text-[10.5px] uppercase font-bold text-brand-textDark tracking-wider block mb-2">Select Variant Size:</span>
                <div className="flex gap-2">
                  {sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 border rounded-lg text-xs font-medium transition-all ${
                        selectedSize === s 
                          ? "border-brand-pink bg-brand-blush/40 text-brand-rose font-bold" 
                          : "border-brand-borderLight text-brand-textMuted hover:border-brand-pink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-4">
                <span className="text-[10.5px] uppercase font-bold text-brand-textDark tracking-wider block mb-2">Quantity:</span>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-sans text-xs font-bold text-brand-textDark">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                  <span className="text-[10px] text-emerald-600 font-bold ml-2">✓ {product.stockStatus}</span>
                </div>
              </div>
            </div>

            {/* Actions panel */}
            <div className="border-t border-brand-borderLight pt-4 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold shadow-md transition-all ${
                    added 
                      ? "bg-emerald-600 text-white" 
                      : "bg-brand-pink hover:bg-brand-rose text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full border border-brand-borderLight hover:border-brand-pink shadow-sm transition-colors ${
                    wish ? "bg-brand-pink/10 text-brand-rose" : "text-brand-textDark"
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className="w-5.5 h-5.5" fill={wish ? "#D95C8A" : "none"} />
                </button>
              </div>

              {/* Links */}
              <div className="flex justify-between items-center text-[10.5px]">
                <Link 
                  to={`/product/${product.slug}`} 
                  onClick={onClose}
                  className="font-bold text-brand-pink hover:text-brand-rose hover:underline"
                >
                  View Full Product Details →
                </Link>
                <div className="flex items-center gap-1 text-brand-textMuted">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Sandbox Demo Item</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
