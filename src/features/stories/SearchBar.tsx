import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const categories = ['Todos', 'Memorias', 'Recetas', 'Amor', 'Consejos'];

  return (
    <div className="px-6 flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="relative group">
        <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-300 ${
          searchQuery ? 'text-h-gold' : 'text-h-navy/30'
        }`} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar una memoria, receta o consejo..."
          className="w-full bg-h-stone/50 hover:bg-h-stone/80 focus:bg-white border-2 border-transparent focus:border-h-gold/10 py-5 pl-14 pr-12 rounded-[2rem] font-body text-lg text-h-navy placeholder:text-h-navy/20 transition-all outline-none shadow-inner"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-h-navy/5 rounded-full text-h-navy/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-2 pr-4 border-r border-h-navy/5">
          <SlidersHorizontal className="w-5 h-5 text-h-navy/40" />
        </div>
        
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap border-2 ${
              selectedCategory === cat 
                ? 'bg-h-navy text-h-cream border-h-navy shadow-xl' 
                : 'bg-white text-h-navy/40 border-transparent hover:border-h-navy/10 hover:text-h-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
