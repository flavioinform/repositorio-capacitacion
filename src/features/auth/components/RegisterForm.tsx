import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import '../auth.css';

interface RegisterFormProps {
  onToggle: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Lógica real de Supabase
    const { error } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: { 
        data: { full_name: name } 
      } 
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      alert('¡Registro exitoso! Por favor verifica tu correo electrónico.');
      onToggle(); // Volver a login
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-badge">
          <div className="auth-badge-dot"></div>
          Nuevo Miembro
        </div>
        <h1 className="auth-title">Únete al Archivo</h1>
        <p className="auth-subtitle">Comienza a preservar tu legado digital.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nombre Completo</label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            required
          />
        </div>

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
            minLength={6}
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : (
            <>
              Registrarse
              <span className="auth-button-icon">→</span>
            </>
          )}
        </button>
      </form>

      <div className="auth-footer">
        ¿Ya eres parte del legado?
        <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); onToggle(); }}>
          Inicia Sesión
        </a>
      </div>
    </div>
  );
};
