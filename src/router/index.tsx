import React, { lazy } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import ROUTER_LIST, { RouterObj } from './routerList';

const routerToElement = (list: RouterObj[]): RouteObject[] => {
  return list.map((route): RouteObject => {
    const Element = lazy(() => import(`pages/${route.src}`));
    return {
      path: route.path,
      element: <Element />,
      children: route?.children?.length ? routerToElement(route.children) : []
    };
  });
};

const Router = () => useRoutes(routerToElement(ROUTER_LIST));
export default Router;
