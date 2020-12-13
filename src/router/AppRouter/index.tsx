import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { BrowserPage } from '../../pages/BrowserPage';
import { HomePage } from '../../pages/HomePage';

type PageComponent = typeof BrowserPage | typeof HomePage;

type PageConfig<A> = {
  component: A,
  path: string,
  // @todo: retrieve component generic
  // @todo: https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
  // props: A extends FC<infer P> ? P : A,
  // props: any,
};

export type AppRouterConfig = {
  pages: PageConfig<PageComponent>[],
  defaultPath: string,
};

type AppRouterProps = {
  config: AppRouterConfig,
};

export const AppRouter: FC<AppRouterProps> = ({ config }) => {
  return (
    <Router>
      <Switch>
        {config.pages.map(({ component: Component, path }) => (
          <Route
            path={path}
            key={path}
          >
            <Component />
          </Route>
        ))}
        <Redirect to={config.defaultPath} />
      </Switch>
    </Router>
  );
};
