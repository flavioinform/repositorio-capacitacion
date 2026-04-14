import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Brand Name - Editorial Style */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-serif-brand font-bold text-brand-charcoal tracking-normal">
              Historias <span className="text-brand-gold italic">Doradas</span> Digitales
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#discovery" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-gold transition-colors">Descubrir</a>
            <a href="#lessons" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-gold transition-colors">Lecciones</a>
            <a href="#memories" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-gold transition-colors">Memorias</a>
            <button className="bg-brand-gold hover:bg-brand-gold-dark text-white text-xs font-black uppercase tracking-[0.2em] py-3 px-8 rounded-sm shadow-md transition-all active:scale-95">
              Acceso
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-brand-charcoal">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-brand-gold/10`}>
        <div className="px-6 py-8 space-y-6">
          <a href="#discovery" className="block text-lg font-bold text-brand-charcoal uppercase tracking-widest">Descubrir</a>
          <a href="#lessons" className="block text-lg font-bold text-brand-charcoal uppercase tracking-widest">Lecciones</a>
          <button className="w-full text-center bg-brand-gold text-white text-lg font-black uppercase tracking-widest py-4 rounded-sm">
            Acceso
          </button>
        </div>
      </div>
    </nav>
  );
};
