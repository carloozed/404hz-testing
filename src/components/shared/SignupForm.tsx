'use client';

import React, { useState } from 'react';

// components
import FormGroup from './FormGroup';
import ButtonBlack from './ButtonBlack';
import FormContainer from './FormContainer';

// API helpers
import { signup } from '@/lib/api/signup';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({
        username,
        email,
        password1: password,
        password2: confirmPassword
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      console.error('Signup error:', err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        name="username"
        value={username}
        required
      />
      <FormGroup
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        name="email"
        value={email}
        required
        type="email"
      />
      <FormGroup
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        name="password"
        value={password}
        required
        type="password"
      />
      <FormGroup
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        required
        type="password"
      />
      <ButtonBlack buttonText="Sign up" type="submit" />
      {error && (
        <p
          style={{
            color: 'red',
            marginBottom: '10px',
            marginTop: '10px',
            fontSize: 'calc(0.4vw + 0.4rem)'
          }}
        >
          Signup failed: {error}
        </p>
      )}
    </FormContainer>
  );
}
