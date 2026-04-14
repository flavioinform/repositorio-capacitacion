import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import '../auth.css';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {/* Decorative Brand Panel */}
      <div className="auth-brand-panel">
        <div className="brand-content">
          <div className="brand-logo">
            ✨
          </div>
          <h2 className="brand-quote">
            "We build the <em>living archive</em> for your most precious memories, designed to last generations."
          </h2>
          <span className="brand-attribution">— Historias Doradas</span>

          <div className="brand-dots">
            <div className="brand-dot active"></div>
            <div className="brand-dot"></div>
            <div className="brand-dot"></div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="auth-form-panel">
        {isLogin ? (
          <LoginForm onToggle={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggle={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};
