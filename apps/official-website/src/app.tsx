import { RouterProvider, ThemeProvider } from './components/providers';

import './globals.css';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <RouterProvider />
    </ThemeProvider>
  );
};

export default App;
