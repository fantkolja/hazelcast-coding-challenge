import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider';
import { useHistory } from 'react-router-dom';
import { dataPageSize, RouterPath } from '../../constants';
import { gql, useQuery } from '@apollo/client';
import { RepositoryList } from '../../components/RepositoryList';
import { CircularProgress } from '@material-ui/core';
import {
  RepositoryDetailsQueryResultData,
  RepositoryExpandedDetails,
  RepositoryListItem,
  RepositoryListItemQueryResultEdge
} from '../../types';

type BrowserPageProps = {};

const VIEWER_REPOSITORIES = gql`
  query GetOwnRepos {
    viewer {
      repositories(first: ${dataPageSize}) {
        totalCount
         edges {
          cursor
          node {
            id
            name,
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

const REPOSITORY = gql`
  query Repository($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      createdAt
      description
      homepageUrl
      stargazerCount
      stargazers(first: ${dataPageSize}) {
        edges {
          starredAt
          cursor
        }
      }
    }
  }
`;

export const BrowserPage: FC<BrowserPageProps> = () => {
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const { client, loading, error, data } = useQuery(VIEWER_REPOSITORIES);
  const [repositoryList, setRepositoryList] = useState<RepositoryListItem[]>([]);
  const [expanded, setExpanded] = useState<RepositoryExpandedDetails | null>(null);

  const handleExpandedItem = useCallback((item: RepositoryListItem) => {
    if (expanded && expanded.id === item.id) {
      setExpanded(null);
    } else {
      client
        .query<RepositoryDetailsQueryResultData>({
          query: REPOSITORY,
          variables: { name: item.name, owner: item.owner },
        })
        .then(result => {
          setExpanded({
            id: item.id,
            createdAt: result.data.repository.createdAt,
            description: result.data.repository.description,
            homepageUrl: result.data.repository.homepageUrl,
            stars: [
              result.data.repository.createdAt,
              ...result.data.repository.stargazers.edges
                .map(({ starredAt }) => starredAt)
            ],
          });
        });
    }
  }, [expanded, client]);

  // @todo: useRedirect()?
  // @todo: handle error
  useEffect(() => {
    if (!token) {
      history.replace(RouterPath.Home);
    }
  }, [token, history]);

  useEffect(() => {
    if (data) {
      setRepositoryList(data.viewer.repositories.edges.map(({ cursor, node }: RepositoryListItemQueryResultEdge) => ({
        cursor,
        id: node.id,
        name: node.name,
        owner: node.owner.login,
        loading: false,
      })));
    }
  }, [data]);

  return(
    <article>
      {loading
        ? <CircularProgress />
        : <RepositoryList
          data={repositoryList}
          onExpanded={handleExpandedItem}
          expanded={expanded}
        />}
    </article>
  );
};
