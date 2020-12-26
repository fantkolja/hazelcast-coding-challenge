import React from 'react';
import { AppRouter } from './router/AppRouter';
import { HomePage } from './pages/HomePage';
import { BrowserPage } from './pages/BrowserPage';
import { RouterPath } from './constants';
import { AuthProvider } from './components/AuthProvider';
import { AuthCallback } from './pages/AuthCallback';

const appRouterConfig = {
  pages: [{
    component: BrowserPage,
    path: RouterPath.Browser,
  }, {
    component: AuthCallback,
    path: RouterPath.AuthCallback,
  }, {
    component: HomePage,
    path: RouterPath.Home,
  }],
  defaultPath: RouterPath.Home,
};

export const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <AppRouter config={appRouterConfig} />
      </AuthProvider>
    </div>
  );
}
