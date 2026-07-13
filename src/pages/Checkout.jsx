import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, ChevronLeft, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import { getCart, saveOrder, clearCart } from "../utils/db";

export default function Checkout() {
  const [step, setStep] = useState(1); // 1: Customer, 2: Address, 3: Shipping, 4: Payment, 5: Review
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Form states
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [addressInfo, setAddressInfo] = useState({ address: "", apartment: "", city: "Ahmedabad", state: "Gujarat", postalCode: "" });
  const [deliveryMethod, setDeliveryMethod] = useState("standard"); // standard, express, pickup
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, upi, card, netbanking
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      navigate("/cart");
    } else {
      setCartItems(items);
    }
  }, [navigate]);

  // Validations
  const validateStep = () => {
    const stepErrors = {};
    if (step === 1) {
      if (!customerInfo.name.trim()) stepErrors.name = "Full name is required.";
      if (!customerInfo.email.trim()) {
        stepErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
        stepErrors.email = "Invalid email format.";
      }
      if (!customerInfo.phone.trim()) {
        stepErrors.phone = "Phone number is required.";
      } else if (customerInfo.phone.replace(/[^0-9]/g, "").length < 8) {
        stepErrors.phone = "Valid phone is required.";
      }
    } else if (step === 2) {
      if (!addressInfo.address.trim()) stepErrors.address = "Address street is required.";
      if (!addressInfo.city.trim()) stepErrors.city = "City is required.";
      if (!addressInfo.state.trim()) stepErrors.state = "State is required.";
      if (!addressInfo.postalCode.trim()) {
        stepErrors.postalCode = "Pin Code is required.";
      } else if (addressInfo.postalCode.length !== 6 || !/^\d+$/.test(addressInfo.postalCode)) {
        stepErrors.postalCode = "Must be a 6-digit number.";
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Hardcoded standard discount logic from coupons or default
  const discountAmt = subtotal >= 1500 ? Math.round(subtotal * 0.1) : 0; // 10% auto discount above 1500
  
  const getShippingCost = () => {
    if (deliveryMethod === "pickup") return 0;
    if (deliveryMethod === "express") return 150;
    // Standard standard free above 999
    return subtotal >= 999 ? 0 : 99;
  };

  const shippingCost = getShippingCost();
  const total = subtotal - discountAmt + shippingCost;

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const orderData = {
      customer: customerInfo,
      shippingAddress: addressInfo,
      deliveryMethod,
      paymentMethod,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize
      })),
      subtotal,
      discount: discountAmt,
      shipping: shippingCost,
      total,
      status: "Order Placed"
    };

    // Save order in localStorage (triggers CRM additions in db.js)
    const savedOrder = saveOrder(orderData);
    
    // Clear cart
    clearCart();
    
    // Redirect with order ID
    navigate("/order-success", { state: { order: savedOrder } });
  };

  return (
    <>
      <SEO 
        title="Checkout Demo"
        description="Complete your order. Fill in delivery address and billing details securely inside our frontend sandbox environment."
        canonicalPath="/checkout"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Secure Checkout</h1>
          <p className="text-xs text-brand-textMuted">Complete your purchase inside our simulated sandbox.</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-1 sm:gap-4 max-w-xl mx-auto mb-10 text-xs font-semibold text-brand-textMuted">
          {[
            { num: 1, label: "Info" },
            { num: 2, label: "Address" },
            { num: 3, label: "Shipping" },
            { num: 4, label: "Payment" },
            { num: 5, label: "Review" }
          ].map(s => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-1">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s.num 
                    ? "bg-brand-pink text-white shadow" 
                    : step > s.num 
                    ? "bg-brand-green text-white" 
                    : "bg-brand-borderLight text-brand-textMuted"
                }`}>
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className={`hidden sm:inline ${step === s.num ? "text-brand-pink font-bold" : ""}`}>{s.label}</span>
              </div>
              {s.num < 5 && <ChevronRight className="w-4 h-4 text-brand-borderLight" />}
            </React.Fragment>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Form Wizard panel */}
          <div className="lg:col-span-2 bg-white border border-brand-borderLight p-6 sm:p-8 rounded-3xl shadow-sm text-left">
            
            {/* STEP 1: Customer Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sneha Vyas"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none ${errors.name ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. sneha.vyas@gmail.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none ${errors.email ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 76005 83156"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none ${errors.phone ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Address Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Delivery Address</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Street Address</label>
                    <input 
                      type="text" 
                      placeholder="House/Apartment no, Street, Area"
                      value={addressInfo.address}
                      onChange={(e) => setAddressInfo(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none ${errors.address ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.address && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">City</label>
                      <input 
                        type="text" 
                        value={addressInfo.city}
                        onChange={(e) => setAddressInfo(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full border border-brand-borderLight rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">State</label>
                      <input 
                        type="text" 
                        value={addressInfo.state}
                        onChange={(e) => setAddressInfo(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full border border-brand-borderLight rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark mb-1">Postal Code (6-digit PIN)</label>
                    <input 
                      type="text" 
                      maxLength="6"
                      placeholder="e.g. 380054"
                      value={addressInfo.postalCode}
                      onChange={(e) => setAddressInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2.5 text-xs bg-white focus:outline-none ${errors.postalCode ? "border-rose-400" : "border-brand-borderLight"}`}
                    />
                    {errors.postalCode && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Delivery Options */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Delivery Method</h3>
                <div className="space-y-3">
                  {[
                    { id: "standard", title: "Standard Delivery Demo", desc: "Arrives in 2-3 business days. (FREE for orders above ₹999, else ₹99)", price: subtotal >= 999 ? "FREE" : "₹99" },
                    { id: "express", title: "Express Delivery Demo", desc: "Arrives next day in Ahmedabad. Guaranteed.", price: "₹150" },
                    { id: "pickup", title: "Store Pickup Demo (Ahmedabad Headquarters)", desc: "Collect from Premium Plaza Bodakdev store in 4 hours.", price: "FREE" }
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setDeliveryMethod(method.id)}
                      className={`w-full text-left p-4 border rounded-xl flex justify-between items-center transition-all ${
                        deliveryMethod === method.id 
                          ? "border-brand-pink bg-brand-blush/40 text-brand-rose" 
                          : "border-brand-borderLight bg-white text-brand-textDark hover:border-brand-pink/55"
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <Truck className="w-4 h-4 shrink-0" />
                          {method.title}
                        </p>
                        <p className="text-[10.5px] text-brand-textMuted leading-relaxed">{method.desc}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-rose shrink-0">{method.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Payment Options */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Payment Method Demo</h3>
                
                <div className="bg-brand-blush/40 border border-brand-rose/20 p-3.5 rounded-xl flex items-start gap-2.5">
                  <CreditCard className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                  <p className="text-[11px] text-brand-rose font-semibold leading-normal">
                    Important: Frontend demonstration only. No real transaction will occur and no payment forms will ask for real CVV pin codes.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: "cod", title: "Cash on Delivery Demo", desc: "Pay with Cash or UPI upon package arrival at your doorstep." },
                    { id: "upi", title: "UPI Demo (GPay, PhonePe, Paytm)", desc: "Visual pre-loaded UPI QR Code demo scan." },
                    { id: "card", title: "Credit / Debit Card Demo", desc: "Mock credit card terminal entry simulation." },
                    { id: "netbanking", title: "Net Banking Demo", desc: "Simulated routing via major Indian banks." }
                  ].map(pay => (
                    <button
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id)}
                      className={`w-full text-left p-4 border rounded-xl flex justify-between items-center transition-all ${
                        paymentMethod === method.id || paymentMethod === pay.id // simple check
                          ? "border-brand-pink bg-brand-blush/40 text-brand-rose" 
                          : "border-brand-borderLight bg-white text-brand-textDark hover:border-brand-pink/55"
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold">{pay.title}</p>
                        <p className="text-[10.5px] text-brand-textMuted mt-0.5">{pay.desc}</p>
                      </div>
                      {paymentMethod === pay.id && (
                        <div className="w-5 h-5 rounded-full bg-brand-pink flex items-center justify-center text-white shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Final Review */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="font-serif font-bold text-lg text-brand-textDark border-b border-brand-borderLight pb-2">Review Your Order</h3>
                
                {/* Information cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight">
                    <p className="font-bold text-brand-textDark uppercase mb-1">Customer Info</p>
                    <p>{customerInfo.name}</p>
                    <p>{customerInfo.email}</p>
                    <p>{customerInfo.phone}</p>
                  </div>
                  <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight">
                    <p className="font-bold text-brand-textDark uppercase mb-1">Delivery Address</p>
                    <p>{addressInfo.address}</p>
                    {addressInfo.apartment && <p>{addressInfo.apartment}</p>}
                    <p>{addressInfo.city}, {addressInfo.state} - {addressInfo.postalCode}</p>
                  </div>
                </div>

                {/* Delivery and payment review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight flex justify-between items-center">
                    <div>
                      <p className="font-bold text-brand-textDark uppercase">Delivery Choice</p>
                      <p className="text-brand-textMuted capitalize">{deliveryMethod} Delivery</p>
                    </div>
                    <span className="font-bold text-brand-pink">₹{shippingCost}</span>
                  </div>
                  <div className="bg-brand-cream/15 p-4 rounded-xl border border-brand-borderLight flex justify-between items-center">
                    <div>
                      <p className="font-bold text-brand-textDark uppercase">Payment Choice</p>
                      <p className="text-brand-textMuted uppercase">{paymentMethod} Sandbox</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">DEMO</span>
                  </div>
                </div>

                {/* Items overview */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-brand-textDark text-sm">Cart Items Review</h4>
                  <div className="divide-y divide-brand-borderLight border border-brand-borderLight rounded-xl overflow-hidden bg-white">
                    {cartItems.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="p-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-brand-textDark leading-none">{item.name}</p>
                          <p className="text-[10px] text-brand-textMuted mt-1">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-brand-textDark">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order execution form */}
                <form onSubmit={handleSubmitOrder} className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-pink hover:bg-brand-rose text-white text-xs sm:text-sm font-bold py-3.5 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                  >
                    <ShieldCheck className="w-5 h-5" /> Confirm & Place Sandbox Order (₹{total})
                  </button>
                  <p className="text-[10px] text-brand-textMuted text-center mt-2 italic">
                    By confirming, you agree that this is a simulated transaction. Order records will populate inside the CRM demo.
                  </p>
                </form>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 5 && (
              <div className="border-t border-brand-borderLight pt-6 mt-6 flex justify-between">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 border border-brand-borderLight hover:border-brand-pink px-5 py-2.5 rounded-full text-xs font-bold text-brand-textDark transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <Link 
                    to="/cart"
                    className="flex items-center gap-1 border border-brand-borderLight hover:border-brand-pink px-5 py-2.5 rounded-full text-xs font-bold text-brand-textMuted transition-colors"
                  >
                    Return to Cart
                  </Link>
                )}
                
                <button
                  onClick={handleNext}
                  className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md flex items-center gap-1"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* RIGHT Sidebar Cart summary */}
          <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-3xl space-y-4">
            <h3 className="font-serif font-bold text-brand-textDark text-lg border-b border-brand-borderLight pb-3">Shopping Summary</h3>
            
            <div className="space-y-3.5 max-h-56 overflow-y-auto divide-y divide-brand-borderLight/30 pr-1.5 scrollbar-thin">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 pt-3 first:pt-0 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                  <div className="overflow-hidden text-left flex-1">
                    <h4 className="font-serif font-bold text-xs text-brand-textDark truncate">{item.name}</h4>
                    <p className="text-[10px] text-brand-textMuted mt-0.5">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-brand-textDark shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-borderLight pt-4 space-y-2.5 text-xs text-brand-textMuted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-textDark">₹{subtotal}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Combo Discount</span>
                  <span>-₹{discountAmt}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-brand-textDark">
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>
            </div>

            <div className="border-t border-brand-borderLight pt-4 flex justify-between items-center font-bold">
              <span className="text-xs text-brand-textDark">Order Total</span>
              <span className="text-lg text-brand-pink">₹{total}</span>
            </div>

            <div className="pt-2 text-center flex justify-center gap-1 text-[10px] text-brand-textMuted">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Free Delivery Pin Codes: Ahmedabad city limits.</span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
