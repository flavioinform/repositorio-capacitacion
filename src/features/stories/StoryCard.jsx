import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const StoryCard = ({ story, onPlay, onToggleLike }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/stories/${story.id}`);
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-h-navy/5 group cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
      whileHover={{ y: -8 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img 
          src={story.coverImage} 
          alt={story.title} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-h-navy/80 via-h-navy/20 to-transparent opacity-80" />
        
        <div className="absolute top-5 left-5">
          <span className="bg-h-gold/90 backdrop-blur-md text-h-navy px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {story.category}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-h-cream/90 backdrop-blur-md rounded-full flex items-center justify-center text-h-navy shadow-2xl border border-white/20"
          >
            <Play className="w-10 h-10 fill-h-navy ml-1" />
          </motion.div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <img 
              src={story.creator.avatar} 
              alt={story.creator.name} 
              className="w-10 h-10 rounded-full border-2 border-white/40 shadow-lg"
            />
            <span className="text-base font-display font-medium drop-shadow-lg">{story.creator.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{story.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-h-gold transition-colors leading-tight">
          {story.title}
        </h3>
        <p className="text-h-navy/60 text-sm line-clamp-2 font-body mb-6 flex-grow leading-relaxed italic">
          "{story.description}"
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-h-navy/5 pt-6">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(e);
            }}
            className="flex items-center gap-2 text-h-navy/40 hover:text-red-500 transition-all active:scale-90 safe-tap"
          >
            <Heart 
              className={`w-6 h-6 transition-all ${
                story.isLiked ? 'fill-red-500 text-red-500 animate-bounce' : ''
              }`} 
            />
            <span className="text-xs font-bold uppercase tracking-widest">
              {story.isLiked ? 'Le gusta' : 'Me gusta'}
            </span>
          </button>

          <button 
            className="text-h-gold font-bold text-xs uppercase tracking-widest hover:underline underline-offset-8 transition-all"
          >
            Ver Historia
          </button>
        </div>
      </div>
    </motion.div>
  );
};
