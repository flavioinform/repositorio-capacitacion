import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import '../auth.css';

interface LoginFormProps {
  onToggle: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Lógica real de Supabase
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Éxito - El estado de auth cambiará automáticamente si usas onAuthStateChange
      // o podrías redirigir aquí.
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-badge">
          <div className="auth-badge-dot"></div>
          Acceso Seguro
        </div>
        <h1 className="auth-title">Historias Doradas</h1>
        <p className="auth-subtitle">Regresa a tus memorias queridas.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : (
            <>
              Iniciar Sesión
              <span className="auth-button-icon">→</span>
            </>
          )}
        </button>
      </form>

      <div className="auth-footer">
        ¿Aún no tienes una historia?
        <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); onToggle(); }}>
          Crea una cuenta
        </a>
      </div>
    </div>
  );
};
