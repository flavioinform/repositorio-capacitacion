import React from 'react';
import { Bookmark, User, Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'discovery' | 'favorites') => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="sticky top-0 z-50 bg-h-cream/80 backdrop-blur-md border-b border-h-navy/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-h-stone rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <span 
          className="text-2xl font-display font-semibold tracking-tight cursor-pointer"
          onClick={() => onNavigate('discovery')}
        >
          Legacy
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onNavigate('favorites')}
          className={`p-2 rounded-full transition-all ${
            currentView === 'favorites' ? 'bg-h-navy text-h-cream' : 'hover:bg-h-stone text-h-navy'
          }`}
          aria-label="Favoritos"
        >
          <Bookmark className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-h-stone text-h-navy rounded-full transition-all">
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
