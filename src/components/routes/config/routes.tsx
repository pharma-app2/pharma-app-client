import React from 'react';
import LandingPage from '../../../pages/LandingPage';
import RegisterPage from '../../../pages/RegisterPage';
import NotFoundPage from '../../../pages/NotFoundPage';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isPrivate?: boolean;
  isPublic?: boolean;
}

export const APP_ROUTES: Record<string, RouteConfig> = {
  LANDING: {
    path: '/',
    element: <LandingPage />,
  },
  REGISTER: {
    path: '/register',
    element: <RegisterPage />,
    isPublic: true,
  },
  NOT_FOUND: {
    path: '*',
    element: <NotFoundPage />,
  },
};
