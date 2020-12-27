import { RequiredEnvVar } from '../constants';

export type SupportedProcessEnv = NodeJS.ProcessEnv & {
  [P in RequiredEnvVar]: string;
};

export interface AuthContextValue {
  token: string | null;
  onCodeReceive: (code: string) => Promise<void>;
  onAuthStart: () => void;
}

export interface ExchangeCodeRequestData {
  client_id: string,
  code: string,
}

export interface ExchangeCodeResponseData {
  access_token: string,
}

export interface RepositoryListItem {
  id: string;
  cursor: string;
  name: string;
  owner: string;
  loading: boolean;
}

export interface OwnerQueryResult {
  login: string;
}

export interface RepositoryListItemQueryResultNode {
  id: string;
  name: string;
  owner: OwnerQueryResult;
}

export interface RepositoryListItemQueryResultEdge {
  cursor: string;
  node: RepositoryListItemQueryResultNode;
}

export interface StargazerEdge {
  cursor: string;
  starredAt: string;
}

export interface StargazerList {
  edges: StargazerEdge[];
}

interface RepositoryDetailsBase {
  id: string;
  createdAt: string;
  description: string;
  homepageUrl: string;
}

export interface RepositoryDetailsQueryResult extends RepositoryDetailsBase {
  stargazerCount: number;
  stargazers: StargazerList;
}

export interface RepositoryDetailsQueryResultData {
  repository: RepositoryDetailsQueryResult;
}

export interface RepositoryExpandedDetails extends RepositoryDetailsBase {
  stars: string[];
}
