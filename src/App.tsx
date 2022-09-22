import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка...</div>,
});

const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza'),
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound" */ './pages/NotFound'),
);

const App = () => (
  <>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path='cart' element={<Cart />} />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </>
);

export default App;
