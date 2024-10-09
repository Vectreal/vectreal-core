import {
  RouterProvider as BaseRouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

import BaseLayout from '../base-layout';
import LoadingSpinner from '../loading-spinner';

import Home from '../../pages/home';
const Help = lazy(() => import('../../pages/help'));
const Contact = lazy(() => import('../../pages/contact'));
const Editor = lazy(() => import('../../pages/editor'));

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

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      }
    >
      <BaseRouterProvider router={router} />
    </Suspense>
  );
};

export default RouterProvider;
