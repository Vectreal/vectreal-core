import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useInitGA = () => {
  useEffect(() => {
    ReactGA.initialize('G-0TB46Y2M59');
  }, []);
};

export default useInitGA;
