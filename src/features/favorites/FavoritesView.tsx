import React from 'react';
import { Bookmark, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Story } from '../../data/mockStories';

interface FavoritesViewProps {
  stories: Story[];
  onPlay: (story: Story) => void;
  onNavigate: (view: 'discovery' | 'favorites') => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ stories, onPlay, onNavigate }) => {
  const favoriteStories = stories.filter(s => s.isFavorite);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="p-4 bg-h-gold/20 rounded-[2rem] text-h-gold shadow-inner">
          <Bookmark className="w-10 h-10 fill-current" />
        </div>
        <div>
          <h2 className="text-4xl font-display font-semibold tracking-tight">Mis Historias</h2>
          <p className="text-h-navy/50 font-medium font-body italic">"Tu biblioteca personal de memorias inmortales"</p>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {favoriteStories.length > 0 ? (
          <motion.div 
            key="favorites-grid"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {favoriteStories.map(story => (
              <motion.div 
                key={story.id} 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                }}
                className="group relative bg-white p-5 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-h-navy/5 flex gap-6 cursor-pointer items-center"
                onClick={() => onPlay(story)}
                whileHover={{ x: 5 }}
              >
                <div className="relative flex-shrink-0 w-28 h-28 rounded-3xl overflow-hidden shadow-2xl border-2 border-h-stone">
                  <img src={story.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-h-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                    <Play className="w-10 h-10 text-white fill-current" />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center min-w-0 flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-h-gold mb-1">{story.category}</span>
                  <h3 className="font-display font-semibold text-xl truncate group-hover:text-h-gold transition-colors leading-tight mb-1">
                    {story.title}
                  </h3>
                  <p className="text-sm text-h-navy/40 font-medium font-body">Contada por {story.creator.name}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-h-stone/50 px-3 py-1 rounded-full text-h-navy/60">
                      {story.duration}
                    </span>
                  </div>
                </div>
                
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-h-gold" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty-favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-h-navy/10 rounded-[3rem] py-24 px-8 text-center shadow-inner"
          >
            <div className="w-24 h-24 bg-h-cream rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Bookmark className="w-12 h-12 text-h-navy/10" />
            </div>
            <h2 className="text-3xl font-display font-semibold mb-3 italic opacity-80">Tu biblioteca está esperando</h2>
            <p className="text-h-navy/40 max-w-md mx-auto font-body leading-relaxed">
              Explora las historias de nuestros abuelos en la sección de descubrimiento y guarda aquellas que te inspiren para preservarlas por siempre.
            </p>
            <button 
              onClick={() => onNavigate('discovery')}
              className="mt-10 bg-h-navy text-h-cream px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-h-navy/90 transition-all active:scale-95 shadow-lg"
            >
              Empezar a explorar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
