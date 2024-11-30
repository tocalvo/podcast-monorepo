import { Route, Routes } from 'react-router';
import Header from './components/header/header';
import { EpisodeDetail, PodcastDetail, Podcasts } from '@org/podcasts';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Podcasts />} />

        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetail />}
        />
      </Routes>
    </PersistQueryClientProvider>
  );
}

export default App;
