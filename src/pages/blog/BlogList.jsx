import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, BookOpen, ChevronRight, HelpCircle } from "lucide-react";
import SEO from "../../components/SEO";
import { MOCK_BLOG_POSTS, GENERAL_FAQS } from "../../data/mockData";

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="Beauty & Wellness Journal"
        description="Read clinical skincare guides, hair care tips, wellness routines, and dermatologist ingredient guides online."
        canonicalPath="/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Wellness Journal</h1>
          <p className="text-xs text-brand-textMuted">Explore science-backed beauty guides, skincare routines, and ingredient analyses.</p>
        </div>

        {/* AI & Search direct answer helpers - SEO friendly */}
        <section className="bg-brand-cream/20 border border-brand-borderLight rounded-3xl p-6 sm:p-8 mb-12 text-left space-y-6">
          <div className="flex items-center gap-2 text-brand-textDark">
            <Sparkles className="w-5 h-5 text-brand-pink shrink-0" />
            <h2 className="font-serif font-bold text-lg">AI & Search Quick Answers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-brand-textMuted">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-brand-textDark text-sm">What is a basic skincare routine?</h3>
              <p>
                A basic skincare routine consists of three simple steps: <strong>Cleanse</strong> (to remove dirt, oil, and sweat), <strong>Moisturize</strong> (to hydrate and restore the skin's protective lipid barrier), and <strong>Protect</strong> (applying SPF 50 sunscreen daily to guard against ultraviolet aging and damage).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-brand-textDark text-sm">How do I choose a moisturizer?</h3>
              <p>
                Select a moisturizer based on your skin type. Dry skin benefits from thick creams loaded with <strong>Ceramides</strong> and natural oils. Oily skin responds best to lightweight, water-based gel formulas that hydrate without clogging pores. Sensitive skin requires fragrance-free, calming creams containing ingredients like <strong>Centella Asiatica (Cica)</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-brand-textDark text-sm">What is the difference between a serum and a moisturizer?</h3>
              <p>
                <strong>Serums</strong> are lightweight, thin liquids formulated with a high concentration of active ingredients (like Hyaluronic Acid, Vitamin C, or Salicylic Acid) that sink deep into the skin's layers to target specific concerns. <strong>Moisturizers</strong> are thicker creams designed to lock in moisture and protect the surface skin barrier.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-brand-textDark text-sm">How do I compare beauty products?</h3>
              <p>
                To compare beauty products effectively, look at the active ingredient percentages (e.g., 2% Salicylic Acid vs. 15% Vitamin C), check the suitability details for your skin or hair type, examine the product form (gel, serum, cream), evaluate reviews, and check for safety certificates.
              </p>
            </div>
          </div>
        </section>

        {/* Controls: Search & Category filter tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-brand-borderLight pb-6 mb-8">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {[
              { id: "all", label: "All Topics" },
              { id: "skincare", label: "Skincare" },
              { id: "haircare", label: "Haircare" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? "bg-brand-pink text-white shadow-sm"
                    : "text-brand-textMuted hover:text-brand-pink hover:bg-brand-cream/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-brand-borderLight rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink"
            />
            <Search className="w-4 h-4 text-brand-textMuted absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Blog grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-brand-textMuted text-xs">
            No journal articles matched your search query. Try typing 'skincare' or 'rose'.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white border border-brand-borderLight rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6 space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-pink bg-brand-blush/65 px-2.5 py-0.5 rounded">{post.category}</span>
                    <h3 className="font-serif font-bold text-lg text-brand-textDark leading-snug hover:text-brand-pink transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-brand-textMuted leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>
                </div>
                
                <div className="p-6 pt-0 border-t border-brand-borderLight/30 flex items-center justify-between text-xs text-brand-textMuted">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-brand-pink" />
                    <span>{post.date}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="font-bold text-brand-pink hover:text-brand-rose flex items-center">
                    Read Guide <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global FAQs summary */}
        <section className="mt-20 border-t border-brand-borderLight pt-16 text-left max-w-4xl mx-auto space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-2xl text-brand-textDark">Apothecary FAQs</h2>
            <p className="text-xs text-brand-textMuted">Find quick answers regarding product comparisons and application safety.</p>
          </div>
          <div className="space-y-6">
            {GENERAL_FAQS.map((faq, i) => (
              <div key={i} className="space-y-2 text-xs leading-relaxed text-brand-textMuted border-b border-brand-borderLight/40 pb-6">
                <h3 className="font-serif font-bold text-brand-textDark text-sm flex gap-1.5">
                  <HelpCircle className="w-4.5 h-4.5 text-brand-pink shrink-0" />
                  {faq.q}
                </h3>
                <p className="pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
