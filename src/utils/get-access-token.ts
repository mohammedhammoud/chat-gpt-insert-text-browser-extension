import ExpiryMap from 'expiry-map';

const KEY_ACCESS_TOKEN = 'accessToken';

const cache = new ExpiryMap(10 * 1000);

class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export const getAccessToken = async () => {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN);
  }

  const response = await fetch('https://chat.openai.com/api/auth/session');

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  const data = await response.json().catch(() => ({}));

  if (!data.accessToken) {
    throw new UnauthorizedError();
  }

  cache.set(KEY_ACCESS_TOKEN, data.accessToken);

  return data.accessToken;
};
