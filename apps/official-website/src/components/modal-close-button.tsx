import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, ButtonProps } from '@vctrl/shared/components';

const CloseButton = ({
  onClick,
  title,
}: Pick<ButtonProps, 'onClick' | 'title'>) => (
  <Button
    onClick={onClick}
    variant="ghost"
    aria-label={title}
    title={title}
    className="absolute top-2 right-2 text-zinc-400 hover:text-white w-6 h-6 p-1"
  >
    <Cross2Icon />
  </Button>
);

export default CloseButton;
