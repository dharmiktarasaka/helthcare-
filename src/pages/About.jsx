import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS_CONFIG } from "../config/config";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Lunara Health & Beauty brand origins. Discover our organic sourcing standards, clinical safety testing, and team goals."
        canonicalPath="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 mb-8 uppercase tracking-wider font-semibold">
          <Link to="/" className="hover:text-brand-pink">Home</Link>
          <span>/</span>
          <span className="text-brand-textDark font-bold">About Lunara</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left mb-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-pink/10 text-brand-rose text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Our Journey
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight">
              Feel Beautiful.<br />
              <span className="text-brand-pink">Live Well.</span>
            </h1>
            <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
              Founded in Ahmedabad, India, **Lunara Health & Beauty** was created to reconcile the split between luxurious cosmetics and clean clinical skincare. We believe that self-care should not require choosing between instant aesthetic outcomes and long-term health integrity.
            </p>
            <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
              Our apothecary catalog features clean dropper serums, ceramide repair creams, Rosemary growth hair oils, pediatric baby lotions, and daily health nutrients. Each item is formulated without sulfates, parabens, or mineral oils.
            </p>
            <div className="pt-2">
              <Link 
                to="/booking" 
                className="inline-flex items-center gap-1.5 bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-transform hover:scale-[1.01]"
              >
                <span>Book a Consultation Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-brand-borderLight">
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop" 
                alt="Apothecary Lab" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Absolute overlay details card */}
            <div className="absolute -bottom-6 -right-6 bg-white border border-brand-borderLight p-4 rounded-xl shadow-lg max-w-xs hidden sm:block text-left">
              <p className="text-xs font-bold text-brand-textDark">Established 2026</p>
              <p className="text-[10px] text-brand-textMuted mt-1">Sourcing ingredients from clean botanical fields across India.</p>
            </div>
          </div>
        </div>

        {/* Pillars / Trust Section */}
        <section className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-8 sm:p-10 mb-16 text-left">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark">Our Core Pillars</h2>
            <p className="text-xs text-brand-textMuted max-w-md mx-auto">The values that guide our formulations and diagnostic consultations daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clinical Standards", desc: "We coordinate with local dermatologists to verify the safety and non-comedogenic index of every moisturizer and cleanser.", icon: Award },
              { title: "Clean Botanicals", desc: "No artificial dyes, synthetic scents, mineral oils, or paraben preservatives. Only clean, cold-pressed seed oils.", icon: ShieldCheck },
              { title: "Diagnostic Guidance", desc: "We don't just sell jars. We offer visual skin scanning and scalp diagnostic meetings to build personalized routines.", icon: Heart }
            ].map((p, idx) => (
              <div key={idx} className="space-y-3 bg-white p-5 rounded-2xl border border-brand-borderLight/40 shadow-xs">
                <div className="w-10 h-10 bg-brand-blush/60 text-brand-rose rounded-full flex items-center justify-center shrink-0">
                  <p.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-textDark">{p.title}</h3>
                <p className="text-xs text-brand-textMuted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Global footprints */}
        <div className="text-center space-y-4 max-w-md mx-auto">
          <h3 className="font-serif font-bold text-xl text-brand-textDark">Ahmedabad Headquarters</h3>
          <p className="text-xs text-brand-textMuted leading-relaxed">
            Our central apothecary store and diagnostic clinics are located in Bodakdev, Ahmedabad. We also host studio picking stations in Surat, Vadodara, and Bandra West in Mumbai.
          </p>
          <div className="pt-2">
            <Link to="/locations" className="text-xs font-bold text-brand-pink hover:text-brand-rose underline">Explore All Studio Locations →</Link>
          </div>
        </div>

      </div>
    </>
  );
}
