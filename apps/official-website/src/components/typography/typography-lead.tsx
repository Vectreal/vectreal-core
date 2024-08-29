import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isHighlighted?: boolean;
}

export function TypographyLead({ children, isHighlighted }: Props) {
  const isHighlightedClass = isHighlighted
    ? 'text-primary'
    : 'text-muted-foreground';

  return (
    <p
      className={`text-xl transition-colors duration-300 ${isHighlightedClass}`}
    >
      {children}
    </p>
  );
}

export default TypographyLead;
