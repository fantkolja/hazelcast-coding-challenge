import { gql } from '@apollo/client';
import { dataPageSize } from '../../constants';

export const VIEWER_REPOSITORIES = gql`
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

export const REPOSITORY = gql`
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
