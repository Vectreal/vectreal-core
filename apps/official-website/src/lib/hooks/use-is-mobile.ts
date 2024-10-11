import { useMedia } from '.';

/**
 * Returns true if the user is using a mobile device, determined by the
 * presence of a mobile user agent or if the screen width is less than
 * 768px.
 *
 * @returns {boolean} Whether the user is using a mobile device.
 */
const useIsMobile = (): boolean => {
  const isMobileSize = useMedia('(max-width: 768px)');

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    isMobileSize
  );
};

export default useIsMobile;
