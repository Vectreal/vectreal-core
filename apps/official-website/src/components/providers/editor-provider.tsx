import { useContext, useState, createContext, ComponentProps } from 'react';
import { Stage } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
const EditorContext = createContext({} as ReturnType<typeof useEditor>);

const useEditor = () => {
  const [autoRotate, setAutoRotate] = useState({
    enabled: true,
    speed: 0.5,
  });

  const [hdr, setHdr] = useState<{
    asBackground: boolean;
    backgroundIntensity: number;
    exposure: number;
    preset: PresetsType;
    blurriness: number;
    stagePreset: ComponentProps<typeof Stage>['preset'];
  }>({
    asBackground: false,
    backgroundIntensity: 1,
    exposure: 1,
    blurriness: 0.5,
    preset: 'apartment',
    stagePreset: 'soft',
  });

  const [showGrid, setShowGrid] = useState(true);

  const [backgroundColor, setBackgroundColor] = useState('#302d2a');

  function setShowAsBackground(value: boolean) {
    setHdr((prev) => ({ ...prev, asBackground: value }));
  }

  function setBackgroundIntensity(value: number) {
    setHdr((prev) => ({ ...prev, backgroundIntensity: value }));
  }

  function setHdrExposure(value: number) {
    setHdr((prev) => ({ ...prev, exposure: value }));
  }

  function setHdrPreset(value: PresetsType) {
    setHdr((prev) => ({ ...prev, preset: value }));
  }

  function setHdrBluriness(value: number) {
    setHdr((prev) => ({ ...prev, blurriness: value }));
  }

  function setLightingStagePreset(
    value: ComponentProps<typeof Stage>['preset'],
  ) {
    setHdr((prev) => ({ ...prev, stagePreset: value }));
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
    setBackgroundIntensity,
    setHdrBluriness,
    setHdrExposure,
    setHdrPreset,
    setLightingStagePreset,

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
