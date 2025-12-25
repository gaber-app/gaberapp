// Google Analytics 4 Helper Functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize GA4 (called automatically when script loads)
export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('config', 'G-HP8W2XGCEQ', {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, eventParams);
};

// Conversion tracking helpers
export const trackConversion = {
  // Track waitlist signup
  waitlistSignup: (email: string) => {
    trackEvent('waitlist_signup', {
      event_category: 'engagement',
      event_label: 'Waitlist Form',
      value: 1,
    });
  },

  // Track button clicks
  buttonClick: (buttonName: string, location: string) => {
    trackEvent('button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      location: location,
    });
  },

  // Track section views
  sectionView: (sectionName: string) => {
    trackEvent('section_view', {
      event_category: 'engagement',
      event_label: sectionName,
    });
  },

  // Track navigation
  navigationClick: (destination: string) => {
    trackEvent('navigation_click', {
      event_category: 'navigation',
      event_label: destination,
    });
  },
};
