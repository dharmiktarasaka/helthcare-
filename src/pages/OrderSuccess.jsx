import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle, Truck, ClipboardList, MessageSquare, PhoneCall, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";
import { BUSINESS_CONFIG } from "../config/config";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Safeguard: Redirect to shop if no order state
  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <>
      <SEO 
        title="Order Successful"
        description="Your simulated demo order has been logged. Verify order details and check delivery status updates."
        canonicalPath="/order-success"
      />

      <div className="max-w-3xl mx-auto px-4 py-16 text-center font-sans space-y-8">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-12 h-12" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl text-brand-textDark">Order Confirmed!</h1>
          <p className="text-xs sm:text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed">
            Thank you for shopping with Lunara Health & Beauty. Your simulated order has been registered in our local sandbox database.
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="bg-brand-cream/15 border border-brand-borderLight rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-xs">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-brand-borderLight pb-4 gap-2">
            <div>
              <span className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">Order Reference</span>
              <p className="text-lg font-bold text-brand-textDark">{order.id}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] text-brand-textMuted uppercase font-bold tracking-wider">Order Date</span>
              <p className="text-xs font-semibold text-brand-textDark">{new Date(order.dateCreated).toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-textMuted border-b border-brand-borderLight pb-4">
            <div className="space-y-1">
              <p className="font-bold text-brand-textDark uppercase">Ship To</p>
              <p className="font-semibold text-brand-textDark">{order.customer.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
              <p>📞 {order.customer.phone}</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="font-bold text-brand-textDark uppercase">Delivery Method</p>
                <p className="capitalize font-semibold text-brand-textDark">{order.deliveryMethod} Delivery Demo</p>
              </div>
              <div>
                <p className="font-bold text-brand-textDark uppercase">Payment Choice</p>
                <p className="uppercase font-semibold text-brand-rose">{order.paymentMethod} Sandbox</p>
              </div>
            </div>
          </div>

          {/* Invoice pricing list */}
          <div className="space-y-3">
            <p className="font-bold text-brand-textDark text-xs uppercase tracking-wider">Items Summary</p>
            <div className="space-y-2 max-h-40 overflow-y-auto divide-y divide-brand-borderLight/30 pr-1.5 scrollbar-thin">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pt-2 first:pt-0">
                  <span className="text-brand-textMuted truncate max-w-xs">{item.name} <span className="font-semibold text-[10.5px]">({item.size}) x{item.quantity}</span></span>
                  <span className="font-bold text-brand-textDark">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Billing */}
          <div className="border-t border-brand-borderLight pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-brand-textMuted">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount Applied</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-textMuted">
              <span>Delivery Cost</span>
              <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-sm pt-2 border-t border-brand-borderLight">
              <span className="text-brand-textDark uppercase text-xs">Simulated Grand Total</span>
              <span className="text-base text-brand-pink">₹{order.total}</span>
            </div>
          </div>

        </div>

        {/* Dynamic Help CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <a
            href={`https://wa.me/917600583156?text=${encodeURIComponent(`Hello Lunara Health & Beauty, I would like to ask about my order ${order.id}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.01]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat support on WhatsApp</span>
          </a>

          <Link
            to="/crm"
            className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold px-8 py-3 rounded-full shadow-md flex items-center justify-center gap-1.5"
          >
            <ClipboardList className="w-4 h-4" />
            <span>View order in CRM Demo</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto bg-brand-cream hover:bg-brand-blush/40 text-brand-rose border border-brand-rose/20 text-xs font-bold px-8 py-3 rounded-full transition-colors"
          >
            Go to Homepage
          </Link>

        </div>

        <div className="pt-4 flex items-center justify-center gap-1.5 text-xs text-brand-textMuted">
          <HelpCircle className="w-4 h-4 text-brand-pink" />
          <span>Need help? Contact Ahmedabad office support line: {BUSINESS_CONFIG.phones.primary}</span>
        </div>

      </div>
    </>
  );
}
