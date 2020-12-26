import React, { FC, useContext } from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  const history = useHistory();
  const { onAuthStart, token } = useContext(AuthContext);
  // const goToBrowserPage = () => history.push(RouterPath.Browser);
  const goToBrowserPage = () => onAuthStart();

  return(
    <>
      <h2>Home Page</h2>
      <p>Token: {token}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={goToBrowserPage}
      >
        Go to Browser
      </Button>
    </>
  );
};
