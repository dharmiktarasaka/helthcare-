import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Check, ShoppingCart, MessageSquare, ShieldCheck } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/mockData";
import { addToCart, saveQuizResults } from "../utils/db";

const QUESTIONS = [
  {
    id: "skinType",
    question: "What is your skin type?",
    options: [
      { value: "oily", label: "Oily & Shiny", desc: "Feels greasy, enlarged pores" },
      { value: "dry", label: "Dry & Flaky", desc: "Feels tight, looks parched" },
      { value: "sensitive", label: "Sensitive & Red", desc: "Prone to itching or burning" },
      { value: "combination", label: "Combination", desc: "Oily T-zone, normal cheeks" },
      { value: "all", label: "Normal / Balanced", desc: "Smooth texture, no major issues" }
    ]
  },
  {
    id: "skinConcern",
    question: "What is your primary skin concern?",
    options: [
      { value: "acne", label: "Acne and Breakouts", desc: "Pimples, blackheads, spots" },
      { value: "dry-skin", label: "Dryness & Tightness", desc: "Need intense moisture lock" },
      { value: "pigmentation", label: "Pigmentation & Dark Spots", desc: "Sun spots, uneven tone" },
      { value: "dull-skin", label: "Dull Skin / Loss of Glow", desc: "Tired looking complexion" },
      { value: "sensitive-skin", label: "Skin Redness & Sensitivity", desc: "Prone to irritation" }
    ]
  },
  {
    id: "hairType",
    question: "What is your hair type?",
    options: [
      { value: "dry", label: "Dry & Coarse", desc: "Lacks shine, breaks easily" },
      { value: "oily", label: "Oily Scalp", desc: "Needs washing very frequently" },
      { value: "normal", label: "Normal / Balanced", desc: "Easy to manage, healthy shine" }
    ]
  },
  {
    id: "hairConcern",
    question: "What is your main hair concern?",
    options: [
      { value: "hair-fall", label: "Hair Fall & Thinning", desc: "Noticeable shedding" },
      { value: "frizzy-hair", label: "Frizz and Split Ends", desc: "Hard to style, dehydrated" },
      { value: "dandruff", label: "Flaky/Itchy Scalp", desc: "Dandruff or buildup" },
      { value: "none", label: "No major concerns", desc: "General maintenance" }
    ]
  },
  {
    id: "preference",
    question: "What type of product formula do you prefer?",
    options: [
      { value: "organic", label: "Organic & Botanical", desc: "Aura Botanicals / Lunara Organics" },
      { value: "clinical", label: "Dermatologist Approved", desc: "Active clinical concentrations" },
      { value: "vegan", label: "100% Vegan & Cruelty-Free", desc: "Clean, plant-derived" }
    ]
  }
];

