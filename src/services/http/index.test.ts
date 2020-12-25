import { http } from './';

const endpoint = 'http://hazelcast.com/';
const postParams = {
  method: 'post',
  body: 'body',
};

interface MockBodyParams {
  ok: boolean,
  json: () => string,
}
const getFetchMock = (bodyParams?: Partial<MockBodyParams>) => jest.fn((input: RequestInfo, init?: RequestInit) => Promise.resolve({
  ok: true,
  json: () => '',
  ...bodyParams,
} as unknown as Response));


describe('http() service', () => {
  it('should make a simple GET request if the second param is not passed', async () => {
    global.fetch = getFetchMock();
    await http(endpoint);
    expect(fetch).toBeCalledWith(endpoint, undefined);
  });

  it('should pass request params if provided', async () => {
    global.fetch = getFetchMock();
    await http(endpoint, postParams);
    expect(fetch).toBeCalledWith(endpoint, postParams);
  });

  it('should throw if response is not OK', async () => {
    global.fetch = getFetchMock({ ok: false });
    try {
      await http(endpoint, postParams);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
