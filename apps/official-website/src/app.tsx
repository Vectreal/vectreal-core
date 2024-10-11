import { RouterProvider, ThemeProvider } from './components/providers';
import { useInitGA } from './lib/hooks';

import './globals.css';

const App = () => {
  useInitGA();

  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider />
    </ThemeProvider>
  );
};

export default App;
