'use client';

import React, { useState } from 'react';

// components
import ButtonBlack from './ButtonBlack';
import FormGroup from './FormGroup';
import FormContainer from './FormContainer';

// helpers
import { passwordReset } from '@/lib/api/passwordReset';

// varia
import { useRouter } from 'next/navigation';

export default function PasswordReset() {
  const [email, setEmail] = useState('');

  const router = useRouter();
  const requestPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      alert('Password reset link sent to your email.');
      router.push('/');
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Failed to send password reset link. Please try again.');
    }
  };
  return (
    <FormContainer onSubmit={requestPasswordReset}>
      <FormGroup
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Enter your Email"
      />
      <ButtonBlack type={'submit'} buttonText="Request Reset Link" />
    </FormContainer>
  );
}
