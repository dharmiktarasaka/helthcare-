import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import SEO from "../components/SEO";
import ProductCard from "../components/product/ProductCard";
import QuickViewModal from "../components/product/QuickViewModal";
import { MOCK_PRODUCTS } from "../data/mockData";

export default function SpecialCollections() {
  const location = useLocation();
  const path = location.pathname;
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  let title = "Lunara Collection";
  let description = "Browse curated apothecary selections.";
  let filteredProducts = [];
  let badgeText = "Curated Selection";
  let bannerDesc = "Enjoy expert-curated formulas.";

  if (path === "/offers") {
    title = "Special Offers & Combo Sets";
    description = "Shop discounts on organic haircare bundles, skincare kits, and seasonal wellness products.";
    filteredProducts = MOCK_PRODUCTS.filter(p => p.discount >= 20 || p.isOffer);
    badgeText = "Special Discounts Available";
    bannerDesc = "Limited seasonal promotions on premium combo items. No clinical medical guarantees are implied.";
  } else if (path === "/bestsellers") {
    title = "Customer Best Sellers";
    description = "Explore top rated apothecary formulas voted best by users.";
    filteredProducts = MOCK_PRODUCTS.filter(p => p.isBestSeller);
    badgeText = "Voted Customer Favorites";
    bannerDesc = "High-performing skin, hair, and baby care selections based on repeat orders.";
  } else if (path === "/new-arrivals") {
    title = "New Arrivals Apothecary";
    description = "Browse our fresh creations newly added to the apothecary shelves.";
    filteredProducts = MOCK_PRODUCTS.filter(p => p.isNewArrival || p.id === "p9" || p.id === "p6");
    badgeText = "Fresh Batches";
    bannerDesc = "Discover new botanical solutions, vitamin gummies, and grooming essentials.";
  }

  return (
    <>
      <SEO 
        title={title}
        description={description}
        canonicalPath={path}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink">Home</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold">{title}</span>
        </nav>

        {/* Hero banner */}
        <div className="bg-gradient-to-r from-brand-blush via-brand-cream to-brand-peach/20 rounded-3xl p-8 sm:p-10 mb-8 border border-brand-borderLight text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <span className="bg-brand-pink/15 text-brand-rose text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              {badgeText}
            </span>
            <h1 className="font-serif font-bold text-3xl text-brand-textDark pt-1">{title}</h1>
            <p className="text-xs text-brand-textMuted max-w-md">{bannerDesc}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xs px-4 py-3 rounded-2xl border border-brand-borderLight flex items-center gap-2">
            <Tag className="w-5 h-5 text-brand-pink" />
            <span className="text-xs font-bold text-brand-textDark">Standard Delivery in 2-3 Days</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setSelectedQuickView} 
            />
          ))}
        </div>

      </div>

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
