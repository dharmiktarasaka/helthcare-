import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, Grid, List, X, Search, SlidersHorizontal, ChevronDown, 
  HelpCircle, Star, Sparkles
} from "lucide-react";
import SEO from "../../components/SEO";
import ProductCard from "../../components/product/ProductCard";
import QuickViewModal from "../../components/product/QuickViewModal";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS, MOCK_CONCERNS } from "../../data/mockData";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  // Active filters states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || searchParams.get("category") || "");
  const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get("subcategory") || "");
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get("concern") || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState(2500); // Max Price
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [selectedHairType, setSelectedHairType] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Sync URL search params & path params
  useEffect(() => {
    const qSearch = searchParams.get("search") || "";
    const qCategory = categorySlug || searchParams.get("category") || "";
    const qSubCategory = searchParams.get("subcategory") || "";
    const qConcern = searchParams.get("concern") || "";
    
    if (qSearch) setSearchQuery(qSearch);
    if (qCategory) setSelectedCategory(qCategory);
    if (qSubCategory) setSelectedSubCategory(qSubCategory);
    if (qConcern) setSelectedConcern(qConcern);

    // Auto focus search field if param present
    if (searchParams.get("focusSearch") === "true") {
      const el = document.getElementById("shop-search-input");
      el?.focus();
    }
  }, [searchParams, categorySlug]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedConcern("");
    setSelectedBrand("");
    setSelectedRating(0);
    setPriceRange(2500);
    setSelectedSkinType("");
    setSelectedHairType("");
    setSelectedForm("");
    setSortBy("featured");
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const sq = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(sq) || 
                    p.brand.toLowerCase().includes(sq) || 
                    p.shortBenefit.toLowerCase().includes(sq) || 
                    p.category.toLowerCase().includes(sq);
      if (!match) return false;
    }

    // 2. Category
    if (selectedCategory && p.category !== selectedCategory) return false;

    // 3. Subcategory
    if (selectedSubCategory && p.subCategory !== selectedSubCategory) return false;

    // 4. Concern
    if (selectedConcern && p.concern !== selectedConcern) return false;

    // 5. Brand
    if (selectedBrand && p.brand !== selectedBrand) return false;

    // 6. Rating
    if (selectedRating && p.rating < selectedRating) return false;

    // 7. Price
    if (p.price > priceRange) return false;

    // 8. Skin Type
    if (selectedSkinType && p.skinType && p.skinType !== "all" && p.skinType !== selectedSkinType) return false;

    // 9. Hair Type
    if (selectedHairType && p.hairType && p.hairType !== selectedHairType) return false;

    // 10. Product Form
    if (selectedForm && p.form !== selectedForm) return false;

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return b.isNewArrival - a.isNewArrival;
    if (sortBy === "bestsellers") return b.isBestSeller - a.isBestSeller;
    return 0; // Default Featured
  });

  const activeChips = [];
  if (selectedCategory) activeChips.push({ label: `Category: ${selectedCategory}`, reset: () => setSelectedCategory("") });
  if (selectedSubCategory) activeChips.push({ label: `Type: ${selectedSubCategory}`, reset: () => setSelectedSubCategory("") });
  if (selectedConcern) activeChips.push({ label: `Concern: ${selectedConcern}`, reset: () => setSelectedConcern("") });
  if (selectedBrand) activeChips.push({ label: `Brand: ${selectedBrand}`, reset: () => setSelectedBrand("") });
  if (selectedRating > 0) activeChips.push({ label: `Rating: ${selectedRating}★+`, reset: () => setSelectedRating(0) });
  if (selectedSkinType) activeChips.push({ label: `Skin: ${selectedSkinType}`, reset: () => setSelectedSkinType("") });
  if (selectedHairType) activeChips.push({ label: `Hair: ${selectedHairType}`, reset: () => setSelectedHairType("") });
  if (selectedForm) activeChips.push({ label: `Form: ${selectedForm}`, reset: () => setSelectedForm("") });
  if (searchQuery) activeChips.push({ label: `Search: "${searchQuery}"`, reset: () => setSearchQuery("") });

  return (
    <>
      <SEO 
        title="Shop Collections"
        description="Browse skin, hair, wellness, and beauty collections. Refine by concern, skin type, hair type, and prices with secure Ahmedabad delivery."
        canonicalPath="/shop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-6 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold">Shop Apothecary</span>
        </nav>

        {/* Hero title banner */}
        <div className="bg-gradient-to-r from-brand-blush via-brand-cream to-brand-peach/20 rounded-3xl p-8 sm:p-10 mb-8 border border-brand-borderLight text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-textDark">Lunara Apothecary</h1>
            <p className="text-xs text-brand-textMuted max-w-md">Discover premium dermatological skincare, organic hair remedies, and vital nutrients formulated for your holistic care.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xs px-4 py-3 rounded-2xl border border-brand-borderLight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-pink" />
            <span className="text-xs font-bold text-brand-textDark">Free Shipping on Orders over ₹999</span>
          </div>
        </div>

        {/* Controls bar: search, sort, filters toggle */}
        <div className="bg-white border border-brand-borderLight p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-xs mb-6">
          {/* Search form in shop */}
          <div className="relative w-full sm:w-72">
            <input 
              id="shop-search-input"
              type="text" 
              placeholder="Search apothecary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-brand-borderLight rounded-full text-xs text-brand-textDark focus:outline-none focus:ring-1 focus:ring-brand-pink"
            />
            <Search className="w-4 h-4 text-brand-textMuted absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Mobile filters toggle */}
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1 px-4 py-2 border border-brand-borderLight hover:border-brand-pink rounded-xl text-xs font-bold text-brand-textDark transition-colors"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            {/* View controls */}
            <div className="hidden sm:flex items-center gap-1.5 border-r border-brand-borderLight pr-3">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-brand-blush text-brand-pink" : "hover:bg-brand-cream/50 text-brand-textMuted"}`}
                title="Grid View"
              >
                <Grid className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-brand-blush text-brand-pink" : "hover:bg-brand-cream/50 text-brand-textMuted"}`}
                title="List View"
              >
                <List className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-textMuted font-medium hidden md:inline">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-brand-borderLight px-3 py-2 rounded-xl text-xs font-bold text-brand-textDark focus:outline-none focus:ring-1 focus:ring-brand-pink bg-white"
              >
                <option value="featured">Featured Collection</option>
                <option value="bestsellers">Best Selling</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-xs text-brand-textMuted font-bold uppercase tracking-wider">Active:</span>
            {activeChips.map((chip, idx) => (
              <span 
                key={idx} 
                className="bg-brand-blush/60 text-brand-rose px-2.5 py-1 rounded-full text-[11px] font-bold border border-brand-rose/10 flex items-center gap-1 shadow-xs"
              >
                {chip.label}
                <button onClick={chip.reset} className="hover:text-brand-textDark"><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button 
              onClick={handleClearFilters}
              className="text-[11px] font-bold text-brand-pink hover:text-brand-rose underline pl-1"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block space-y-6 bg-brand-cream/10 border border-brand-borderLight p-6 rounded-2xl h-fit">
            
            <div className="flex justify-between items-center border-b border-brand-borderLight pb-3">
              <h3 className="font-serif font-bold text-brand-textDark text-lg">Filters</h3>
              <button 
                onClick={handleClearFilters}
                className="text-[10px] uppercase font-bold text-brand-pink hover:text-brand-rose"
              >
                Reset
              </button>
            </div>

            {/* Category filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Category</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${!selectedCategory ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                >
                  All Categories
                </button>
                {MOCK_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory(""); // reset subcategory
                    }}
                    className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${selectedCategory === cat.id ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand filter */}
            <div className="space-y-2 border-t border-brand-borderLight pt-4">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Brands</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${!selectedBrand ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                >
                  All Brands
                </button>
                {MOCK_BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${selectedBrand === brand ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Concern filter */}
            <div className="space-y-2 border-t border-brand-borderLight pt-4">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Beauty Concern</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedConcern("")}
                  className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${!selectedConcern ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                >
                  All Concerns
                </button>
                {MOCK_CONCERNS.map(concern => (
                  <button
                    key={concern.id}
                    onClick={() => setSelectedConcern(concern.id)}
                    className={`block text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${selectedConcern === concern.id ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {concern.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="space-y-3 border-t border-brand-borderLight pt-4">
              <div className="flex justify-between items-center text-xs font-bold text-brand-textDark">
                <span className="uppercase tracking-wider">Price Range</span>
                <span className="text-brand-pink">Max: ₹{priceRange}</span>
              </div>
              <input 
                type="range" 
                min="200" 
                max="2500" 
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-pink h-1 bg-brand-borderLight rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-textMuted">
                <span>₹200</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Rating filter */}
            <div className="space-y-2 border-t border-brand-borderLight pt-4">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Customer Rating</h4>
              <div className="space-y-1.5">
                {[0, 4.5, 4.0, 3.5].map(rate => (
                  <button
                    key={rate}
                    onClick={() => setSelectedRating(rate)}
                    className={`flex items-center gap-1 text-xs text-left w-full py-1 hover:text-brand-pink transition-colors ${selectedRating === rate ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {rate === 0 ? "Any Rating" : (
                      <>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                        <span>{rate} ★ & Above</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin type filter */}
            <div className="space-y-2 border-t border-brand-borderLight pt-4">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Skin Type</h4>
              <div className="space-y-1">
                {["dry", "oily", "sensitive", "combination"].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedSkinType(prev => prev === st ? "" : st)}
                    className={`block text-xs text-left w-full py-1 hover:text-brand-pink capitalize ${selectedSkinType === st ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {st} Skin
                  </button>
                ))}
              </div>
            </div>

            {/* Product form shape */}
            <div className="space-y-2 border-t border-brand-borderLight pt-4">
              <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Product Form</h4>
              <div className="space-y-1">
                {["Serum", "Cream", "Gel", "Oil", "Balm", "Gummy", "Tablet"].map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedForm(prev => prev === f ? "" : f)}
                    className={`block text-xs text-left w-full py-1 hover:text-brand-pink ${selectedForm === f ? "text-brand-pink font-bold" : "text-brand-textMuted"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* PRODUCTS LIST */}
          <main className="lg:col-span-3">
            
            {/* Header info */}
            <div className="flex justify-between items-center text-xs text-brand-textMuted font-bold mb-4 uppercase tracking-wider">
              <span>Showing {sortedProducts.length} of {MOCK_PRODUCTS.length} Products</span>
              {sortedProducts.length === 0 && <span className="text-brand-rose">Try clearing filters</span>}
            </div>

            {/* Empty view */}
            {sortedProducts.length === 0 ? (
              <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-12 text-center space-y-4">
                <HelpCircle className="w-12 h-12 text-brand-textMuted mx-auto opacity-75" />
                <h3 className="font-serif font-bold text-lg text-brand-textDark">No matching products found</h3>
                <p className="text-xs text-brand-textMuted max-w-sm mx-auto leading-relaxed">
                  We couldn't find any products matching your active filters. Try adjusting your search query or reset filters.
                </p>
                <button 
                  onClick={handleClearFilters}
                  className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Grid / List renders */
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }>
                {sortedProducts.map(product => (
                  viewMode === "grid" ? (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={setSelectedQuickView} 
                    />
                  ) : (
                    /* Elegant List Card layout */
                    <div 
                      key={product.id} 
                      className="bg-white border border-brand-borderLight rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col sm:flex-row gap-5 shadow-xs hover:shadow-md transition-shadow relative"
                    >
                      <img src={product.image} alt={product.name} className="w-full sm:w-44 h-44 object-cover rounded-xl shrink-0" />
                      <div className="flex flex-col justify-between flex-1 space-y-4 sm:space-y-0">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[10px] font-bold text-brand-textMuted uppercase">{product.brand}</p>
                              <h3 className="font-serif font-bold text-lg text-brand-textDark hover:text-brand-pink transition-colors">
                                <Link to={`/product/${product.slug}`}>{product.name}</Link>
                              </h3>
                            </div>
                            {product.badge && (
                              <span className="bg-brand-rose text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">{product.badge.replace(" Demo", "")}</span>
                            )}
                          </div>
                          <p className="text-xs text-brand-textMuted leading-normal">{product.description.slice(0, 180)}...</p>
                          <div className="flex items-center gap-1.5 text-xs text-brand-textDark font-semibold">
                            <span>🧪 Form: {product.form}</span>
                            <span>•</span>
                            <span>📦 Size: {product.size}</span>
                          </div>
                        </div>

                        <div className="border-t border-brand-borderLight pt-3 flex items-center justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-brand-pink">₹{product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-brand-textMuted line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSelectedQuickView(product)}
                              className="px-4 py-2 border border-brand-borderLight hover:border-brand-pink text-brand-textDark text-[11px] font-bold rounded-lg transition-colors"
                            >
                              Quick View
                            </button>
                            <Link 
                              to={`/product/${product.slug}`}
                              className="px-4 py-2 bg-brand-pink hover:bg-brand-rose text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
            
          </main>

        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white z-50 shadow-2xl p-6 overflow-y-auto lg:hidden space-y-6"
            >
              <div className="flex justify-between items-center border-b border-brand-borderLight pb-3">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">Filters</h3>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 hover:text-brand-pink"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Duplicate all filters inside mobile view */}
              <div className="space-y-6">
                
                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSelectedSubCategory("");
                        }}
                        className={`px-3 py-1 border rounded-full text-xs ${selectedCategory === cat.id ? "bg-brand-pink border-brand-pink text-white" : "border-brand-borderLight text-brand-textMuted"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-2 border-t border-brand-borderLight pt-4">
                  <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Brands</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK_BRANDS.map(b => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`px-3 py-1 border rounded-full text-xs ${selectedBrand === b ? "bg-brand-pink border-brand-pink text-white" : "border-brand-borderLight text-brand-textMuted"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concerns */}
                <div className="space-y-2 border-t border-brand-borderLight pt-4">
                  <h4 className="text-xs font-bold uppercase text-brand-textDark tracking-wider">Beauty Concern</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK_CONCERNS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedConcern(c.id)}
                        className={`px-3 py-1 border rounded-full text-xs ${selectedConcern === c.id ? "bg-brand-pink border-brand-pink text-white" : "border-brand-borderLight text-brand-textMuted"}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-3 border-t border-brand-borderLight pt-4">
                  <div className="flex justify-between items-center text-xs font-bold text-brand-textDark">
                    <span className="uppercase tracking-wider">Price Range</span>
                    <span className="text-brand-pink">Max: ₹{priceRange}</span>
                  </div>
                  <input 
                    type="range" 
                    min="200" 
                    max="2500" 
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-brand-pink h-1 bg-brand-borderLight rounded-lg appearance-none"
                  />
                </div>

              </div>

              <div className="border-t border-brand-borderLight pt-4 flex gap-2">
                <button
                  onClick={handleClearFilters}
                  className="flex-1 py-2.5 border border-brand-borderLight hover:border-brand-pink rounded-xl text-xs font-bold text-brand-textDark"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-2.5 bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

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
