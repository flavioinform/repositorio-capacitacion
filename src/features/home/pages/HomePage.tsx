import React from 'react';
import { supabase } from '../../../lib/supabase';
import '../../auth/auth.css'; // Reusing some classes for layout if needed, or better define home.css

export const HomePage: React.FC<{ user: any }> = ({ user }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="auth-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h1 className="auth-title">Bienvenido, {user.user_metadata?.full_name || user.email}</h1>
        <p className="auth-subtitle">Tu legado digital está seguro en Historias Doradas.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={handleSignOut}
            className="auth-button"
            style={{ backgroundColor: 'var(--color-error)', width: 'auto', margin: '0 auto' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
