'use client';

import React, { useState } from 'react';

import styles from './LoginForm.module.css';

// components
import FormContainer from '@/components/shared/FormContainer';
import FormGroup from '@/components/shared/FormGroup';
import ButtonWhite from '@/components/shared/ButtonWhite';

// helpers
import { login } from '@/lib/api/login';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const errorStyles = {
    color: 'red',
    marginBottom: '10px',
    marginTop: '10px',
    fontSize: 'calc(0.4vw + 0.4rem)'
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          label="Email"
        />
        <FormGroup
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          label="Password"
        />
        <div className={styles.button}>
          <ButtonWhite
            buttonText={loading ? 'Logging In' : 'Log In'}
            type={'submit'}
            disabled={loading}
            hasText={true}
          />
        </div>
        <div className={styles.forgotPassword}>
          <p>Forgot Password?</p>
        </div>
        {error && <p style={errorStyles}>Login failed: {error}</p>}
      </FormContainer>
    </>
  );
}
