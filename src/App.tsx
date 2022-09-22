import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
// import { Cart } from './pages/Cart';
// import NotFound from './pages/NotFound';
// import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart" */ './pages/Cart'),
);
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
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
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
