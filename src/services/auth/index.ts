import { isSupportedEnv } from '../utils';
import { http } from '../http';
import { ExchangeCodeRequestData, ExchangeCodeResponseData } from '../../types';

export class GithubAuthService {
  private static authorizationPath = `${process.env.REACT_APP_AUTH_ENDPOINT}/authorize`;
  private static codeExchangePath = `${process.env.REACT_APP_TOKEN_ENDPOINT}/token`;
  private readonly clientId: string;

  constructor() {
    if (isSupportedEnv(process.env)) {
      this.clientId = process.env.REACT_APP_CLIENT_ID;
    } else {
      throw new Error('Cannot initialize GithubAuthService in the environment, which is not of type SupportedProcessEnv!' +
        ' Check your .env file.');
    }
  }

  public init(redirectURI: string): void {
    const url = new URL(GithubAuthService.authorizationPath);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('redirect_uri', redirectURI);
    url.searchParams.append('allow_signup', 'true');
    window.location.replace(url.toString());
  }

  public async exchangeCode(code: string): Promise<string|null> {
    let token = null;
    const requestData: ExchangeCodeRequestData = {
      code,
      client_id: this.clientId,
    };
    try {
      const response = await http<ExchangeCodeResponseData>(GithubAuthService.codeExchangePath, {
        method: 'post',
        body: JSON.stringify(requestData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      token = response.access_token;
    } catch (err) {
      console.error('[ERR:GithubAuthService] Could not exchange code for token', err);
    }
    return token;
  }
}
