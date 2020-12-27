import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RepositoryExpandedDetails, RepositoryListItem } from '../../types';
import styles from './index.module.scss';
import { LineChart } from '../LineChart';

type RepositoryListProps = {
  data: RepositoryListItem[];
  expanded: RepositoryExpandedDetails | null;
  onExpanded: (item: RepositoryListItem) => void;
}

export const RepositoryList: FC<RepositoryListProps> = ({ data, expanded, onExpanded }) => {
  return (
    <section className={styles.repositoryList}>
      <div>
        {data.map((item) => <Accordion
          key={item.id}
          expanded={!!expanded && expanded.id === item.id}
          onChange={() => onExpanded(item)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography className={styles.heading}>
              <strong>{item.name}</strong> owned by <em>{item.owner}</em>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LineChart
              data={expanded ? expanded.stars : []}
            />
          </AccordionDetails>
        </Accordion>)}
      </div>
    </section>
  );
};
