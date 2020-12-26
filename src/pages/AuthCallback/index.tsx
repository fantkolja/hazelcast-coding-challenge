import { useHistory } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../components/AuthProvider';
import { RouterPath } from '../../constants';

export const AuthCallback = () => {
  const history = useHistory();
  const { onCodeReceive } = useContext(AuthContext);

  const goTo = useCallback((path) => history.replace(path), [history]);

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const code = params.get('code');
    if (code) {
      onCodeReceive(code)
        .then(() => goTo(RouterPath.Browser))
        .catch(() => goTo(RouterPath.Home));
    } else {
      console.warn('[WARN:AuthCallback] URL does not contain the code query param. Redirecting to the home page)');
      goTo(RouterPath.Home);
    }
  }, [history, onCodeReceive]);

  return (
    <p>Authenticating...</p>
  );
};
