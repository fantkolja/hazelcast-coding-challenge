import { useHistory, useLocation } from 'react-router-dom';
import { UseURLSearchQueryResult } from '../../types';
import { useCallback } from 'react';

const getSearchMap = (search: string) => new URLSearchParams(search);

export const useURLSearchQuery = (name: string): UseURLSearchQueryResult => {
  const history = useHistory();
  const location = useLocation();
  const param = new URLSearchParams(location.search).get(name) || ''
  const setParam = useCallback((value) => {
    const searchMap = getSearchMap(location.search)
    searchMap.set(name, value);
    history.replace({
      pathname: location.pathname,
      search: searchMap.toString(),
    });
  }, [history, location, name]);
  return { param, setParam };
};
