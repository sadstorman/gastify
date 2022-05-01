import React from 'react';
import { Provider } from 'react-redux';
import { DashboardRoutes } from './routes/Dashboard';
import { store } from './store/store';


export const Gastify = () => {
  return <Provider store={store}>
    <DashboardRoutes />
  </Provider>;
};