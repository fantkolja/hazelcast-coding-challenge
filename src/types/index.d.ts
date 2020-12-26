import { RequiredEnvVar } from '../constants';

export type SupportedProcessEnv = NodeJS.ProcessEnv & {
  [P in RequiredEnvVar]: string;
};

export interface AuthContextValue {
  token: string | null;
  onCodeReceive: (code: string) => Promise<void>;
  onAuthStart: () => void;
}

export interface ExchangeCodeRequestData {
  client_id: string,
  code: string,
}

export interface ExchangeCodeResponseData {
  access_token: string,
}