export default function BeautyQuiz() {
  const [step, setStep] = useState(0); // 0: intro, 1-5: questions, 6: leadForm, 7: results
  const [answers, setAnswers] = useState({
    skinType: "",
    skinConcern: "",
    hairType: "",
    hairConcern: "",
    preference: ""
  });
  
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [recommendedProds, setRecommendedProds] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  const handleSelectOption = (questionKey, optionValue) => {
    setAnswers(prev => ({ ...prev, [questionKey]: optionValue }));
    // Auto advance after short delay
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 300);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!userInfo.name.trim()) errors.name = "Name is required.";
    if (!userInfo.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!userInfo.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (userInfo.phone.replace(/[^0-9]/g, "").length < 8) {
      errors.phone = "Enter a valid phone number.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Filter products based on answers
    const matched = MOCK_PRODUCTS.filter(p => {
      // Skin concern match
      const matchesSkinConcern = p.concern === answers.skinConcern;
      // Hair concern match
      const matchesHairConcern = p.concern === answers.hairConcern;
      // Category match
      const matchesCategory = p.category === "skincare" && p.skinType === answers.skinType;
      
      return matchesSkinConcern || matchesHairConcern || matchesCategory;
    });

    const finalRecommendations = matched.length > 0 ? matched.slice(0, 3) : MOCK_PRODUCTS.slice(0, 2);
    setRecommendedProds(finalRecommendations);

    // Save results and submit lead to CRM
    saveQuizResults({
      ...answers,
      ...userInfo,
      recommendations: finalRecommendations
    });

    setStep(7); // Show results
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, product.size);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-cream/35 border border-brand-borderLight rounded-3xl p-6 sm:p-10 shadow-lg font-sans">
      
      {/* ProgressBar */}
      {step > 0 && step < 7 && (
        <div className="w-full bg-brand-borderLight h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-rose to-brand-purple h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-brand-blush rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-brand-pink animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark">Find Your Perfect Care Routine</h3>
              <p className="text-xs sm:text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed">
                Take our 1-minute personalized analysis. Our skin & hair specialists will analyze your concerns and generate a clinical recommended regimen.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-8 py-3.5 rounded-full shadow-md flex items-center gap-2 mx-auto transition-transform hover:scale-[1.02]"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-brand-textMuted italic">
              🔒 Privacy Protected. Leads logged into local demonstration CRM.
            </p>
          </motion.div>
        )}

        {/* Steps 1 to 5: Questions */}
        {step > 0 && step <= QUESTIONS.length && (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-xs text-brand-textMuted font-semibold">
              <span>Question {step} of {QUESTIONS.length}</span>
              <button 
                onClick={handlePrev}
                className="flex items-center gap-1 hover:text-brand-pink transition-colors"
              >
                <ArrowLeft className="w-4.5 h-4.5" /> Back
              </button>
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-textDark">
              {QUESTIONS[step - 1].question}
            </h3>

            <div className="space-y-3 pt-2">
              {QUESTIONS[step - 1].options.map((opt, idx) => {
                const questionKey = QUESTIONS[step - 1].id;
                const isSelected = answers[questionKey] === opt.value;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(questionKey, opt.value)}
                    className={`w-full text-left px-5 py-4 border rounded-2xl flex justify-between items-center transition-all ${
                      isSelected 
                        ? "border-brand-pink bg-brand-blush/40 text-brand-rose" 
                        : "border-brand-borderLight bg-white text-brand-textDark hover:border-brand-pink/55 hover:bg-brand-cream/10"
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold">{opt.label}</p>
                      <p className="text-[11px] text-brand-textMuted mt-0.5">{opt.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center text-white shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 6: Lead Form */}
        {step === 6 && (
          <motion.div
            key="leadForm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center text-xs text-brand-textMuted font-semibold">
              <span>Personal Details</span>
              <button 
                onClick={handlePrev}
                className="flex items-center gap-1 hover:text-brand-pink transition-colors"
              >
                <ArrowLeft className="w-4.5 h-4.5" /> Back
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-textDark">Who should we send the results to?</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                Enter your details to generate your customized skin & hair blueprint. Your results will be saved to our demo database.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Meera Sharma"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink bg-white ${formErrors.name ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {formErrors.name && <p className="text-[10px] text-rose-500 font-semibold mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. meera@gmail.com"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink bg-white ${formErrors.email ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {formErrors.email && <p className="text-[10px] text-rose-500 font-semibold mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-textDark mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 76005 83156"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink bg-white ${formErrors.phone ? "border-rose-400" : "border-brand-borderLight"}`}
                />
                {formErrors.phone && <p className="text-[10px] text-rose-500 font-semibold mt-1">{formErrors.phone}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-rose via-brand-pink to-brand-purple text-white text-xs font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 mt-4 hover:opacity-95 transition-all"
              >
                <span>Generate Recommendations</span>
                <Sparkles className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 7: Results & Recommendations */}
        {step === 7 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 text-center"
          >
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-brand-textDark">Welcome, {userInfo.name}!</h3>
              <p className="text-xs text-brand-textMuted max-w-md mx-auto">
                Based on your skin type (<strong>{answers.skinType}</strong>) and interest (<strong>{answers.skinConcern || answers.hairConcern}</strong>), here is your dermatologist-demo recommended blueprint.
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              {recommendedProds.map((prod) => (
                <div key={prod.id} className="bg-white border border-brand-borderLight rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <img src={prod.image} alt={prod.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <p className="text-[10px] uppercase font-bold text-brand-textMuted tracking-wider">{prod.brand}</p>
                    <h4 className="font-serif font-bold text-xs text-brand-textDark mt-0.5 line-clamp-1">{prod.name}</h4>
                    <p className="text-[9px] text-brand-pink font-semibold mt-1">₹{prod.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className={`w-full mt-3 py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                      addedItems[prod.id] 
                        ? "bg-emerald-600 text-white" 
                        : "bg-brand-pink hover:bg-brand-rose text-white shadow-sm"
                    }`}
                  >
                    {addedItems[prod.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="border-t border-brand-borderLight pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={`https://wa.me/917600583156?text=${encodeURIComponent(`Hello, I completed the Lunara Beauty Quiz as ${userInfo.name} and my skin type is ${answers.skinType}. I would like to consult a skin expert.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Speak to a Beauty Expert</span>
              </a>

              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({ skinType: "", skinConcern: "", hairType: "", hairConcern: "", preference: "" });
                  setUserInfo({ name: "", email: "", phone: "" });
                }}
                className="w-full sm:w-auto bg-brand-cream hover:bg-brand-blush/40 text-brand-rose border border-brand-rose/20 text-xs font-bold px-6 py-3 rounded-full transition-colors"
              >
                Retake Quiz
              </button>
            </div>

            <p className="text-[10px] text-brand-textMuted italic">
              *Quiz lead details successfully forwarded to CRM dashboard leads panel.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
