import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 1.5,
        ease: 'linear',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block text-white py-[.25rem] px-1 rounded-lg bg-gradient-to-r from-orange to-dark-orange dark:from-orange dark:to-dark-orange`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
