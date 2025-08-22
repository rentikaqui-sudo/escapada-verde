
// Google Analytics helper functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-TJ7R4YTPBT';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for your business
export const trackWhatsAppClick = (fincaName?: string) => {
  event({
    action: 'whatsapp_click',
    category: 'lead_generation',
    label: fincaName || 'general',
  });
};

export const trackFormSubmit = (formType: string) => {
  event({
    action: 'form_submit',
    category: 'lead_generation',
    label: formType,
  });
};

export const trackFincaView = (fincaName: string) => {
  event({
    action: 'finca_view',
    category: 'engagement',
    label: fincaName,
  });
};

export const trackGalleryView = (fincaName: string) => {
  event({
    action: 'gallery_view',
    category: 'engagement',
    label: fincaName,
  });
};

export const trackPriceInquiry = (fincaName: string) => {
  event({
    action: 'price_inquiry',
    category: 'lead_generation',
    label: fincaName,
  });
};

export const trackContactInfo = (method: string) => {
  event({
    action: 'contact_info_click',
    category: 'lead_generation',
    label: method, // 'phone', 'email', etc.
  });
};
