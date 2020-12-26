import React from 'react';
import { AppRouter } from './router/AppRouter';
import { HomePage } from './pages/HomePage';
import { BrowserPage } from './pages/BrowserPage';
import { RouterPath } from './constants';
import { AuthProvider } from './components/AuthProvider';
import { AuthCallback } from './pages/AuthCallback';
import { ApiProvider } from './components/ApiProvider';

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
        <ApiProvider>
          <AppRouter config={appRouterConfig} />
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}
