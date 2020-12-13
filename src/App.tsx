import React from 'react';
import { AppRouter } from './router/AppRouter';
import { HomePage } from './pages/HomePage';
import { BrowserPage } from './pages/BrowserPage';
import { RouterPath } from './constants/constants';

const appRouterConfig = {
  pages: [{
    component: BrowserPage,
    path: RouterPath.Browser,
  }, {
    component: HomePage,
    path: RouterPath.Home,
  }],
  defaultPath: RouterPath.Home,
}

export const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        Login
      </header>
      <AppRouter config={appRouterConfig} />
    </div>
  );
}
