export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-40 flex flex-col justify-center min-h-[70vh]">
        <div className="max-w-2xl space-y-8 md:space-y-10">
          <div className="inline-block border-l-4 border-brand-gold pl-4">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-sm md:text-base">Archivo Viviente</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif-brand font-bold leading-[1.1] tracking-tight">
            El Eco <span className="italic text-brand-gold font-light">Silencioso</span> de 1944
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-xl">
            Descubra las memorias inéditas de una generación que transformó el mundo. Un viaje íntimo a través de voces que se niegan a ser olvidadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button className="bg-brand-gold hover:bg-brand-gold-dark text-white text-sm font-black uppercase tracking-[0.2em] py-5 px-10 rounded-sm shadow-2xl transition-all active:scale-95">
              Escuchar Relato
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 text-sm font-black uppercase tracking-[0.2em] py-5 px-10 rounded-sm transition-all active:scale-95">
              Ver Galería
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
