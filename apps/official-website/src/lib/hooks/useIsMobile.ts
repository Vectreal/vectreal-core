import { useMedia } from '.';

const useIsMobile = () => {
  const isMobileSize = useMedia('(max-width: 768px)');

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    isMobileSize
  );
};

export default useIsMobile;
