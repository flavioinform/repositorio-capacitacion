import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Lock, Play, Pause, ChevronLeft, Share2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { SEO } from '../../components/common/SEO';

export const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isSubscribed, loading: authLoading } = useAuth();
  
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullAudioUrl, setFullAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      setError('No pudimos encontrar esta historia.');
    } else {
      setStory(data);
      // If subscribed, get the signed URL
      if (isSubscribed) {
        fetchSignedUrl(data.id);
      }
    }
    setLoading(false);
  };

  const fetchSignedUrl = async (storyId) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-audio-url', {
        body: { storyId },
      });

      if (error) throw error;
      setFullAudioUrl(data.signedUrl);
    } catch (err) {
      console.error('Error fetching signed URL:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.description_short,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-h-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-h-gold"></div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-h-cream p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-display mb-4">{error || 'Historia no encontrada'}</h2>
        <button onClick={() => navigate('/')} className="text-h-gold font-bold uppercase tracking-widest">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-h-cream pb-20"
    >
      <SEO 
        title={story.title} 
        description={story.description_short} 
        image={story.thumbnail_url} 
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={story.thumbnail_url || 'https://images.unsplash.com/photo-1506806732259-39c2d4a78ae7'} 
          className="w-full h-full object-cover" 
          alt={story.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-h-cream via-h-cream/20 to-transparent" />
        
        <button 
          onClick={() => navigate('/')}
          className="absolute top-12 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg safe-tap"
        >
          <ChevronLeft className="w-6 h-6 text-h-navy" />
        </button>

        <button 
          onClick={handleShare}
          className="absolute top-12 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg safe-tap"
        >
          <Share2 className="w-6 h-6 text-h-navy" />
        </button>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-h-navy/5">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-h-gold/10 text-h-gold text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              Escucha de Vida
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
            {story.title}
          </h1>

          <p className="text-xl font-body text-h-navy/80 leading-relaxed mb-10 italic border-l-4 border-h-gold pl-6">
            {story.description_short}
          </p>

          {/* Gating Logic */}
          <div className="space-y-12">
            {/* Preview Section */}
            <div className="bg-h-stone/50 p-8 rounded-3xl">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
                <Headphones className="w-4 h-4" /> Fragmento de Prueba
              </h3>
              
              <div className="flex items-center gap-6">
                <button 
                  className="w-16 h-16 bg-h-navy text-h-cream rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <div className="flex-grow h-1.5 bg-h-navy/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isPlaying ? '100%' : '0%' }}
                    transition={{ duration: 30, ease: "linear" }}
                    className="h-full bg-h-gold"
                  />
                </div>
              </div>
              <audio 
                src={story.preview_audio_url} 
                onEnded={() => setIsPlaying(false)} 
                autoPlay={false} 
                ref={(el) => { if (el) isPlaying ? el.play() : el.pause() }}
              />
            </div>

            {/* Restricted Content */}
            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div 
                  key="subscribed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-h-navy text-h-cream p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-h-gold font-display text-2xl mb-4">Historia Completa</h3>
                      <p className="text-h-cream/80 leading-relaxed mb-8 text-lg font-display italic">
                        {story.description_full}
                      </p>
                      
                      {fullAudioUrl ? (
                         <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <span className="text-sm font-bold tracking-widest text-h-gold uppercase">Audio Full Disponible</span>
                         </div>
                      ) : (
                        <p className="text-xs opacity-50">Cargando audio premium...</p>
                      )}
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-h-gold/20 blur-3xl -mr-16 -mt-16 rounded-full" />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="unsubscribed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 border-2 border-dashed border-h-navy/20 rounded-3xl text-center bg-h-cream/50"
                >
                  <Lock className="w-12 h-12 text-h-gold mx-auto mb-6 opacity-40" />
                  <h3 className="text-2xl font-display font-medium mb-4">Esta historia merece ser escuchada completa</h3>
                  <p className="text-h-navy/60 mb-8 max-w-sm mx-auto">
                    Suscríbete ahora para desbloquear la vida de nuestros narradores y apoyar su legado.
                  </p>
                  <button className="bg-h-gold text-h-navy px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform active:scale-95">
                    Suscribirse por $2.99
                  </button>
                  <p className="mt-6 text-xs opacity-40">Acceso ilimitado a todas las crónicas de oro.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-center px-6">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Legacy • Crónicas de Oro</p>
      </footer>
    </motion.div>
  );
};
