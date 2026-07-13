import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomBar from "./components/MobileBottomBar";
import LiveChat from "./components/LiveChat";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/product/ProductDetail";
import Brands from "./pages/Brands";
import SpecialCollections from "./pages/SpecialCollections";
import Services from "./pages/services/Services";
import About from "./pages/About";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import CaseStudies from "./pages/CaseStudies";
import Locations from "./pages/locations/Locations";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import CrmDemo from "./pages/crm/CrmDemo";
import DashboardDemo from "./pages/dashboard/DashboardDemo";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-brand-cream/10 text-brand-textDark flex flex-col justify-between selection:bg-brand-pink/20 selection:text-brand-rose">
          
          {/* Header */}
          <Header />

          {/* Main Content Router */}
          <main className="flex-1 pb-16 lg:pb-0">
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<Home />} />

              {/* Shop & Categories */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:categorySlug" element={<Shop />} />

              {/* Product Details */}
              <Route path="/product/:slug" element={<ProductDetail />} />

              {/* Special collections */}
              <Route path="/brands" element={<Brands />} />
              <Route path="/offers" element={<SpecialCollections />} />
              <Route path="/bestsellers" element={<SpecialCollections />} />
              <Route path="/new-arrivals" element={<SpecialCollections />} />

              {/* Services */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<Services />} />

              {/* About & Blog Journal */}
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Case Studies Transformations */}
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudies />} />

              {/* Locations */}
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:city" element={<Locations />} />

              {/* E-commerce Operations */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />

              {/* Other Pages */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              
              {/* CRM & Dashboard */}
              <Route path="/crm" element={<CrmDemo />} />
              <Route path="/dashboard" element={<DashboardDemo />} />

              {/* Fallback 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating UI Elements */}
          <MobileBottomBar />
          <LiveChat />

        </div>
      </Router>
    </HelmetProvider>
  );
}
