import { PropsWithChildren } from 'react';

import { cn } from '@vctrl/shared/lib/utils';

interface Props extends PropsWithChildren {
  className?: string;
}
export function TypographyMuted({ children, className }: Props) {
  return (
    <p className={cn('text-md text-muted-foreground', className)}>{children}</p>
  );
}

export default TypographyMuted;
