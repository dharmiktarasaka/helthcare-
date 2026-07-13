import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Calendar, ClipboardCheck, ArrowLeft, ShieldAlert } from "lucide-react";
import SEO from "../components/SEO";
import { MOCK_CASE_STUDIES } from "../data/mockData";

export default function CaseStudies() {
  const { slug } = useParams();

  // DETAIL VIEW
  if (slug) {
    const study = MOCK_CASE_STUDIES.find(c => c.slug === slug);
    if (!study) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
          <h2 className="font-serif font-bold text-3xl text-brand-textDark">Case File Not Found</h2>
          <p className="text-sm text-brand-textMuted">The requested customer transformation story does not exist.</p>
          <Link to="/case-studies" className="inline-block bg-brand-pink text-white text-xs font-bold px-6 py-2.5 rounded-full">View All Case Files</Link>
        </div>
      );
    }

    return (
      <>
        <SEO 
          title={study.title}
          description={`Discover the skin and hair recovery journey of ${study.customerName}. Timeline: ${study.timeline}. Products used: ${study.productsUsed.join(", ")}.`}
          canonicalPath={`/case-studies/${study.slug}`}
          ogImage={study.image}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-left space-y-8">
          {/* Breadcrumbs */}
          <nav className="text-xs text-brand-textMuted flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <Link to="/" className="hover:text-brand-pink">Home</Link>
            <span>/</span>
            <Link to="/case-studies" className="hover:text-brand-pink">Transformations</Link>
            <span>/</span>
            <span className="text-brand-textDark font-bold truncate">{study.customerName}'s Case</span>
          </nav>

          {/* Details header */}
          <div className="space-y-4">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark leading-tight">{study.title}</h1>
            <div className="flex gap-4 text-xs text-brand-textMuted">
              <span>👤 {study.customerName}, Age {study.age}</span>
              <span>•</span>
              <span>📍 Location: {study.city}</span>
            </div>
          </div>

          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-brand-borderLight">
            <img src={study.image} alt={study.customerName} className="w-full h-full object-cover" />
          </div>

          {/* Case study timeline grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight">
              <span className="font-bold text-brand-textDark block uppercase mb-1">Beauty Concern</span>
              <span className="text-brand-rose font-semibold">{study.concern}</span>
            </div>
            <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight">
              <span className="font-bold text-brand-textDark block uppercase mb-1">Time Frame</span>
              <span className="text-brand-purple font-semibold">{study.timeline}</span>
            </div>
            <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight">
              <span className="font-bold text-brand-textDark block uppercase mb-1">Status</span>
              <span className="text-emerald-600 font-semibold">✓ Fully Recovered Demo</span>
            </div>
          </div>

          {/* Recommendations, Outcomes and details */}
          <div className="space-y-6 pt-4 border-t border-brand-borderLight">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-brand-textDark">Products Utilized</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-brand-textMuted">
                {study.productsUsed.map((p, idx) => (
                  <li key={idx} className="font-semibold text-brand-textDark">{p}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-brand-textDark">Therapy Protocol</h3>
              <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed bg-white border border-brand-borderLight p-4 rounded-xl">
                {study.recommendedRoutine}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-brand-textDark">Clinical Outcome</h3>
              <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-brand-blush/25 border border-brand-rose/5 p-4 rounded-xl flex items-start gap-2.5 max-w-xl mx-auto">
            <ShieldAlert className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
            <p className="text-[10px] text-brand-textMuted leading-normal">
              <strong>Case Disclaimer:</strong> Fictional demo case study. Results may vary depending on individual scalp/skin conditions. No medical diagnoses or guarantees are implied.
            </p>
          </div>

          <div className="text-center pt-6">
            <Link to="/case-studies" className="inline-flex items-center gap-1 text-xs font-bold text-brand-pink hover:text-brand-rose underline">
              <ArrowLeft className="w-4 h-4" /> Back to Transformations List
            </Link>
          </div>

        </div>
      </>
    );
  }

  // LIST VIEW
  return (
    <>
      <SEO 
        title="Customer Transformations"
        description="Explore visual before & after cases. Verify custom product regimens and skin wellness recovery outcomes."
        canonicalPath="/case-studies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Transformations</h1>
          <p className="text-xs text-brand-textMuted">Explore real recovery blueprints of users dealing with chronic skin and hair concerns.</p>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {MOCK_CASE_STUDIES.map(caseStudy => (
            <div 
              key={caseStudy.id} 
              className="bg-white border border-brand-borderLight rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={caseStudy.image} alt={caseStudy.customerName} className="w-14 h-14 object-cover rounded-full shadow-xs" />
                  <div>
                    <h3 className="font-serif font-bold text-base text-brand-textDark leading-tight">{caseStudy.title}</h3>
                    <p className="text-[10px] text-brand-textMuted">{caseStudy.customerName}, Age {caseStudy.age} • {caseStudy.city}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-brand-cream/15 p-3.5 rounded-xl border border-brand-borderLight/40">
                  <div>
                    <span className="font-bold text-brand-textDark block">Concern:</span>
                    <span className="text-brand-rose font-medium">{caseStudy.concern}</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-textDark block">Timeline:</span>
                    <span className="text-brand-purple font-medium">{caseStudy.timeline}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-textMuted leading-relaxed">
                  <strong>Regimen:</strong> {caseStudy.recommendedRoutine}
                </p>
                <p className="text-xs text-brand-textDark font-medium bg-brand-cream/10 p-3 rounded-lg border border-brand-borderLight/30">
                  <strong>Outcome:</strong> {caseStudy.outcome}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-borderLight/30 flex justify-between items-center text-[10.5px]">
                <Link 
                  to={`/case-studies/${caseStudy.slug}`} 
                  className="font-bold text-brand-pink hover:text-brand-rose hover:underline"
                >
                  Read Full Transformation Story →
                </Link>
                <span className="text-brand-textMuted italic">*Fictional demo case</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
