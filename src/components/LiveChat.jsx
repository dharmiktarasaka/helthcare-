import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, MessageSquareHeart } from "lucide-react";
import { addCRMLead } from "../utils/db";
import { MOCK_PRODUCTS } from "../data/mockData";
import { Link } from "react-router-dom";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 🌸 Welcome to Lunara Health & Beauty. I am your virtual assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState("options"); // options, getName, getEmail, getPhone, getConcern, finished
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "", concern: "" });
  const [recommendations, setRecommendations] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (text, sender = "bot") => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const botReply = (text, delay = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, "bot");
    }, delay);
  };

  const handleOptionClick = (option) => {
    addMessage(option, "user");
    
    if (option === "Find Skincare Products" || option === "Find Haircare Products") {
      setLeadData(prev => ({ ...prev, concern: option.includes("Skincare") ? "Skincare" : "Haircare" }));
      botReply("I'd love to help you find the perfect products! Let's start by getting to know you. May I know your name first?");
      setChatStep("getName");
    } else if (option === "Track Demo Order") {
      botReply("Please enter your 6-digit mock order number (e.g., LNR-492948) to track your demo delivery.");
      setChatStep("trackOrder");
    } else if (option === "Book Consultation") {
      botReply("Great choice! You can schedule a dedicated consultation session by visiting our booking page. Type 'OK' or click below to proceed.", 800);
      botReply("🔗 [Click here to Book a Consultation](/booking)", 1500);
    } else if (option === "Current Offers") {
      botReply("We have some exciting deals right now! Enjoy 25% off our Hyaluronic Acid Serum, and 24% off our Radiant Glow Routine Gift Set. Check out our offers page!", 1000);
      botReply("🔗 [View All Offers](/offers)", 1600);
    } else if (option === "Talk to Support") {
      botReply("Sure! Let's register your support ticket. Could you tell me your name first?");
      setChatStep("getName");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const val = inputValue.trim();
    addMessage(val, "user");
    setInputValue("");

    if (chatStep === "getName") {
      setLeadData(prev => ({ ...prev, name: val }));
      botReply(`Hi ${val}! 🌟 What is your email address so we can send you recommendations or contact you?`);
      setChatStep("getEmail");
    } else if (chatStep === "getEmail") {
      setLeadData(prev => ({ ...prev, email: val }));
      botReply("Thank you! And what phone number can we reach you at (for WhatsApp support)?");
      setChatStep("getPhone");
    } else if (chatStep === "getPhone") {
      setLeadData(prev => ({ ...prev, phone: val }));
      if (leadData.concern === "Skincare" || leadData.concern === "Haircare") {
        botReply(`Almost done! What is your specific skin or hair concern? (e.g. acne, dry skin, hair fall, frizz, sensitive skin)`);
        setChatStep("getConcern");
      } else {
        botReply("Got it! Please describe your support query briefly.");
        setChatStep("getConcern");
      }
    } else if (chatStep === "getConcern") {
      const finalConcern = val;
      const updatedLead = { ...leadData, concern: finalConcern, source: "Live Chat", status: "New" };
      setLeadData(updatedLead);
      
      // Save lead to CRM
      addCRMLead(updatedLead);

      // Extract mock product suggestions
      const matched = MOCK_PRODUCTS.filter(
        p => p.concern.toLowerCase().includes(finalConcern.toLowerCase()) || 
             p.category.toLowerCase().includes(finalConcern.toLowerCase()) || 
             p.name.toLowerCase().includes(finalConcern.toLowerCase())
      );
      setRecommendations(matched.slice(0, 2));

      botReply("Excellent! I have successfully saved your details and created a CRM lead ticket.");
      botReply("Our beauty consultants will reach out to you on WhatsApp within 10 minutes. Here are some immediate products recommended for you:", 1500);
      setChatStep("finished");
    } else if (chatStep === "trackOrder") {
      botReply(`🔍 Tracking demo order: ${val}...`);
      botReply(`Status: Shipping In-Progress. Package is at the sorting hub in Ahmedabad. Estimated delivery: 2-3 business days.`, 1800);
      setChatStep("options");
    } else {
      // fallback
      botReply("Thank you for your message. If you want specific advice, try booking a visual consultation or chatting on WhatsApp!");
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 font-sans">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-rose via-brand-pink to-brand-purple flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform duration-300 relative border border-white/20"
        whileTap={{ scale: 0.95 }}
        aria-label="Open support chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-rose opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-rose text-[9px] text-white justify-center items-center font-bold">1</span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[480px] bg-white rounded-2xl shadow-2xl border border-brand-borderLight overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-rose via-brand-pink to-brand-purple px-4 py-3 text-white flex items-center justify-between border-b border-brand-borderLight shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquareHeart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-none">Lunara Assistant</h4>
                  <span className="text-[10px] text-brand-blush/80">Demo Sandbox Support</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-brand-cream/20 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-brand-pink text-white rounded-tr-none" 
                        : "bg-white text-brand-textDark border border-brand-borderLight rounded-tl-none"
                    }`}
                  >
                    {/* Render helper text with markdown styling */}
                    {msg.text.includes("🔗") ? (
                      <div>
                        {msg.text.split("🔗")[0]}
                        {msg.text.includes("[") && (
                          <Link 
                            to={msg.text.split("[")[1].split("]")[0] === "Click here to Book a Consultation" ? "/booking" : "/offers"}
                            onClick={() => setIsOpen(false)}
                            className="text-brand-pink font-bold hover:underline block mt-1"
                          >
                            {msg.text.split("[")[1].split("]")[0]}
                          </Link>
                        )}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className={`block text-[8px] mt-1 text-right ${msg.sender === "user" ? "text-white/70" : "text-brand-textMuted"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-borderLight rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-brand-pink rounded-full animate-bounce delay-250"></span>
                  </div>
                </div>
              )}

              {/* Matched product recommendations cards */}
              {chatStep === "finished" && recommendations.length > 0 && (
                <div className="space-y-2 mt-2">
                  <p className="text-[10px] uppercase font-bold text-brand-pink tracking-wider">Top Matches:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {recommendations.map(p => (
                      <Link 
                        to={`/product/${p.slug}`}
                        key={p.id}
                        onClick={() => setIsOpen(false)}
                        className="bg-white border border-brand-borderLight rounded-xl p-2 flex flex-col justify-between hover:border-brand-pink/50 transition-all text-left"
                      >
                        <img src={p.image} alt={p.name} className="w-full h-16 object-cover rounded-lg mb-1" />
                        <div>
                          <p className="text-[10px] font-bold text-brand-textDark truncate">{p.name}</p>
                          <p className="text-[9px] text-brand-pink font-semibold">₹{p.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Options (Only show in options step) */}
              {chatStep === "options" && !isTyping && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {[
                    "Find Skincare Products",
                    "Find Haircare Products",
                    "Track Demo Order",
                    "Book Consultation",
                    "Current Offers",
                    "Talk to Support"
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white hover:bg-brand-blush border border-brand-borderLight hover:border-brand-pink text-brand-textDark hover:text-brand-rose px-3 py-1.5 rounded-full text-[10.5px] font-medium transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar (Only show when not in option selection step) */}
            {chatStep !== "options" && (
              <form onSubmit={handleFormSubmit} className="border-t border-brand-borderLight p-3 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    chatStep === "getName" ? "Enter your name..." :
                    chatStep === "getEmail" ? "Enter your email..." :
                    chatStep === "getPhone" ? "Enter your phone..." :
                    chatStep === "getConcern" ? "Describe your concern..." :
                    chatStep === "trackOrder" ? "Enter order code..." :
                    "Type a message..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 border border-brand-borderLight rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink"
                />
                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center hover:bg-brand-rose transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Reset chat link */}
            {chatStep === "finished" && (
              <div className="bg-brand-cream/30 text-center py-2 border-t border-brand-borderLight">
                <button 
                  onClick={() => {
                    setChatStep("options");
                    setLeadData({ name: "", email: "", phone: "", concern: "" });
                    setRecommendations([]);
                    setMessages([
                      {
                        id: 1,
                        sender: "bot",
                        text: "Welcome back! Let me know how else I can support you.",
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);
                  }}
                  className="text-[10px] font-bold text-brand-pink hover:text-brand-rose"
                >
                  🔄 Reset Assistant Chat
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
