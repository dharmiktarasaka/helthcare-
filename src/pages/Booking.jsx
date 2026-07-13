import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Phone, Sparkles, CheckCircle2, MessageSquare, ArrowRight, ClipboardCheck } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS_CONFIG } from "../config/config";
import { saveBooking } from "../utils/db";

const CONSULTATION_TYPES = [
  { value: "skin-consultation", label: "Skin Consultation", desc: "Barrier assessment, hydration check, active acne routines." },
  { value: "hair-consultation", label: "Hair Consultation", desc: "Scalp assessment, thinning diagnostics, root oil scheduling." },
  { value: "beauty-consultation", label: "Beauty Product Consultation", desc: "Makeup shade matching, foundation undertone checks." },
  { value: "wellness-consultation", label: "Wellness Consultation", desc: "Stress cycle, diet supplement safety matching." },
  { value: "bridal-beauty", label: "Bridal Beauty Consultation", desc: "Occasion styling planning and skin radiance timers." },
  { value: "personal-care", label: "Personal Care Routine Planning", desc: "Daily self-hygiene and organic body care grids." }
];

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "skin-consultation",
    concern: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    }
    if (!formData.preferredDate) errs.preferredDate = "Date is required.";
    if (!formData.preferredTime) errs.preferredTime = "Time is required.";
    if (!formData.concern.trim()) errs.concern = "Main skin/hair concern is required.";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const saved = saveBooking(formData);
      setConfirmedBooking(saved);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        type: "skin-consultation",
        concern: "",
        preferredDate: "",
        preferredTime: "",
        message: ""
      });
    }
  };

  return (
    <>
      <SEO 
        title="Book a Consultation"
        description="Schedule a visual skin, hair, or wellness consultation online. Meet Ahmedabad specialists to draft custom routine blueprints."
        canonicalPath="/booking"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Book a Consultation</h1>
          <p className="text-xs text-brand-textMuted">Schedule direct visual assessments with our skin trichologists and wellness consultants.</p>
        </div>

        <AnimatePresence mode="wait">
          {!confirmedBooking ? (
            /* Form Panel */
            <motion.div 
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-left"
            >
              {/* Form Grid */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-brand-borderLight p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
                
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Consultation Form</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sneha Patel"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none ${errors.name ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">WhatsApp Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 76005 83156"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none ${errors.phone ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. sneha@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none ${errors.email ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Session Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs focus:outline-none text-brand-textDark font-bold bg-white"
                    >
                      {CONSULTATION_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-pink" /> Preferred Date</label>
                    <input 
                      type="date" 
                      value={formData.preferredDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none ${errors.preferredDate ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.preferredDate && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-pink" /> Preferred Time</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none bg-white ${errors.preferredTime ? "border-rose-400" : "border-brand-borderLight"}`}
                    >
                      <option value="">Select Time Slot</option>
                      <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="04:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="06:00 PM">06:00 PM - 07:00 PM</option>
                    </select>
                    {errors.preferredTime && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.preferredTime}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Your Primary Concern</label>
                  <input 
                    type="text" 
                    placeholder="e.g., active chin acne breakouts, severe hair fall on crown, dry scalp patches"
                    value={formData.concern}
                    onChange={(e) => setFormData(prev => ({ ...prev, concern: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none ${errors.concern ? "border-rose-400" : "border-brand-borderLight"}`}
                  />
                  {errors.concern && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.concern}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Additional Message (Optional)</label>
                  <textarea 
                    rows="3"
                    placeholder="Describe any past products used or clinical histories..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs focus:outline-none bg-white text-brand-textDark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-rose via-brand-pink to-brand-purple text-white text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                >
                  <Calendar className="w-4.5 h-4.5" /> Book Consultation Slot
                </button>
              </form>

              {/* Sidebar Info */}
              <div className="space-y-6">
                
                {/* Visual directory */}
                <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-3xl space-y-4">
                  <h3 className="font-serif font-bold text-brand-textDark text-lg border-b border-brand-borderLight pb-3">Available Sessions</h3>
                  <div className="space-y-3.5">
                    {CONSULTATION_TYPES.slice(0, 3).map(type => (
                      <div key={type.value} className="text-xs">
                        <p className="font-bold text-brand-textDark">{type.label}</p>
                        <p className="text-[10.5px] text-brand-textMuted mt-0.5 leading-relaxed">{type.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Link to="/services" className="text-xs text-brand-pink font-bold hover:underline">View All Consultation Details →</Link>
                  </div>
                </div>

                {/* Direct Connect */}
                <div className="bg-white border border-brand-borderLight p-5 rounded-2xl space-y-3.5">
                  <h4 className="font-serif font-bold text-brand-textDark text-base">Instant Scheduling</h4>
                  <p className="text-[10.5px] text-brand-textMuted leading-relaxed">Rather skip forms? Reach out directly via our WhatsApp hotline and book with our assistant.</p>
                  
                  <div className="space-y-2">
                    <a 
                      href={BUSINESS_CONFIG.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <a 
                      href={BUSINESS_CONFIG.callLinks.primary}
                      className="w-full border border-brand-borderLight hover:border-brand-pink text-brand-textDark hover:text-brand-pink text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {BUSINESS_CONFIG.phones.primary}</span>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            /* Booking Confirmed Screen */
            <motion.div 
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-8 text-center space-y-6 shadow-sm text-left"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5 text-center">
                <h3 className="font-serif font-bold text-2xl text-brand-textDark">Appointment Registered!</h3>
                <p className="text-xs text-brand-textMuted">Your mock slot request has been received.</p>
              </div>

              <div className="bg-white border border-brand-borderLight p-5 rounded-2xl text-xs space-y-3.5">
                <div className="flex justify-between items-center border-b border-brand-borderLight pb-2">
                  <span className="text-brand-textMuted uppercase font-bold text-[10px]">Booking Reference</span>
                  <span className="font-bold text-brand-textDark">{confirmedBooking.id}</span>
                </div>
                
                <div className="space-y-1.5">
                  <p><strong>Name:</strong> {confirmedBooking.name}</p>
                  <p><strong>Session:</strong> <span className="capitalize">{confirmedBooking.type.replace("-", " ")}</span></p>
                  <p><strong>Date:</strong> {confirmedBooking.preferredDate}</p>
                  <p><strong>Time:</strong> {confirmedBooking.preferredTime}</p>
                  <p><strong>Concern:</strong> {confirmedBooking.concern}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/917600583156?text=${encodeURIComponent(`Hello, I registered a consultation slot ${confirmedBooking.id} as ${confirmedBooking.name} on ${confirmedBooking.preferredDate} at ${confirmedBooking.preferredTime}. Please confirm.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Follow-Up
                </a>
                
                <Link
                  to="/crm"
                  className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1.5"
                >
                  <ClipboardCheck className="w-4.5 h-4.5" /> View in CRM Demo
                </Link>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="text-xs text-brand-pink hover:text-brand-rose underline font-bold"
                >
                  Book Another Session
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
