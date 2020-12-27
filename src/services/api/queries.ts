import { gql } from '@apollo/client';

export const VIEWER_REPOSITORIES = gql`
  query GetOwnRepos($dataPageSize: Int!) {
    viewer {
      repositories(first: $dataPageSize) {
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

export const REPOSITORY_DETAILS = gql`
  query RepositoryDetails($name: String!, $owner: String!, $dataPageSize: Int!) {
    repository(name: $name, owner: $owner) {
      id
      createdAt
      description
      homepageUrl
      stargazerCount
      stargazers(last: $dataPageSize) {
        edges {
          starredAt
          cursor
        }
      }
    }
  }
`;

export const REPOSITORY_SEARCH = gql`
  query RepositorySearch($query: String!, $dataPageSize: Int!) {
    search(type: REPOSITORY, query: $query, first: $dataPageSize) {
    repositoryCount
    edges {
      cursor
      node {
        ... on Repository {
          name
          id
          owner {
            login
          }
        }
      }
    }
  }
  }
`;
