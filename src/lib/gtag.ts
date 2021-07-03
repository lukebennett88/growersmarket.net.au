// @ts-nocheck
const GA_TRACKING_ID = 'UA-190817483-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(url: string) {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

interface IEvent {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
function event({ action, category, label, value }: IEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export { event, GA_TRACKING_ID, pageview };
