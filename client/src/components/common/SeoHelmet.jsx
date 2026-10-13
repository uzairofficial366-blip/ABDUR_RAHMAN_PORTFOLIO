import { useEffect } from 'react';

export const SeoHelmet = ({
  title = 'Abdur Rahman Khan | UI/UX Designer & Graphic Designer',
  description = 'Portfolio of Abdur Rahman Khan, UI/UX Designer & Graphic Designer in Peshawar, Pakistan.',
  canonicalUrl = '',
  ogImage = '/images/profile.jpeg',
  type = 'website',
  structuredData = null,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta
    const setMetaTag = (attr, key, content) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    } else if (link) {
      link.remove();
    }

    // Structured Data (JSON-LD)
    const jsonLdId = 'dynamic-json-ld';
    let scriptTag = document.getElementById(jsonLdId);
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = jsonLdId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalUrl, ogImage, type, structuredData]);

  return null;
};

