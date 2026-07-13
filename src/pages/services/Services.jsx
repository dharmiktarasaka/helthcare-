import React from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import SEO from "../../components/SEO";
import { MOCK_SERVICES } from "../../data/mockData";
import { BUSINESS_CONFIG } from "../../config/config";

export default function Services() {
  const { slug } = useParams();
  
  // If slug is provided, render the Service Detail page
  if (slug) {
    const service = MOCK_SERVICES.find(s => s.slug === slug);
    if (!service) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
          <h2 className="font-serif font-bold text-3xl text-brand-textDark">Service Not Found</h2>
          <p className="text-sm text-brand-textMuted">The requested beauty consultation does not exist or has been archived.</p>
          <Link to="/services" className="inline-block bg-brand-pink text-white text-xs font-bold px-6 py-2.5 rounded-full">View All Services</Link>
        </div>
      );
    }

    return (
      <>
        <SEO 
          title={service.title}
          description={`${service.shortDescription} Duration: ${service.duration}. Price: ${service.isFree ? "Free" : `₹${service.price}`}. Book online at Lunara.`}
          canonicalPath={`/services/${service.slug}`}
          ogImage={service.image}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left space-y-10">
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <Link to="/" className="hover:text-brand-pink">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-brand-pink">Services</Link>
            <span>/</span>
            <span className="text-brand-textDark font-bold">{service.title}</span>
          </nav>

          {/* Service Banner Header */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:h-80 border border-brand-borderLight shadow-sm">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/80 via-brand-textDark/30 to-transparent flex flex-col justify-end p-6 sm:p-10" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white space-y-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-pink/20 text-brand-blush text-[10px] font-bold uppercase tracking-wider">
                ⏱️ {service.duration} Session
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-4xl">{service.title}</h1>
            </div>
          </div>

          {/* Service Description Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl text-brand-textDark">Service Overview</h3>
                <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">{service.description}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl text-brand-textDark">Who it is For</h3>
                <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">{service.whoItIsFor}</p>
              </div>

              {/* Consultation process steps */}
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-brand-textDark">What to Expect</h3>
                <div className="space-y-3">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-blush/60 text-brand-rose font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                      <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar details card */}
            <div className="space-y-6">
              <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">Session Price</span>
                  <p className="text-3xl font-bold text-brand-pink">{service.isFree ? "Free" : `₹${service.price}`}</p>
                </div>
                <div className="border-t border-brand-borderLight pt-4 space-y-2">
                  <p className="text-xs font-bold text-brand-textDark">Inclusions:</p>
                  <ul className="space-y-2 text-[11px] text-brand-textMuted">
                    {service.whatIsIncluded.map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  to="/booking" 
                  className="block text-center w-full bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold py-3 rounded-xl shadow-md transition-colors"
                >
                  Book Consultation Slot
                </Link>
                <a
                  href={BUSINESS_CONFIG.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex gap-2 p-3 bg-brand-blush/20 rounded-xl border border-brand-rose/5 text-[10px] text-brand-textMuted">
                <ShieldCheck className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                <span>Ahmedabad center or visual Zoom video meetings available.</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // General Listing View
  return (
    <>
      <SEO 
        title="Beauty & Wellness Services"
        description="Explore beauty routine planning, dermatologist assessments, scalp oil scanning, and personalized skin consultation slots in Ahmedabad."
        canonicalPath="/services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Consultation Services</h1>
          <p className="text-xs text-brand-textMuted">Explore clinical skin checks, scalp assessments, and personal routines mapped by beauty specialists.</p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {MOCK_SERVICES.map(service => (
            <div key={service.id} className="bg-white border border-brand-borderLight rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              
              <div className="relative h-56 bg-brand-cream/10 shrink-0">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-brand-rose text-white text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  ⏱️ {service.duration} Session
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-brand-textDark">{service.title}</h3>
                  <p className="text-xs text-brand-textMuted leading-relaxed line-clamp-3">{service.description}</p>
                  
                  <div className="pt-2">
                    <p className="text-xs font-bold text-brand-textDark mb-1">Key Inclusions:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-brand-textMuted">
                      {service.whatIsIncluded.slice(0, 2).map((inc, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-borderLight flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-textMuted tracking-wider block">Price</span>
                    <span className="text-base font-bold text-brand-pink">{service.isFree ? "Free" : `₹${service.price}`}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link 
                      to={`/services/${service.slug}`}
                      className="px-4 py-2 border border-brand-borderLight hover:border-brand-pink text-brand-textDark text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link 
                      to="/booking"
                      className="px-4 py-2 bg-brand-pink hover:bg-brand-rose text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                    >
                      Book Slot <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Process overview */}
        <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-8 mt-16 text-center max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-2xl text-brand-textDark">Our Consultation Process</h3>
            <p className="text-xs text-brand-textMuted">Simple, structured guidance for your skin health.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-brand-textMuted pt-2">
            <div className="space-y-1">
              <span className="text-brand-pink font-bold text-lg block">1. Book Slot</span>
              <p>Select date and select skin or hair consultation type.</p>
            </div>
            <div className="space-y-1">
              <span className="text-brand-pink font-bold text-lg block">2. Meet Specialist</span>
              <p>Visual 1-on-1 assessment via Zoom video or Ahmedabad clinic.</p>
            </div>
            <div className="space-y-1">
              <span className="text-brand-pink font-bold text-lg block">3. Routine Blueprint</span>
              <p>Receive detailed morning and night product roadmap with discounts.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
