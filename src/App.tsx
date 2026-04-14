import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoryCard } from './components/StoryCard';
//import { LoginForm } from './components/LoginForm';//

function App() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-brand-gold/30">
      <Navbar />

      <main>
        {/* 1. Hero Editorial Section */}
        <Hero />

        {/* 2. Lecciones de Vida Section */}
        <section id="lessons" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs">Sabiduría Acumulada</span>
                <h2 className="text-4xl md:text-6xl font-serif-brand font-bold text-brand-charcoal">
                  Lecciones de Vida
                </h2>
              </div>
              <p className="text-gray-500 max-w-md text-lg font-medium leading-relaxed italic border-l-2 border-brand-gold/20 pl-6">
                "La vida es el arte de recordar lo que es importante y olvidar lo que no lo es."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <StoryCard
                category="Filosofía"
                title="El Arte de la Paciencia en la Era Digital"
                excerpt="Cómo encontrar la calma en un mundo que corre demasiado rápido. Una reflexión desde la perspectiva de quien ha visto pasar ocho décadas."
                author="Eleanor Vance"
                image="https://images.unsplash.com/photo-1544120190-27956f27918a?q=80&w=2070&auto=format&fit=crop"
              />
              <StoryCard
                category="Legado"
                title="Lo que el Silencio me enseñó"
                excerpt="A veces, las palabras más poderosas son las que nunca se dicen. Un relato sobre la escucha y la empatía en tiempos difíciles."
                author="Arthur Dent"
                image="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
              />
              <StoryCard
                category="Resiliencia"
                title="Navegando las Estaciones del Cambio"
                excerpt="La vida es como un jardín: cada invierno prepara el terreno para la primavera más brillante. Lecciones aprendidas en la tierra."
                author="George Harris"
                image="https://images.unsplash.com/photo-1463947628408-f8581a2f4acc?q=80&w=2070&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* 3. Quote/Separator Section */}
        <section className="bg-brand-charcoal py-24 text-center px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <svg className="w-16 h-16 mx-auto text-brand-gold/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 3H21.017V15C21.017 16.1046 20.1216 17 19.017 17H16.017V21L14.017 21ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H5.017C3.91243 8 3.017 7.10457 3.017 6V3L3.017 3H10.017V15C10.017 16.1046 9.12157 17 8.017 17H5.017V21L3.017 21Z" />
            </svg>
            <p className="text-2xl md:text-4xl font-serif-brand font-medium text-white italic leading-snug">
              "No estamos aquí para sobrevivir al tiempo, sino para darle significado a través de nuestras historias."
            </p>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto"></div>
          </div>
        </section>

        {/* 4. Recuerdos Históricos Section */}
        <section id="memories" className="py-24 md:py-32 px-6 bg-[#f7f5f0]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs">Crónicas de Antaño</span>
              <h2 className="text-4xl md:text-6xl font-serif-brand font-bold text-brand-charcoal mt-4">
                Recuerdos Históricos
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Featured Large Card */}
              <div className="bg-white border border-gray-100 flex flex-col md:flex-row h-full rounded-lg overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="md:w-1/2 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Cityscape"
                  />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
                  <span className="text-brand-gold font-black uppercase tracking-widest text-[10px]">París, 1950</span>
                  <h3 className="text-3xl font-serif-brand font-bold">La Ciudad de las Luces tras la Oscuridad</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Un relato de reconstrucción y esperanza en las calles de un París que despertaba de un sueño largo y frío.
                  </p>
                  <button className="text-brand-charcoal font-black uppercase tracking-[0.2em] text-xs pt-4 flex items-center gap-3">
                    Explorar Memoria <span className="w-10 h-[1px] bg-brand-gold"></span>
                  </button>
                </div>
              </div>

              {/* Grid of smaller ones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 border border-gray-100 space-y-4 rounded-lg">
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-[9px]">1969</span>
                  <h4 className="text-xl font-serif-brand font-bold">La Luna en Blanco y Negro</h4>
                  <p className="text-gray-500 text-sm font-medium">Testigo presencial del día en que el mundo se detuvo para mirar arriba.</p>
                </div>
                <div className="bg-white p-8 border border-gray-100 space-y-4 rounded-lg">
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-[9px]">1989</span>
                  <h4 className="text-xl font-serif-brand font-bold">El Muro que se hizo Polvo</h4>
                  <p className="text-gray-500 text-sm font-medium">Crónica de un viaje a Berlín bajo el signo de la libertad recién estrenada.</p>
                </div>
                <div className="bg-white p-8 border border-gray-100 space-y-4 rounded-lg">
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-[9px]">1974</span>
                  <h4 className="text-xl font-serif-brand font-bold">La Revolución en un Clavel</h4>
                  <p className="text-gray-500 text-sm font-medium">Memorias de Lisboa y el aroma a esperanza que inundó las plazas.</p>
                </div>
                <div className="bg-white p-8 border border-gray-100 space-y-4 rounded-lg">
                  <span className="text-brand-gold font-bold uppercase tracking-widest text-[9px]">1955</span>
                  <h4 className="text-xl font-serif-brand font-bold">El Primer Rock & Roll</h4>
                  <p className="text-gray-500 text-sm font-medium">Cómo una melodía rebelde cambió el pulso de toda una juventud.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Access Layout Refined */}

      </main>

      <footer className="bg-brand-charcoal py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left space-y-4">
            <span className="text-xl md:text-2xl font-serif-brand font-bold text-white tracking-normal">
              Historias <span className="text-brand-gold italic">Doradas</span> Digitales
            </span>
            <p className="text-gray-500 text-sm font-medium max-w-xs">
              Preservando el patrimonio emocional de la humanidad para las generaciones futuras.
            </p>
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Navegación</span>
              <a href="#" className="text-gray-500 hover:text-brand-gold text-sm font-medium transition-colors">Archivo</a>
              <a href="#" className="text-gray-500 hover:text-brand-gold text-sm font-medium transition-colors">Narradores</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Contacto</span>
              <a href="#" className="text-gray-500 hover:text-brand-gold text-sm font-medium transition-colors">Soporte</a>
              <a href="#" className="text-gray-500 hover:text-brand-gold text-sm font-medium transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2024 El Legado Editorial Digital. Todos los Derechos Reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
