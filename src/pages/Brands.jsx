import React from "react";
import { Link } from "react-router-dom";
import { Award, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { MOCK_BRANDS } from "../data/mockData";

export default function Brands() {
  const brandDescriptions = {
    "Lunara Organics": "Flagship organic apothecary line utilizing floral extracts and multi-weight ceramides.",
    "Aura Botanicals": "100% natural, sulfate-free Rosemary growth hair oils and cold-pressed seed remedies.",
    "Dermacare Pro": "Dermatologist-approved clinical active concentrations (Salicylic Acid, Vitamin C).",
    "Soma Wellness": "Inner rejuvenation vitamins, melatonin sleep support gummies, and aromatherapy.",
    "PureBaby": "Pediatrician-tested hypoallergenic Calendula body washes for baby sensitive skin.",
    "Alpha Grooming": "Activated charcoal oil-control facewash systems designed for men's skin textures."
  };

  return (
    <>
      <SEO 
        title="Partner Brands Apothecary"
        description="Explore partner brands of Lunara Health & Beauty including Dermacare Pro, Aura Botanicals, and Soma Wellness."
        canonicalPath="/brands"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink">Home</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold">Brands Directory</span>
        </nav>

        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Brands Directory</h1>
          <p className="text-xs text-brand-textMuted">Explore partner labs and organic brands curated under the Lunara quality banner.</p>
        </div>

        {/* Brands list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {MOCK_BRANDS.map(brand => (
            <div 
              key={brand}
              className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs hover:border-brand-pink/30 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex justify-between items-center border-b border-brand-borderLight pb-3">
                <h3 className="font-serif font-bold text-lg text-brand-textDark">{brand}</h3>
                <span className="bg-brand-blush text-brand-rose text-[9px] font-bold px-2 py-0.5 rounded border border-brand-rose/5">CURATED</span>
              </div>
              
              <p className="text-xs text-brand-textMuted leading-relaxed">
                {brandDescriptions[brand] || "Premium beauty and healthcare formulations matching Lunara's strict safety standards."}
              </p>

              <div className="pt-2 flex justify-between items-center text-xs">
                <Link 
                  to={`/shop?search=${encodeURIComponent(brand)}`}
                  className="inline-flex items-center gap-1 text-brand-pink font-bold hover:text-brand-rose hover:underline"
                >
                  Shop {brand} Products <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="flex items-center gap-1 text-brand-textMuted text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Approved Lab</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
