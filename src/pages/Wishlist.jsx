import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, GitCompare, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import { getWishlist, toggleWishlist, clearWishlist, addToCart, addToCompare, isInCompare } from "../utils/db";

export default function Wishlist() {
  const [wishItems, setWishItems] = useState([]);
  const [feedback, setFeedback] = useState("");

  const loadWishlist = () => {
    setWishItems(getWishlist());
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener("wishlist_updated", loadWishlist);
    return () => window.removeEventListener("wishlist_updated", loadWishlist);
  }, []);

  const handleRemove = (product) => {
    toggleWishlist(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.size);
    toggleWishlist(product); // Remove from wishlist on add to cart
    setFeedback(`"${product.name}" moved to Cart!`);
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleCompare = (product) => {
    const res = addToCompare(product);
    if (res.success) {
      setFeedback("Added to Compare!");
    } else {
      setFeedback(res.message);
    }
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <>
      <SEO 
        title="My Wishlist"
        description="View your bookmarked skincare and beauty products. Move items to cart, compare side-by-side, or reset details."
        canonicalPath="/wishlist"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">My Wishlist</h1>
          <p className="text-xs text-brand-textMuted">Keep track of your favorite apothecary remedies and wellness supplements.</p>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="bg-brand-textDark text-white text-xs font-semibold py-3 px-4 rounded-xl text-center mb-6 max-w-sm mx-auto shadow-md">
            ✨ {feedback}
          </div>
        )}

        {wishItems.length === 0 ? (
          /* Empty view */
          <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-16 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-brand-blush rounded-full flex items-center justify-center mx-auto text-brand-pink">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl text-brand-textDark">Your wishlist is empty</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                Start browsing our collections and click the heart icon on any product card to bookmark it here.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-block bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-8 py-3 rounded-full shadow-md"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Items Grid */
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={clearWishlist}
                className="text-xs text-brand-textMuted hover:text-brand-rose font-bold underline"
              >
                Clear All Saved Items
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishItems.map(product => (
                <div key={product.id} className="group relative bg-white border border-brand-borderLight rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full font-sans">
                  
                  {/* Image wrapper */}
                  <div className="relative aspect-square overflow-hidden bg-brand-cream/10 shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    
                    {/* Delete button */}
                    <button 
                      onClick={() => handleRemove(product)}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-brand-blush text-brand-textDark hover:text-brand-rose rounded-full shadow-sm z-10 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-bold text-brand-textMuted uppercase tracking-wider block">{product.brand}</span>
                      <h3 className="font-serif font-bold text-sm text-brand-textDark truncate">
                        <Link to={`/product/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <p className="text-[10.5px] text-brand-textMuted line-clamp-1">{product.shortBenefit}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-brand-borderLight flex items-baseline justify-between">
                      <span className="font-sans font-bold text-brand-pink text-sm">₹{product.price}</span>
                      <span className="text-[10.5px] text-brand-textMuted font-medium">{product.size}</span>
                    </div>

                    {/* Actions Panel */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-brand-pink hover:bg-brand-rose text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                      </button>
                      <button
                        onClick={() => handleCompare(product)}
                        className="border border-brand-borderLight hover:border-brand-pink text-brand-textDark text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      >
                        <GitCompare className="w-3.5 h-3.5" /> Compare
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="text-center pt-8 flex items-center gap-1 justify-center text-xs text-brand-textMuted">
              <HelpCircle className="w-4 h-4" />
              <span>Items saved locally in browser cookie cache.</span>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
