import { PropsWithChildren } from 'react';
import { BackgroundBeams } from './ui/background-beams';
import useIsMobile from '@/lib/hooks/useIsMobile';

interface TitleSectionProps extends PropsWithChildren {
  className?: string;
  heading: string;
}

const TitleSection = ({ children, heading, className }: TitleSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <section className={`flex flex-col items-center gap-12 mt-24 ${className}`}>
      {!isMobile && <BackgroundBeams className="absolute z-[-1]" />}
      <h1 className="text-5xl font-bold tracking-tight">{heading}</h1>
      {children}
    </section>
  );
};

export default TitleSection;
