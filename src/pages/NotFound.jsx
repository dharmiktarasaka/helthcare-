import React from "react";
import { Link } from "react-router-dom";
import { Compass, HelpCircle, ShieldAlert } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The requested page could not be found. Return to Lunara Health & Beauty homepage."
        canonicalPath="/404"
      />

      <div className="max-w-md mx-auto px-4 py-20 text-center font-sans space-y-6">
        <div className="w-16 h-16 bg-brand-blush text-brand-pink rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-4xl text-brand-textDark">404 Error</h1>
          <h2 className="font-serif font-bold text-lg text-brand-textDark mt-1">Apothecary Path Missing</h2>
          <p className="text-xs text-brand-textMuted leading-relaxed max-w-xs mx-auto">
            The requested apothecary route does not exist. Check spelling or return to our shop categories.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link 
            to="/" 
            className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md"
          >
            Go Home
          </Link>
          <Link 
            to="/shop" 
            className="border border-brand-borderLight hover:border-brand-pink text-brand-textDark hover:text-brand-pink text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
          >
            Browse Products
          </Link>
        </div>

        <div className="pt-8 border-t border-brand-borderLight/30 flex items-center justify-center gap-1 text-[10px] text-brand-textMuted justify-center">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-rose" />
          <span>Lunara Health & Beauty Sandboxed Demo</span>
        </div>
      </div>
    </>
  );
}
