import { createContext, useContext } from 'react';
import useLoadModel from './use-load-model';

const ModelContext = createContext({} as ReturnType<typeof useLoadModel>);

const ModelProvider = ({ children }: React.PropsWithChildren) => {
  const value = useLoadModel();

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
};

const useModelContext = () => {
  return useContext(ModelContext);
};

export { ModelContext, ModelProvider, useModelContext };
