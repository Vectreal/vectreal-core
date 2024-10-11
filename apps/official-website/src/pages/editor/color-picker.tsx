import { HexColorPicker } from 'react-colorful';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@vctrl/shared/components';
import { cn } from '@vctrl/shared/lib/utils';

import { useEditorContext } from '../../components/providers';
import CloseButton from '../../components/modal-close-button';

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
      <CloseButton title="Close color picker" onClick={() => setShow(false)} />
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
