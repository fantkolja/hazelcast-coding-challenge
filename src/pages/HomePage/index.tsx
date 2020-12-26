import React, { FC, useContext } from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';
import { RouterPath } from '../../constants';

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  const history = useHistory();
  const { onAuthStart, token } = useContext(AuthContext);
  const goToBrowserPage = () => history.push(RouterPath.Browser);
  const signIn = () => onAuthStart();

  return(
    <article>
      <h2>Home Page</h2>
      {token
        ? <Button
        variant="contained"
        color="primary"
        onClick={goToBrowserPage}
      >
        Go to Browser
      </Button>
        : <Button
          variant="contained"
          color="primary"
          onClick={signIn}
        >
          Sign in
        </Button>}

    </article>
  );
};
