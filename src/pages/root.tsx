import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '@/src/core/routes';

const Loading: React.FC = () => <div>loading.....</div>;

const CreateHasChildrenRoute = (route: any) => {
  return (
    <Route key={route.path} path={route.path}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <route.component />
          </Suspense>
        }
      />
      {RouteCreator(route.children)}
    </Route>
  );
};

const CreateNoChildrenRoute = (route: any) => {
  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <Suspense fallback={<Loading />}>
          <route.component />
        </Suspense>
      }
    />
  );
};

const RouteCreator = (routes: any) => {
  return routes.map((route: any) => {
    if (route.children && !!route.children.length) {
      return CreateHasChildrenRoute(route);
    } else {
      return CreateNoChildrenRoute(route);
    }
  });
};

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>{RouteCreator(routes)}</Routes>

      {/* <Routes>
        <Route path="/mine">
          <Route index element={<Mine />} />
          <Route path="/mine/bus" element={<Bus />} />
          <Route path="/mine/cart" element={<Cart />} />
        </Route>
      </Routes> */}
    </BrowserRouter>
  );
};

export default Root;
