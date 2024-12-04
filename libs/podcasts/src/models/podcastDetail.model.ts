// Talk with backend to know their structure/swagger and follow the same conventions, or autogenerate models
// https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-typescript
export interface ITunesPodcastDetailQuery {
  resultCount: number;
  results: ITunesPodcastDetail[];
}

export enum ITunesPodcastKind {
  podcast = 'podcast',
  'podcast-episode' = 'podcast-episode',
}

export interface ITunesPodcastDetail {
  artistIds?: number[];
  artistId?: number;
  artistName?: string;
  artistViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  collectionCensoredName?: string;
  collectionExplicitness?: string;
  collectionHdPrice?: number;
  collectionId: number;
  collectionName: string;
  collectionPrice?: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency?: string;
  feedUrl: string;
  genreIds?: string[];
  genres: string[] | { name: string; id: string }[];
  shortDescription?: string;
  description?: string;
  episodeUrl?: string;
  episodeFileExtension?: string;
  kind: ITunesPodcastKind;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}

// extended to add calculated data
export interface ITunesPodcastDetailQueryExtended
  extends ITunesPodcastDetailQuery {
  results: ITunesPodcastDetailExtended[];
}

export interface ITunesPodcastDetailExtended extends ITunesPodcastDetail {
  releaseDateLocaleString: string;
  trackTimeMinsSegs: string;
  sanitizedDescription: string;
}
