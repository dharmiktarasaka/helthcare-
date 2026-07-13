import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall, MessageSquare } from "lucide-react";
import SEO from "../components/SEO";
import { GENERAL_FAQS } from "../data/mockData";
import { BUSINESS_CONFIG } from "../config/config";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  const moreFaqs = [
    {
      q: "What payment methods are supported in the demo checkout?",
      a: "The demo checkout simulates Cash on Delivery (COD), UPI (GPay, PhonePe, Paytm), simulated Credit/Debit Cards, and Net Banking checkouts. No actual transactions occur and no real CVV pins are requested."
    },
    {
      q: "How does the Personalized Beauty Quiz work?",
      a: "The quiz collects answers about your skin and hair type, specific concerns, preference, and typical budget. It compares the metrics against our mock apothecary database and selects the best matching product combo, saving details to the local CRM leads drawer."
    },
    {
      q: "Can I pick up my products in person?",
      a: "Yes! During demo checkout, you can select 'Store Pickup Demo'. You can collect packages from our headquarters at Premium Plaza, Bodakdev in Ahmedabad within 4 business hours."
    },
    {
      q: "Where can I view the inquiries and orders I submit?",
      a: "All quiz results, support inquiries, newsletter subscriptions, consultation bookings, and checkout orders are instantly logged in the local CRM panel under the 'CRM Demo' tab in the navbar. You can view or reset all data there."
    }
  ];

  const allFaqs = [...GENERAL_FAQS, ...moreFaqs];

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to product safety patch testing, apothecary comparisons, shipping pickups, and demo checkout guidelines."
        canonicalPath="/faq"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Apothecary FAQs</h1>
          <p className="text-xs text-brand-textMuted">Got questions? Find immediate information about safety testing and order tracking here.</p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {allFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-brand-borderLight rounded-2xl overflow-hidden shadow-xs hover:border-brand-pink/20 transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-sm sm:text-base text-brand-textDark focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-pink shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-textMuted shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-textMuted shrink-0 ml-2" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-textMuted leading-relaxed border-t border-brand-borderLight/20 pl-12 bg-brand-cream/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still need help CTA */}
        <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-6 sm:p-8 mt-12 text-center space-y-4">
          <h3 className="font-serif font-bold text-lg text-brand-textDark">Still Have Questions?</h3>
          <p className="text-xs text-brand-textMuted max-w-sm mx-auto leading-relaxed">
            Reach out to our customer support representatives in Ahmedabad. We are available Monday to Saturday, 9 AM to 7 PM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a 
              href={BUSINESS_CONFIG.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Assist</span>
            </a>
            <a 
              href={BUSINESS_CONFIG.callLinks.primary}
              className="border border-brand-borderLight hover:border-brand-pink text-brand-textDark hover:text-brand-pink text-xs font-bold px-6 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Support Line</span>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
