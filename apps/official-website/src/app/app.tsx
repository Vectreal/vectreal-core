import { ModelProvider } from '@vctrl/hooks/src/use-load-model';
import { RouterProvider, ThemeProvider } from '@/components/providers';

import './app.css';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <ModelProvider>
        <RouterProvider />
      </ModelProvider>
    </ThemeProvider>
  );
};

export default App;
