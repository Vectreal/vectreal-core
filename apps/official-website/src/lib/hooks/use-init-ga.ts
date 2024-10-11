import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useInitGA = () => {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_ID) {
      return;
    }

    if (import.meta.env.DEV) return;

    ReactGA.initialize(import.meta.env.VITE_GA_ID);
  }, []);
};

export default useInitGA;
