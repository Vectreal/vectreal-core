import { useContext, useState, createContext } from 'react';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';

const EditorContext = createContext({} as ReturnType<typeof useEditor>);

const useEditor = () => {
  const [autoRotate, setAutoRotate] = useState({
    enabled: true,
    speed: 0.5,
  });

  const [hdr, setHdr] = useState<{
    asBackground: boolean;
    exposure: number;
    preset: PresetsType;
  }>({
    asBackground: true,
    exposure: 1,
    preset: 'studio',
  });

  const [showGrid, setShowGrid] = useState(true);

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  function setShowAsBackground(value: boolean) {
    setHdr((prev) => ({ ...prev, asBackground: value }));
  }

  function setHdrExposure(value: number) {
    setHdr((prev) => ({ ...prev, exposure: value }));
  }

  function setHdrPreset(value: PresetsType) {
    setHdr((prev) => ({ ...prev, preset: value as PresetsType }));
  }

  function setAutoRotateEnabled(value: boolean) {
    setAutoRotate((prev) => ({ ...prev, enabled: value }));
  }

  function setAutoRotateSpeed(value: number) {
    setAutoRotate((prev) => ({ ...prev, speed: value }));
  }

  return {
    color: backgroundColor,
    setColor: setBackgroundColor,

    hdr,
    setShowAsBackground,
    setHdrExposure,
    setHdrPreset,

    autoRotate,
    setAutoRotateEnabled,
    setAutoRotateSpeed,

    showGrid,
    setShowGrid,
  };
};

const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EditorContext.Provider value={useEditor()}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};

export default EditorProvider;
