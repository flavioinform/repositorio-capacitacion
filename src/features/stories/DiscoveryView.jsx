import React, { useState, useMemo } from 'react';
import { StoryBubbles } from './StoryBubbles';
import { SearchBar } from './SearchBar';
import { StoryCard } from './StoryCard';
import { StoryPlayer } from './StoryPlayer';
import { mockStoriesData } from '../../data/mockStories';
import { motion, AnimatePresence } from 'framer-motion';

export const DiscoveryView = () => {
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [stories, setStories] = useState(mockStoriesData);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedCreatorId, setSelectedCreatorId] = useState(null);

  // Additive Filter Logic
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           story.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || story.category === selectedCategory;
      const matchesCreator = !selectedCreatorId || story.creator.id === selectedCreatorId;
      
      return matchesSearch && matchesCategory && matchesCreator;
    });
  }, [stories, searchQuery, selectedCategory, selectedCreatorId]);

  const selectedStory = stories.find(s => s.id === selectedStoryId) || null;

  const handlePlayStory = (story) => {
    setSelectedStoryId(story.id);
  };

  const handleClosePlayer = () => {
    setSelectedStoryId(null);
  };

  const toggleLike = (id) => {
    setStories(prev => prev.map(s => 
      s.id === id ? { ...s, isLiked: !s.isLiked } : s
    ));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedCreatorId(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StoryBubbles 
        selectedCreatorId={selectedCreatorId}
        onCreatorSelect={(id) => setSelectedCreatorId(id === selectedCreatorId ? null : id)}
      />
      
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-h-navy/5 pb-4">
          <h2 className="text-3xl font-display font-semibold">
            {selectedCategory !== 'Todos' || selectedCreatorId ? 'Historias filtradas' : 'Descubrir Historias'}
          </h2>
          {(searchQuery || selectedCategory !== 'Todos' || selectedCreatorId) && (
            <button 
              onClick={resetFilters}
              className="text-h-gold font-bold text-xs uppercase tracking-widest hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
        
        <AnimatePresence mode="popLayout">
          {filteredStories.length > 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  onPlay={() => handlePlayStory(story)}
                  onToggleLike={() => toggleLike(story.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-h-stone/30 rounded-[3rem] border-2 border-dashed border-h-navy/10"
            >
              <p className="text-h-navy/40 font-display text-2xl italic">No encontramos historias que coincidan...</p>
              <button onClick={resetFilters} className="mt-6 text-h-gold font-bold uppercase tracking-widest text-sm">Ver todas</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
            className="fixed inset-0 z-[100]"
          >
            <StoryPlayer 
              story={selectedStory} 
              onClose={handleClosePlayer}
              onToggleLike={() => toggleLike(selectedStory.id)}
              onToggleFavorite={() => {}} // Not implemented in current mock flow
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
