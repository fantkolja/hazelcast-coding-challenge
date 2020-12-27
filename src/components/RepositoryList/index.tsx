import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RepositoryExpandedDetails, RepositoryListItem } from '../../types';
import styles from './index.module.scss';
import { LineChart } from '../LineChart';
import { RepositorySearch } from '../RepositorySearch';

type RepositoryListProps = {
  data: RepositoryListItem[];
  expanded: RepositoryExpandedDetails | null;
  onExpanded: (item: RepositoryListItem) => void;
  onSearch: (query: string) => void;
  heading: string;
}

export const RepositoryList: FC<RepositoryListProps> = ({
                                                          data,
                                                          expanded,
                                                          onExpanded,
                                                          onSearch,
                                                          heading,
                                                        }) => {
  return (
    <section className={styles.repositoryList}>
      <header className={styles.header}>
        <RepositorySearch
          onSearch={onSearch}
        />
      </header>
      <main className={styles.listContainer}>
        <h2>{heading}</h2>
        {data.map((item) => <Accordion
          key={item.id}
          expanded={!!expanded && expanded.id === item.id}
          onChange={() => onExpanded(item)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls={`${item.id}-content`}
          >
            <Typography className={styles.heading}>
              <strong>{item.name}</strong> owned by <em>{item.owner}</em>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded && expanded.id === item.id
              ? <LineChart
              data={expanded ? expanded.stars : []}
            /> : null}
          </AccordionDetails>
        </Accordion>)}
      </main>
    </section>
  );
};
