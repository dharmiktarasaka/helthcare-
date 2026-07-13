import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import SEO from "../../components/SEO";
import { MOCK_LOCATIONS } from "../../data/mockData";

export default function Locations() {
  const { city } = useParams();

  // DETAIL VIEW
  if (city) {
    const loc = MOCK_LOCATIONS.find(l => l.id === city);
    if (!loc) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
          <h2 className="font-serif font-bold text-3xl text-brand-textDark">Location Not Found</h2>
          <p className="text-sm text-brand-textMuted">The requested studio location is not active in our network.</p>
          <Link to="/locations" className="inline-block bg-brand-pink text-white text-xs font-bold px-6 py-2.5 rounded-full">View All Studios</Link>
        </div>
      );
    }

    return (
      <>
        <SEO 
          title={`Lunara Studio ${loc.city}`}
          description={`Visit Lunara Health & Beauty in ${loc.city}, ${loc.state}. Address: ${loc.address}. Available clinics: ${loc.servicesAvailable.join(", ")}.`}
          canonicalPath={`/locations/${loc.id}`}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <Link to="/" className="hover:text-brand-pink">Home</Link>
            <span>/</span>
            <Link to="/locations" className="hover:text-brand-pink">Locations</Link>
            <span>/</span>
            <span className="text-brand-textDark font-bold">{loc.city}</span>
          </nav>

          {/* Banner */}
          <div className="bg-gradient-to-r from-brand-blush via-brand-cream to-brand-peach/20 rounded-3xl p-8 sm:p-10 border border-brand-borderLight flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <span className="bg-brand-pink/15 text-brand-rose text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {loc.isHeadquarters ? "Corporate HQ Clinic" : "Lunara Beauty Center"}
              </span>
              <h1 className="font-serif font-bold text-3xl text-brand-textDark">Lunara {loc.city}</h1>
              <p className="text-xs text-brand-textMuted">{loc.state}, {loc.country}</p>
            </div>
            
            <Link 
              to="/booking"
              className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-transform hover:scale-[1.01]"
            >
              Book Slot at {loc.city}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact details */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-serif font-bold text-xl text-brand-textDark border-b border-brand-borderLight pb-2">Clinic Information</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-brand-textMuted">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Address coordinates</p>
                    <p>{loc.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Direct Line</p>
                    <a href={`tel:${loc.phone}`} className="hover:text-brand-pink transition-colors">{loc.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Email</p>
                    <a href={`mailto:${loc.email}`} className="hover:text-brand-pink transition-colors">{loc.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Timing</p>
                    <p>{loc.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions / available clinics list */}
            <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-2xl space-y-4 h-fit">
              <h3 className="font-serif font-bold text-brand-textDark text-sm">Services At Studio</h3>
              <ul className="space-y-2.5 text-xs text-brand-textMuted">
                {loc.servicesAvailable.map((serv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span>{serv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-brand-cream/10 border border-brand-borderLight rounded-3xl p-4 overflow-hidden shadow-inner">
            <div className="h-64 bg-brand-blush/30 rounded-2xl flex flex-col justify-center items-center gap-1.5 border border-brand-borderLight/40 text-center">
              <MapPin className="w-6 h-6 text-brand-pink" />
              <h4 className="font-serif font-bold text-xs text-brand-textDark">Map Location - {loc.city}</h4>
              <p className="text-[10px] text-brand-textMuted max-w-xs px-4">Visit S.G. Highway or Alkapuri hubs. In-person skin analyzers are active at the reception desk.</p>
            </div>
          </div>

        </div>
      </>
    );
  }

  // LIST VIEW
  return (
    <>
      <SEO 
        title="Studio Locations Directory"
        description="Find Lunara apothecary clinics in Ahmedabad, Surat, Vadodara, and Mumbai. Check clinic timings and contact information."
        canonicalPath="/locations"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Studio Locations</h1>
          <p className="text-xs text-brand-textMuted">Locate organic product outlets and skin testing centers near you.</p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {MOCK_LOCATIONS.map(loc => (
            <div 
              key={loc.id}
              className="bg-white border border-brand-borderLight rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${loc.isHeadquarters ? "bg-brand-pink text-white" : "bg-brand-blush/80 text-brand-rose"}`}>
                    {loc.isHeadquarters ? "Headquarters" : "Studio Outlet"}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-brand-textDark pt-1.5">{loc.city}</h3>
                  <p className="text-xs text-brand-textMuted">{loc.state}, India</p>
                </div>

                <div className="space-y-2 text-xs text-brand-textMuted">
                  <p className="flex gap-2"><span>📍</span> <span>{loc.address}</span></p>
                  <p className="flex gap-2"><span>📞</span> <span>{loc.phone}</span></p>
                  <p className="flex gap-2"><span>✉️</span> <span>{loc.email}</span></p>
                  <p className="flex gap-2"><span>⏱️</span> <span>{loc.hours}</span></p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-borderLight/30 flex gap-2.5 text-xs font-bold">
                <Link 
                  to={`/locations/${loc.id}`}
                  className="flex-1 text-center py-2.5 border border-brand-borderLight hover:border-brand-pink text-brand-textDark rounded-xl transition-colors"
                >
                  View Studio Details
                </Link>
                <Link 
                  to="/booking"
                  className="flex-1 text-center py-2.5 bg-brand-pink hover:bg-brand-rose text-white rounded-xl shadow-xs transition-colors"
                >
                  Book Consultation
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
}
