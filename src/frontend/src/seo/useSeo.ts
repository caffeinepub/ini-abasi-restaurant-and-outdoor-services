import { useEffect } from 'react';
import { siteConfig } from '../config/site';
import type { PageSEO } from './seoConfig';

export function useSeo(pageSeo: PageSEO) {
  useEffect(() => {
    // Set title
    document.title = pageSeo.title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', pageSeo.description);
    if (pageSeo.keywords) {
      setMetaTag('keywords', pageSeo.keywords.join(', '));
    }

    // Canonical URL
    const canonical = `${siteConfig.baseUrl}${window.location.pathname}`;
    let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.rel = 'canonical';
      document.head.appendChild(linkElement);
    }
    linkElement.href = canonical;

    // Open Graph tags
    setMetaTag('og:title', pageSeo.title, true);
    setMetaTag('og:description', pageSeo.description, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', canonical, true);
    setMetaTag('og:site_name', siteConfig.name, true);
    if (pageSeo.ogImage) {
      setMetaTag('og:image', `${siteConfig.baseUrl}${pageSeo.ogImage}`, true);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageSeo.title);
    setMetaTag('twitter:description', pageSeo.description);
    if (pageSeo.ogImage) {
      setMetaTag('twitter:image', `${siteConfig.baseUrl}${pageSeo.ogImage}`);
    }
  }, [pageSeo]);
}
