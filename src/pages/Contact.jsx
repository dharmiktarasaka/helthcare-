import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, MessageSquare, ShieldCheck, Heart, Send } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS_CONFIG } from "../config/config";
import { addCRMLead } from "../utils/db";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "Product Support",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    }
    if (!formData.message.trim()) errs.message = "Message query is required.";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Add lead details to CRM
      addCRMLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: "Contact Form",
        interest: formData.enquiryType,
        concern: "General Enquiry",
        status: "New",
        notes: `Enquiry Type: ${formData.enquiryType}. Message: ${formData.message}`,
        orderValue: 0
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        enquiryType: "Product Support",
        message: ""
      });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Lunara Health & Beauty in Ahmedabad. Call us, send an email, or submit product support inquiries online."
        canonicalPath="/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Contact Lunara</h1>
          <p className="text-xs text-brand-textMuted">Reach out to our teams for organic product support, skincare consultation queries, and order info.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-left">
          
          {/* Form Box */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-brand-borderLight p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Enquiry Form</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Priyasheel Patel"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white ${errors.name ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {errors.name && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 90162 89684"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white ${errors.phone ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. priya@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white ${errors.email ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Enquiry Topic</label>
                <select
                  value={formData.enquiryType}
                  onChange={(e) => setFormData(prev => ({ ...prev, enquiryType: e.target.value }))}
                  className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs focus:outline-none text-brand-textDark font-bold bg-white"
                >
                  <option value="Product Support">Product Support / Ingredients</option>
                  <option value="Order Tracking">Order tracking demo</option>
                  <option value="Booking Inquiry">Consultation Booking query</option>
                  <option value="Corporate/Bulk">Corporate bulk gifting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Message Query</label>
              <textarea 
                rows="4"
                placeholder="Detail your question..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white text-brand-textDark ${errors.message ? "border-rose-400" : "border-brand-borderLight"}`}
              />
              {errors.message && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" /> Submit Enquiry Form
            </button>
            {success && <p className="text-xs text-emerald-600 font-semibold text-center mt-2">✓ Enquiry submitted! Saved locally in demo CRM database.</p>}
          </form>

          {/* Sidebar Contacts */}
          <div className="space-y-6">
            
            {/* Business info details */}
            <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-3xl space-y-4">
              <h3 className="font-serif font-bold text-brand-textDark text-lg border-b border-brand-borderLight pb-3">Corporate Office</h3>
              
              <div className="space-y-3.5 text-xs text-brand-textMuted">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Lunara Headquarters</p>
                    <p>{BUSINESS_CONFIG.address}</p>
                    <p>{BUSINESS_CONFIG.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Phone Support Line</p>
                    <a href={BUSINESS_CONFIG.callLinks.primary} className="block hover:underline">{BUSINESS_CONFIG.phones.primary} (Primary)</a>
                    <a href={BUSINESS_CONFIG.callLinks.alternate} className="block hover:underline">{BUSINESS_CONFIG.phones.alternate} (Alternate)</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Email Support</p>
                    <a href={BUSINESS_CONFIG.emailLink} className="hover:underline">{BUSINESS_CONFIG.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-textDark">Office Hours</p>
                    <p>{BUSINESS_CONFIG.businessHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-brand-borderLight p-5 rounded-2xl space-y-3 text-xs">
              <h4 className="font-serif font-bold text-brand-textDark text-sm">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2 text-center font-bold">
                <a 
                  href={BUSINESS_CONFIG.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-4.5 h-4.5" /> WhatsApp
                </a>
                <Link 
                  to="/booking"
                  className="bg-brand-blush/40 text-brand-rose hover:bg-brand-blush p-2.5 rounded-xl border border-brand-rose/10 flex items-center justify-center gap-1"
                >
                  <Heart className="w-4.5 h-4.5" /> Book Slot
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Map placeholder */}
        <div className="mt-16 bg-brand-cream/10 border border-brand-borderLight rounded-3xl p-4 overflow-hidden shadow-inner">
          <div className="h-64 sm:h-80 bg-brand-blush/30 rounded-2xl flex flex-col justify-center items-center gap-2 border border-brand-borderLight/40">
            <MapPin className="w-8 h-8 text-brand-pink animate-bounce" />
            <h4 className="font-serif font-bold text-brand-textDark">Lunara HQ Clinic Location</h4>
            <p className="text-xs text-brand-textMuted text-center max-w-xs leading-normal">Bodakdev area, S.G. Highway, Ahmedabad, Gujarat, India. (Interactive maps loaded in live staging)</p>
          </div>
        </div>

      </div>
    </>
  );
}
