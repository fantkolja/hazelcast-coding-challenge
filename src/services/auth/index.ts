interface GoogleAuthServiceConfig {
  clientId: string;
  state: string;
}

export class GoogleAuthService {
  static authorizeEndpoint = 'https://github.com/login/oauth/authorize';
  private clientId: string;
  private state: string;

  constructor({ clientId, state }: GoogleAuthServiceConfig) {
    this.clientId = clientId;
    this.state = state;
  }

  public init(redirectURI: string): void {
    const url = new URL(GoogleAuthService.authorizeEndpoint);
    url.searchParams.append('clientId', this.clientId);
    url.searchParams.append('redirectURI', redirectURI);
    url.searchParams.append('state', this.state);
    url.searchParams.append('scope', 'repo user');
    url.searchParams.append('allow_signup', 'true');
    console.log(url.toString());
    fetch(url.toString(), { mode: 'no-cors'}).then(console.log);
  }
}
