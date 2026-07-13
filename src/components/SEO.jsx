import React from "react";
import { Helmet } from "react-helmet-async";
import { BUSINESS_CONFIG } from "../config/config";

export default function SEO({ 
  title, 
  description, 
  canonicalPath = "", 
  ogType = "website",
  ogImage = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&auto=format&fit=crop",
  schemaMarkup = null
}) {
  const siteUrl = "https://lunara.tarasaka.com";
  const fullCanonical = `${siteUrl}${canonicalPath}`;
  const displayTitle = `${title} | ${BUSINESS_CONFIG.brandName} - ${BUSINESS_CONFIG.tagline}`;

  // Default Organization JSON-LD Schema
  const defaultOrgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_CONFIG.brandName,
    "image": ogImage,
    "telephone": BUSINESS_CONFIG.phones.primary,
    "email": BUSINESS_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Premium Plaza, Bodakdev",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380054",
      "addressCountry": "IN"
    },
    "url": siteUrl,
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={BUSINESS_CONFIG.brandName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots & SEO settings */}
      <meta name="robots" content="index, follow" />

      {/* Schema Markup Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup || defaultOrgSchema)}
      </script>
    </Helmet>
  );
}
