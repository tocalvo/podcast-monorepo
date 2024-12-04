import { Route, Routes } from 'react-router';
import Header from './components/header/header';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from '@tanstack/react-query';
import PodcastsPage from './pages/podcastsPage/podcastsPage';
import PodcastDetailPage from './pages/podcastDetailPage/podcastDetailPage';
import EpisodeDetailPage from './pages/episodeDetailPage/episodeDetailPage';

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
        <Route path="/" element={<PodcastsPage />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetailPage />}
        />
      </Routes>
    </PersistQueryClientProvider>
  );
}

export default App;
