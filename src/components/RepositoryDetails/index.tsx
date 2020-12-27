import { FC } from 'react';
import { Typography } from '@material-ui/core';
import { LineChart } from '../LineChart';

type RepositoryDetailsProps = {
  description: string;
  homepageUrl: string;
  stars: string[];
};

export const RepositoryDetails: FC<RepositoryDetailsProps> = ({ stars, description, homepageUrl }) => {
  return (
    <div>
      <Typography variant="subtitle1">Description: <em>{description || '-'}</em></Typography>
      <Typography variant="subtitle1">Home Page: <em>{homepageUrl || '-'}</em></Typography>
      <LineChart data={stars} />
    </div>
  );
};
