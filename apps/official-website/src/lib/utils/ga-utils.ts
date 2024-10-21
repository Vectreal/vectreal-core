import ReactGA from 'react-ga4';

/**
 * Sends a custom event to Google Analytics.
 *
 * @param args - The event parameters.
 * @param args.category - The category of the event.
 * @param args.action - The action of the event.
 * @param args.label - The label of the event.
 *
 * @remarks
 * This function will only send the event if Google Analytics is initialized.
 */
export function sendCustomEvent(args: {
  category: string;
  action: string;
  label: string;
}) {
  if (!ReactGA.isInitialized) return;

  ReactGA.event(args);
}

/**
 * Sends a pageview event to Google Analytics.
 *
 * @param pathname - The path of the page being viewed.
 */
export function pageview(pathname: string) {
  ReactGA.send({
    hitType: 'pageview',
    page: pathname,
    title: document.title,
  });
}
