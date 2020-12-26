import { SupportedProcessEnv } from '../../types';
import { RequiredEnvVar } from '../../constants';

export const isSupportedEnv = (env: NodeJS.ProcessEnv): env is SupportedProcessEnv => {
  return Object.keys(RequiredEnvVar).every(key => typeof env[key] === 'string');
}
