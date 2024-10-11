import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useInitGA = () => {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_ID) {
      return;
    }

    ReactGA.initialize(import.meta.env.VITE_GA_ID);
  }, []);
};

export default useInitGA;
