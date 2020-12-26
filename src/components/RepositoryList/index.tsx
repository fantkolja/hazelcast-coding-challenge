import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RepositoryListItem } from '../../types';
import styles from './index.module.scss';

type RepositoryListProps = {
  data: RepositoryListItem[];
  expanded: string | null;
  onExpanded: (item: RepositoryListItem) => void;
}

export const RepositoryList: FC<RepositoryListProps> = ({ data, expanded, onExpanded }) => {
  return (
    <section className={styles.repositoryList}>
      {data.map((item) => <Accordion
        key={item.id}
        expanded={expanded === item.id}
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>)}
    </section>
  );
};
