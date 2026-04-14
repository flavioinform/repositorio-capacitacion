export const LoginForm = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-brand-gold/10">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px]">Área Reservada</span>
          <h2 className="text-4xl md:text-5xl font-serif-brand font-bold text-brand-charcoal">
            Acceso al Archivo
          </h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto"></div>
        </div>
        
        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-400">
              Dirección de Correo
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-[#fdfbf7] border-b-2 border-gray-100 py-4 px-2 text-xl md:text-2xl font-serif-brand focus:border-brand-gold focus:outline-none transition-all placeholder-gray-200"
              placeholder="nombre@archivo.com"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="pass" className="block text-xs font-black uppercase tracking-widest text-gray-400">
              Contraseña de Acceso
            </label>
            <input
              type="password"
              id="pass"
              className="w-full bg-[#fdfbf7] border-b-2 border-gray-100 py-4 px-2 text-xl md:text-2xl font-serif-brand focus:border-brand-gold focus:outline-none transition-all placeholder-gray-200"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-brand-charcoal hover:bg-black text-white text-sm font-black uppercase tracking-[0.3em] py-6 px-8 rounded-sm shadow-xl hover:shadow-2xl transition-all active:scale-95"
            >
              Validar Acceso
            </button>
            <div className="flex justify-between items-center mt-8">
              <a href="#" className="text-xs font-bold text-gray-400 hover:text-brand-gold uppercase tracking-widest transition-colors">¿Olvidó su clave?</a>
              <a href="#" className="text-xs font-bold text-brand-gold hover:text-brand-gold-dark uppercase tracking-widest transition-colors underline decoration-brand-gold/30 underline-offset-8">Solicitar Registro</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
