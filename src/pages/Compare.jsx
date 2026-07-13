import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GitCompare, Trash2, ShoppingCart, Star, Sparkles, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import { getCompareList, removeFromCompare, clearCompare, addToCart } from "../utils/db";

export default function Compare() {
  const [compareItems, setCompareItems] = useState([]);
  const [feedback, setFeedback] = useState("");

  const loadCompare = () => {
    setCompareItems(getCompareList());
  };

  useEffect(() => {
    loadCompare();
    window.addEventListener("compare_updated", loadCompare);
    return () => window.removeEventListener("compare_updated", loadCompare);
  }, []);

  const handleRemove = (productId) => {
    removeFromCompare(productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.size);
    setFeedback(`"${product.name}" added to Cart!`);
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <>
      <SEO 
        title="Product Comparison"
        description="Compare skin and hair care products side-by-side. Analyze ingredient components, sizes, ratings, and price specs."
        canonicalPath="/compare"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Product Comparison</h1>
          <p className="text-xs text-brand-textMuted">Analyze up to 4 apothecary items side-by-side on active ingredients and prices.</p>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="bg-brand-textDark text-white text-xs font-semibold py-3 px-4 rounded-xl text-center mb-6 max-w-sm mx-auto shadow-md">
            ✨ {feedback}
          </div>
        )}

        {compareItems.length === 0 ? (
          /* Empty state */
          <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-16 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-brand-blush rounded-full flex items-center justify-center mx-auto text-brand-pink">
              <GitCompare className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl text-brand-textDark">No items selected</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                Add products from the catalog cards to compare them side-by-side on active ingredients, sizes, and pricing.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-block bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-8 py-3 rounded-full shadow-md"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          /* Comparison Table */
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-brand-textMuted font-bold uppercase tracking-wider">Comparing {compareItems.length} of 4 items</span>
              <button 
                onClick={clearCompare}
                className="text-brand-textMuted hover:text-brand-rose font-bold underline"
              >
                Clear Comparison List
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="w-full overflow-x-auto border border-brand-borderLight rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
                <thead>
                  <tr className="border-b border-brand-borderLight bg-brand-cream/10">
                    <th className="w-48 p-4 text-xs font-bold uppercase tracking-wider text-brand-textDark">Features</th>
                    {compareItems.map(p => (
                      <th key={p.id} className="p-4 text-left relative group">
                        <button
                          onClick={() => handleRemove(p.id)}
                          className="absolute top-2 right-2 p-1.5 bg-brand-blush text-brand-rose rounded-full hover:bg-brand-rose hover:text-white transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="pt-2 text-xs">
                          <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-lg mb-2 shadow-xs" />
                          <p className="text-[10px] font-bold text-brand-textMuted uppercase">{p.brand}</p>
                          <p className="font-serif font-bold text-brand-textDark line-clamp-1">{p.name}</p>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots placeholders */}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <th key={idx} className="p-4 text-center text-brand-textMuted font-sans text-xs border-l border-brand-borderLight">
                        <div className="h-28 flex flex-col justify-center items-center gap-1 opacity-50">
                          <GitCompare className="w-6 h-6" />
                          <Link to="/shop" className="text-[10px] font-bold text-brand-pink hover:underline">Add product</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-borderLight text-xs text-brand-textDark">
                  
                  {/* Price */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Price</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 font-bold text-brand-pink text-sm border-l border-brand-borderLight">
                        ₹{p.price}
                        {p.originalPrice > p.price && (
                          <span className="text-[10.5px] text-brand-textMuted font-normal line-through ml-1.5">₹{p.originalPrice}</span>
                        )}
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Customer Rating</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                          <span className="font-bold">{p.rating}</span>
                          <span className="text-[10px] text-brand-textMuted">({p.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Main benefit */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Primary Benefit</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-brand-textMuted italic leading-relaxed">
                        "{p.shortBenefit}"
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Suitability */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Suitable For</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-brand-textMuted capitalize">
                        {p.category === "skincare" ? `${p.skinType} skin` : `${p.hairType || "all"} hair`}
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Size */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Package Size</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-brand-textMuted">
                        {p.size}
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Product Form */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Product Form</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-brand-textMuted">
                        {p.form}
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Ingredients */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Active Ingredients</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-[10.5px] text-brand-textMuted leading-relaxed font-mono">
                        {p.ingredients ? p.ingredients.slice(0, 100) : "Botanical blends and clean extracts."}...
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Stock Availability */}
                  <tr>
                    <td className="p-4 font-bold bg-brand-cream/5">Availability</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight text-emerald-600 font-bold">
                        ✓ {p.stockStatus}
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                  {/* Add to Cart CTA */}
                  <tr className="bg-brand-cream/5">
                    <td className="p-4 font-bold">Actions</td>
                    {compareItems.map(p => (
                      <td key={p.id} className="p-4 border-l border-brand-borderLight">
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="w-full bg-brand-pink hover:bg-brand-rose text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </td>
                    ))}
                    {[...Array(4 - compareItems.length)].map((_, idx) => (
                      <td key={idx} className="p-4 border-l border-brand-borderLight">-</td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="text-center pt-4 flex items-center gap-1 justify-center text-xs text-brand-textMuted">
              <HelpCircle className="w-4 h-4" />
              <span>Comparison lists are updated automatically and cached in LocalStorage.</span>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
