"use client";

import { useEffect } from "react";
import { useLang } from "@/store/lang-context";

/**
 * SEOManager component updates the document's title and meta description
 * in real-time when the user changes the site language.
 */
export default function SEOManager() {
  const { lang, t } = useLang();

  useEffect(() => {
    // Update Document Title
    if (t.seo.title) {
      document.title = t.seo.title;
    }

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && t.seo.description) {
      metaDescription.setAttribute("content", t.seo.description);
    }
    
    // Update HTML Lang attribute for accessibility and browser behavior
    document.documentElement.lang = lang;

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://uuma.uz${window.location.pathname}`);
  }, [lang, t]);

  return null; // This component doesn't render anything UI-wise
}
