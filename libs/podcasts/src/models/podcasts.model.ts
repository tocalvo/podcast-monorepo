// Talk with backend to know their structure/swagger and follow the same conventions, or autogenerate models
// https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-typescript

export interface ITunesPodcastLabel {
  label: string;
}
export interface ITunesPodcastLink {
  attributes: {
    href: string;
    rel: string;
    type?: string;
  };
}

export interface ITunesPodcastEntry {
  category: {
    attributes: {
      'im:id': string;
      label: string;
      scheme: string;
      term: string;
    };
  };
  id: {
    attributes: {
      'im:id': string;
    };
    label: string;
  };
  'im:artist': {
    attributes: {
      href: string;
    };
    label: string;
  };
  'im:contentType': {
    attributes: {
      term: string;
      label: string;
    };
  };
  'im:image': {
    attributes: {
      height: string;
    };
    label: string;
  }[];
  'im:name': ITunesPodcastLabel;
  'im:price': {
    attributes: {
      amount: string;
      currency: string;
    };
  };
  'im:releaseDate': {
    attributes: ITunesPodcastLabel;
    label: string;
  };
  link: ITunesPodcastLink;
  rights: ITunesPodcastLabel;
  summary: ITunesPodcastLabel;
  title: ITunesPodcastLabel;
}

export interface ITunesPodcasts {
  feed: {
    author: {
      name: ITunesPodcastLabel;
      uri: ITunesPodcastLabel;
    };
    entry: ITunesPodcastEntry[];
    icon: ITunesPodcastLabel;
    id: ITunesPodcastLabel;
    link: ITunesPodcastLink[];
    rights: ITunesPodcastLabel;
    title: ITunesPodcastLabel;
    updated: ITunesPodcastLabel;
  };
}
