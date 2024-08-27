import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}
export function TypographyMuted({ children, className }: Props) {
  return (
    <p className={cn('text-md text-muted-foreground', className)}>{children}</p>
  );
}

export default TypographyMuted;
