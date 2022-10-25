import React from 'react';

const routes = [
  {
    path: '/',
    component: React.lazy(() => import('@/src/pages/Home/index')),
  },
  {
    path: '/mine',
    component: React.lazy(() => import('@/src/pages/Mine/index')),
    children: [
      {
        path: '/mine/bus',
        component: React.lazy(() => import('@/src/pages/Mine/Bus/index')),
      },
      {
        path: '/mine/cart',
        component: React.lazy(() => import('@/src/pages/Mine/Cart/index')),
      },
    ],
  },
];

export default routes;
