import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AuthPage } from './features/auth/pages/AuthPage';
import { HomePage } from './features/home/pages/HomePage';
import './App.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-subtitle">Cargando Historias Doradas...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {session ? <HomePage user={session.user} /> : <AuthPage />}
    </div>
  );
}

export default App;