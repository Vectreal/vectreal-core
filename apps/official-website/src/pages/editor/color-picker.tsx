import { HexColorPicker } from 'react-colorful';
import { Cross2Icon } from '@radix-ui/react-icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@vctrl/shared/components';
import { cn } from '@vctrl/shared/lib/utils';
import { useEditorContext } from '../../components/providers';

interface ColorPickerProps {
  show: boolean;
  setShow: (showColorPicker: boolean) => void;
}

const ColorPicker = ({ show, setShow }: ColorPickerProps) => {
  const { color, setColor } = useEditorContext();

  return (
    <Card
      className={cn(
        'fixed top-1/2 -translate-y-1/2 transition-all duration-300',
        show && ' opacity-100 left-4 visible',
        !show && ' opacity-0 -left-4 invisible',
      )}
    >
      <Button
        onClick={() => setShow(false)}
        variant="ghost"
        aria-label='Close color picker'
        title='Close color picker'
        className="absolute p-1 h-6 w-6 top-2 right-2"
      >
        <Cross2Icon />
      </Button>
      <CardHeader>
        <CardTitle>Set Background-color</CardTitle>
        <CardDescription>Pick a color</CardDescription>
      </CardHeader>
      <CardContent>
        <HexColorPicker color={color} onChange={setColor} />
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
