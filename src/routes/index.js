import React from 'react';
import { Routes, Route, Link, RouteObject, routerConifg, useRoutes } from 'react-router-dom';

import Layout from 'layout'
import Home from 'pages/home';
import About from 'pages/about';
import Login from 'pages/login';
import Billing from 'pages/billing';
import Counter from 'pages/counter';
import Photo from 'pages/photo';
import Payment from 'pages/payment';
import Redux from 'pages/redux';

const routerConfig = [
  {
    path: "*",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
      {
        path: "/photo",
        element: <Photo />,
      },
      {
        path: "/payment",
        element: <Payment />
      },
      {
        path: "/redux",
        element: <Redux />
      }
      // {
      //   path: "/billing/sendRe/:id",
      //   element: <Send />,
      // },
      // {
      //   path: "/refund",
      //   element: <Refund />,
      // },
      // {
      //   path: "/refund/sendRefund/:id",
      //   element: <SendRefund />,
      // },
      // {
      //   path: "/settlement",
      //   element: <Settlement />,
      // },
      // {
      //   path: "/settlement/detail/:id",
      //   element: <Detail />,
      // },
      // {
      //   path: "/settlement/settle",
      //   element: <Settle />,
      // },
    ]
  },

]
export default routerConfig;