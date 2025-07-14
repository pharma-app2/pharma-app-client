import React from 'react';
import LandingPage from '../../../pages/LandingPage';
import RegisterPage from '../../../pages/RegisterPage';
import NotFoundPage from '../../../pages/NotFoundPage';
import SignInPage from '../../../pages/SignInPage';
import DashboardPage from '../../../pages/DashboardPage';
import { RouteProtection, type RouteProtectionValue } from './RouteProtection';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  routeProtection: RouteProtectionValue;
}

export const APP_ROUTES: Record<string, RouteConfig> = {
  LANDING: {
    path: '/',
    element: <LandingPage />,
    routeProtection: RouteProtection.NONE,
  },
  REGISTER: {
    path: '/cadastro/pacientes',
    element: <RegisterPage />,
    routeProtection: RouteProtection.PUBLIC,
  },
  SIGNIN_PATIENT: {
    path: '/signin/pacientes',
    element: <SignInPage />,
    routeProtection: RouteProtection.PUBLIC,
  },
  DASHBOARD: {
    path: '/dashboard',
    element: <DashboardPage />,
    routeProtection: RouteProtection.PRIVATE,
  },
  NOT_FOUND: {
    path: '*',
    element: <NotFoundPage />,
    routeProtection: RouteProtection.NONE,
  },
};
