export const ALLORIGINS_PREFIX = 'https://api.allorigins.win/get?url=';
export const USE_ALLORIGINS = import.meta.env.VITE_USE_ALLORIGINS === 'true';

export const wrapUrl = (url: string) => {
  return USE_ALLORIGINS ? ALLORIGINS_PREFIX + encodeURIComponent(url) : url;
};

export const processAllOriginsResponse = async (res: Response) => {
  if (USE_ALLORIGINS) {
    const allOriginsResponse: { contents: string } = await res.json();
    return JSON.parse(allOriginsResponse.contents);
  } else {
    return res.json();
  }
};
