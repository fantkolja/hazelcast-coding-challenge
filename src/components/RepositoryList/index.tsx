import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RepositoryExpandedDetails, RepositoryListItem } from '../../types';
import styles from './index.module.scss';
import { RepositorySearch } from '../RepositorySearch';
import { RepositoryDetails } from '../RepositoryDetails';

type RepositoryListProps = {
  data: RepositoryListItem[];
  expanded: RepositoryExpandedDetails | null;
  onExpanded: (item: RepositoryListItem) => void;
  onSearch: (query: string) => void;
  heading: string;
  query: string;
}

export const RepositoryList: FC<RepositoryListProps> = ({
                                                          data,
                                                          expanded,
                                                          onExpanded,
                                                          onSearch,
                                                          heading,
                                                          query,
                                                        }) => {
  return (
    <div className={styles.repositoryListContainer}>
      <section className={styles.repositoryList}>
        <header className={styles.header}>
          <RepositorySearch
            onSearch={onSearch}
            query={query}
          />
        </header>
        <main className={styles.listContainer}>
          <h2 className={styles.listHeading}>{heading}</h2>
          {data.map((item) => <Accordion
            key={item.id}
            expanded={!!expanded && expanded.id === item.id}
            onChange={() => onExpanded(item)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={`${item.id}-content`}
            >
              <Typography>
                <strong>{item.name}</strong> owned by <em>{item.owner}</em>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded && expanded.id === item.id
                ? <RepositoryDetails
                    stars={expanded.stars}
                    createdAt={expanded.createdAt}
                    description={expanded.description}
                    homepageUrl={expanded.homepageUrl}
                /> : null}
            </AccordionDetails>
          </Accordion>)}
        </main>
      </section>
    </div>
  );
};
