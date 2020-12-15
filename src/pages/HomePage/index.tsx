import React, { FC } from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { RouterPath } from '../../constants/constants';

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  const history = useHistory();
  const goToBrowserPage = () => history.push(RouterPath.Browser);

  return(
    <>
      <h2>Home Page</h2>
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
