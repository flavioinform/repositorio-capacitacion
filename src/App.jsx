import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { DiscoveryView } from './features/stories/DiscoveryView';
import { StoryDetail } from './features/stories/StoryDetail';
import { FavoritesView } from './features/favorites/FavoritesView';
import { AnimatePresence } from 'framer-motion';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to sync with Header navigation (if it still uses onNavigate)
  const handleNavigate = (view) => {
    if (view === 'discovery') navigate('/');
    if (view === 'favorites') navigate('/favorites');
  };

  const currentView = location.pathname === '/favorites' ? 'favorites' : 'discovery';

  return (
    <div className="min-h-screen bg-h-cream pb-12 transition-colors duration-500 overflow-x-hidden">
      <Header onNavigate={handleNavigate} currentView={currentView} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DiscoveryView />} />
          <Route path="/favorites" element={<FavoritesView onNavigate={handleNavigate} />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
        </Routes>
      </AnimatePresence>

      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-h-cream via-h-cream/80 to-transparent pt-12 pb-6 px-6 pointer-events-none z-40">
        <div className="bg-h-navy text-h-cream/80 text-[10px] items-center justify-center font-bold tracking-[0.2em] uppercase py-2.5 px-6 rounded-full max-w-max mx-auto border border-h-cream/10 backdrop-blur-lg shadow-2xl">
          Legacy • Crónicas de Oro
        </div>
      </footer>
      <h1>hola</h1>
    </div>
  );
}

export default App;
