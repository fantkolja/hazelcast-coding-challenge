import React, { FC, useContext } from 'react'
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';
import { RouterPath } from '../../constants';
import styles from './index.module.scss';

export const HomePage: FC = () => {
  const history = useHistory();
  const { onAuthStart, token } = useContext(AuthContext);
  const goToBrowserPage = () => history.push(RouterPath.Browser);
  const signIn = () => onAuthStart();

  return(
    <article className={styles.homePage}>
      <Typography
        variant="h3"
        className={styles.heading}
      >
        Welcome to the fantastic Github Browser
      </Typography>
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
