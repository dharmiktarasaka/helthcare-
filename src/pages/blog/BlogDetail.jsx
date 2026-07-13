import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Heart, ShoppingBag, HelpCircle, ShieldAlert } from "lucide-react";
import SEO from "../../components/SEO";
import { MOCK_BLOG_POSTS, MOCK_PRODUCTS } from "../../data/mockData";
import { addToCart } from "../../utils/db";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="font-serif font-bold text-3xl text-brand-textDark">Article Not Found</h2>
        <p className="text-sm text-brand-textMuted">The requested journal article does not exist or has been archived.</p>
        <Link to="/blog" className="inline-block bg-brand-pink text-white text-xs font-bold px-6 py-2.5 rounded-full">Back to Journal</Link>
      </div>
    );
  }

  // Generate FAQ schema markup dynamically for SEO
  const faqSchema = post.faqSection ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqSection.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  // Custom parser to handle basic headings, lists, and product links in text
  const renderContent = (content) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      
      // Headings
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={idx} className="font-serif font-bold text-lg sm:text-xl text-brand-textDark mt-6 mb-2 text-left">
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }
      
      // Bullet list items
      if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
        return (
          <ul key={idx} className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-brand-textMuted text-left my-3">
            {trimmed.split("\n").map((li, liIdx) => (
              <li key={liIdx}>{li.replace(/^[\-\*]\s*/, "").trim()}</li>
            ))}
          </ul>
        );
      }

      // Paragraph block with custom link rendering e.g. [Link Text](/path)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      if (linkRegex.test(trimmed)) {
        const parts = [];
        let lastIndex = 0;
        let match;
        
        // Reset regex index
        linkRegex.lastIndex = 0;
        
        while ((match = linkRegex.exec(trimmed)) !== null) {
          // Add preceding text
          if (match.index > lastIndex) {
            parts.push(trimmed.slice(lastIndex, match.index));
          }
          // Add custom link
          parts.push(
            <Link 
              key={match.index} 
              to={match[2]} 
              className="text-brand-pink font-bold hover:underline"
            >
              {match[1]}
            </Link>
          );
          lastIndex = linkRegex.lastIndex;
        }
        
        if (lastIndex < trimmed.length) {
          parts.push(trimmed.slice(lastIndex));
        }

        return (
          <p key={idx} className="text-xs sm:text-sm text-brand-textMuted leading-relaxed text-left mb-4">
            {parts}
          </p>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-brand-textMuted leading-relaxed text-left mb-4">
          {trimmed}
        </p>
      );
    });
  };

  // Find products mentioned in this blog post to render as cards
  const matchedProducts = MOCK_PRODUCTS.filter(p => 
    post.content.toLowerCase().includes(p.slug.toLowerCase())
  );

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogImage={post.image}
        schemaMarkup={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-brand-pink">Journal</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article header */}
        <article className="space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-pink bg-brand-blush/60 px-3 py-1 rounded-full">{post.category}</span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-brand-textDark leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-brand-textMuted pt-2">
              <span className="font-bold text-brand-textDark">By {post.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.date}</span>
            </div>
          </div>

          {/* Banner image */}
          <div className="aspect-[21/9] sm:h-80 rounded-3xl overflow-hidden border border-brand-borderLight shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="pt-4 border-t border-brand-borderLight">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Recommended Products cards in the article */}
        {matchedProducts.length > 0 && (
          <section className="mt-12 bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-brand-textDark">Products Mentioned In Guide</h3>
              <p className="text-xs text-brand-textMuted">Incorporate these dermatologically formulated items into your routine.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedProducts.map(p => (
                <div key={p.id} className="bg-white border border-brand-borderLight p-4 rounded-2xl flex gap-4 items-center justify-between shadow-xs">
                  <div className="flex gap-3 items-center overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl shrink-0 shadow-xs" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-bold text-brand-textMuted uppercase">{p.brand}</p>
                      <h4 className="font-serif font-bold text-xs text-brand-textDark truncate">{p.name}</h4>
                      <p className="text-[10px] text-brand-pink font-semibold mt-0.5">₹{p.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(p, 1, p.size);
                      alert(`Added "${p.name}" to cart!`);
                    }}
                    className="bg-brand-pink hover:bg-brand-rose text-white p-2.5 rounded-xl shadow-xs transition-colors shrink-0"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ sections schema */}
        {post.faqSection && (
          <section className="mt-12 border-t border-brand-borderLight pt-10 text-left space-y-6">
            <h3 className="font-serif font-bold text-xl text-brand-textDark flex items-center gap-1">
              <HelpCircle className="w-5 h-5 text-brand-pink" /> Guide Q&A Summary
            </h3>
            <div className="space-y-4">
              {post.faqSection.map((faq, i) => (
                <div key={i} className="bg-brand-cream/10 border border-brand-borderLight/40 p-5 rounded-2xl space-y-1">
                  <h4 className="font-serif font-bold text-brand-textDark text-sm">💡 {faq.q}</h4>
                  <p className="text-xs text-brand-textMuted leading-relaxed pl-5 mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="mt-10 bg-brand-blush/25 border border-brand-rose/5 p-4 rounded-xl flex items-start gap-2.5 max-w-xl mx-auto text-left">
          <ShieldAlert className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
          <p className="text-[10.5px] text-brand-textMuted leading-normal">
            <strong>Medical Disclaimer:</strong> Journal guidelines are for educational validation only. We do not substitute professional healthcare diagnosis. Perform patch tests before introducing active acid formulas.
          </p>
        </div>

        <div className="text-center pt-10">
          <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-brand-pink hover:text-brand-rose underline">
            <ArrowLeft className="w-4 h-4" /> Back to Journal Directory
          </Link>
        </div>

      </div>
    </>
  );
}
