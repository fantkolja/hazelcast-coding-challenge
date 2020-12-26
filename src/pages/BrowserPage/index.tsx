import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/AuthProvider';
import { useHistory } from 'react-router-dom';
import { dataPageSize, RouterPath } from '../../constants';
import { gql, useQuery } from '@apollo/client';
import { RepositoryList } from '../../components/RepositoryList';
import { CircularProgress } from '@material-ui/core';
import { RepositoryListItem, RepositoryListItemQueryResultEdge } from '../../types';

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
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpandedItem = useCallback((item: RepositoryListItem) => {
    client
      .query({
        query: REPOSITORY,
        variables: { name: item.name, owner: item.owner },
      })
      .then(result => {
        console.log(result);
        setExpanded(item.id);
      });
    setTimeout(() => {
      client.stop();
    }, 100);
  }, []);

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
