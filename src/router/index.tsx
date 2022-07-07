import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
const Element = lazy(() => import('pages/Dashboard'));
const AboutPage = lazy(() => import('pages/AboutPage'));
const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <Element />
    },
    {
      path: '/a',
      element: <AboutPage />
    }
  ]);
export default Router;
