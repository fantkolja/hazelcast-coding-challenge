import { FC } from 'react';
import { Link, Typography } from '@material-ui/core';
import { LineChart } from '../LineChart';
import { RepositoryExpandedDetailsStar } from '../../types';

type RepositoryDetailsProps = {
  description: string;
  homepageUrl: string;
  createdAt: string;
  stars: RepositoryExpandedDetailsStar[];
};

export const RepositoryDetails: FC<RepositoryDetailsProps> = ({
                                                                stars,
                                                                description,
                                                                homepageUrl,
                                                                createdAt,
                                                              }) => {
  return (
    <div>
      <Typography variant="subtitle2">Created at: <em>
        {createdAt ? new Date(createdAt).toLocaleDateString() : '-'}
      </em></Typography>
      <Typography variant="subtitle2">Description: <em>{description || '-'}</em></Typography>
      <Typography variant="subtitle2">Home Page: <em>
        {homepageUrl ? <Link href={homepageUrl} target="_blank">{homepageUrl}</Link> : '-'}
      </em></Typography>
      <LineChart data={stars} />
    </div>
  );
};
