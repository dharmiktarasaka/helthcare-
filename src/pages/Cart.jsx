import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Heart, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { getCart, removeFromCart, updateCartQuantity, clearCart, toggleWishlist } from "../utils/db";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);
  const [couponError, setCouponError] = useState("");
  const navigate = useNavigate();

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cart_updated", loadCart);
    return () => window.removeEventListener("cart_updated", loadCart);
  }, []);

  const handleRemove = (id, size) => {
    removeFromCart(id, size);
  };

  const handleQtyChange = (id, size, qty) => {
    updateCartQuantity(id, qty, size);
  };

  const handleMoveToWishlist = (item) => {
    toggleWishlist(item);
    removeFromCart(item.id, item.selectedSize);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "GLOW20") {
      setCouponApplied("GLOW20");
      setCouponError("");
      setCouponCode("");
    } else if (code === "WELCOME10") {
      setCouponApplied("WELCOME10");
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try 'GLOW20' (20% Off) or 'WELCOME10' (10% Off).");
      setCouponApplied("");
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied("");
    setDiscountAmt(0);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount based on active coupon
  useEffect(() => {
    if (couponApplied === "GLOW20") {
      setDiscountAmt(Math.round(subtotal * 0.2));
    } else if (couponApplied === "WELCOME10") {
      setDiscountAmt(Math.round(subtotal * 0.10));
    } else {
      setDiscountAmt(0);
    }
  }, [subtotal, couponApplied]);

  const shippingCost = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal - discountAmt + shippingCost;

  return (
    <>
      <SEO 
        title="Shopping Cart"
        description="Review apothecary items in your cart. Apply promo coupons, check shipping rates, and complete secure frontend checkout."
        canonicalPath="/cart"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Title */}
        <div className="text-center sm:text-left mb-8 space-y-1">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Shopping Bag</h1>
          <p className="text-xs text-brand-textMuted">Verify your items and proceed to visual delivery selection.</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty state */
          <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-16 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-brand-blush rounded-full flex items-center justify-center mx-auto text-brand-pink">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-xl text-brand-textDark">Your bag is empty</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                Before checking out, you must add some beauty or wellness products to your shopping cart.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-block bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-8 py-3 rounded-full shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Items Grid */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`}
                  className="bg-white border border-brand-borderLight p-4 sm:p-5 rounded-2xl flex gap-4 items-center shadow-xs hover:border-brand-pink/20 transition-all relative"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                  
                  <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-brand-textMuted uppercase">{item.brand}</p>
                      <h3 className="font-serif font-bold text-sm text-brand-textDark hover:text-brand-pink">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </h3>
                      <p className="text-[11px] text-brand-textMuted font-semibold">Variant: {item.selectedSize}</p>
                      
                      <div className="flex gap-4 pt-1.5 text-[10px] font-bold text-brand-pink">
                        <button 
                          onClick={() => handleMoveToWishlist(item)}
                          className="flex items-center gap-1 hover:text-brand-rose"
                        >
                          <Heart className="w-3.5 h-3.5" /> Move to Wishlist
                        </button>
                        <button 
                          onClick={() => handleRemove(item.id, item.selectedSize)}
                          className="flex items-center gap-1 text-brand-textMuted hover:text-brand-rose"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0">
                      {/* Quantity */}
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleQtyChange(item.id, item.selectedSize, item.quantity - 1)}
                          className="w-7 h-7 rounded border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-brand-textDark">{item.quantity}</span>
                        <button 
                          onClick={() => handleQtyChange(item.id, item.selectedSize, item.quantity + 1)}
                          className="w-7 h-7 rounded border border-brand-borderLight hover:border-brand-pink text-brand-textDark flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Prices */}
                      <div className="text-right">
                        <span className="font-sans font-bold text-brand-textDark text-sm block">₹{item.price * item.quantity}</span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-brand-textMuted block">₹{item.price} each</span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}

              <div className="flex justify-between items-center text-xs pt-2">
                <Link to="/shop" className="text-brand-pink hover:text-brand-rose font-bold underline">← Continue Shopping</Link>
                <button 
                  onClick={clearCart}
                  className="text-brand-textMuted hover:text-brand-rose font-bold underline"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Checkout Summary Sidebar */}
            <div className="space-y-6">
              
              {/* Summary panel */}
              <div className="bg-brand-cream/15 border border-brand-borderLight p-6 rounded-2xl space-y-4">
                <h3 className="font-serif font-bold text-brand-textDark text-lg border-b border-brand-borderLight pb-3">Order Summary</h3>
                
                <div className="space-y-2.5 text-xs text-brand-textMuted">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-bold text-brand-textDark">₹{subtotal}</span>
                  </div>
                  
                  {discountAmt > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span className="flex items-center gap-1 font-bold">🏷️ Coupon ({couponApplied}) <button onClick={handleRemoveCoupon} className="text-rose-500 font-bold ml-1 hover:underline">Remove</button></span>
                      <span className="font-bold">-₹{discountAmt}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-brand-textDark">
                      {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] text-brand-rose font-semibold bg-brand-blush/20 p-2 rounded-lg">
                      💡 Add ₹{999 - subtotal} more of products to enjoy FREE shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-brand-borderLight pt-4 flex justify-between items-center font-bold">
                  <span className="text-xs text-brand-textDark">Estimated Total</span>
                  <span className="text-xl text-brand-pink">₹{grandTotal}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold py-3.5 rounded-full shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Coupon inputs code */}
              <div className="bg-white border border-brand-borderLight p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-1 text-brand-textDark font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-brand-pink" />
                  <span>Have a Promo Coupon?</span>
                </div>
                <p className="text-[10px] text-brand-textMuted leading-relaxed">Use demo codes: <strong>GLOW20</strong> (20% discount) or <strong>WELCOME10</strong> (10% discount) to test checkout savings.</p>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border border-brand-borderLight rounded-lg px-3 py-2 text-xs w-full focus:outline-none uppercase"
                  />
                  <button 
                    type="submit" 
                    className="bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[10px] text-rose-500 font-semibold">{couponError}</p>}
                {couponApplied && <p className="text-[10px] text-emerald-600 font-semibold">✓ Coupon {couponApplied} successfully applied! Saving ₹{discountAmt}.</p>}
              </div>

              {/* Checkout support info */}
              <div className="bg-brand-blush/20 border border-brand-rose/10 p-4 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-brand-textMuted leading-normal">
                  <strong>Safe Demo Checkout:</strong> Orders placed are completely simulated. Lead details sync securely to your local CRM demo panel for dashboard tracking.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}
