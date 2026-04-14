import React from 'react';
import { creators } from '../../data/mockStories';

interface StoryBubblesProps {
  selectedCreatorId: string | null;
  onCreatorSelect: (id: string) => void;
}

export const StoryBubbles: React.FC<StoryBubblesProps> = ({ 
  selectedCreatorId, 
  onCreatorSelect 
}) => {
  return (
    <div className="py-8 overflow-x-auto no-scrollbar max-w-7xl mx-auto">
      <div className="flex px-6 gap-8">
        {creators.map((creator) => (
          <button 
            key={creator.id} 
            onClick={() => onCreatorSelect(creator.id)}
            className="flex-shrink-0 flex flex-col items-center gap-3 group transition-all"
          >
            <div className={`relative p-[4px] rounded-full transition-all duration-500 scale-100 active:scale-90 ${
              selectedCreatorId === creator.id 
                ? 'bg-gradient-to-tr from-h-gold via-h-gold/40 to-h-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                : 'bg-transparent group-hover:bg-h-navy/10'
            }`}>
              <div className="p-0.5 bg-h-cream rounded-full">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className={`w-16 h-16 rounded-full object-cover transition-all duration-500 ${
                    selectedCreatorId === creator.id ? 'grayscale-0' : 'grayscale-[40%] group-hover:grayscale-0'
                  }`}
                />
              </div>
              
              {/* Active Indicator */}
              {selectedCreatorId === creator.id && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-h-gold rounded-full border-2 border-h-cream flex items-center justify-center animate-in zoom-in duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
              selectedCreatorId === creator.id ? 'text-h-gold' : 'text-h-navy/40 group-hover:text-h-navy'
            }`}>
              {creator.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
