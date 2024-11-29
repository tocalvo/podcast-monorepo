import { Route, Routes } from 'react-router';
import Header from './components/header/header';

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<p>podcasts</p>} />

        <Route path="/podcast/:podcastId" element={<p>podcastdetail</p>} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<p>episode detail</p>}
        />
      </Routes>
    </div>
  );
}

export default App;
