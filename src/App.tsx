import React from 'react';
import { AppRouter } from './router/AppRouter';
import { HomePage } from './pages/HomePage';
import { BrowserPage } from './pages/BrowserPage';
import { RouterPath } from './constants/constants';
import { GoogleAuthService } from './services/auth';
import { getRandomString } from './services/utils';

const appRouterConfig = {
  pages: [{
    component: BrowserPage,
    path: RouterPath.Browser,
  }, {
    component: HomePage,
    path: RouterPath.Home,
  }],
  defaultPath: RouterPath.Home,
};

const authService = new GoogleAuthService({
  clientId: process.env.REACT_APP_CLIENT_ID as string,
  state: getRandomString(),
});

authService.init(`${window.location.origin}/browser`);

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
