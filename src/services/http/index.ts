// since we use GraphQL Apollo library for main API communication
// and we make only one single HTTP POST request while authentication
// no need in an elaborated HTTP adapter like axios.
// This simple fetch wrapper should be enough

export const http = async <T>(
  path: string, body?: RequestInit,
): Promise<T> => {
  const response = await fetch(path, body);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
