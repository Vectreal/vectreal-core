import { useContext, useState, createContext } from 'react';

const EditorContext = createContext({} as ReturnType<typeof useEditor>);

const useEditor = () => {
  const [enableAutoRotate, setEnableAutoRotate] = useState(true);
  return {
    enableAutoRotate,
    setEnableAutoRotate,
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
