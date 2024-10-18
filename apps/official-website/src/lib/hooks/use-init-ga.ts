import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useInitGA = () => {
  useEffect(() => {
    ReactGA.initialize('G-NQ71FMDTPE');
  }, []);
};

export default useInitGA;
