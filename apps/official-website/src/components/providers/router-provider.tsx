import {
  RouterProvider as BaseRouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import BaseLayout from '@/components/base-layout';
import { Help, Home, Contact, Editor } from '@/pages';

const RouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <BaseLayout />,
      children: [
        {
          path: '/editor',
          element: <Editor />,
        },
        {
          path: '/help',
          element: <Help />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '*',
          element: <Home />,
        },
      ],
    },
  ]);

  return <BaseRouterProvider router={router} />;
};

export default RouterProvider;
