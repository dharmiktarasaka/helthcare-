import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Heart, ShoppingBag, PhoneCall, Check, GitCompare, Info, 
  Truck, ArrowRight, ShieldAlert, Award, FileText, Sparkles
} from "lucide-react";
import SEO from "../../components/SEO";
import { MOCK_PRODUCTS } from "../../data/mockData";
import { addToCart, toggleWishlist, isInWishlist, addToCompare, isInCompare, getCart } from "../../utils/db";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  const [mainImage, setMainImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  // Interactive checkers
  const [postcode, setPostcode] = useState("");
  const [postcodeResult, setPostcodeResult] = useState("");
  const [inWish, setInWish] = useState(false);
  const [inComp, setInComp] = useState(false);
  
  // Dynamic reviews
  const [reviewsList, setReviewsList] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" });
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  // Cross-sells
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize(product.size || "Standard");
      setQuantity(1);
      setInWish(isInWishlist(product.id));
      setInComp(isInCompare(product.id));
      setPostcode("");
      setPostcodeResult("");
      setReviewSuccess(false);
      setNewReview({ name: "", rating: 5, text: "" });

      // Load static + dynamic reviews
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
      const defaultReviews = [
        { name: "Meera Patel", rating: 5, date: "July 1, 2026", text: `I love this ${product.name}! It works exactly as described. Highly recommended.` },
        { name: "Rahul S.", rating: 4, date: "June 25, 2026", text: "Great product quality, packaging was extremely premium. Delivery took 3 days in Ahmedabad." }
      ];
      setReviewsList([...storedReviews, ...defaultReviews]);

      // Handle Recently Viewed products in LocalStorage
      const viewed = JSON.parse(localStorage.getItem("lunara_recently_viewed")) || [];
      const updatedViewed = [product.id, ...viewed.filter(id => id !== product.id)].slice(0, 4);
      localStorage.setItem("lunara_recently_viewed", JSON.stringify(updatedViewed));
      
      const matchedViewed = MOCK_PRODUCTS.filter(p => updatedViewed.includes(p.id) && p.id !== product.id);
      setRecentlyViewed(matchedViewed);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-serif font-bold text-3xl text-brand-textDark">Product Not Found</h2>
        <p className="text-sm text-brand-textMuted">The requested apothecary item does not exist or has been archived.</p>
        <Link to="/shop" className="inline-block bg-brand-pink text-white text-xs font-bold px-6 py-2.5 rounded-full">Back to Shop</Link>
      </div>
    );
  }

  // Zoom magnifier effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  // Actions
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setFeedback("Added to Cart!");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setInWish(prev => !prev);
    setFeedback(inWish ? "Removed from Wishlist" : "Added to Wishlist!");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleCompare = () => {
    const res = addToCompare(product);
    if (res.success) {
      setInComp(true);
      setFeedback("Added to Comparison!");
    } else {
      setFeedback(res.message);
    }
    setTimeout(() => setFeedback(""), 2000);
  };

  const handlePostcodeCheck = (e) => {
    e.preventDefault();
    if (!postcode) return;
    if (postcode.length === 6 && /^\d+$/.test(postcode)) {
      setPostcodeResult(`🟢 Delivery available to ${postcode}! Estimated: 2-3 business days.`);
    } else {
      setPostcodeResult("🔴 Invalid postcode format. Please enter a 6-digit PIN code.");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const newRevItem = {
      name: newReview.name,
      rating: Number(newReview.rating),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      text: newReview.text
    };

    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${product.id}`)) || [];
    savedReviews.unshift(newRevItem);
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(savedReviews));

    setReviewsList([newRevItem, ...reviewsList]);
    setReviewSuccess(true);
    setNewReview({ name: "", rating: 5, text: "" });
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Matched Related Products
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <SEO 
        title={product.name}
        description={`Buy ${product.name} by ${product.brand}. ${product.shortBenefit}. Free shipping options, expert matching, and secure checkout demo.`}
        canonicalPath={`/product/${product.slug}`}
        ogImage={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-pink">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-brand-pink capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          
          {/* LEFT: Image Gallery & Postcode checker */}
          <div className="space-y-6">
            
            {/* Gallery Zoom Wrapper */}
            <div className="relative aspect-square border border-brand-borderLight rounded-3xl overflow-hidden bg-brand-cream/10 shadow-sm">
              <div 
                className="w-full h-full cursor-zoom-in relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Zoom Panel */}
              <div 
                style={zoomStyle} 
                className="absolute inset-0 pointer-events-none rounded-3xl border border-brand-borderLight bg-no-repeat shadow-inner hidden md:block" 
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-brand-rose text-white text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.badge.replace(" Demo", "")}
                </span>
              )}

              {/* Feedback action popup */}
              {feedback && (
                <div className="absolute inset-0 bg-brand-textDark/85 flex items-center justify-center p-4 text-center z-10 transition-opacity">
                  <span className="text-white text-sm font-semibold uppercase tracking-wider">{feedback}</span>
                </div>
              )}
            </div>

            {/* Thumbnail Selector */}
            <div className="flex gap-3">
              {[product.image, product.hoverImage].filter(Boolean).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === img ? "border-brand-pink" : "border-brand-borderLight hover:border-brand-pink/50"
                  }`}
                >
                  <img src={img} alt="Product thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Postcode Delivery Checker */}
            <div className="bg-brand-cream/15 border border-brand-borderLight rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-1.5 text-brand-textDark">
                <Truck className="w-5 h-5 text-brand-pink shrink-0" />
                <h4 className="font-serif font-bold text-sm">Delivery Checker (Ahmedabad HQ Hub)</h4>
              </div>
              <p className="text-[11px] text-brand-textMuted leading-relaxed">Enter your 6-digit area Pin Code to verify delivery speeds for our skincare apothecary sets.</p>
              <form onSubmit={handlePostcodeCheck} className="flex gap-2">
                <input 
                  type="text" 
                  maxLength="6"
                  placeholder="e.g. 380054"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="border border-brand-borderLight rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-brand-pink"
                />
                <button 
                  type="submit" 
                  className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Check
                </button>
              </form>
              {postcodeResult && <p className="text-[11.5px] font-semibold text-brand-textDark mt-1">{postcodeResult}</p>}
            </div>

          </div>

          {/* RIGHT: Product specifications */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <p className="text-xs font-bold text-brand-textMuted uppercase tracking-widest leading-none">{product.brand}</p>
                <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-textDark mt-2 leading-tight">{product.name}</h1>
                <p className="text-xs italic text-brand-pink font-semibold mt-1">"{product.shortBenefit}"</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 border-y border-brand-borderLight py-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-brand-textDark">{product.rating}</span>
                <span className="text-xs text-brand-textMuted">({reviewsList.length} reviews)</span>
                <span className="text-brand-borderLight">|</span>
                <span className="text-xs text-emerald-600 font-bold">✓ 100% Authentic Product</span>
              </div>

              {/* Price Details */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-sans font-bold text-brand-pink">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-brand-textMuted line-through">Original: ₹{product.originalPrice}</span>
                      <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Save ₹{product.originalPrice - product.price} ({product.discount}% OFF)</span>
                    </>
                  )}
                </div>
                <p className="text-[10px] text-brand-textMuted">Inclusive of all local VAT and taxes.</p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
                {product.description}
              </p>

              {/* Size variant selector */}
              <div className="space-y-2">
                <span className="text-[10.5px] uppercase font-bold text-brand-textDark tracking-wider block">Variant Size:</span>
                <div className="flex gap-2.5">
                  {["30 ml", "50 ml", "100 ml", product.size].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                        selectedSize === s 
                          ? "border-brand-pink bg-brand-blush/40 text-brand-rose" 
                          : "border-brand-borderLight text-brand-textMuted hover:border-brand-pink"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="space-y-2 pt-2">
                <span className="text-[10.5px] uppercase font-bold text-brand-textDark tracking-wider block">Select Quantity:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-sans text-xs font-bold text-brand-textDark">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-9 h-9 rounded-lg border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                  <span className="text-xs text-brand-textMuted ml-3 font-semibold">Stock: {product.stockStatus}</span>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="border-t border-brand-borderLight pt-6 space-y-3.5">
              
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={handleAddToCart}
                  className="bg-brand-pink hover:bg-brand-rose text-white text-xs sm:text-sm font-bold py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-4.5 h-4.5" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-brand-purple hover:bg-brand-purple/90 text-white text-xs sm:text-sm font-bold py-3.5 rounded-full shadow-md transition-transform hover:scale-[1.01]"
                >
                  Buy Now Demo
                </button>
              </div>

              {/* Secondary operations links */}
              <div className="flex flex-wrap justify-between items-center gap-4 py-2 border-b border-brand-borderLight text-xs">
                
                <div className="flex gap-4">
                  <button onClick={handleWishlist} className={`flex items-center gap-1 font-bold ${inWish ? "text-brand-pink" : "text-brand-textDark hover:text-brand-rose"}`}>
                    <Heart className="w-4 h-4" fill={inWish ? "currentColor" : "none"} />
                    <span>{inWish ? "Wishlisted" : "Add to Wishlist"}</span>
                  </button>
                  
                  <button onClick={handleCompare} className="flex items-center gap-1 font-bold text-brand-textDark hover:text-brand-pink">
                    <GitCompare className="w-4 h-4" />
                    <span>Compare product</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/917600583156?text=${encodeURIComponent(`Hello Lunara Health & Beauty, I would like to enquire about: ${product.name} (${selectedSize})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Product WhatsApp Enquiry</span>
                </a>

              </div>

              {/* Safe Checkout Demo message */}
              <div className="flex items-center gap-2 text-[10px] text-brand-textMuted bg-brand-cream/20 p-2.5 rounded-xl border border-brand-borderLight/40">
                <Info className="w-4 h-4 text-brand-pink shrink-0" />
                <span>Sandbox Demo System: No actual currency transactions will process.</span>
              </div>

            </div>

          </div>

        </div>

        {/* TABS ACCORDION DETAIL */}
        <section className="mt-16 border-t border-brand-borderLight pt-10">
          
          {/* Tab switches */}
          <div className="flex flex-wrap gap-2 border-b border-brand-borderLight pb-4 justify-start">
            {[
              { id: "description", label: "Description" },
              { id: "benefits", label: "Key Benefits" },
              { id: "use", label: "How to Use" },
              { id: "ingredients", label: "Ingredients" },
              { id: "reviews", label: `Reviews (${reviewsList.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-brand-textMuted hover:text-brand-pink hover:bg-brand-cream/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="py-8 text-xs sm:text-sm text-brand-textMuted leading-relaxed text-left max-w-4xl space-y-4">
            
            {activeTab === "description" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">Product Description</h3>
                <p>{product.description}</p>
                <p>Designed using skin-friendly botanical ingredients that enhance cell water absorption. Safe to combine with other serums or oils.</p>
                <div className="bg-brand-blush/35 border border-brand-borderLight p-3.5 rounded-xl flex items-start gap-2.5 mt-4">
                  <ShieldAlert className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                  <p className="text-[10px] text-brand-textDark leading-normal font-semibold">
                    Disclaimer: This demo content is for website presentation only and is not medical advice.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">Key Benefits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.benefits ? product.benefits.map((b, i) => <li key={i}>{b}</li>) : (
                    <>
                      <li>Restores moisture barrier to prevent daily trans-epidermal water loss.</li>
                      <li>Nourishes target cells with organic nutrients.</li>
                      <li>Increases radiant shine and skin softness in 7 days.</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {activeTab === "use" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">How to Use</h3>
                <p>{product.howToUse || "Massage gently into clean skin morning and night. Use broad-spectrum sunscreen afterward during daytime."}</p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">Ingredients</h3>
                <p className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight italic font-mono text-[11px] leading-relaxed">
                  {product.ingredients || "Aqueous extracts, organic carrier oils, active compounds, natural preservative blends."}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <h3 className="font-serif font-bold text-brand-textDark text-lg">Customer Reviews</h3>

                {/* Reviews list */}
                <div className="space-y-4">
                  {reviewsList.map((rev, i) => (
                    <div key={i} className="bg-white border border-brand-borderLight p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-brand-textDark">{rev.name}</span>
                        <span className="text-brand-textMuted">{rev.date || "Just now"}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star key={starIdx} className={`w-3 h-3 ${starIdx < rev.rating ? "fill-current" : ""}`} />
                        ))}
                      </div>
                      <p className="text-[11px] sm:text-xs text-brand-textDark italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>

                {/* Review submission Form */}
                <div className="bg-brand-cream/15 border border-brand-borderLight rounded-2xl p-5 sm:p-6 space-y-4">
                  <h4 className="font-serif font-bold text-brand-textDark text-base">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Sneha Patel"
                          value={newReview.name}
                          onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Rating</label>
                        <select
                          value={newReview.rating}
                          onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                          className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs bg-white focus:outline-none font-bold text-brand-textDark"
                        >
                          <option value="5">5 Stars (Excellent)</option>
                          <option value="4">4 Stars (Good)</option>
                          <option value="3">3 Stars (Average)</option>
                          <option value="2">2 Stars (Poor)</option>
                          <option value="1">1 Star (Very Poor)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Your Review</label>
                      <textarea 
                        required
                        rows="3"
                        placeholder="Write your product experience..."
                        value={newReview.text}
                        onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                        className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-2 rounded-lg shadow-sm"
                    >
                      Submit Review
                    </button>
                    {reviewSuccess && <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Review submitted! Saved locally in demo cookies.</p>}
                  </form>
                </div>

              </div>
            )}

          </div>

        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-brand-borderLight pt-10 space-y-8">
            <h3 className="font-serif font-bold text-brand-textDark text-2xl text-left">Recommended for You</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div key={p.id} className="relative group bg-white border border-brand-borderLight rounded-2xl overflow-hidden p-4 shadow-xs flex flex-col justify-between">
                  <div>
                    <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                    <p className="text-[10px] uppercase font-bold text-brand-textMuted tracking-wider">{p.brand}</p>
                    <h4 className="font-serif font-bold text-sm text-brand-textDark mt-0.5 line-clamp-1">
                      <Link to={`/product/${p.slug}`}>{p.name}</Link>
                    </h4>
                    <p className="text-[11px] text-brand-textMuted line-clamp-1">{p.shortBenefit}</p>
                  </div>
                  <div className="pt-3 border-t border-brand-borderLight mt-4 flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-pink">₹{p.price}</span>
                    <Link to={`/product/${p.slug}`} className="font-bold text-brand-purple hover:underline">View details →</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RECENTLY VIEWED PRODUCTS */}
        {recentlyViewed.length > 0 && (
          <section className="mt-16 border-t border-brand-borderLight pt-10 space-y-8">
            <h3 className="font-serif font-bold text-brand-textDark text-xl text-left">Recently Viewed Items</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentlyViewed.map(p => (
                <Link 
                  to={`/product/${p.slug}`} 
                  key={p.id}
                  className="bg-brand-cream/10 border border-brand-borderLight p-3.5 rounded-xl flex items-center gap-3 hover:border-brand-pink/50 transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                  <div className="overflow-hidden">
                    <h4 className="font-serif font-bold text-xs text-brand-textDark truncate">{p.name}</h4>
                    <p className="text-[10px] text-brand-pink font-semibold mt-0.5">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
