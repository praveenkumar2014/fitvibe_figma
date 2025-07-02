import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Configurator } from './Configurator';
import { Widget } from './Widget';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Configurator />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/widget',
    element: <Widget />,
    errorElement: <ErrorBoundary />,
  },
]);