import { RepositoryExpandedDetailsStar, SupportedProcessEnv, TimeSpan } from '../../types';
import { RequiredEnvVar } from '../../constants';

export const isSupportedEnv = (env: NodeJS.ProcessEnv): env is SupportedProcessEnv => {
  return Object.keys(RequiredEnvVar).every(key => typeof env[key] === 'string');
};

export const getOptimalTimeSpan = (data: RepositoryExpandedDetailsStar[]): TimeSpan => {
  // approximate month
  const monthInMS = 1000 * 60 * 60 * 24 * 31;
  const yearInMS = monthInMS * 12;
  let result: TimeSpan = 'day';
  const first = data[0];
  const last = data[data.length - 1];
  if (first && last) {
    const firstTimestamp = new Date(first.starredAt);
    const lastTimestamp = new Date(last.starredAt);
    const diff = +lastTimestamp - +firstTimestamp;
    if (diff > yearInMS) {
      result = 'year';
    } else if (diff > monthInMS) {
      result = 'month';
    }
  }
  return result;
};
