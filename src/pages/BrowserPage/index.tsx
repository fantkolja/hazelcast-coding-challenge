import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider';
import { useHistory } from 'react-router-dom';
import { RouterPath } from '../../constants';
import { RepositoryList } from '../../components/RepositoryList';
import { CircularProgress } from '@material-ui/core';
import {
  RepositoryDetailsQueryResultData,
  RepositoryExpandedDetails,
  RepositoryListItem,
  RepositoryListItemQueryResultEdge,
  RepositoryListItemQueryResultViewerData,
  RepositorySearchQueryResultData
} from '../../types';
import { REPOSITORY_DETAILS, REPOSITORY_SEARCH, VIEWER_REPOSITORIES } from '../../services/api/queries';
import { useLazyQuery } from '@apollo/client';

type BrowserPageProps = {};

const getSearchResultHeading = (query: string) => query ? `Search result for: ${query}` : 'Own repos';

export const BrowserPage: FC<BrowserPageProps> = () => {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const [loadViewerRepositories, viewerRepositoriesQueryResult] = useLazyQuery<RepositoryListItemQueryResultViewerData>(VIEWER_REPOSITORIES);
  const [loadRepositorySearch, repositorySearchQueryResult] = useLazyQuery<RepositorySearchQueryResultData>(REPOSITORY_SEARCH);
  const [loadRepositoryDetails, repositoryDetailsQueryResult] = useLazyQuery<RepositoryDetailsQueryResultData>(REPOSITORY_DETAILS);
  const [repositoryList, setRepositoryList] = useState<RepositoryListItem[]>([]);
  const [expanded, setExpanded] = useState<RepositoryExpandedDetails | null>(null);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleExpandedItem = useCallback((item: RepositoryListItem) => {
    if (expanded && expanded.id === item.id) {
      setExpanded(null);
    } else {
      loadRepositoryDetails({ variables: { name: item.name, owner: item.owner } });
    }
  }, [expanded, loadRepositoryDetails]);

  // @todo: handle error

  useEffect(() => {
    setIsLoading(repositoryDetailsQueryResult.loading
      || viewerRepositoriesQueryResult.loading
      || repositorySearchQueryResult.loading);
  }, [repositoryDetailsQueryResult, viewerRepositoriesQueryResult, repositorySearchQueryResult]);

  // on repo details load
  useEffect(() => {
    if (repositoryDetailsQueryResult.data) {
      const { repository } = repositoryDetailsQueryResult.data;
      setExpanded({
        id: repository.id,
        createdAt: repository.createdAt,
        description: repository.description,
        homepageUrl: repository.homepageUrl,
        stars: [
          repository.createdAt,
          ...repository.stargazers.edges
            .map(({ starredAt }) => starredAt)
        ],
      });
    }
  }, [repositoryDetailsQueryResult]);

  // on empty search
  useEffect(() => {
    if (viewerRepositoriesQueryResult.data) {
      setRepositoryList(viewerRepositoriesQueryResult.data.viewer.repositories.edges.map(({ cursor, node }: RepositoryListItemQueryResultEdge) => ({
        cursor,
        id: node.id,
        name: node.name,
        owner: node.owner.login,
        loading: false,
      })));
    }
  }, [viewerRepositoriesQueryResult]);

  // on search
  useEffect(() => {
    if (repositorySearchQueryResult.data) {
      setRepositoryList(repositorySearchQueryResult.data.search.edges.map(({ cursor, node }: RepositoryListItemQueryResultEdge) => ({
        cursor,
        id: node.id,
        name: node.name,
        owner: node.owner.login,
        loading: false,
      })));
    }
  }, [repositorySearchQueryResult]);

  // @todo: useRedirect()?
  useEffect(() => {
    if (!token) {
      history.replace(RouterPath.Home);
    }
  }, [token, history]);

  useEffect(() => {
    if (query) {
      loadRepositorySearch({ variables: { query } });
    } else {
      loadViewerRepositories();
    }
  }, [query, loadRepositorySearch, loadViewerRepositories]);

  return(
    <article>
      {isLoading
        ? <CircularProgress />
        : <RepositoryList
          data={repositoryList}
          onExpanded={handleExpandedItem}
          onSearch={handleSearch}
          expanded={expanded}
          heading={getSearchResultHeading(query)}
        />}
    </article>
  );
};
