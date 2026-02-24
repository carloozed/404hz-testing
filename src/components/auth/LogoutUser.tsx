'use client';

import React, { useState } from 'react';

// API helpers
import { logout } from '@/lib/api/logout';

// components
import ButtonBlack from '@/components/shared/ButtonBlack';

// varia
import { useRouter } from 'next/navigation';

export default function LogoutUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    try {
      await logout();

      router.push('/logout-success');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonBlack
      buttonText="Log Out"
      onClick={logoutUser}
      type="button"
      disabled={loading}
    />
  );
}
