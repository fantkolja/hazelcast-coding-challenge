import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './index.module.scss';
import cn from 'classnames';

type LoaderProps = {
  show: boolean;
};

export const Loader: FC<LoaderProps> = ({ show, children }) => {
  return (
    <div>
      {show ? <div className={cn(styles.loaderContainer, {
        [styles.active]: show,
      })}>
        <CircularProgress/>
      </div> : null}
      <div className={styles.loadingContent}>
        {children}
      </div>
    </div>
  );
};
