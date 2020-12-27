export enum RouterPath {
  Home = '/',
  Browser = '/browser',
  AuthCallback = '/auth-callback',
}

// @todo: could we have another approach here?
export enum RequiredEnvVar {
  REACT_APP_AUTH_ENDPOINT = 'REACT_APP_AUTH_ENDPOINT',
  REACT_APP_CLIENT_ID = 'REACT_APP_CLIENT_ID',
}

export const tokenStorageKey = 'GITHUB_ACCESS_TOKEN';

export const dataPageSize = 10;

export const chartNodeID = 'lineChart';
