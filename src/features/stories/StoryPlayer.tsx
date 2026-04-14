import React, { useState } from 'react';
import { X, Play, Pause, Bookmark, Heart, Headphones, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Story } from '../../data/mockStories';

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
  onToggleLike: () => void;
  onToggleFavorite: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as any
    } 
  }
};

export const StoryPlayer: React.FC<StoryPlayerProps> = ({ 
  story, 
  onClose, 
  onToggleLike, 
  onToggleFavorite 
}) => {
  const [mode, setMode] = useState<'listen' | 'read'>('listen');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      className="relative z-[100] bg-h-navy text-h-cream h-screen flex flex-col overflow-hidden"
    >
      {/* Background with Atmospheric Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={story.coverImage} 
          alt="" 
          className="w-full h-full object-cover blur-3xl scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-h-navy via-h-navy/80 to-h-navy" />
      </motion.div>

      {/* Top Navigation Bar */}
      <motion.div 
        variants={itemVariants}
        className="relative z-10 px-6 pt-12 pb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <img 
            src={story.creator.avatar} 
            alt={story.creator.name} 
            className="w-10 h-10 rounded-full border border-h-cream/20 shadow-lg"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide uppercase opacity-60 font-body">Narrado por</span>
            <span className="text-lg font-display font-medium">{story.creator.name}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 bg-h-cream/10 hover:bg-h-cream/20 rounded-full transition-all group safe-tap"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>
      </motion.div>

      {/* Mode Toggles */}
      <motion.div 
        variants={itemVariants}
        className="relative z-10 flex justify-center mt-4"
      >
        <div className="bg-h-cream/10 p-1.5 rounded-3xl backdrop-blur-md border border-h-cream/10 flex gap-1">
          <button 
            onClick={() => setMode('listen')}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all ${
              mode === 'listen' ? 'bg-h-gold text-h-navy shadow-lg' : 'hover:bg-h-cream/10 opacity-40'
            }`}
          >
            <Headphones className="w-4 h-4" />
            Escuchar
          </button>
          <button 
            onClick={() => setMode('read')}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all ${
              mode === 'read' ? 'bg-h-gold text-h-navy shadow-lg' : 'hover:bg-h-cream/10 opacity-40'
            }`}
          >
            <FileText className="w-4 h-4" />
            Leer
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex flex-col justify-center px-8 text-center max-w-4xl mx-auto w-full mb-12">
        <AnimatePresence mode="wait">
          {mode === 'listen' ? (
            <motion.div 
              key="listen-view"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-10"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-h-cream/10"
              >
                <img src={story.coverImage} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-24 h-24 bg-h-gold text-h-navy rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-h-cream/40"
                  >
                    {isPlaying ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 fill-current ml-1.5" />}
                  </button>
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <motion.h2 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-display font-semibold tracking-tight leading-tight"
                >
                  {story.title}
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-h-cream/60 font-body text-xl max-w-lg mx-auto italic leading-relaxed"
                >
                  "{story.description}"
                </motion.p>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-end gap-2 h-20 w-full max-w-md mt-6 px-4">
                {[...Array(30)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      height: isPlaying ? [`${Math.random() * 80 + 20}%`, `${Math.random() * 80 + 20}%`] : '10%' 
                    }}
                    transition={{ 
                      repeat: isPlaying ? Infinity : 0, 
                      duration: 0.5, 
                      ease: "easeInOut" 
                    }}
                    className={`flex-1 bg-h-gold/60 rounded-full transition-all duration-300`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="read-view"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
              className="h-full py-8 text-left flex flex-col"
            >
              <div className="overflow-y-auto no-scrollbar flex-grow space-y-10 pr-6">
                <h2 className="text-4xl font-display font-semibold border-b border-h-cream/10 pb-8 tracking-tight">
                  {story.title}
                </h2>
                <div className="font-display text-2xl md:text-3xl leading-relaxed text-h-cream/90 space-y-12 tracking-wide italic">
                  {story.textContent.split('\n\n').map((para, i) => (
                    <motion.p 
                      key={i}
                      variants={itemVariants}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
                <div className="h-32" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Right Social Actions Counterpart */}
      <motion.div 
        variants={itemVariants}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8"
      >
        <button 
          onClick={onToggleLike}
          className="flex flex-col items-center gap-2 group safe-tap"
        >
          <motion.div 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-5 bg-h-cream/10 hover:bg-h-cream/20 rounded-full backdrop-blur-md transition-all border border-h-cream/5"
          >
            <Heart 
              className={`w-8 h-8 transition-all ${
                story.isLiked ? 'fill-red-500 text-red-500' : 'text-h-cream'
              }`} 
            />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">1.3k</span>
        </button>
        
        <button 
          onClick={onToggleFavorite}
          className="flex flex-col items-center gap-2 group safe-tap"
        >
          <motion.div 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-5 bg-h-cream/10 hover:bg-h-cream/20 rounded-full backdrop-blur-md transition-all border border-h-cream/5"
          >
            <Bookmark 
              className={`w-8 h-8 transition-all ${
                story.isFavorite ? 'fill-h-gold text-h-gold' : 'text-h-cream'
              }`} 
            />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Guardar</span>
        </button>
      </motion.div>

      {/* Progress Footer */}
      <motion.footer 
        variants={itemVariants}
        className="relative z-10 p-10 flex flex-col gap-6 mt-auto bg-gradient-to-t from-h-navy via-h-navy/50 to-transparent"
      >
        <div className="flex items-center gap-6 text-xs font-black tracking-[0.3em] uppercase opacity-40 font-body">
          <span>02:45</span>
          <div className="flex-grow h-1.5 bg-h-cream/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isPlaying ? '45%' : '33%' }}
              className="h-full bg-h-gold rounded-full" 
            />
          </div>
          <span>{story.duration}</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};
